const express = require('express')
const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.get('/', function(req, res, next) { res.send("Theater Booking System API") })

// Routes
server.use('/new_user', require('./routes/new_user').route)
server.use('/book_ticket', require('./routes/book_ticket').route)
server.use('/update_ticket', require('./routes/update_ticket').route)
server.use('/delete_ticket', require('./routes/delete_ticket').route)
server.use('/view_user', require('./routes/view_user').route)
server.use('/view_tickets', require('./routes/view_tickets').route)
server.use('/all_shows', require('./routes/all_shows').route)

// Invalid API Request
server.use((req, res) => res.send("404 Invalid API Call"))

server.listen(1611, () => console.log("Server Started At : http://localhost:1611/"))