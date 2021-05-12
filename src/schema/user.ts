import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String },
    password: { type: String },
    email: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
