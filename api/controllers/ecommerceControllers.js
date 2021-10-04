const { User , Courier, Order } = require("../models")
const bcrypt = require('bcrypt')



const createUserCourier = async (req, res,next) => {
    try {
    const { fullName, email, dniCuil, password, address, courierId } = req.body
    const saltRounds = 10
    const passwordHashed = await bcrypt.hash(password, saltRounds)
    const courier = await Courier.findById(courierId)


    const newCourier = new User({
        fullName : fullName,
        email : email,
        dniCuil : dniCuil,
        password : passwordHashed,
        role : "courier",
        address : address,
        courierId : courier
    })
    await newCourier.save()
    res.status(201).send(newCourier)

    } 
    catch (err) {next(err)}
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
                    state : "sin asignar",
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
        res.send(ordenes)
        
    } catch(err) { next(err) }
}

//cambio de estado
const changingState = async (req, res, next ) => {
    try{
        
    }
    catch(err) {next(err)}
}




module.exports = {createUserCourier, newOrder}


