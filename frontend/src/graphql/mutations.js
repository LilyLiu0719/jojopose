import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $username: String!
    $password: String!
  ) {
    createUser(
      data: {
        username: $name
        password: $target
      }
    ) {
      user {
      username
      id
      inventory {
        edges {
          node {
            name
            quantity
          }
        }
      }
      hashedPassword
      money
    }
    ok
  }
    }
  }
`;

export const CREATE_STAGE_MUTATION = gql`

  mutation createStage(
    $images: String!
    $difficulty: Int!
  ) {
    createUser(
      data: {
        images: $images
        difficulty: $difficulty
      }
    ) {

    }
  }
`;
