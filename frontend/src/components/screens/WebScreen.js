import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Message from "../base/Message";
import UserHeader from "../base/UserHeader";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../base/Sidebar";
import { addNewMessage } from "../../fetchers/addNewMessage";
import AwaitPick from "../base/AwaitPick";

const WebScreen = () => {
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [arrivalMessages, setArrivalMessages] = useState([]);
  const [currentDialog, setCurrentDialog] = useState(null);
  const socket = useRef();

  const { user } = useAuth();

  useEffect(() => {
    socket.current = io(`ws://localhost:8000`);
    socket.current.emit("addUser", user.id);
  }, []);

  useEffect(() => {
    if (currentDialog?.roomId && socket.current) {
      socket.current.emit("joinRoom", currentDialog.roomId);
    }
  }, [currentDialog]);

  useEffect(() => {
    if (arrivalMessage) {
      setArrivalMessages(prev => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const receiverId = currentDialog.userId;
    const msg = {
      receiverId,
      text: message,
    };

    socket.current.emit("newMessageToServer", msg);
    // await addNewMessage(msg);

    setMessage("");
  };

  return (
    <>
      <div className="container mx-auto h-screen flex">
        <Sidebar
          currentDialog={currentDialog}
          setCurrentDialog={setCurrentDialog}
          setArrivalMessages={setArrivalMessages}
          setArrivalMessage={msg => setArrivalMessage(msg)}
          socket={socket}
        />
        <div className="lg:w-3/4 md:w-3/4 w-1/2 h-screen">
          {currentDialog ? (
            <div className="flex flex-col h-full">
              {/* User headline */}
              <UserHeader
                name={currentDialog?.name}
                lastConnected={
                  currentDialog?.receivedAt /*need to get from redis*/
                }
                avatar={currentDialog?.avatar}
                // socket={socket}
              />
              {/* Chat */}
              <div className="container mx-auto p-4 bg-orange-100 overflow-auto h-full">
                {arrivalMessages?.map(msg => (
                  <Message
                    own={msg.receiverId !== user.id}
                    text={msg.text}
                    createdAt={msg.time}
                    key={msg.id}
                  />
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
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <AwaitPick />
          )}
        </div>
      </div>
    </>
  );
};

export default WebScreen;
