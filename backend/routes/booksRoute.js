import express from "express"
const router  = express.Router()
import {Book} from "../models/bookModel.js"
// route for saving a new item in data base

router.post("/", async (req, res)=> {
    try{
        if (!req.body.title ||!req.body.author || !req.body.publisherYear ) {
            return res.status(400).send({message: "Send all required fields"})
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publisherYear: req.body.publisherYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)
    } catch(error){
        return res.status(500).send({message: error.message})}
})
// route to get all books from database

router.get("/", async (req, res)=> {
    try{
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    }catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})
 //route to get a single book from database
router.get("/:id", async (req, res)=> {
    try{
        const {id} = req.params
        const book = await Book.findById(id)
        return res.status(200).json(book)
    }catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})
// update a book
router.put("/:id",async (req, res)=> {
    try {
        if (!req.body.title) { 
            return res.status(400).send({message: "Missing title" })
        } else if (!req.body.author) {
            return res.status(400).send({message: "Missing author" })
        } else if (!req.body.publisherYear) {
            return res.status(400).send({message: "Missing publisherYear" })
        }

        const {id} = req.params;  
        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).send({message: "Book not found"})
        }

        return res.status(200).send({message: "Book updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    
    }
} )
//  delete a book 
router.delete("/:id",async (req, res)=> {
    try {
      
        const {id} = req.params;  
        const result = await Book.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).send({message: "Book not found"})
        }

        return res.status(200).send({message: "Book deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    
    }
} )

export default router;