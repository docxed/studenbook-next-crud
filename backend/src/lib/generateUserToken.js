import jsonwebtoken from "jsonwebtoken"

export const generateUserToken = (user) =>
  jsonwebtoken.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "7d",
    }
  )
