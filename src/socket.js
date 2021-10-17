import io from "socket.io-client";

export let socket = null;

export const connect = (userID, fullName) => {
  socket = io("http://localhost:3001", {
    query: { id: userID, fullName },
  });
  console.log("SOCKET", socket);
};

// class Socket {
//   socket;

//   connect() {
//     this.socket = io.connect("http://localhost:3001");
//   }

//   getOrders() {
//     socket.emit("get-orders");
//   }

//   onNewOrders (){

//   }

// }

// export default new Socket();
