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

export const CREATE_GALLERY_MUTATION = gql`
  mutation createGallery($ownerID: ID!, $password: String!, $image: String!) {
    createGallery(ownerID: $ownerID, password: $password, image: $image) {
      galleryImage {
        id
      }
      ok
    }
  }
`;

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
