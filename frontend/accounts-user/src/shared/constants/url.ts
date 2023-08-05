const ENVIRONMENT = process.env.NODE_ENV;

export const API_BACKEND_URL = ENVIRONMENT === 'production' ? 'https://api.<URL_PRODUCTION>.com/api' : 'http://localhost:8080/query';
export const ACCOUNTS_URL = ENVIRONMENT === 'production' ? 'https://accounts.<URL_PRODUCTION>.com/' : 'http://localhost:4050';
