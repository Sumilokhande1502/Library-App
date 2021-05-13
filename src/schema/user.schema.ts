import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: { type: String},
    name: { type: String },
    username: { type: String, required : true, unique: true, index: true },
    password: { type: String, required : true },
    email: { type: String, required : true, unique: true, index: true },
    role: {type: String}
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
User.createIndexes();

export default User;
