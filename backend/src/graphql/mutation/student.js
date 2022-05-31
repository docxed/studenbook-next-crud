import { schemaComposer } from "graphql-compose"
import { StudentModel, StudentTC } from "../../models/student"

export const createStudent = StudentTC.getResolver("createOne")
export const updateStudent = StudentTC.getResolver("updateById")
export const deleteStudent = StudentTC.getResolver("removeById")
