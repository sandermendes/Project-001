import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { API_BACKEND_URL } from './shared/constants/url';

const apolloClient = new ApolloClient({
    uri: API_BACKEND_URL,
    credentials: 'include',
    cache: new InMemoryCache({
        addTypename: false,
    }),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
