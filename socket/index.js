const { lastVisit, sameDialog } = require("./config/redisPrefix");
const randomIdGenerator = require("./utils/randomIdGenerator");
const client = require("redis").createClient();

const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

client
  .connect()
  .then(res => console.log("Redis client is connected"))
  .catch(err => console.log(err));

io.on("connection", async nsSocket => {
  console.log("a user connected");
  const userId = nsSocket.handshake.query.userId;
  nsSocket.join(userId);

  const roomToLeave = Array.from(nsSocket.rooms)[0];
  nsSocket.leave(roomToLeave);

  await client.set(sameDialog(userId), JSON.stringify("no room"), {
    EX: 60 * 60,
  });

  nsSocket.on("joinRoom", async ({ roomId, sender, receiver }) => {
    const roomToLeave = Array.from(nsSocket.rooms)[1];

    roomToLeave && nsSocket.leave(roomToLeave);
    nsSocket.join(roomId);

    const prevRoom = JSON.parse(await client.get(sameDialog(sender)));

    if (prevRoom !== "no room") {
      io.of("/").to(prevRoom).emit("userConnectedStatus", false);
    }

    await client.set(sameDialog(sender), JSON.stringify(roomId), {
      EX: 60 * 60,
    });

    const isConnected =
      JSON.parse(await client.get(sameDialog(receiver))) === roomId;

    // const receivers = JSON.parse(await client.get(lastVisit(sender))) || [];

    // if (receivers.some(user => Object.keys(user)[0] === receiver)) {
    //   receivers.map(user => {
    //     let receiverId = Object.keys(user)[0];

    //     if (receiverId === receiver) {
    //       user[receiverId] = Date.now();
    //     }
    //   });
    // } else {
    //   receivers.push({ [receiver]: Date.now() });
    // }

    // await client.set(lastVisit(sender), JSON.stringify(receivers), { EX: 60 });

    // const isConnected = !!JSON.parse(await client.get(lastVisit(receiver)));

    io.of("/").to(roomId).emit("userConnectedStatus", !!isConnected);

    // updateUsersInRoom("/", roomId);
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
      date: "TODAY",
    };

    const room = Array.from(nsSocket.rooms)[1];

    io.of("/").to(room).emit("messageToClient", fullMsg);
    io.of("/").to(receiverId).emit("lastMessageToClient", fullMsg);
  });

  nsSocket.on("startTypingToServer", ({ startTyping, receiver }) => {
    io.of("/").to(receiver).emit("startTypingToClient", startTyping);
  });

  nsSocket.on("disconnect", async reason => {
    const userId = nsSocket.handshake.query.userId;

    const prevRoom = JSON.parse(await client.get(sameDialog(userId)));

    if (prevRoom !== "no room") {
      io.of("/").to(prevRoom).emit("userConnectedStatus", false);
    }

    // const connectedToMe = JSON.parse(await client.get(userConnected(userId)));

    // connectedToMe?.map(user => {
    //   io.of("/").to(user).emit("userConnectedStatus", false);
    // });

    await client.del(sameDialog(userId));
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
