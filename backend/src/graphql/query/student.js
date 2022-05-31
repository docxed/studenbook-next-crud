import { schemaComposer } from "graphql-compose"
import { StudentModel, StudentTC } from "../../models/student"

export const students = StudentTC.getResolver("findMany")
export const student = StudentTC.getResolver("findById")
