const express = require('express')
const {PORT, mongoUri} = require('./config')
//const mongoUri = require('./config')
const mongoose = require('mongoose')
const Book = require('./models/book')


const app = express();

//add middleware to parse json resonse
app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).send("Welcome to the home page")
    
})
app.post('/books', async (req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            res.status(400).send("Enter the details required")
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        
        const book = await Book.create(newBook)
        //console.log(book)
        res.status(201).json({book})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//Route to get all the books
app.get('/books', async (req, res)=>{
    try {
        const books = await Book.find({}) 
        res.status(200).json({
            count: books.length,
            data:books})
    } catch (error) {
        console.log(error.message)
        res.status(404).send("Resource not found")
    }
})

//Route to get a single book
app.get('/books/:id', async (req, res)=>{
    try {
        if(!req.params){
            res.status(400).json({msg:'Bad request error'})
        }
        //destructure the id from the req
        const {id} = req.params
        const book = await Book.findById({_id:id})
        res.status(200).json({data:book})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})
// console.log(mongoUri)
// console.log(PORT)

        mongoose.connect(mongoUri)
        .then(()=>{
            console.log('The db connection was successful')
            app.listen(PORT, ()=>{
                console.log(`Server is listening on port ${PORT}`)
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    
  


