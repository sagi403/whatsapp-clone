import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import Contact from "../base/Contact";
import Message from "../base/Message";
import { contacts } from "../../data/contacts";
import UserHeader from "../base/UserHeader";
import { getContactList } from "../../fetchers/getContactList";

const user = {
  name: "Admin",
  lastMessage: "test test ",
  receivedAt: "12:12",
  image: "https://via.placeholder.com/50x50",
  lastConnected: "Today, 12:00 PM",
  id: Math.floor(Math.random() * 10000000),
};

const WebScreen = () => {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [currentDialog, setCurrentDialog] = useState(contacts[0]);
  const socket = useRef();

  const { data, error } = useQuery(["conversations"], getContactList, {
    staleTime: 60000,
  });

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
    if (data) {
      setConversations(data.rooms);
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

  return (
    <>
      <div className="container mx-auto h-screen flex">
        <div className="lg:w-1/4 md:w-1/4 w-1/2 bg-gray-200 h-screen">
          <ul className="list-none p-0">
            {conversations?.map(contact => (
              <Contact
                name={contact.name}
                lastMessage={contact.lastMessage}
                receivedAt={contact.receivedAt}
                image={contact.image}
                key={contact.id}
                active={currentDialog.id === contact.id}
                onClick={() => setCurrentDialog(contact)}
              />
            ))}
          </ul>
        </div>
        <div className="lg:w-3/4 md:w-3/4 w-1/2 h-screen">
          <div className="flex flex-col h-full">
            {/* User headline */}
            <UserHeader
              name={currentDialog.name}
              lastConnected={currentDialog.lastConnected}
              image={currentDialog.image}
            />
            {/* Chat */}
            <div className="container mx-auto p-4 bg-orange-100 overflow-auto h-full">
              <Message />
              <Message />
              <Message own={arrivalMessage.sender === user.id} />
              <Message />
              <Message own={true} />
              <Message own={true} />
              <Message />
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
