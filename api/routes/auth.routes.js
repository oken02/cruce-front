const { login, create, validate } = require("../controllers/authController");
const { validateJWT } = require("../middlewares");
const router = require("express").Router();

//login de cualquier usuario
router.post("/login", login);

//crea cualquier tipo de usuario - ADMIN
router.post("/create", create);

router.post("/validate", validateJWT, validate);

module.exports = router;
