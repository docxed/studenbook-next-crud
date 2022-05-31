import { gql } from "@apollo/client"

export const STUDENTS_QUERY = gql`
  query ($filter: FilterFindManyStudentInput) {
    students(filter: $filter) {
      _id
      firstname
      lastname
      studentId
      address
      createByUserId
      user {
        _id
        email
      }
    }
  }
`

export const STUDENT_QUERY = gql`
  query ($id: MongoID!) {
    student(_id: $id) {
      _id
      firstname
      lastname
      studentId
      address
      createByUserId
      user {
        _id
        email
      }
    }
  }
`
