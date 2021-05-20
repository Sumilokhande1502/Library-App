import { Express, Request, Response, NextFunction } from "express";
import Book from "../schema/book.schema";


//To insert book in DB
async function addBook(req: Request, res: Response) {
  const newBook = new Book({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    edition: req.body.edition,
  });
  await Book.findOne(
    {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      edition: req.body.edition,
    },
    async (err:any, Book:any) => {
      if (Book){
        res.status(400).send({err: "Book already exist", Book_Info: Book});
      } else{
        const bookinfo = await newBook.save();
        console.info(bookinfo);
        res.status(200).send({Log: 'Book successfully added', bookinfo});
      }

    }
    );


}

//To get book from DB
async function getBook(req: Request, res: Response) {
  let title = req.body.title;
  await Book.findOne({ title: title }, (err: any, book: any) => {
    if (book) {
      res.status(201).send({Log: 'Book Found',Book_Info: book});
    } else {
      res.status(400).send("No Book Found");
    }
  });
}

//To get All Books
async function getAllBooks(req: Request, res: Response) {
  await Book.find((err: any, book: any) => {
    if (book) {
      res.status(201).send(book);
    } else {
      res.status(400).send("No Book Found");
    }
  });
}

// To delete the book
async function removeBook(req: Request, res: Response) {
  console.log(req.body.id);
 
  await Book.findOne({_id:req.body._id}, (err: any, book: any) =>{
    if(book){
      book.delete();

      res.status(400).send('Deleted successfully');
    }
    else{
      res.status(201).send('Book not found');
    }
  })
}

//To update the book
async function updateBook(req: Request, res: Response) {
  let title = req.body.title;
  let description = req.body.description;
  let category = req.body.category;
  let edition = req.body.edition;

  await Book.findOne({_id:req.body._id}, (err: any, book: any) => {
    book.title = title;
    book.description = description;
    book.category = category;
    book.edition = edition;

    book.save((err: any, book: any) => {
      if (err) res.status(400).send("Book is Not Updated");
      else res.status(200).send({Log: 'Book updated successfully', Book_Info: book});
    });
  });
}

export default {
  addBook,
  getBook,
  removeBook,
  updateBook,
  getAllBooks,
};

