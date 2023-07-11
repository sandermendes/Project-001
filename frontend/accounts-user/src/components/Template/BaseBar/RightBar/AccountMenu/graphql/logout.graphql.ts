import { gql } from '@apollo/client';

/**
 * Check User Auth
 */
export const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;
