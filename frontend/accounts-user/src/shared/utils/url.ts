import { ACCOUNTS_URL } from '@/shared/constants/url';

export const redirectToAccountSign = () => {
  const redirectUri = `${ACCOUNTS_URL}?redirect_uri=${encodeURIComponent(window.location.href)}`;
  window.location.replace(redirectUri);
};
