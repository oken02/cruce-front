//***************cambiar el rol cadete (OK)*****************


const roleEcommerce = ((req, res, next)=>{
    const {role, id} = req.payload;
    if(role !== "ecommerce") return res.status(404).send("No tenes el rol correspondiente")
    next()
})
const roleCourier = ((req, res, next)=>{
    const {role, id} = req.payload;
    if(role !== "courier") return res.status(404).send("No tenes el rol correspondiente")
    next()
})
const roleDelivery = ((req, res, next)=>{
    const {role, id} = req.payload;
    if(role !== "delivery") return res.status(404).send("No tenes el rol correspondiente")
    next()
})
const roleCourierAndEcommerce = ((req, res, next)=>{
    const {role, id} = req.payload;
    if(role === "delivery") return res.status(404).send("No tenes el rol correspondiente")
    next()
})




module.exports = { roleEcommerce, roleCourier, roleDelivery, roleCourierAndEcommerce }