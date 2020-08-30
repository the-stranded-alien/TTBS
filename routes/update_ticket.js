const route = require('express').Router()
const Show_Details = require('../db').Show_Details
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

route.post('/', (req, res) => {
    Tickets_Sold.findOne({
        where: {ticket_id: req.body.ticket}
    })
    .then((ticket) => {
        if(ticket === null) {
            res.status(401).send("Invalid Ticket-Id.")
        } else {
            // 1. If Ticket For That Show Is Available,
            // Update Ticket Time And Date And Change Counts.
            Show_Details.findOrCreate({
                where: {date: req.body.ndate, time: req.body.ntime},
                defaults: {
                    ticket_count: 1
                }
            })
            .then(([show, created]) => {
                if(created === false) {
                    // Show For This Time And Date Was Already Present
                    if(show.ticket_count < 20) {
                        // Can Update Time Only If Ticket Is Available, Ticket Is Available
                        Tickets_Sold.update({ date: req.body.ndate, time: req.body.ntime }, { 
                            where : { ticket_id: req.body.ticket }
                        })
                        .then(() => {
                            // Time Updated Now Alter The Counts In Show Details
                            Show_Details.increment({ ticket_count: 1 }, {
                                where: {
                                    date: req.body.ndate,
                                    time: req.body.ntime
                                }
                            })
                            .then(() => {
                                Show_Details.decrement({ ticket_count: 1 }, {
                                    where: {
                                        date: ticket.date,
                                        time: ticket.time
                                    }
                                })
                                .then(() => {
                                    res.status(201).send("Ticket Updated")
                                })
                                .catch((err) => {
                                    res.status(501).send("Can't Decrement Count")
                                })
                            })
                            .catch((err) => {
                                res.status(501).send("Can't Increment Count")
                            })
                        })
                        .catch((err) => {
                            res.status(501).send("Updating Failed")
                        })
                    } else {
                        // Show Timing Can't Be Updated
                        res.status(202).send("Show You Want To Update To Is Already Booked Up !")
                    }
                } else {
                    // Time Can Be Updated, Infact, It's The First Ticket For This Show
                    Tickets_Sold.update({ 
                        date: req.body.ndate,
                        time: req.body.ntime 
                    }, { 
                        where : { ticket_id: req.body.ticket }
                    })
                    .then(() => {
                        // Time Updated Now Alter The Counts In Show Details
                        Show_Details.decrement({ ticket_count: 1 }, {
                            where: {
                                date: ticket.date,
                                time: ticket.time
                            }
                        })
                        .then(() => {
                            res.status(201).send("Ticket Updated")
                        })
                        .catch((err) => {
                            res.status(501).send("Can't Decrement Count")
                        })
                    })
                    .catch((err) => {
                        res.status(501).send("Updating Failed")
                    })
                }
            })
            .catch((err) => {
                res.status(501).send("Can't Fetch Show Details")
            })
        }
    })
    .catch((err) => {
        res.status(501).send("Can't Fetch Tickets Information")
    })
})

exports = module.exports = {
    route
}