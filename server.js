import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "PUT"],
  },
});

io.on("connection", (socket) => {
  //console.log(socket.id);

  socket.on("join_room", (data) => {
    //console.log("Join room", data);
    socket.join(data);
    console.log(`User id : ${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("send message data ", data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use(cors());

server.listen(2000, () => {
  console.log("server started");
});
