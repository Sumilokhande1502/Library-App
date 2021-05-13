import * as mongoose from "mongoose";
//import * as Inc from "mongoose-sequence";
//const AutoIncrement = Inc(mongoose)
//const AutoIncrement = require('mongoose-sequence')(mongoose)

const BookSchema = new mongoose.Schema(
  {
    id: {type:Number,unique:true,index:true,require,default:0},
    title: { type: String },
    description: { type: String },
    category: { type: String },
    edition: { type: Number },
  
  },
 {timestamps:true}
  
  );

//BookSchema.plugin(AutoIncrement,{inc_fiels:'_id'});
//BookSchema.index({ _id: 1, seq: 1 }, { unique: true });
  
const Book = mongoose.model("Book", BookSchema);
Book.createIndexes();
export default Book;
