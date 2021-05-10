import express from 'express';
import mongoose from 'mongoose';
import route from './routes/router';


const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('/public'));
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
    res.sendFile(__dirname + '/public/app/views/index.html');
});




app.listen(5000, () => console.log("Server is running!!!"));