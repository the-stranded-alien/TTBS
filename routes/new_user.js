const Registered_Users = require('../db').Registered_Users
const route = require('express').Router()

// Send Details Of All Registered User (Only For Testing Purpose)
route.get('/', (req, res) => {
    Registered_Users.findAll()
        .then((users) => {
            res.status(200).send(users)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Couldn't Retrieve Users."
            })
        })
})

// Adding A New User To Our Database, Only If It Doesn't Exists Already.
route.post('/', (req, res) => {
    Registered_Users.findOrCreate({
        where: {name: req.body.name, phone: req.body.phone}
    })
    .then((user) => {
        res.status(201).send(user)
    })
    .catch((err) => {
        res.status(501).send({
            error: "Couldn't Add A New User"
        })
    })
})

exports = module.exports = {
    route
}