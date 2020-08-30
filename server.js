const express = require('express')
const server = express()
const schedule = require('node-schedule')

const Show_Details = require('./db').Show_Details
const Tickets_Sold = require('./db').Tickets_Sold

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

// Auto-Delete Old Tickets (8 Hours Old)
schedule.scheduleJob('0 0 * * * *', () => {
    var hr = new Date;
    var hour = hr.getHours();

    var today = new Date().toJSON().slice(0, 10)
    var prevDate = new Date(today)
    prevDate.setDate(prevDate.getDate() - 1)
    prevDate = prevDate.toJSON().slice(0, 10)

    if(hour == 20) { // For 12:00 Show
        // Delete Shows Where Time == 12 On Same Date
        Tickets_Sold.destroy({ where: { date: today, time: 12 } })
        Show_Details.destroy({ where: { date: today, time: 12 } })
    } else if (hour == 23) { // For 15:00 Show
        // Delete Shows Where Time == 15 On Same Date
        Tickets_Sold.destroy({ where: { date: today, time: 15 } })
        Show_Details.destroy({ where: { date: today, time: 15 } })
    } else if (hour == 2) { // For 18:00 Show
        // Delete Shows Where Time == 18 On Previous Date
        Tickets_Sold.destroy({ where: { date: prevDate, time: 18 } })
        Show_Details.destroy({ where: { date: prevDate, time: 18 } })
    } else if (hour == 5) { // For 21:00 Show
        // Delete Shows Where Time == 21 On Previous Date
        Tickets_Sold.destroy({ where: { date: prevDate, time: 21 } })
        Show_Details.destroy({ where: { date: prevDate, time: 21 } })
    } 
})

// Invalid API Request
server.use((req, res) => res.send("404 Invalid API Call"))

server.listen(1611, () => console.log("Server Started At : http://localhost:1611/"))