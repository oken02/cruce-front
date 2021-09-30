const { User , Courier } = require("../models")
const bcrypt = require('bcrypt')

//crea un cadete  FALTA MIDDLEWARE 
const createDeliveryUser = async (req, res,next) => {
    try {
    const {courierId} = req.payload
    const { fullName, email, dniCuil, password, direction } = req.body
    const saltRounds = 10
    const passwordHashed = await bcrypt.hash(password, saltRounds)
    const courier = await Courier.findById(courierId)


    const newDeliveryUser = new User({
        fullName : fullName,
        email : email,
        dniCuil : dniCuil,
        password : passwordHashed,
        role : "delivery",
        direction : direction,
        courierId : courier
    })
    await newDeliveryUser.save()
    res.status(201).send(newDeliveryUser)

    } 
    catch (err) {next(err)}
}

// delivery details
const userDetails = async (req, res, next) => {
    try{
        const id = req.params.id
        console.log(id)
    const user = await User.findById(id)
    res.status(200).send(user)
    }catch(err){ next (err)}
}


const deleteUser = async (req, res, next) => {
    try{
        const id = req.params.id
        const deleted = await User.findByIdAndDelete(id)
        res.status(203).send(deleted)
    }catch(err){next(err)}
}

const updateUser = async (req, res, next) => {
    try{
        const id = req.params.id
        const update = req.body
        const passwordHashed = await bcrypt.hash(update.password, 10)
        update.password = passwordHashed
        console.log(id, update)
        const userUpdate = await User.findByIdAndUpdate(id, update, {new : true})
        console.log(userUpdate)
        res.status(202).send(userUpdate)
    }catch(err){next(err)}
}

// users deliveryList
const userDeliveryList = async (req, res, next) => {
    try{
           const user = await User.find({role : "delivery" });
           
            res.json(user);
        } catch (err) {
            next(err)
    }
};
// users courierList
const userCourierList = async (req, res, next) => {
    try{
           const user = await User.find({role : "courier" });
           
            res.json(user);
        } catch (err) {
            next(err)
    }
};



module.exports = { 
    createDeliveryUser,
    userDetails,
    userDeliveryList, 
    userCourierList, 
    deleteUser,
    updateUser 
}