const route = require('express').Router()
const Tickets_Sold = require('../db').Tickets_Sold

// Send Details Of All Booked Tickets (Only For Testing Purpose)
route.get('/', (req, res) => {
    Tickets_Sold.findAll()
        .then((tickets) => {
            res.status(200).send(tickets)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Couldn't Retrieve Booked Ticket Details"
            })
        })
})

exports = module.exports = {
    route
}

