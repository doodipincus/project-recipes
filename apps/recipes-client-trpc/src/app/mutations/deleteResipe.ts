import { gql } from "@apollo/client";

export const DELETE_RECIPE = gql`
mutation MyMutation($input:DeleteRecipeByRecipeIdInput!, $email:String!) {
  deleteRecipeByRecipeId(
    input: $input
  ) {
    query {
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
  }
}

`

