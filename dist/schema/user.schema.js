"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    id: { type: String },
    name: { type: String },
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    role: { type: String }
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
User.createIndexes();
exports.default = User;
