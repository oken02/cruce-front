const {  Branch } = require("../models")


const branchList = async (req, res, next) => {
    try {
      const branch = await Branch.find({});
      res.status(200).json( branch );
    } catch (error) {
      next(error);
    }
  };

const branchDetails = async (req, res, next) => {
    const id = req.params.id;
    try {
      const branch = await Branch.findById(id);
      res.status(200).json( branch );
    } catch (error) {
      next(error);
    }
  };

const createBranch = async (req, res, next) => {
try {
      const branch = await Branch.create(req.body);
      res.status(201).json( branch );
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
      res.status(202).json( branchUpdated );
    } catch (error) {
      next(error);
    }
  };

const deleteBranch = async (req, res, next) => {
    const id = req.params.id;
  
    try {
      const resDel = await Branch.deleteOne({ _id: id });
      res.status(200).json( {msg: "deleted", resDel} );
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
