const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let usersId = [
  "63ee3710beca6cc8c77fdd39",
  "63ee371abeca6cc8c77fdd3d",
  "63ee3776beca6cc8c77fdd59",
  "63ef863dadc576f556e32e84",
  "63ef87e8adc576f556e32edf",
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

usersId.forEach(id => {
  io.of(`/${id}`).on("connection", nsSocket => {
    console.log("a user connected");

    addUser(id, nsSocket.id);

    nsSocket.on("joinRoom", roomToJoin => {
      const roomToLeave = Array.from(nsSocket.rooms)[0];
      nsSocket.leave(roomToLeave);

      console.log("roomToJoin", roomToJoin);
      console.log("roomToLeave", roomToLeave);

      nsSocket.join(roomToJoin);
      const newJoinedRoom = Array.from(nsSocket.rooms)[0];
      console.log("newJoinedRoom", newJoinedRoom);
    });

    nsSocket.on("sendMessage", ({ senderId, text }) => {
      console.log(text);

      // io.to(user.socketId).emit("getMessage", {
      //   senderId,
      //   text,
      // });
    });
  });
});
