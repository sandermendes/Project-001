import { gql } from '@apollo/client';

/**
 * Gets authenticated user
 */
export const PROFILE = gql`
  query Profile {
    profile {
        firstName
        lastName
        email
        nickName
        profilePic
        birthDate
        gender
    }
  }
`;

// export const PROFILE = gql`
//   query {
//     profile {
//       id
//       firstName
//       lastName
//       nickName
//       profilePic
//       birthDate
//       gender
//       email
//       username
//       createdAt
//     }
//   }
// `;

/**
 * Sign up user
 */
// export const PROFILE_UPDATE = gql`
//   mutation updateProfile($firstName: String, $lastName: String, $nickName: String, $profilePic: String, $birthDate: DateTime, $gender: Int) {
//     updateProfile(
//       updateProfileInput: {
//         firstName: $firstName
//         lastName: $lastName
//         nickName: $nickName
//         profilePic: $profilePic
//         birthDate: $birthDate
//         gender: $gender
//       }
//     )
//   }
// `;
