<<<<<<< HEAD
import mongoose from "mongoose";

// const AutoIncrement = require('mongoose-sequence')(mongoose);

=======
import * as mongoose from "mongoose";
//import * as Inc from "mongoose-sequence";
//const AutoIncrement = Inc(mongoose)
//const AutoIncrement = require('mongoose-sequence')(mongoose)
>>>>>>> 3740197318132bb2628ef9ef3e51e355d59633e2

const BookSchema = new mongoose.Schema(
  {
    id: {type:Number,unique:true,index:true,require,default:0},
    title: { type: String },
    description: { type: String },
    category: { type: String },
<<<<<<< HEAD
    edition: { type: Number},
  },
  { timestamps: true} )

// BookSchema.plugin(AutoIncrement, { inc_field: "bookId" });

const Book = mongoose.model("Book", BookSchema);

Book.createIndexes();

=======
    edition: { type: Number },
  
  },
 {timestamps:true}
  
  );

//BookSchema.plugin(AutoIncrement,{inc_fiels:'_id'});
//BookSchema.index({ _id: 1, seq: 1 }, { unique: true });
  
const Book = mongoose.model("Book", BookSchema);
Book.createIndexes();
>>>>>>> 3740197318132bb2628ef9ef3e51e355d59633e2
export default Book;
