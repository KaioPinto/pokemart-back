const express = require('express')
const userRouter = express.Router()
const userController = require("../controllers/userController");
const user = require('../models/user');

userRouter.route('/user/adicionar').post((req, res, next) => {
    userController.addIten(req, res, next)
})
userRouter.route('/user/create').post((req, res, next) => {
    userController.createUser(req, res, next)
})

userRouter.route('/user/Addfavorites').post((req, res, next) => {
    userController.addFavorites(req, res, next)
})
userRouter.route('/user/removeProduct').delete((req, res, next) => {
    userController.removeProduct(req, res, next)
})
userRouter.route('/user/historic').get((req, res, next) => {
    userController.getHistoric(req, res, next)
})
userRouter.route('/user/login').post((req, res, next) => {
    userController.loginUser(req, res, next)

})
userRouter.route('/user/userById').get((req, res, next) => {
    userController.findById(req, res, next)

})

userRouter.route('/user/removeFavorites').delete((req, res, next) => {
    userController.removeFavorites(req, res, next)
})



userRouter.route('/user/favorites').get((req, res, next) => {
    userController.getFavorites(req, res, next)
})
userRouter.route('/user/send').post((req, res, next) => {
    userController.sendPicture(req, res, next)
})
userRouter.route('/user/getImage').get((req, res, next) => {
    userController.getPicture(req, res, next)
})
userRouter.route('/user/cart').get((req, res, next) => {
    userController.findCartController(req, res, next)
})

userRouter.route('/user/buy').get((req, res, next) => {
    userController.productBuy(req, res, next)
})
userRouter.route('/user/:id').delete((req, res, next) => {
    userController.deleteUser(req, res, next)

})






module.exports = userRouter