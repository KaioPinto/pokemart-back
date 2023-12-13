const express = require('express')
const itenRouter = express.Router()
const itenController = require("../controllers/itenController");

itenRouter.route('/iten/create').post((req, res, next) => {
    itenController.createIten(req, res, next)
})

itenRouter.route('/iten').get((req, res, next) => {
    itenController.findAll(req, res, next)

})
itenRouter.route('/iten/:id').delete((req, res, next) => {
    itenController.deleteIten(req, res, next)

})

itenRouter.route('/itenByName').get((req, res, next) => {
    itenController.findByName(req, res, next)
})

itenRouter.route('/itenByType').get((req, res, next) => {
    itenController.findByType(req, res, next)
})

module.exports = itenRouter