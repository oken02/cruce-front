const express = require("express");
const router = express.Router();
const validateJWT = require('../middlewares/validateJWT');
const { roleEcommerce } = require('../middlewares/validateRole');


const CourierRouter = require("./courier.routes");
const BranchRouter = require("./branch.routes");
const OrderRouter = require("./order.routes");
const UserRouter = require("./user.routes");
const authRouter = require("./auth.routes");

 
router.use("/courier", [validateJWT, roleEcommerce ], CourierRouter);
router.use("/branch", [validateJWT, roleEcommerce ], BranchRouter);
router.use("/order",[validateJWT], OrderRouter);
router.use("/user", [validateJWT] , UserRouter);
router.use("/auth", authRouter); 



module.exports = router

