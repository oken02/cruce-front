const { Order, Courier, User } = require("../models")
const {elCasiHook} = require("../utils/metrics")

//Trae todos los pedidos SOLO ECOMMERCE
const allOrders = async (req, res, next) => {
    try{
        const orders= await Order.find({})
        .populate("userId")
        .populate("courierId")
        res.status(200).send(orders)
    }catch(err){next(err)}
}

//TRAE todos los pedidos de un CADETE
const myorders = async (req, res, next) => {
    try{
        const {id} = req.params
        const {state} = req.body
        const obj = state ? {userId : id , actualState : state} : {userId : id}
        const orders = await Order.find(obj)
        res.status(200).send(orders)
    }catch(err){next(err)}
}


//trae todos los pedidos SIN ASIGNAR
const noAssignedOrderList = async (req, res, next) => {
    try{
        const orders = await Order.find({actualState : "Sin Asignar"})

        res.status(200).send(orders)
    }
    catch(err){next(err)}
}


//detalla un pedido por ID
const orderById = async (req, res, next) => {
    try{
        const id = req.params.id
        const detailOrder = await Order.findById(id)
        .populate("userId")
        .populate("courierId")
        res.status(200).send(detailOrder)
    } catch(err){next(err)}
}
//Trae un pedido por OrderId
const OrderId = async (req, res, next) => {
    try{
        const id = req.body.orderId
        const detailOrder = await Order.findOne({orderId : id})
        .populate("userId")
        .populate("courierId")
        res.status(200).send(detailOrder)
    } catch(err){next(err)}
}

//Trae todos los pedidos de un courier pasandole el nombre por body
const allCourierOrders = async (req, res, next) => {
    try{
        const {courierName} = req.body
        const courierData = await Courier.findOne({ name : courierName })
        const data = await Order.find({courierId : courierData})
        .populate("userId")
        res.status(200).send(data)

    }catch(err){next(err)}
} 


// Trae todos los envios de una cadetería. Puede o no recibir "estado", dependiendo del estado, traera esos pedidos
// Sino colocan estado, traerá todos los pedidos de una cadetería.
// Si es ecommerce DEBE enviar por body el courierID
const orderByCourier = async (req, res, next) => {
    try{
        const {role , courierId} = req.payload
        const {courierID, state} = req.body
        
        role === "ecommerce" ? dato = courierID : dato = courierId
        const obj = state ? {courierId : dato, actualState : state} : {courierId : dato}; 

        const orders = await Order.find(obj)
        .populate("userId")
        .populate("courierId")
        res.status(200).send(orders)
    }
    catch(err){next(err)}
}

//Trae todos los envíos y los filtra por estado SOLO ECOMMERCE 
const allOrdersByState = async (req, res, next) => {
    try{
        const {state} = req.body
        const orders = await Order.find({actualState : state})
        .populate("userId")
        .populate("courierId")
        res.status(200).send(orders)
        
    }catch(err) {next(err)}
}

//Crea todos los pedidos excel
const newOrder = async (req, res, next) => {
    try{
        const data = req.body
        
        const datosModelados = data.map(datos => 
            ({orderId : datos["Order"],
                client : {
                firstName : datos["Client Name"],
                lastName : datos["Client Last Name"],
                document : datos["Client Document"],
                email : datos["Email"],
                phone : datos["Phone"],
                address : {
                    province : datos["UF"],
                    city : datos["City"],
                    addressType : datos["Address Type"],
                    receiverName : datos["Receiver Name"],
                    street : datos["Street"],
                    numberStreet : datos["Number"],
                    complement : datos["Complement"],
                    neighborhood : datos["neighborhood"],
                    postalCode : datos["Postal Code"]
                }
            },
            product : [{
                estimateDeliveryDate : datos["Estimate Delivery Date"],
                status : datos["Status"],
                quantity : datos["Quantity_SKU"],
                productId : datos["ID_SKU"],
                categoryId : datos["Category Ids Sku"],
                referenceCode : datos["Reference Code"],
                productName : datos["SKU Name"],
                productsValue : datos["SKU Value"],
                sellingPrice : datos["SKU Selling Price"],
                totalPrice : datos["SKU Total Price"],
                shippingPrice : datos["Shipping List Price"],
                shippingValue : datos["Shipping Value"],
                totalValue : datos["Total Value"],
                discountsTotals : datos["Discounts Totals"]
            }],
            stateHistory : [
                {
                    state : "Sin Asignar",
                    date : new Date()
                }
            ]
        }))
        const nuevosDatos = datosModelados.filter(elmt => elmt.product[0].status != "Cancelado")

        for(let i = 0; i < nuevosDatos.length; i++ ){
            for(let j = i+1; j < nuevosDatos.length; j++){
                if(nuevosDatos[i].orderId === nuevosDatos[j].orderId){
                    nuevosDatos[i].product.push(nuevosDatos[j].product[0])
                    nuevosDatos.splice(j,1)
                    j = j-1
                }}}

        const ordenes = await Order.insertMany(nuevosDatos)
        res.status(201).send(ordenes)
        
    } catch(err) { next(err) }
}

//cambia el estado de un pedido y lo suma al historial
const changingState = async (req, res) => {
    const { id , courierId} = req.payload;
    const orderId = req.params.orderId
    const {state} = req.body //Entregado o Devuelto a Sucursal


    const pedido = await Order.findById(orderId);
    if (pedido.actualState === "Sin Asignar") {
      pedido.actualState = "Pendiente de Retiro en Sucursal";
      pedido.userId = id
      pedido.courierId = courierId
    } else if (pedido.actualState === "Pendiente de Retiro en Sucursal") {
      pedido.actualState = "En Camino";
    } else {
      pedido.actualState = state;
    }
    await pedido.save()
    

    if(pedido.actualState === "Entregado" || pedido.actualState === "Devuelto a Sucursal"){
        elCasiHook(pedido.actualState, pedido.stateHistory[1], courierId, id)
    }
    
    res.status(202).send(pedido);
  };

//Elimina un pedido
const deleteOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
      const resDel = await Order.deleteOne({ _id: id });
      res.status(200).json({ msg: "Deleted", resDel });
    } catch (error) {
      next(error);
    }

}

//modifica un envío por ID
const modifyOrder = async (req, res, next)=>{
    const id = req.params.id;
    try {
      const OrderUpdated = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(201).json({ OrderUpdated });
    } catch (error) {
      next(error);
    }
}

//Filtrado por fecha inicial a fecha final.    --MM//DD//AAAA--
const orderFilterEcommerce = async (req, res, next) => {
    const { fechaDesde, fechaHasta , courierName} = req.body

    let primerParte
    let segundaParte

    const mensajeria = await Courier.findOne({ name : courierName })

    //ecommerce
    if (courierName) {
        primeraParte = { "stateHistory.0.date" : {$gte: new Date(fechaDesde)}, courierId : mensajeria}
        segundaParte = {"stateHistory.0.date" : {$lt: new Date(fechaHasta)}, courierId : mensajeria}
    } else {
        primeraParte = { "stateHistory.0.date" : {$gte: new Date(fechaDesde)}}
        segundaParte = {"stateHistory.0.date" : {$lt: new Date(fechaHasta)}}
    }

    try {
    const orders = await Order.find(
        { $and: [primeraParte , segundaParte] }
    )
    .populate("userId")
    .populate("courierId")
    res.status(200).send(orders)
    } catch (error){
        next(error)
    }
}

const orderFiltercourier = async (req, res, next) => {
    const {fechaDesde, fechaHasta} = req.body
    const {courierId} = req.payload

    try{
        const orders = await Order.find({
            $and : [{ "stateHistory.0.date" : {$gte: new Date(fechaDesde)}, courierId : courierId},
                    { "stateHistory.0.date" : {$lt: new Date(fechaHasta)}, courierId : courierId} ]
        })
        .populate("userId")
        res.status(200).send(orders)
    } catch (error){
        next(error)
        }
}

const orderFilterMessenger = async (req, res, next) => {
    const {fechaDesde, fechaHasta} = req.body
    const {id} = req.payload

    try{
        const orders = await Order.find({
            $and : [{ "stateHistory.0.date" : {$gte: new Date(fechaDesde)}, userId : id},
                    { "stateHistory.0.date" : {$lt: new Date(fechaHasta)}, userId : id} ]
        })

        res.status(200).send(orders)
    } catch (error){
        next(error)
        }
}


module.exports = { 
     allOrders, 
     newOrder,
     myorders,
     changingState, 
     noAssignedOrderList, 
     orderById,
     OrderId,
     allCourierOrders, 
     deleteOrder, 
     orderByCourier, 
     modifyOrder, 
     allOrdersByState,
     orderFilterEcommerce,
     orderFiltercourier,
     orderFilterMessenger
    }




    // CLARAMENTE NO TENGO BUEN INTERNET 

    //NO TENIAMOS EN CUENTA LOS ESTADOS EN LAS DEVOLUCIONES

    //PODEMOS MOSTRAR LOS ENTREGADOS Y DEVUELTOS . NO ASÍ EL RESTO DE ESTADOS

    //A QUE TE REFERIS J CON FECHA DE INGRESO Y FECHA DE ENTREGA? 

    
            //order por fecha
            //metrics como está


  /*    [
            {
            
                courier : nombre1,
                entregados : 1000,
                devueltos : 30,
                tiempoEnMinutos : 34

            },
            
            {
            
                courier : nombre2,
                entregados : 1000,
                devueltos : 15,
                tiempoEnMinutos : 42

            },
        
    ] */


