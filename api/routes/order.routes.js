const router = require('express').Router()
const { newOrder } = require('../controllers/ecommerceControllers')


router.post("/post", newOrder)

router.put("/:pedidoID", [validateJWT, roleMessenger], async (req, res) => {
    const { id: messengerID } = req.payload;
  
    const pedido = await Order.findById(req.params.pedidoID);
  
    if (pedido.actualState === "Sin asignar") {
      pedido.actualState = "Pendiente de retiro en sucursal";
      pedido.userId = messengerID;
    } else if (pedido.actualState === "Pendiente de retiro en sucursal") {
      pedido.actualState = "En camino";
    } else {
      pedido.actualState = req.body.newState;
    }
  
    await pedido.save();
    
    res.json(pedido);
  });

module.exports = router