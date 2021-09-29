const router = require("express").Router();

const { Local } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const locals = await Local.find({});
    res.json({ locals });
  } catch (error) {
    next(error);
  }
});

router.get("/:localID", async (req, res, next) => {
  const { localID } = req.params;
  try {
    const local = await Local.findById(localID);
    res.json({ local });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  //   res.send("ok");
  try {
    const local = await Local.create(req.body);
    res.json({ local });
  } catch (error) {
    next(error);
  }
});

router.put("/:localID", async (req, res, next) => {
  const { localID } = req.params;

  try {
    const localUpdated = await Local.findByIdAndUpdate(localID, req.body, {
      new: true,
    });
    res.json({ localUpdated });
  } catch (error) {
    next(error);
  }
});

router.delete("/:localID", async (req, res, next) => {
  const { localID } = req.params;

  try {
    // const resDel = await Local.remove({ id: localID });
    const resDel = await Local.deleteOne({ _id: localID });

    res.json({ msg: "deleted", resDel });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
