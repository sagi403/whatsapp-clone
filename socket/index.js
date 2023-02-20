const randomIdGenerator = require("./utils/randomIdGenerator");

const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let roomsId = [
  "63f21963cfd64d70a0f348d5",
  "63f36fa168ea04c9af0d47ef",
  "63f36fb768ea04c9af0d4800",
];
let users = [];

const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId });

  // console.log(users);
};

const getUser = userId => {
  return users.find(user => user.userId === userId);
};

roomsId.forEach(room => {
  io.of(`/${room}`).on("connection", nsSocket => {
    console.log("a user connected");

    // addUser(id, nsSocket.id);

    nsSocket.on("joinRoom", roomToJoin => {
      const roomToLeave = Array.from(nsSocket.rooms)[0];
      console.log(Array.from(nsSocket.rooms));
      nsSocket.leave(roomToLeave);
      nsSocket.join(roomToJoin);

      console.log("roomToLeave", roomToLeave);
      console.log("roomToJoin", roomToJoin);
      console.log(Array.from(nsSocket.rooms));
      updateUsersInRoom(`/${room}`, roomToJoin);
    });

    nsSocket.on("newMessageToServer", ({ receiverId, text }) => {
      const fullMsg = {
        text,
        receiverId,
        time: new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
        id: randomIdGenerator(),
      };

      const room = Array.from(nsSocket.rooms)[0];
      // console.log(Array.from(nsSocket.rooms));

      // const { userId } = getUser(receiverId);

      io.of(`/${room}`).to(room).emit("messageToClient", fullMsg);
    });
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
