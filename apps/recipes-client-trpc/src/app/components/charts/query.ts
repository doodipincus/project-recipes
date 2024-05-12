import { gql } from "@apollo/client";

export const DATA = gql`
query MyQuery {
  allUsers {
    nodes {
      createdAt
    }
  }
  allRecipes {
    nodes {
      createdAt
    }
  }
  allFestivals {
    nodes {
      createdAt
    }
  }
  allFavorites {
    nodes {
      createdAt
    }
  }
}
`;
