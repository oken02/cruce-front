const router = require('express').Router()
const { newOrder, changingState , orderList, orderById , deleteOrder, modifyOrder , orderByCourier} = require('../controllers/orderControllers');
const { roleMessenger, roleEcommerce, roleCourierAndEcommerce } = require('../middlewares/validateRole');


//Lista de envíos SIN ASIGNAR
router.get("/", orderList)

//Detalla un pedido por ID
router.get("/:id", orderById)

//Crea todos los envíos del Excel 
router.post("/post", roleEcommerce , newOrder)

//Trae todos los pedidos de una cadetería - si es ecommerce enviar req.body - 
router.post("/", roleCourierAndEcommerce, orderByCourier)

//modifica un envío por ID  
router.put ("/modify/:id",roleEcommerce, modifyOrder  )

//modifica el estado del envío
router.put("/:orderId", roleMessenger , changingState);

//Elimina un pedido por ID
router.delete("/:id", roleEcommerce, deleteOrder )



module.exports = router