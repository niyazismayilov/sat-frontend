import { ApolloCache, StoreObject } from '@apollo/client/cache';

export const DeleteFromCache = <CacheType>(
    cache: ApolloCache<CacheType>,
    id: string,
    __typename: StoreObject['__typename'],
): void => {
    const normalizedId = cache.identify({ id, __typename });
    cache.evict({ id: normalizedId });
    cache.gc();
};
