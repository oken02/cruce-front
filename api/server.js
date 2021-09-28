const express = require('express')
const mongooseLoader = require('./db')
const routes = require("./routes")

const app = express()

app.use(express.json())


//FIJARSE EL TEMA DE MIDDLEWARES NECESARIOS

app.use("/api", routes)

mongooseLoader()
.then(() => {
	console.log("Db loaded and connected");
	app.listen(3001, () => {
		console.log(`Example app listening at http://localhost:3001`);
	})
}).catch(err => console.log(err))




// --------------------------------------

/* const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io"); */
/* const routes = require("./routes/index"); */
/* require("./mongo"); */


//app.use(cors());
/* app.use(express.urlencoded({ extended: true })); */



/* app.use("/api", routes); */

/* app.use(function (err, req, res, next) {
  if (err.name === "ValidationError") {
    console.log("ERROR AL VALIDAR LOS CAMPOS");
  }
  console.error(err.stack);
  res.status(500).send("Something broke! msg: " + err.message);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const numbers = [0];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

  // setInterval(() => {
  //   numbers.push(numbers[numbers.length - 1] + 1);
  //   console.log("NUMBERS", numbers);
  //   io.emit("numbers", numbers);
  // }, 2000);
}); */

//dentro de la fn conect

/* server.listen(3001, () => {
  console.log("SERVER ON PORT", 3001);
}); */

// app.listen(3001, () => {
//   console.log("SERVER ON PORT", 3001);
