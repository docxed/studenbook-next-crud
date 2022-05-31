import { StudentTC } from "../../models/student"
import { UserTC } from "../../models/user"

StudentTC.addRelation("user", {
  resolver: UserTC.getResolver("findById"),
  projection: {
    createByUserId: true,
  },
  prepareArgs: {
    _id: (student) => student.createByUserId,
  },
})
