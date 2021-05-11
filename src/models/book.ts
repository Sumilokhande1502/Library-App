import * as mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
    email: string;
    name : string;
    password : string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(adminPassword: string): Promise<boolean>;
}

const BookSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    category: { type: String },
    edition: { type: Number },
    name : { type: String },
    password : { type: String },
    email : { type: String },
  },
  { timestamps: true }
);

// BookSchema.method("toJSON", function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

BookSchema.pre("save", async function (next: mongoose.HookNextFunction){
    let user = this as UserDocument;

    //Only hash the psswrd if it has been modified 
    if(!user.isModified("password")) return next();

    //Random additional data
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hash = await bcrypt.hashSync(user.password, salt);

    //Replace password with hash
    user.password = hash;

    return next();
});

//Used for login
BookSchema.methods.comparePassword = async function(adminPassword : string) 
    { 
        const admin = this as UserDocument;

        return bcrypt.compare(adminPassword, admin.password).catch((err) => false);
    }



const Book = mongoose.model<UserDocument>("Book", BookSchema);

export default Book;
