import { gql } from "@apollo/client"

export const USERS_QUERY = gql`
  query ($filter: FilterFindManyUserInput) {
    users(filter: $filter) {
      _id
      email
      fullname
    }
  }
`
