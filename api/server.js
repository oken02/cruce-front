const express = require("express");
const mongooseLoader = require("./db");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

//FIJARSE EL TEMA DE MIDDLEWARES NECESARIOS

app.use("/api", routes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke! msg: " + err.message);
});

mongooseLoader()
  .then(() => {
    console.log("Db loaded and connected");
    app.listen(3001, () => {
      console.log(`Example app listening at http://localhost:3001`);
    });
  })
  .catch((err) => console.log(err));
