import { ACCOUNTS_URL } from '../constants/url';

export const redirectToAccountSign = () => {
  console.log('redirectToAccountSign - ACCOUNTS_URL', ACCOUNTS_URL);
  const redirectUri = `${ACCOUNTS_URL}?redirect_uri=${encodeURIComponent(window.location.href)}`;
  window.location.replace(redirectUri);
};
