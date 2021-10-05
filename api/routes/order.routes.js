const router = require('express').Router()
const { allOrders, newOrder, changingState , noAssignedOrderList, orderById , deleteOrder, modifyOrder , orderByCourier, allOrdersByState} = require('../controllers/orderControllers');
const { roleMessenger, roleEcommerce, roleCourierAndEcommerce } = require('../middlewares/validateRole');


//Lista TODOS los envíos SOLO ECOMMERCE
router.get("/", roleEcommerce, allOrders)

//Lista de envíos SIN ASIGNAR
router.get("/noassigned", noAssignedOrderList)

//Detalla un pedido por ID
router.get("/:id", orderById)

//Crea todos los envíos del Excel 
router.post("/post", roleEcommerce , newOrder)

//Todos los pedidos filtrados por estado
router.post("/ordersbystate", roleEcommerce, allOrdersByState)

//Trae todos los pedidos de una cadetería - si es ecommerce enviar req.body - 
//también filtra por estado si se lo envía por body
router.post("/", roleCourierAndEcommerce, orderByCourier)

//modifica un envío por ID  
router.put ("/modify/:id",roleEcommerce, modifyOrder  )

//modifica el estado del envío
router.put("/:orderId", roleMessenger , changingState);

//Elimina un pedido por ID
router.delete("/:id", roleEcommerce, deleteOrder )



module.exports = router