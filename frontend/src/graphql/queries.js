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
                answer
              }
            }
          }
        }
      }
    }
  }
`;

export const GALLERIES_QUERY = gql`
  query galleryImages($id: ID!, $password: String!) {
    galleryImages(id: $id, password:$password) {
      owner
      data
    }
  }
`;

// export const INVENTORIES_QUERY = gql`
//   query users ($username: String!){
//     users(username: $username) {
//       money
//       inventory
//     }
//   }
// `;
