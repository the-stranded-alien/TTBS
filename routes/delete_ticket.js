const route = require('express').Router()
const Show_Details = require('../db').Show_Details
const Tickets_Sold = require('../db').Tickets_Sold

// Delete A Ticket (Given It's Ticket_Id)
// If The Ticket_Id Exists Delete The Ticket 
// From The Ticket_Sold & Reduce The Count Of
// That Show's Ticket_Count in Show_Details.
route.delete('/', (req, res) => {
    Tickets_Sold.findOne({ where: {ticket_id: req.body.ticket} })
    .then((ticket) => {
        if(ticket === null){
            res.status(401).send("Invalid Ticket-Id")
        } else {
            // First Reduce The Count Of Tickets In Show Details
            Show_Details.decrement({ ticket_count: 1 }, {
                where: {
                    date: ticket.date,
                    time: ticket.time
                }
            })
            .then(() => {
                // After Decrementing The Count, Delete The Ticket
                Tickets_Sold.destroy({
                    where: {
                        ticket_id: req.body.ticket
                    }
                })
                .then(() => {
                    res.status(201).send("Ticket Deleted")
                })
                .catch((err) => {
                    res.status(501).send("Unable To Delete Ticket")
                })
            })
            .catch((err) => {
                res.status(501).send("Can't Decrement Count")
            })
        }
    })
    .catch((err) => {
        res.status(501).send("Can't Fetch Any Ticket Details")
    })
})

exports = module.exports = {
    route
}