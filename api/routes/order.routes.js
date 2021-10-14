const router = require('express').Router()
const { allOrders, newOrder, myorders, changingState , noAssignedOrderList, orderById, OrderId, allCourierOrders, deleteOrder, modifyOrder , orderByCourier, allOrdersByState, orderFilterEcommerce, orderFiltercourier, orderFilterMessenger} = require('../controllers/orderControllers');
const { roleMessenger, roleEcommerce, roleCourierAndEcommerce, roleCourier } = require('../middlewares/validateRole');


//Lista TODOS los envíos SOLO ECOMMERCE
router.get("/", roleEcommerce, allOrders)

//Lista de envíos SIN ASIGNAR
router.get("/noassigned", noAssignedOrderList)

//Detalla un pedido por ID
router.get("/:id", orderById)

//Trae todas las ordenes entre dos fechas (MM/DD/AAAA) (PUEDE ENVIAR POR BODY NOMBRE CADETERIA)
router.post("/filterecommerce", roleEcommerce, orderFilterEcommerce)

//Trae todas las ordenes entre dos fechas (MM/DD/AAAA)
router.post("/filtercourier", roleCourier, orderFiltercourier)

//Trae todas las ordenes de un cadete entre dos fechas (MM//DD//AAAA)
router.post("/filtermessenger", roleMessenger, orderFilterMessenger)

//Lista todos los pedidos de un CADETE
router.post("/myorders/:id", roleMessenger, myorders)

//Crea todos los envíos del Excel 
router.post("/post", roleEcommerce , newOrder)

//Todos los pedidos filtrados por estado
router.post("/ordersbystate", roleEcommerce, allOrdersByState)

//Trae un pedido por OrderId
router.post("/orderid", OrderId)

//Trae todos los pedidos de un courier pasandole el nombre por body
router.post("/allorders", allCourierOrders)

//Trae todos los pedidos de una cadetería - si es ecommerce enviar req.body - 
//también filtra por estado si se lo envía por body
router.post("/", roleCourierAndEcommerce, orderByCourier)

//modifica un envío por ID  
router.put ("/modify/:id",roleEcommerce, modifyOrder  )

//modifica el ESTADO del envío
router.put("/:orderId", roleMessenger , changingState);

//Elimina un pedido por ID
router.delete("/:id", roleEcommerce, deleteOrder )



module.exports = router