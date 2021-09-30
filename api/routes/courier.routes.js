const router = require('express').Router()
const { courierCreate, courierUpdate, courierList, courierFind, courierDelete } = require("../controllers/courierControllers");



//Trae todas las mensajerías
router.get('/', courierList);

//Detalla una mensajería por id
router.get('/:id', courierFind);

//Crear un courier
router.post('/courierAdd', courierCreate);

//Modifica una mensajería por id
router.put('/:id', courierUpdate); 

//Elimina una mensajería por id
router.delete('/:id', courierDelete)

module.exports = router


