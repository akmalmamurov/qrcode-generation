import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

const app = express();
const server = http.createServer(app);

// Configure Socket.IO with CORS options
const io = new SocketIOServer(server, {
  cors: {
    origin: "https://1349-195-158-2-126.ngrok-free.app/", // Allow all origins, or specify a specific domain like "http://your-domain.com"
    methods: ["GET", "POST"], // Allowed HTTP methods
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  },
});

app.get("/", (req, res) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (data) => {
      console.log("Message received from frontend:", data);
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
