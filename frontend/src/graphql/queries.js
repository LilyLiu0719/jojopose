import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query users($username: String!, $hashedPassword: String!) {
    users(username: $username, hashedPassword: $hashedPassword) {

    }
  }
`;

export const STAGES_QUERY = gql`
  query stages($username: String) {
    stages(username: $username) {
      images {
        uploader
        background
        mask
      }
      difficulty
    }
  }
`;

export const GALLERIES_QUERY = gql`
  query galleryImages($usermame: String) {
    galleryImages(username: $username) {
      owner
      data
    }
  }
`;

export const INVENTORIES_QUERY = gql`
  query users ($username: String!){
    users(username: $username) {
      money
      inventory
    }
  }
`;
