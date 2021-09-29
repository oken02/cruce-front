const { User , Courier } = require("../models")
const bcrypt = require('bcrypt')

//crea un cadete  FALTA MIDDLEWARE 
const createDeliveryUser = async (req, res,next) => {
    try {
    const courierId = "6153322f4f5f727ccd540253"
    const { fullName, email, dniCuil, password, direction } = req.body
    const saltRounds = 10
    const passwordHashed = await bcrypt.hash(password, saltRounds)
    const courier = await Courier.findOne({_id : courierId})
    console.log(courierId)
    console.log(courier)

    const newDeliveryUser = new User({
        fullName : fullName,
        email : email,
        dniCuil : dniCuil,
        password : passwordHashed,
        rol : "delivery",
        direction : direction,
        courierId : courier
    })
    await newDeliveryUser.save()
    res.status(201).send(newDeliveryUser)

    } 
    catch (err) {next(err)}
}



module.exports = {createDeliveryUser}