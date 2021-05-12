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
const config_1 = __importDefault(require("config"));
const user_1 = __importDefault(require("../schema/user"));
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var hashedPassword = bcrypt_1.default.hashSync(req.body.password, 8);
        const user = new user_1.default({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        try {
            var token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.get("privateKey"), {
                expiresIn: "24h", // expires in 24 hours
            });
            const userData = yield user.save();
            res.status(200).send({ auth: true, token: token });
        }
        catch (err) {
            res.status(500).send("There was a problem registering the user.");
        }
    });
}
function getUserId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).send(decoded);
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        user_1.default.findOne({ email: req.body.email }, function (err, user) {
            if (err)
                return res.status(500).send("Error on the server.");
            if (!user)
                return res.status(404).send("No user found.");
            var passwordIsValid = bcrypt_1.default.compareSync(req.body.password, user.password);
            if (!passwordIsValid)
                return res.status(401).send({ auth: false, token: null });
            var token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.get("privateKey"), {
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
    getUserId,
    login,
    logout
};
