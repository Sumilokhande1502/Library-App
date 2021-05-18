import express from 'express';
import mongoose from 'mongoose';
import df from './default/default';
import route from './routes/router';
import * as dotenv from 'dotenv';

const PORT = 5000 || process.env.PORT;
const uri = df.uri as string;

dotenv.config();// access config var
 console.log("process.env.PORT",process.env.PORT);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/api", route);

//MongoDB connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false })
.then(() => {
    console.info('Connected to Database');
})
.catch(() => {
    console.info('Error');
})


app.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`)
})