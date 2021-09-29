const { User , Courier } = require("../models")
const bcrypt = require('bcrypt')

const createUserCourier = async (req, res,next) => {
    try {
    const { fullName, email, dniCuil, password, direction, courierId } = req.body
    const saltRounds = 10
    const passwordHashed = await bcrypt.hash(password, saltRounds)
    const courier = await Courier.findById(courierId)


    const newCourier = new User({
        fullName : fullName,
        email : email,
        dniCuil : dniCuil,
        password : passwordHashed,
        role : "courier",
        direction : direction,
        courierId : courier
    })
    await newCourier.save()
    res.status(201).send(newCourier)

    } 
    catch (err) {next(err)}
}

module.exports = {createUserCourier}