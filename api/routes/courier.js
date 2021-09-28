const router = require('express').Router()
const {courierCreate} = require("../controllers/courierControllers")

router.post('/courierAdd', courierCreate);

module.exports = router
