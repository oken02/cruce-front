const { User , Courier } = require("../models")
const bcrypt = require('bcrypt')


const createMessengerUser = async (req, res,next) => {
    try {
    const {courierId} = req.payload
    const { fullName, email, dniCuil, password, direction } = req.body
    const saltRounds = 10
    const passwordHashed = await bcrypt.hash(password, saltRounds)
    const courier = await Courier.findById(courierId)


    const newMessengerUser = new User({
        fullName : fullName,
        email : email,
        dniCuil : dniCuil,
        password : passwordHashed,
        role : "messenger",
        direction : direction,
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
        console.log(id, update)
        const userUpdate = await User.findByIdAndUpdate(id, update, {new : true})
        console.log(userUpdate)
        res.status(202).send(userUpdate)
    }catch(err){next(err)}
}

const userMessengerList = async (req, res, next) => {
    try{
        const user = await User.find({role : "messenger" });
        const users = await Courier.populate(user, { path: "courierId"})
        res.json(user);
    } catch (err) { next(err) }
};


const userCourierList = async (req, res, next) => {
    try{
        const user = await User.find({role : "courier" });
        res.json(user);
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