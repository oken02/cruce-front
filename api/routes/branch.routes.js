const router = require("express").Router();
const { branchList, branchDetails , createBranch , updateBranch , deleteBranch } = require('../controllers/branchControllers')



//Trae todas las sucursales
router.get("/", branchList)

//Detalla una sucursal por id
router.get("/:id", branchDetails) 

//Crea una sucursal
router.post("/", createBranch) 

//Modifica una sucursal por id 
router.put("/:id", updateBranch)

//Elimina una sucursal por id
router.delete("/:id", deleteBranch) 

module.exports = router;
