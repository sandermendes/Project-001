const ENVIRONMENT = process.env.NODE_ENV;

export const API_BACKEND_URL = ENVIRONMENT !== 'development' ? 'https://api.vitanexus.com/api' : 'http://localhost:8080/query';

export const ACCOUNTS_URL = ENVIRONMENT !== 'development' ? 'https://accounts.vitanexus.com/' : 'http://localhost:4050';
