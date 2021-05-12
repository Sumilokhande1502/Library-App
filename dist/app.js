"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./routes/router"));
const port = config_1.default.get("port");
const host = config_1.default.get("host");
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", router_1.default);
//MongoDB connection
mongoose_1.default.connect('mongodb://localhost:27017/database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Connected to Database');
})
    .catch(() => {
    console.log('Error');
});
app.listen(5000, () => console.log(`Server is running at http://${host}:${port}`));
