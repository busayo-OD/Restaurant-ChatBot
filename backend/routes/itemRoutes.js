const express = require('express')
const itemController = require('../controller/itemController')
const itemRouter = new express.Router()


itemRouter.get('/', itemController.getItems);
itemRouter.get('/:id', itemController.getItemById);

module.exports = itemRouter;