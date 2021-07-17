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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const default_1 = __importDefault(require("./default/default"));
const router_1 = __importDefault(require("./routes/router"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = default_1.default.uri;
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('/public'));
app.use("/api", router_1.default);
//MongoDB connection
function mongoSetup() {
    // mongoose.Promise = global.Promise;
    mongoose_1.default.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
    const db = mongoose_1.default.connection;
    db.on('error', (err) => {
        console.log("Error while connecting DB", err);
    });
    db.once('open', () => {
        console.log("DB Connected!!!");
    });
}
app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/public/app/views/index.html');
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const PORT = process.env.PORT;
        const HOST = process.env.HOST;
        console.log(`Server is running at http://${HOST}:${PORT}`);
        app.listen(PORT);
        mongoSetup();
    });
}
bootstrap();
