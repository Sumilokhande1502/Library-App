"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const BookSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    category: { type: String },
    edition: { type: Number },
    name: { type: String },
    password: { type: String },
    email: { type: String },
}, { timestamps: true });
// BookSchema.method("toJSON", function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });
BookSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        //Only hash the psswrd if it has been modified
        if (!user.isModified("password"))
            return next();
        //Random additional data
        const saltRounds = 10;
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const hash = yield bcrypt_1.default.hashSync(user.password, salt);
        //Replace password with hash
        user.password = hash;
        return next();
    });
});
//Used for login
BookSchema.methods.comparePassword = function (adminPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = this;
        return bcrypt_1.default.compare(adminPassword, admin.password).catch((err) => false);
    });
};
const Book = mongoose.model("Book", BookSchema);
exports.default = Book;
