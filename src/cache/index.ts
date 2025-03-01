import { ApolloClient, ApolloLink, InMemoryCache, Observable, Operation } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { API_URL } from 'config';
import { getAccessToken } from 'context/auth/store';
import 'i18n';

const cache = new InMemoryCache({});

const request = (operation: Operation): void => {
    if (getAccessToken()) {
        operation.setContext({
            headers: {
                authorization: `Bearer ${getAccessToken()}`,
            },
        });
    }
};

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable((observer) => {
            let handle: any;
            Promise.resolve(operation)
                .then((oper) => request(oper))
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                .catch(observer.error.bind(observer));

            return (): void => {
                if (handle) handle.unsubscribe();
            };
        }),
);

export const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ networkError, graphQLErrors }) => {
            if (graphQLErrors && graphQLErrors.length > 0) {
                // eslint-disable-next-line no-console
                console.group('GraphQL Errors');
                graphQLErrors.forEach((error) => {
                    console.error(error);
                });
                // eslint-disable-next-line no-console
                console.groupEnd();
            }

            if (networkError) {
                console.warn('Network Error');
                console.error(networkError);
            }
        }),
        requestLink,
        createUploadLink({ uri: `${API_URL}/graphql` }),
    ]),
    cache,
});
