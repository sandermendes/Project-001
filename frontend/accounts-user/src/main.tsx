import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@mui/material';

import '@/index.css';
import App from '@/App';
import { theme } from '@/theme';
import { TranslateProvider } from '@/shared/providers/translate';
import { API_BACKEND_URL } from '@/shared/constants/url';

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
