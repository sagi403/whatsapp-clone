import { useEffect, useState } from "react";
import Message from "../base/Message";
import UserHeader from "../base/UserHeader";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import Sidebar from "../base/Sidebar";
import { addNewMessage } from "../../fetchers/addNewMessage";
import AwaitPick from "../base/AwaitPick";
import SvgItem from "../base/SvgItem";
import { sendMessageSvg } from "../../data/svg";

const WebScreen = () => {
  const [message, setMessage] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [arrivalMessages, setArrivalMessages] = useState([]);
  const [currentDialog, setCurrentDialog] = useState(null);
  const [connected, setConnected] = useState(false);

  const { user } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    if (socket.current) {
      socket.current.on("userConnectedStatus", data => {
        setConnected(data);
      });
      socket.current.on("startTypingToClient", data => {
        setTyping(data);
      });
    }
  }, [socket.current]);

  useEffect(() => {
    if (currentDialog && socket.current) {
      socket.current.emit("startTypingToServer", {
        startTyping,
        receiver: currentDialog.userId,
      });
    }
  }, [startTyping, socket.current]);

  useEffect(() => {
    if (currentDialog?.roomId && socket.current) {
      socket.current.emit("joinRoom", {
        roomId: currentDialog.roomId,
        sender: user.id,
        receiver: currentDialog.userId,
      });
    }
  }, [currentDialog, socket.current]);

  useEffect(() => {
    if (arrivalMessage) {
      setArrivalMessages(prev => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  const handleKeyUp = e => {
    message ? setStartTyping(true) : setStartTyping(false);

    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const receiverId = currentDialog.userId;
    const msg = {
      senderId: user.id,
      receiverId,
      text: message,
    };
    const messages = [
      {
        receiverId,
        text: message,
      },
    ];

    socket.current.emit("newMessageToServer", msg);
    // await addNewMessage(messages);

    setMessage("");
    setStartTyping(false);
  };

  return (
    <>
      <div className="container mx-auto h-screen flex">
        <Sidebar
          currentDialog={currentDialog}
          arrivalMessage={arrivalMessage}
          setArrivalMessage={msg => setArrivalMessage(msg)}
          setCurrentDialog={setCurrentDialog}
          setArrivalMessages={setArrivalMessages}
        />
        <div className="lg:w-3/4 md:w-3/4 w-1/2 h-screen">
          {currentDialog ? (
            <div className="flex flex-col h-full">
              {/* User headline */}
              <UserHeader
                name={currentDialog?.name}
                lastConnected={typing ? "Typing..." : connected && "Connected"}
                avatar={currentDialog?.avatar}
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
                  onKeyUp={handleKeyUp}
                />
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg"
                  onClick={handleSubmit}
                >
                  <SvgItem
                    icon={sendMessageSvg}
                    viewBox="0 0 64 64"
                    fill="white"
                  />
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
