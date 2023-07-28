import { gql } from '@apollo/client';

/**
 * Sign up user
 */
export const SIGN_UP = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        register(
            input: {
                firstName: $firstName,
                lastName: $lastName,
                email: $email,
                password: $password
            }
        ) {
            token
            redirect
        }
    }    
`;
