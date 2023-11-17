import express  from "express";
import mongoose from "mongoose";
import {PORT,  mongoDbUrl} from "./config.js";
import  {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express()

app.use(
    cors(
        {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }
    ));
app.use(express.json())

app.get('/', (req, res) => {
    return res.status(234).send("XXX")
})

app.use("/books", booksRoute)

mongoose.connect(mongoDbUrl)
.then(() => { 
    app.listen(PORT, () => {
        console.log(`Server running on: http://localhost:${PORT}`)
    
    });
    console.log("Connected to MongoDB")
})
.catch(()=> {
    console.log("Error connecting to MongoDB")

})