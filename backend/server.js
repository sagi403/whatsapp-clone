import express from "express";
import { Server } from "socket.io";
import { keys, checkEnvVariables } from "./keys.js";

const app = express();

checkEnvVariables(keys);

const PORT = keys.port || 5000;

const expressServer = app.listen(
  PORT,
  console.log(`Server running in ${keys.nodeEnv} mode on port ${PORT}`)
);

const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", socket => {
  console.log("server connected");
});
