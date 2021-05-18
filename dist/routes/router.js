"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookcontroller_1 = __importDefault(require("../controller/bookcontroller"));
const usercontroller_1 = __importDefault(require("../controller/usercontroller"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
let router = express_1.default.Router();
//Library controller routes for books
router.post('/addBook', bookcontroller_1.default.addBook);
router.get('/getBook', bookcontroller_1.default.getBook);
router.delete('/removeBook', bookcontroller_1.default.removeBook);
router.put('/updateBook', bookcontroller_1.default.updateBook);
router.get('/getAllBooks', bookcontroller_1.default.getAllBooks);
//User controller routes with jwt tokens
router.post('/register', usercontroller_1.default.register);
router.get('/user', verifyToken_1.default, usercontroller_1.default.verifyUser);
router.post('/login', usercontroller_1.default.login);
router.get('/logout', usercontroller_1.default.logout);
exports.default = router;
