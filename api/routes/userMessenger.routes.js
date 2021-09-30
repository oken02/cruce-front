const { createMessengerUser, userDetails, userMessengerList, deleteUser, updateUser } = require('../controllers/userControllers');
const { roleCourier, roleMessenger } = require('../middlewares/validateRole');
const router = require('express').Router()


//Lista todos los cadetes
router.get("/", roleCourier, userMessengerList)

//Lista un cadetes por id
router.get("/:id", roleCourier, userDetails)

//Agrega un cadete
router.post('/add', createMessengerUser);

//Elimina un cadete por id
router.delete('/delete/:id', roleCourier, deleteUser);

//Modifica los datos de un cadete por id
router.put('/update/:id', roleMessenger, updateUser )


module.exports = router