import { gql } from "@apollo/client";

export const SIGN_IN = gql`
mutation MyMutation($input: LoginInput!) {
  login(input: $input) {
    loginRespon {
      jwtToken
      userDetails
    }
  }
}
`;


export const REGISTER = gql`
mutation MyMutation($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      createdAt
      email
      isAdmin
      reviews
      shared
      updatedAt
      userId
      userName
    }
  }
}
`;