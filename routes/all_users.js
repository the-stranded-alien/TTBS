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

exports = module.exports = {
    route
}