import { USER_ACCOUNT_URL } from '../constants/url';

export const redirectToUserAccount = (searchParams: URLSearchParams) => {
    const redirectUri = searchParams.get('redirect_uri') ?? USER_ACCOUNT_URL;
    window.location.replace(redirectUri);
};
