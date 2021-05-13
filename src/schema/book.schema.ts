import mongoose from "mongoose";

// const AutoIncrement = require('mongoose-sequence')(mongoose);


const BookSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    category: { type: String },
    edition: { type: Number },
  },
  { timestamps: true} )

// BookSchema.plugin(AutoIncrement, { inc_field: "bookId" });

const Book = mongoose.model("Book", BookSchema);

export default Book;
