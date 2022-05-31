import { UserTC } from "../../models/user"
import { StudentTC } from "../../models/student"

UserTC.addRelation("student", {
  resolver: StudentTC.getResolver("findMany"),
  projection: {
    _id: true,
  },
  prepareArgs: {
    filter: (user) => ({ createByUserId: user._id }),
  },
})
