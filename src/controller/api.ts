import { Express, Request, Response, NextFunction } from "express";
import Book from "../schema/book";

async function hello(req: Request, res: Response, next: NextFunction) {
  res.status(400).send("Unable to save into Database");
  console.log("unable to send data");
}

//To inser data in DB
async function addBook(req: Request, res: Response) {
  try {
    const book = new Book({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      edition: req.body.edition,
    });
    const insertData = await book.save();
    res.status(200).send(insertData);
  } catch {
    res.status(400).send("Error: please provide data!!");
  }
}

//To get data from DB
async function getBook(req: Request, res: Response) {
  let title = req.body.title;
  await Book.findOne({ title: title }, (err: any, book: any) => {
    if (book) {
      res.status(201).send(book);
    } else {
      res.status(400).send("No Book Found");
    }
  });
}

//To get All Books
async function getAllBook(req: Request, res: Response) {
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
  let title = req.body.title;
  await Book.deleteOne({ title: title }, (result: any) => {
    if (!result) {
      res.status(404).send("Book Is Already Deleted");
    } else {
      res.status(201).send("Book Has Been Removed");
    }
  });
}
//To update the book
async function updateBook(req: Request, res: Response) {
  let title = req.body.title;
  let description = req.body.description;
  let category = req.body.category;
  let edition = req.body.edition;

  await Book.findOne({ title: title }, (err: any, book: any) => {
    book.title = title;
    book.description = description;
    book.category = category;
    book.edition = edition;

    book.save((err: any, book: any) => {
      if (err) res.status(400).send("Book is Not Updated");
      else res.status(400).send(book);
    });
  });
}

export default {
  hello,
  addBook,
  getBook,
  removeBook,
  updateBook,
  getAllBook,
};
