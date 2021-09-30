const { login, create } = require("../controllers/authController");
const router = require("express").Router();



//login de cualquier usuario
router.post("/login", login)

//crea cualquier tipo de usuario
router.post("/create", create)

module.exports = router;