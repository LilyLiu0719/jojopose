import { gql } from "@apollo/client";

export const STAGES_QUERY = gql`
  query {
    allStages {
      edges {
        node {
          id
          difficulty
          thumbnail
        }
      }
    }
  }
`;

export const STAGE_QUERY = gql`
  query stageById($id: ID!) {
    allStages(id: $id) {
      edges {
        node {
          id
          difficulty
          images {
            edges {
              node {
                id
                background
                outline
              }
            }
          }
        }
      }
    }
  }
`;

// export const GALLERIES_QUERY = gql`
//   query galleryImages($usermame: String) {
//     galleryImages(username: $username) {
//       owner
//       data
//     }
//   }
// `;

// export const INVENTORIES_QUERY = gql`
//   query users ($username: String!){
//     users(username: $username) {
//       money
//       inventory
//     }
//   }
// `;
