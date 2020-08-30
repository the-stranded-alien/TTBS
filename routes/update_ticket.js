const route = require('express').Router()
const Show_Details = require('../db').Show_Details
const Tickets_Sold = require('../db').Tickets_Sold

// Update A Ticket (Given - Ticket_Id, New_ShowTime & New_Date)
// If ticket_id Exists Check If The Time & Date are Valid &
// Tickets For That Show Are Available. If So, Update The Time & Date In
// Ticket_Sold & Also Adjust The Ticket Count Accordingly In Show_Details 
route.post('/', (req, res) => {
    const inpHour = req.body.ntime
    const currDate = new Date().getTime();
    const currHour = new Date().getHours();
    const inpDate = new Date(req.body.ndate).getTime();
    if(inpDate >= currDate) {
        if((inpHour >= currHour) && ((inpHour == 12) || (inpHour == 15) || (inpHour == 18) || (inpHour == 21))) {
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
        }
        else {
            res.status(501).send("Enter Valid Show Time For The Show You Want To Update To")
        }
    }
    else {
        res.status(501).send("Enter Valid Date & Time For The Show You Want To Update To")
    }    
})

exports = module.exports = {
    route
}