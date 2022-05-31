import { schemaComposer } from "graphql-compose"
import { UserModel, UserTC } from "../../models/user"

export const users = UserTC.getResolver("findMany")
