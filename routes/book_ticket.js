const route = require('express').Router()

let booked_tickets = [
    {name: "Sahil", contact: "7249999056", time: "03:00"},
    {name: "Sahil1", contact: "72499990561", time: "06:00"},
    {name: "Sahil2", contact: "72499990562", time: "06:00"},
    {name: "Sahil3", contact: "72499990563", time: "09:00"}
]

route.get('/', (req, res) => res.send(booked_tickets))
route.post('/', (req, res) => {
    booked_tickets.push({
        name: req.body.name,
        contact: req.body.contact,
        time: req.body.time
    })
    res.send(booked_tickets)
})
route.get('/:id', (req, res) => res.send(booked_tickets[req.params.id]))
module.exports = route