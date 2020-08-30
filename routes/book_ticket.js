const route = require('express').Router()
const Registered_Users = require('../db').Registered_Users
const Show_Details = require('../db').Show_Details
const Tickets_Sold = require('../db').Tickets_Sold

// Booking Ticket ->
// Conditions Checked Before Booking A Ticket:
// 1. Check Whether The User Is Registered, If Yes Fetch His User-Id And Book Ticket
// And If Not, Send Error Message That User Is Not Registered.
// 2. Check Whether The Show Exists If Yes, Increase Count In 'Show_Details' Else Create A New
// Show With Count As 1. Also If Count == 20 Return Error Message That Show Is Already Full.
// If Everything Is Fine Add The Ticket To Booked Tickets With Date, Time, And User_Id. 
route.post('/', (req, res) => {
    const inpHour = req.body.time
    const currDate = new Date().getTime();
    const currHour = new Date().getHours();
    const inpDate = new Date(req.body.date).getTime();
    if(inpDate >= currDate) {
        if((inpHour >= currHour) && ((inpHour == 12) || (inpHour == 15) || (inpHour == 18) || (inpHour == 21))) {
            Registered_Users.findOne({
                where: {name: req.body.name, phone: req.body.phone}
            })
            .then((user) => {
                if(user !== null) {
                    Show_Details.findOrCreate({
                        where: {date: req.body.date, time: req.body.time},
                        defaults: {
                            ticket_count: 1
                        }
                    })
                    .then(([show, created]) => {
                        if(created === true) {
                            // First Ticket Booking For This Show, Can Book A Ticket.
                            Tickets_Sold.create({
                                date: req.body.date,
                                time: req.body.time,
                                user_id: user.user_id
                            })
                            .then((booking) => {
                                res.status(201).send(booking)
                            })
                            .catch((err) => {
                                res.status(501).send("Couldn't Book Tickets.")
                            })
                        }
                        else {
                            // This Show Already Exists, So
                            // First We Need To Check The Count Of Tickets, And 
                            // We Can Book A Ticket Only If Count < 20.
                            if(show.ticket_count < 20) {
                                // After Booking The Ticket Also Increase The Count In Show Details
                                Tickets_Sold.create({
                                    date: req.body.date,
                                    time: req.body.time,
                                    user_id: user.user_id
                                })
                                .then((booking) => {
                                    Show_Details.update({ ticket_count: (show.ticket_count + 1)}, {
                                        where: {
                                            date: req.body.date,
                                            time: req.body.time      
                                        }
                                    })
                                    res.status(201).send(booking)
                                })
                                .catch((err) => {
                                    res.status(501).send("Couldn't Book Tickets.")
                                })
        
                            } else {
                                res.status(202).send("Show Already Booked Up ! Choose Some Other Timing.")
                            }
                        }
                    })
                    .catch((err) => {
                        res.status(501).send({
                            error: "Couldn't Check For Show Details."
                        })
                    })
                }
                else res.status(401).send("Unregistered User. Please Register Yourself First.")
            })
            .catch((err) => {
                res.status(501).send({
                    error: "Couldn't Check For Registered Users."
                })
            })
        }
        else {
            res.status(501).send("Enter Valid Show Time & Try Again")
        }
    } else {
        res.status(501).send("Enter Valid Date & Time For The Show & Try Again")
    }
})

exports = module.exports = {
    route
}