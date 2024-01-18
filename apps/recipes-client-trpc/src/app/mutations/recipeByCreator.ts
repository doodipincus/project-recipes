import { gql } from "@apollo/client";

export const RECIPES_BY_CREATOR = gql`
query MyQuery($email: String!) {
  userByEmail(email: $email) {
    recipesByCreatorEmail {
      nodes {
        category
        countyOfOrigin
        createdAt
        creatorEmail
        creatorImage
        creatorName
        difficulty
        image
        ingredients
        instructions
        numReviews
        preparationTime
        rating
        recipeId
        sensitivity
        title
      }
    }
  }
}
`;