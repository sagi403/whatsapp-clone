const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

io.on("connection", socket => {
  console.log("a user connected");
});
