const { createDeliveryUser } = require('../controllers/userControllers');
const { validateJWT } = require('../middlewares');
const router = require('express').Router()


router.post('/deliveryadd', [validateJWT], createDeliveryUser);

module.exports = router