const { User , Courier } = require("../models")
const bcrypt = require('bcrypt')


const createMessengerUser = async (req, res,next) => {
    try {
    const {courierId} = req.payload
    const { fullName, email, dniCuil, password, address } = req.body
    const saltRounds = 10
    const passwordHashed = await bcrypt.hash(password, saltRounds)
    const courier = await Courier.findById(courierId)
        
    if(courier === null) res.status(404).send("El usuario no tiene asociado una cadetería")

    const newMessengerUser = new User({
        fullName : fullName,
        email : email,
        dniCuil : dniCuil,
        password : passwordHashed,
        role : "messenger",
        address : address,
        courierId : courier
    })

    await newMessengerUser.save()
    res.status(201).send(newMessengerUser)

    } 
    catch (err) {next(err)}
}


const userDetails = async (req, res, next) => {
    try{
        const id = req.params.id
        const user = await User.findById(id)
        res.status(200).send(user)
    } catch(err){ next (err)}
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
        const userUpdate = await User.findByIdAndUpdate(id, update, {new : true})
        res.status(202).send(userUpdate)
    }catch(err){next(err)}
}

const userMessengerList = async (req, res, next) => {
    try{
        const { courierId } = req.payload
        const user = await User.find({role : "messenger", courierId : courierId});
        const users = await Courier.populate(user, { path: "courierId"})
        res.status(200).json(user);
    } catch (err) { next(err) }
};


const userCourierList = async (req, res, next) => {
    try{
        const user = await User.find({role : "courier" });
        res.status(200).json(user);
    } catch (err) { next(err) }
};



module.exports = { 
    createMessengerUser,
    userDetails,
    userMessengerList, 
    userCourierList, 
    deleteUser,
    updateUser 
}