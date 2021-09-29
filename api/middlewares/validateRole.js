//***************cambiar el rol cadete*****************


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
const roleCadete = ((req, res, next)=>{
    const {role, id} = req.payload;
    if(role !== "cadete") return res.status(404).send("No tenes el rol correspondiente")
    next()
})




module.exports = { roleEcommerce, roleCourier, roleCadete }