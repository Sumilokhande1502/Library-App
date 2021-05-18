import express from 'express';
import mongoose from 'mongoose';
import df from './default/default';
import route from './routes/router';

const PORT = process.env.PORT || 5000;

const host = df.host as string;
const uri = df.uri as string;


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


app.listen(5000, () => console.info(`Server is running at http://${host}:${PORT}`));