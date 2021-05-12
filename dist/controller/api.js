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
const book_1 = __importDefault(require("../schema/book"));
function hello(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(400).send("Unable to save into Database");
        console.log("unable to send data");
    });
}
//To inser data in DB
function addBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = new book_1.default({
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                edition: req.body.edition,
            });
            const insertData = yield book.save();
            res.status(200).send(insertData);
        }
        catch (_a) {
            res.status(400).send("Error: please provide data!!");
        }
    });
}
//To get data from DB
function getBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let title = req.body.title;
        yield book_1.default.findOne({ title: title }, (err, book) => {
            if (book) {
                res.status(201).send(book);
            }
            else {
                res.status(400).send("No Book Found");
            }
        });
    });
}
//To get All Books
function getAllBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield book_1.default.find((err, book) => {
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
        let title = req.body.title;
        yield book_1.default.deleteOne({ title: title }, (result) => {
            if (!result) {
                res.status(404).send("Book Is Already Deleted");
            }
            else {
                res.status(201).send("Book Has Been Removed");
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
        yield book_1.default.findOne({ title: title }, (err, book) => {
            book.title = title;
            book.description = description;
            book.category = category;
            book.edition = edition;
            book.save((err, book) => {
                if (err)
                    res.status(400).send("Book is Not Updated");
                else
                    res.status(400).send(book);
            });
        });
    });
}
exports.default = {
    hello,
    addBook,
    getBook,
    removeBook,
    updateBook,
    getAllBook,
};
