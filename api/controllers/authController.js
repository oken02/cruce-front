const { User } = require("../models");
const { generateJWT } = require("../utils");
const bcrypt = require("bcrypt");


const validate = (req, res, next) => {
  const { id: userID } = req.payload;

  User.findById(userID)
    .then((user) => {
      if (!user) return res.status(404).send("el usuario fue borrado");
      res.json({ user });
    })
    .catch(next);
};


const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      ok: false,
      msg: "debes enviar email y password para logearte",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      /*   if (user && password === user.password) { */
      const token = generateJWT({
        id: user._id,
        role: user.role,
        courierId: user.courierId,
      });
      console.log("USER LOGGED", user);
      return res.json({ ok: true, user, token });
    } else {
      return res.status(404).send({ ok: false, msg: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    next(error);
  }
};


// Admin puede crear cualquier tipo de usuario
const create = async (req, res, next) => {
  try {
    const { fullName, email, dniCuil, password, role, direction } = req.body;
    const saltRounds = 10;
    const passwordHashed = await bcrypt.hash(password, saltRounds);
    const user = await new User({
      fullName: fullName,
      email: email,
      dniCuil: dniCuil,
      password: passwordHashed,
      role: role,
      direction: direction,
    });
    await user.save();

    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { login, create, validate };
