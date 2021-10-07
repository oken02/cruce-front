
const roleEcommerce = ((req, res, next)=>{
    const {role} = req.payload;
    if(role !== "ecommerce") return res.status(404).send("No puedes realizar esta acción")
    next()
})
const roleCourier = ((req, res, next)=>{
    const {role} = req.payload;
    if(role !== "courier") return res.status(404).send("No puedes realizar esta acción")
    next()
})
const roleMessenger = ((req, res, next)=>{
    const {role} = req.payload;
    if(role !== "messenger") return res.status(404).send("No puedes realizar esta acción")
    next()
})
const roleCourierAndEcommerce = ((req, res, next)=>{
    const {role} = req.payload;
    if(role === "messenger") return res.status(404).send("No puedes realizar esta acción")
    next()
})




module.exports = { roleEcommerce, roleCourier, roleMessenger, roleCourierAndEcommerce }