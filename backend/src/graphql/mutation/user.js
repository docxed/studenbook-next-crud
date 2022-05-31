import { schemaComposer } from "graphql-compose"
import { UserModel, UserTC } from "../../models/user"
import { generateUserToken } from "../../lib/generateUserToken"

export const signup = UserTC.schemaComposer.createResolver({
  name: "signup",
  kind: "mutation",
  type: UserTC,
  args: {
    email: "String!",
    fullname: "String!",
    password: "String!",
  },
  resolve: async ({ args, context }) => {
    const { email, fullname, password } = args
    const user = await UserModel.findOne({ email })
    if (user) {
      throw new Error("Email already exists")
    }
    const createNewUser = await UserModel.create({
      email,
      fullname,
      password,
    })
    return createNewUser
  },
})

const SignInPayloadOTC = schemaComposer.createObjectTC({
  name: "SignInPayload",
  fields: {
    _id: "MongoID",
    email: "String",
    fullname: "String",
    accessToken: "String",
  },
})
export const signin = UserTC.schemaComposer.createResolver({
  name: "signin",
  kind: "mutation",
  type: SignInPayloadOTC,
  args: {
    email: "String!",
    password: "String!",
  },
  resolve: async ({ args, context }) => {
    const { email, password } = args
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new Error("Email not found")
    }
    const validPassword = await user.verifyPassword(password)
    if (!validPassword) {
      throw new Error("Password is incorrect")
    }
    const token = generateUserToken(user)
    return {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      accessToken: token,
    }
  },
})
