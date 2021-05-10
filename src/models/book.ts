
import * as mongoose from 'mongoose';
// import * as bcrypt from 'bcrypt-nodejs';


const { Schema } = mongoose;

const BookSchema = new Schema(
    {
    title: {type: String, lowercase:true, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true, lowercase: false},
    edition : {type: Number, required: true}
});

BookSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

// UserSchema.pre('save', function(next) {
//     // do stuff
//     const user:any = this;
//     bcrypt.hash(user.password, null, null, function(err, hash) {   
//         if(err) return next(err);
//         user.password = hash;
//     })

//     next();
// });

export default mongoose.model (
    "Book",
    BookSchema
)
