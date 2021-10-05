const router = require('express').Router()
const userMessengerRoute = require('./userMessenger.routes')
const useCourierRoute = require("./userCourier.routes")


router.use("/messenger", userMessengerRoute)
router.use("/courier", useCourierRoute)


module.exports = router 