const express = require('express')
const {PORT, mongoUri} = require('./config')
//const mongoUri = require('./config')
const mongoose = require('mongoose')
const Book = require('./models/book')
const bookRouter = require('./routes/book')
const cors = require('cors')
const helmet = require('helmet')



const app = express();
app.enable('trust proxy')
//cors Allows all origin with default of cors(*)

// app.options('*', cors())

// app.use(helmet())

//add middleware to parse json resonse
app.use(express.json())

//routes
app.use('/books', bookRouter)
app.use('/books/:id', bookRouter)

app.use(cors())

//Allows custom origins
// app.use(cors({
//     //only req with this origin will access the server
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type,Authorization']
// }))


app.get('/', (req, res)=>{
    res.status(200).send("Welcome to the home page")
    
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
    
  


