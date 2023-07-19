import { CssBaseline, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';
import { API_BACKEND_URL } from './shared/constants/url';
import { TranslateProvider } from './shared/providers/translate';

const apolloClient = new ApolloClient({
    uri: API_BACKEND_URL,
    credentials: 'include',
    cache: new InMemoryCache({
        addTypename: false,
    }),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <TranslateProvider language="en-US" >
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </TranslateProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
