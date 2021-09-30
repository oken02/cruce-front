const { createUserCourier } = require('../controllers/ecommerceControllers');
const { userDetails, userCourierList, deleteUser, updateUser } = require('../controllers/userControllers');
const { roleCourierAndEcommerce, roleEcommerce } = require('../middlewares/validateRole');
const router = require('express').Router()

//Lista todos los courier
router.get("/", roleEcommerce, userCourierList)

//Lista un courier por ID
router.get("/:id", roleEcommerce, userDetails)

//Agrega un courier
router.post("/add", roleEcommerce, createUserCourier)

//Elimina un usuario
router.delete('/delete/:id', roleEcommerce, deleteUser);

//Modifica los datos de un usuario (Update)
router.put('/update/:id', roleCourierAndEcommerce, updateUser )

module.exports = router;