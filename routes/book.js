const Book = require('../models/book')
const express = require('express')
const router = express.Router()

router.post('/', async (req,res)=>{
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
router.get('/', async (req, res)=>{
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
router.get('/:id', async (req, res)=>{
    try {
        if(!req.params){
            res.status(400).json({msg:'Bad request error'})
        }
        //destructure the id from the req
        const {id} = req.params
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

//Route to delete a book
router.delete('/:id', async(req, res)=>{
    try {
        const {id} = req.params
    if(!id){
        res.status(404).send('Invalid request')
    }
    const book =await Book.findByIdAndDelete(id)
    if(!book){
        res.status(404).send('Book not found')
    }
    res.status(200).json({msg:'Book has been deleted successfully'})
    } catch (error) {
        res.status(500).json({msg:error.message})
        console.log(error.message)
    }
})

//Route to update a book
router.put('/:id', async (req, res)=>{
    try {
        const {id} = req.params
    //const {update }= req.body
    if(!id){
        res.status(400).send({msg:'Invalid request'})
    }
    if(!req.body.title || !req.body.author || !req.body.publishYear){
        res.status(400).send({msg:'Please enter the require details'})
    }
    const book =await Book.findByIdAndUpdate(id, req.body)
    if(!book){
        res.status(404).send({msg:'Book not found'})
    }
    res.status(201).json({
        msg:'Book updated succesfully',
        book:book
    },
    )
    } catch (error) {
        res.status(500).send(error.message)
    }
    })

    module.exports = router
    