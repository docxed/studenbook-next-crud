import { gql } from "@apollo/client"

export const SIGNUP_MUTATION = gql`
  mutation ($email: String!, $fullname: String!, $password: String!) {
    signup(email: $email, fullname: $fullname, password: $password) {
      _id
    }
  }
`

export const SIGNIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      _id
      email
      fullname
      accessToken
    }
  }
`
