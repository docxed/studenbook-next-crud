import { composeWithMongoose } from "graphql-compose-mongoose"
import { model, Schema } from "mongoose"

const StudentSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    address: {
      type: String,
      required: true,
    },
    createByUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const StudentModel = model("Student", StudentSchema)
export const StudentTC = composeWithMongoose(StudentModel)
