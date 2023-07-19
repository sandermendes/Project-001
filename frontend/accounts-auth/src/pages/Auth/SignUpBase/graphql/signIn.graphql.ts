import { gql } from '@apollo/client';

/**
 * Sign up user
 */
export const SIGN_IN = gql`
    mutation Login($email: String!, $password: String!) {
        login(input: { email: $email, password: $password }) {
            token
        }
    }
`;
