const ENVIRONMENT = process.env.NODE_ENV;

export const API_BACKEND_URL = ENVIRONMENT === 'production' ? 'https://api.<URL_PRODUCTION>.com/api' : 'http://localhost:8080/query';
export const ACCOUNTS_URL = ENVIRONMENT === 'production' ? 'https://accounts.<URL_PRODUCTION>.com/' : 'http://localhost:4050';
export const USER_ACCOUNT_URL = ENVIRONMENT === 'production' ? 'https://me.<URL_PRODUCTION>.com/' : 'http://localhost:4000';

export const getRedirectUri = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return `?redirect_uri=${encodeURIComponent(urlParams.get('redirect_uri') ?? USER_ACCOUNT_URL)}`;
};
