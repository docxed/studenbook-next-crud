import { gql } from "@apollo/client"

export const STUDENT_MUTATION = gql`
  mutation ($record: CreateOneStudentInput!) {
    createStudent(record: $record) {
      recordId
    }
  }
`

export const UPDATE_STUDENT_MUTATION = gql`
  mutation ($id: MongoID!, $record: UpdateByIdStudentInput!) {
    updateStudent(_id: $id, record: $record) {
      recordId
    }
  }
`

export const DELETE_STUDENT_MUTATION = gql`
  mutation ($id: MongoID!) {
    deleteStudent(_id: $id) {
      recordId
    }
  }
`
