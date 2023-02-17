import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
import Message from "../base/Message";
import UserHeader from "../base/UserHeader";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../base/Sidebar";

const WebScreen = () => {
  const [message, setMessage] = useState("");
  const [arrivalMessages, setArrivalMessages] = useState([]);
  const [currentDialog, setCurrentDialog] = useState({});
  const socket = useRef();

  const { user } = useAuth();

  useEffect(() => {
    // socket.current = io("ws://localhost:8000");
    // socket.current.on("getMessage", data => {
    //   setArrivalMessage({
    //     sender: data.senderId,
    //     text: data.text,
    //     createdAt: Date.now(),
    //   });
    // });
  }, []);

  useEffect(() => {
    // socket.current.emit("addUser", user.id);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const newMessage = {
      sender: user.id,
      text: message,
    };
    const receiverId = currentDialog.id;

    // socket.current.emit("sendMessage", {
    //   senderId: user.id,
    //   receiverId,
    //   text: newMessage.text,
    // });
  };

  return (
    <>
      <div className="container mx-auto h-screen flex">
        <Sidebar
          currentDialog={currentDialog}
          setCurrentDialog={setCurrentDialog}
          setArrivalMessages={setArrivalMessages}
        />
        <div className="lg:w-3/4 md:w-3/4 w-1/2 h-screen">
          <div className="flex flex-col h-full">
            {/* User headline */}
            <UserHeader
              name={currentDialog?.name}
              lastConnected={
                currentDialog?.receivedAt /*need to get from redis*/
              }
              avatar={currentDialog?.avatar}
            />
            {/* Chat */}
            <div className="container mx-auto p-4 bg-orange-100 overflow-auto h-full">
              {arrivalMessages?.map(msg => (
                <Message own={msg.receiverId === user.id} key={msg.id} />
              ))}
            </div>
            {/* Input message */}
            <div className="flex p-3 bg-gray-200">
              <input
                type="text"
                className="border border-gray-400 p-2 w-full rounded-lg"
                placeholder="Type a message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebScreen;
