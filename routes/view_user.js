const route = require('express').Router()
const Tickets_Sold = require('../db').Tickets_Sold
const Registered_Users = require('../db').Registered_Users

// Send Details Of All Booked Tickets (Only For Testing Purpose)
route.get('/', (req, res) => {
    Registered_Users.findAll()
        .then((users) => {
            res.status(200).send(users)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Couldn't Retrieve User Details"
            })
        })
})

route.post('/', (req, res) => {
    Tickets_Sold.findOne({ where: {ticket_id: req.body.ticket} })
    .then((ticket) => {
        Registered_Users.findOne({ where: {user_id: ticket.user_id}})
        .then((user) => {
            res.status(201).send(user)
        })
        .catch((err) => {
            res.status(401).send("Valid Ticket-Id But Can't Find User.")
        })
    })
    .catch((err) => {
        res.status(501).send("Invalid Ticket Id.")
    })
})

exports = module.exports = {
    route
}