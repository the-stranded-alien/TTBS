const route = require('express').Router()
const Tickets_Sold = require('../db').Tickets_Sold

// View Tickets For A Given Date & Show Time
route.post('/', (req, res) => {
    Tickets_Sold.findAll({
        where: {date: req.body.date, time: req.body.time}
    })
    .then((tickets) => {
        if(tickets.length == 0) {
            res.status(401).send("No Tickets Issued For This Time & Date")
        } else {
            res.status(201).send(tickets)
        }
    })
    .catch((err) => {
        res.status(501).send("Can't Fetch Tickets Information")
    })
})

exports = module.exports = {
    route
}