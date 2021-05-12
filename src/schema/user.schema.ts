import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: { type: String},
    name: { type: String },
    username: { type: String, required : true, unique: true },
    password: { type: String, required : true },
    email: { type: String, required : true, unique: true },
    role: {type: String},
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
