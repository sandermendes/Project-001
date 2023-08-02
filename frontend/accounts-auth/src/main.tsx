import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from '@/App';
import { theme } from '@/theme';
import { API_BACKEND_URL } from '@/shared/constants/url';
import { TranslateProvider } from '@/shared/providers/translate';

const apolloClient = new ApolloClient({
    uri: API_BACKEND_URL,
    credentials: 'include',
    cache: new InMemoryCache({
        addTypename: false,
    }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <TranslateProvider>
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </TranslateProvider>
);
