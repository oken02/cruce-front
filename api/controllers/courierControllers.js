const { Courier } = require('../models');

// create Courier /cadeterias
const courierCreate = async (req, res, next) => {
  try {
    let { name, address, manager, phone } = req.body;
    courier = await Courier.create({
      name,
      address,
      manager,
      phone,
    });

    res.status(201).json(courier);
  } catch (err) {
    next(err);
  }
};

// courriers List
const courierList = async (req, res, next) => {
  try {
    couriers = await Courier.find();
    res.status(200).json(couriers);
  } catch (err) {
    next(err);
  }
};

// courriers Find
const courierFind = async (req, res, next) => {
  try {
    courier = await Courier.findById(req.params.id);
    res.status(200).json(courier);
  } catch (err) {
    next(err);
  }
};

// update Courier
const courierUpdate = async (req, res, next) => {
  try {
    let id = req.params.id;
    let courier = req.body;

    await Courier.updateOne({ _id: id }, courier);
    const resultado = await Courier.findById(id);

    res.status(202).json(resultado);
  } catch (err) {
    next(err);
  }
};
// Delete Courier
const courierDelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Courier.findByIdAndDelete(id);
    const result = {
      message: `La mensajería fue eliminada con éxito`,
    };
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  courierCreate,
  courierUpdate,
  courierList,
  courierFind,
  courierDelete,
};
