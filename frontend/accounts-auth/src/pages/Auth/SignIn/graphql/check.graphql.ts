import { gql } from '@apollo/client';

/**
 * Check User Auth
 */
export const CHECK_AUTH = gql`
    query IsAuthed {
        isAuthed
    }
`;
