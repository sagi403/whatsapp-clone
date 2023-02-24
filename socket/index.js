const randomIdGenerator = require("./utils/randomIdGenerator");
// const client = require("redis").createClient();

const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// client
//   .connect()
//   .then(res => console.log("Redis client is connected"))
//   .catch(err => console.log(err));

// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some(user => user.userId === userId) &&
//     users.push({ userId, socketId });

//   console.log(users);
// };

// const getUser = userId => {
//   return users.find(user => user.userId === userId);
// };

io.on("connection", nsSocket => {
  console.log("a user connected");

  // addUser(id, nsSocket.id);

  nsSocket.on("joinRoom", roomToJoin => {
    const roomToLeave = Array.from(nsSocket.rooms)[0];
    nsSocket.leave(roomToLeave);
    nsSocket.join(roomToJoin);

    updateUsersInRoom("/", roomToJoin);
  });

  nsSocket.on("newMessageToServer", ({ receiverId, senderId, text }) => {
    const fullMsg = {
      text,
      receiverId,
      senderId,
      time: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      id: randomIdGenerator(),
    };

    const room = Array.from(nsSocket.rooms)[0];

    // const { userId } = getUser(receiverId);

    io.of("/").to(room).emit("messageToClient", fullMsg);
  });
});

const updateUsersInRoom = (namespace, roomToJoin) => {
  io.of(namespace)
    .in(roomToJoin)
    .fetchSockets()
    .then(res => {
      io.of(namespace).in(roomToJoin).emit("updateMembers", res.length);
    });
};
