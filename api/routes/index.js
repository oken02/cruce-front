const express = require("express");
const router = express.Router();
const validateJWT = require('../middlewares/validateJWT');
const { roleEcommerce } = require('../middlewares/validateRole');


const CourierRouter = require("./courier");
const LocalRouter = require("./local");
const ShippingRouter = require("./shipping");
const UserRouter = require("./user");
const authRouter = require("./auth.routes");
 
router.use("/Courier", [validateJWT, roleEcommerce ], CourierRouter);
router.use("/Local", [validateJWT, roleEcommerce ],LocalRouter);
router.use("/Shipping", ShippingRouter);
router.use("/User", UserRouter);

router.use("/auth", authRouter);

router.use('/Courier', CourierRouter);
router.use('/Local', LocalRouter);
router.use('/Shipping', ShippingRouter);
router.use('/User', UserRouter);

module.exports = router