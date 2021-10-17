const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), "api/.env") });
const express = require("express");
const mongooseLoader = require("./db");
const socketLoader = require("./sockets");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke! msg: " + err.message);
});

const server = socketLoader(app);

mongooseLoader()
  .then(() => {
    console.log("Db loaded and connected");
    server.listen(3001, () => {
      console.log(`Example app listening at http://localhost:3001`);
    });
  })
  .catch((err) => console.log(err));
