const express = require('express')
const orderController = require('../controller/orderController')
const orderRouter = new express.Router()


orderRouter.post('/', orderController.checkoutOrder)

module.exports = orderRouter;