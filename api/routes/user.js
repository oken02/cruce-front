const { createUserCourier } = require('../controllers/ecommerceController');
const { createDeliveryUser, userDetails, userDeliveryList, userCourierList, deleteUser, updateUser } = require('../controllers/userControllers');
const { roleCourier, roleCourierAndEcommerce, roleEcommerce, roleDelivery } = require('../middlewares/validateRole');
const router = require('express').Router()

//Lista todos los Deliverys
router.get("/delivery/", roleCourier, userDeliveryList)
//Lista un delivery por ID
router.get("/delivery/:id", roleCourier, userDetails)
//agrega un delivery
router.post('/deliveryadd', roleCourier, createDeliveryUser);
//Elimina un usuario
router.delete('/deliveryDelete/:id', roleCourier, deleteUser);
//Modifica los datos de un usuario (Update)
router.put('/deliveryUpdate/:id', roleDelivery, updateUser )



//Lista todos los courier
router.get("/courier/", roleEcommerce, userCourierList)
//Lista un courier por ID
router.get("/courier/:id", roleEcommerce, userDetails)
//Agrega un courier
router.post("/courieradd", roleEcommerce, createUserCourier)
//Elimina un usuario
router.delete('/courierDelete/:id', roleEcommerce, deleteUser);
//Modifica los datos de un usuario (Update)
router.put('/courierUpdate/:id', roleCourierAndEcommerce, updateUser )


module.exports = router