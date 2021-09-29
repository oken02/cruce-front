const { Courier } = require("../models");

// create Courier /cadeterias
const courierCreate = async (req, res, next) => {
  try {
    let { name, direction, onCharge, phone } = req.body;
    courier = await Courier.create({
      name,
      direction,
      onCharge,
      phone,
    });

    res.status(201).json(courier);
  } catch (err) {
    next(err);
  }
};

// courriers List
const courierList = async (req, res, next) => {
    try{
        couriers = await Courier.find();
        res.json(couriers);
    } catch (err) {
        next(err)
    }
};

// courriers Find
const courierFind = async (req, res, next) => {
    try{
            courier = await Courier.findById(req.params.id);
            res.json(courier);
        } catch (err) {
            next(err)
    }
};

// update Courier
const courierUpdate = async (req, res, next) => {
    try {
    let  id  = {_id : req.params.id};
    let courier = req.body;
    //courier._id = id;

    await Courier.updateOne(id,courier);

    res.json(courier);
  } catch (err) {
    next(err);
  }
};

const courierDelete = async (req, res, next) => {
  try {
		const id = { _id : req.params.id};
		await Courier.findByIdAndDelete(id);
		const result = {
			message: `User with id: ${id._id} deleted`,
		};
		res.json(result);
	} catch (err) {
		next(err);
	}

}

module.exports = { courierCreate, courierUpdate, courierList, courierFind, courierDelete };
