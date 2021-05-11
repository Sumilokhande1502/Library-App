import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import route from './routes/router';

const port = config.get("port") as number;
const host = config.get("host") as string;



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/api", route);



//MongoDB connection
mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to Database');
})
.catch(() => {
    console.log('Error');
})


app.get('*', function(req, res){
    res.send('Welcom to the Server');
});




app.listen(5000, () => console.log(`Server is running at http://${host}:${port}`));