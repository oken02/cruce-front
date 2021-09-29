
const router = require('express').Router()
const { courierCreate, courierUpdate, courierList, courierFind, courierDelete } = require("../controllers/courierControllers");



router.get('/', courierList);
router.get('/:id', courierFind);
router.post('/courierAdd', courierCreate);
router.put('/:id', courierUpdate); //auth? validatejwt
router.delete('/:id', courierDelete)

module.exports = router
