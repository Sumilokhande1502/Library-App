"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_schema_1 = __importDefault(require("../schema/book.schema"));
//To insert book in DB
function addBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newBook = new book_schema_1.default({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            edition: req.body.edition,
        });
        yield book_schema_1.default.findOne({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            edition: req.body.edition,
        }, (err, Book) => __awaiter(this, void 0, void 0, function* () {
            if (Book) {
                res.status(400).send({ err: "Book already exist", Book_Info: Book });
            }
            else {
                const bookinfo = yield newBook.save();
                console.info(bookinfo);
                res.status(200).send({ Log: 'Book successfully added', bookinfo });
            }
        }));
    });
}
//To get book from DB
function getBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let title = req.body.title;
        yield book_schema_1.default.findOne({ title: title }, (err, book) => {
            if (book) {
                res.status(201).send({ Log: 'Book Found', Book_Info: book });
            }
            else {
                res.status(400).send("No Book Found");
            }
        });
    });
}
//To get All Books
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield book_schema_1.default.find((err, book) => {
            if (book) {
                res.status(201).send(book);
            }
            else {
                res.status(400).send("No Book Found");
            }
        });
    });
}
// To delete the book
function removeBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body.id);
        yield book_schema_1.default.deleteOne({ _id: req.body._id }, () => {
            if (true) {
                res.status(200).send("Book Has Been Removed");
            }
            else {
                res.status(201).send("No Book Available With This ID");
            }
        });
    });
}
//To update the book
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let title = req.body.title;
        let description = req.body.description;
        let category = req.body.category;
        let edition = req.body.edition;
        yield book_schema_1.default.findOne({ _id: req.body._id }, (err, book) => {
            book.title = title;
            book.description = description;
            book.category = category;
            book.edition = edition;
            book.save((err, book) => {
                if (err)
                    res.status(400).send("Book is Not Updated");
                else
                    res.status(200).send({ Log: 'Book updated successfully', Book_Info: book });
            });
        });
    });
}
exports.default = {
    addBook,
    getBook,
    removeBook,
    updateBook,
    getAllBooks,
};
