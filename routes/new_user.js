// const express = require('express')
// const Router = express.Router
// const route = Router()
const route = require('express').Router()

let users = [
    {name: "Sahil", contact: "7249999056"},
    {name: "Sahil1", contact: "72499990561"},
    {name: "Sahil2", contact: "72499990562"},
    {name: "Sahil3", contact: "72499990563"}
]

route.get('/', (req, res) => res.send(users))
// route.get('/:id', (req, res) => res.send(users[req.params.id]))
route.get('/add', (req, res) => {
    users.push({
        name: req.query.name,
        contact: req.query.contact
    })
    res.send(users)
})

module.exports = route