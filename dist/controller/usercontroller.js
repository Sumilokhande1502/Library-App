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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const default_1 = __importDefault(require("../default/default"));
const user_schema_1 = __importDefault(require("../schema/user.schema"));
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        const password = req.body.password;
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) === false ||
            password.length <= 6)
            return res.send("Enter valid email and password");
        const hashedPassword = bcrypt_1.default.hashSync(password, 8);
        const user = new user_schema_1.default({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
        });
        try {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, default_1.default.privateKey, {
                expiresIn: "24h", // expires in 24 hours
            });
            const userData = yield user.save();
            console.info(userData);
            res.status(200).send({ auth: true, token: token });
        }
        catch (err) {
            res.status(500).send("User already exist.");
        }
    });
}
function verifyUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        user_schema_1.default.findById(req.body.userId, function (err, user) {
            if (err)
                return res.status(500).send("There was a problem finding the user.");
            if (!user)
                return res.status(404).send("No user found.");
            res.status(200).send(user);
        });
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        user_schema_1.default.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }, function (err, user) {
            if (err)
                return res.status(500).send("Error on the server.");
            if (!user)
                return res.status(404).send("No user found.");
            var passwordIsValid = bcrypt_1.default.compareSync(req.body.password, user.password);
            if (!passwordIsValid)
                return res.status(401).send({ auth: false, token: null });
            var token = jsonwebtoken_1.default.sign({ id: user._id }, default_1.default.privateKey, {
                expiresIn: "24h", // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).send({ auth: false, token: null });
    });
}
exports.default = {
    register,
    verifyUser,
    login,
    logout,
};
