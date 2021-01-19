import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user {
        id
        money
        username
        inventory {
          edges {
            node {
              name
              quantity
            }
          }
        }
      }
      ok
    }
  }
`;

// export const CREATE_STAGE_MUTATION = gql`

//   mutation createStage(
//     $images: String!
//     $difficulty: Int!
//   ) {
//     createUser(
//       data: {
//         images: $images
//         difficulty: $difficulty
//       }
//     ) {

//     }
//   }
// `;

export const UPLOAD_IMAGE_MUTATION = gql`
  mutation uploadImage(
    $uploaderID: ID
    $background: String!
    $mask: String!
    $outline: String!
  ) {
    uploadImage(
      uploaderID: $uploaderID
      background: $background
      mask: $mask
      outline: $outline
    ) {
      image {
        id
      }
    }
  }
`;
