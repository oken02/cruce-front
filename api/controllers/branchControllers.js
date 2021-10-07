const {  Branch } = require("../models")

const branchList = async (req, res, next) => {
    try {
      const branch = await Branch.find({});
      res.json( branch );
    } catch (error) {
      next(error);
    }
  };

const branchDetails = async (req, res, next) => {
    const id = req.params.id;
    try {
      const branch = await Branch.findById(id);
      res.json( branch );
    } catch (error) {
      next(error);
    }
  };

const createBranch = async (req, res, next) => {
try {
      const branch = await Branch.create(req.body);
      res.json( branch );
    } catch (error) {
      next(error);
    }
  };

const updateBranch = async (req, res, next) => {
    const id = req.params.id;
  
    try {
      const branchUpdated = await Branch.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json( branchUpdated );
    } catch (error) {
      next(error);
    }
  };

const deleteBranch = async (req, res, next) => {
    const id = req.params.id;
  
    try {
      const resDel = await Branch.deleteOne({ _id: id });
      res.json( {msg: "deleted", resDel} );
    } catch (error) {
      next(error);
    }
}

module.exports = {
    branchList,
    branchDetails,
    createBranch,
    updateBranch,
    deleteBranch
}
