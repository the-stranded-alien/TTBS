const express = require('express')
const server = express()

const bookTicketRoute = require('./routes/book_ticket')
const newUserRoute = require('./routes/new_user')

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.get('/', function(req, res, next){
    res.send("Theater Booking System API")
})

server.get('/greet/:name', function(req, res, next){
    let greeting = "Welcome, To The TTBS, " + req.params.name
    res.send(greeting)
})


// Routes
server.use('/new_user', newUserRoute)
server.use('/book_ticket', bookTicketRoute)

// Invalid API Request
server.use((req, res) => res.send("404 Invalid API Call"))

server.listen(1611, console.log("Server Started At : http://localhost:1611/"))