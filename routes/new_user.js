const Registered_Users = require('../db').Registered_Users
const route = require('express').Router()

// Adding A New User To Our Database, Only If It Doesn't Exists Already.
route.post('/', (req, res) => {
    Registered_Users.findOrCreate({
        where: {name: req.body.name, phone: req.body.phone}
    })
    .then(([user, created]) => {
        if(created === true){
            res.status(201).send(user)
        }
        else {
            res.status(401).send("User Already Exists")
        }
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