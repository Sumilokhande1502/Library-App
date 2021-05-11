"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("../controller/api"));
let router = express_1.default.Router();
router.post('/addBook', api_1.default.addBook);
router.get('/getBook', api_1.default.getBook);
router.delete('/removeBook', api_1.default.removeBook);
router.put('/updateBook', api_1.default.updateBook);
router.get('/getAllBook', api_1.default.getAllBook);
exports.default = router;
