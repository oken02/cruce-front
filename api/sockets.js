const http = require("http");
const { Server } = require("socket.io");
const { Order } = require("./models");

const socketLoader = (app) => {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "https://cruce-server.herokuapp.com/"],
      methods: ["GET", "POST"],
    },
  });

  //   const orders = [];
  const cadetesCoords = [];

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    // console.log(socket.handshake.query);
    socket.userID = socket.handshake.query.id;
    socket.fullName = socket.handshake.query.fullName;

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
      const cadeteIdx = cadetesCoords.findIndex(
        (cadete) => cadete.id == socket.userID
      );
      cadetesCoords.splice(cadeteIdx, 1);
      io.emit("new-coords", cadetesCoords);
      console.log("CADETED COORDS", cadetesCoords);
    });

    socket.on("change-orders", async () => {
      const newOrders = await Order.find({ actualState: "Sin Asignar" });
      io.emit("new-orders", newOrders);
    });

    socket.on("new-coords", (coords) => {
      const cadeteIdx = cadetesCoords.findIndex(
        (cadete) => cadete.id == socket.userID
      );
      if (cadeteIdx === -1) {
        cadetesCoords.push({
          coords,
          id: socket.userID,
          fullName: socket.fullName,
        });
      } else {
        // cadetesCoords[cadeteIdx] = { coords, id: socket.userID };
        cadetesCoords[cadeteIdx].coords = coords;
      }
      io.emit("new-coords", cadetesCoords);

      socket.emit("my-coords", coords);

      console.log("CADETED COORDS", cadetesCoords);
    });

    socket.on("get-coords", async (state) => {
      socket.emit("new-coords", cadetesCoords);
    });

    socket.on("get-orders", async (state) => {
      const o = await Order.find(state ? { actualState: state } : {});
      // setTimeout(() => {
      socket.emit("new-orders", o);
      // }, 1000);
    });

    // Order.find().then((orders) => {
    //   console.log("PEDIDOS", orders);
    //   socket.emit("new-orders", orders);
    // });
  });

  return server;
};

module.exports = socketLoader;
