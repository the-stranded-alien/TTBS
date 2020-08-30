const route = require('express').Router()
const Tickets_Sold = require('../db').Tickets_Sold
const Registered_Users = require('../db').Registered_Users

// View User Information Based On Ticket_Id
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