const express = require("express")
const router = express.Router()

const CourierRouter = require('./courier')
const LocalRouter = require('./local')
const ShippingRouter = require('./shipping')
const UserRouter = require('./user')


router.use("/Courier", CourierRouter)
router.use("/Local", LocalRouter)
router.use("/Shipping", ShippingRouter)
router.use("/User", UserRouter)


