import express from "express";
import mongoose from "mongoose";
import df from "./default/default";
import route from "./routes/router";
const uri = df.uri as string;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);

//MongoDB connection
function mongoSetup() {
    // mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost:27017/database", { useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify:false  ,useCreateIndex: true});
    const db = mongoose.connection
    db.on('error', (err) => {
        console.log("Error while connecting DB", err);
    })
    db.once('open', () => {
        console.log("DB Connected!!!");
    })
}


  
  const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  console.log(`Server is running at ${PORT}`);
  await app.listen(PORT);
}

// bootstrap();


app.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`)

    mongoSetup();
})
