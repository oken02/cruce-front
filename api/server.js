const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
// require("./mongo");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke! msg: " + err.message);
});

app.listen(3001, () => {
  console.log("SERVER ON PORT", 3001);
});
