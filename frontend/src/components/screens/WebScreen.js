import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import Contact from "../base/Dialog";
import Message from "../base/Message";
import UserHeader from "../base/UserHeader";
import { getContactList } from "../../fetchers/getContactList";
import { useAuth } from "../../hooks/useAuth";
import { getMessages } from "../../fetchers/getMessages";

const WebScreen = () => {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState([]);
  const [currentDialog, setCurrentDialog] = useState({});
  const socket = useRef();

  const { data, error } = useQuery(["conversations"], getContactList, {
    staleTime: 60000,
  });

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
    console.log(user);
    if (data) {
      setConversations(data);
      setCurrentDialog(data[0]);
    }
  }, [data]);

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

  const handleDialogClick = async dialog => {
    setCurrentDialog(dialog);
    console.log(dialog);

    setArrivalMessages(await getMessages(dialog.userId));
  };

  return (
    <>
      <div className="container mx-auto h-screen flex">
        <div className="lg:w-1/4 md:w-1/4 w-1/2 bg-gray-200 h-screen">
          <ul className="list-none p-0">
            {conversations?.map(dialog => (
              <Contact
                name={dialog.name}
                lastMessage={dialog.lastMessage}
                receivedAt={dialog.receivedAt}
                avatar={dialog.avatar}
                key={dialog.userId}
                active={currentDialog?.userId === dialog.userId}
                onClick={() => handleDialogClick(dialog)}
              />
            ))}
          </ul>
        </div>
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
