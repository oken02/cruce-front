const { User } = require("../models");
const { generateJWT } = require("../utils");
const { validateJWT } = require("../middlewares");

const bcrypt = require("bcrypt");
const { default: axios } = require("axios");
const router = require("express").Router();

router.post("/validate", validateJWT, (req, res, next) => {
  const { id: userID } = req.payload;

  User.findById(userID)
    .then((user) => {
      if (!user) return res.sendStatus(404);
      res.json({ user });
    })
    .catch(next);
});

router.post("/login", async (req, res, next) => {
  console.log("BODY EN LOGIN", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      msg: "debes enviar email y password para logearte",
    });
  }

  try {
    const user = await User.findOne({ email });

    //if (user && (await bcrypt.compare(password, user.password))) {
      if (user && password === user.password) {
      const token = generateJWT({
        id: user._id,
        role: user.role,
      });
      console.log("USER LOGGED", user);
      return res.json({ ok: true, user, token });
    } else {
      return res.status(404).send({ ok: false, msg: "no existe ese usuario" });
    }
  } catch (error) {
    next(error);
  }
});


 router.post("/create", async (req, res, next) => {
   console.log("BODY", req.body);
   const {fullName, email, dniCuil, password, rol, direction} = req.body
   const saltRounds = 10
   const passwordHashed = await bcrypt.hash(password, saltRounds)
   const user = await new User({
     fullName : fullName,
     email: email,
     dniCuil : dniCuil,
     password: passwordHashed,
     rol: rol,
     direction : direction,
   });
   await user.save()

   res.json(user);

 });

module.exports = router;
