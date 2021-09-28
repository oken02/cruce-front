const { Courier } = require("../models")

// create Courier
const courierCreate = async (req, res) => {
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

module.exports = {courierCreate}