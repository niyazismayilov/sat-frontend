import { ApolloProvider } from '@apollo/client';
import { client } from 'cache';
import { AuthProvider } from 'context/auth/store';
import { SettingsProvider } from 'context/settings/store';
import App from './App';

const Setup: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <SettingsProvider>
                    <App />
                </SettingsProvider>
            </AuthProvider>
        </ApolloProvider>
    );
};

export default Setup;
