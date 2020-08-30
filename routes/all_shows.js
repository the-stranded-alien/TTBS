const { Op } = require('sequelize')
const route = require('express').Router()
const Show_Details = require('../db').Show_Details

route.get('/', (req, res) => {
    Show_Details.findAll({ where: {ticket_count: {[Op.ne]: 0}} })
        .then((shows) => {
            res.status(200).send(shows)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Couldn't Retrieve Show Details"
            })
        })
})

exports = module.exports = {
    route
}