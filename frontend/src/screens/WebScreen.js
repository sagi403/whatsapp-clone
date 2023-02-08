import { useEffect, useRef, useState } from "react";
import Contact from "../components/Contact";
import Message from "../components/Message";
import { contacts } from "../data/contacts";
import UserHeader from "../components/UserHeader";
import { io } from "socket.io-client";

const WebScreen = () => {
  const [message, setMessage] = useState("");
  const [currentDialog, setCurrentDialog] = useState(contacts[0]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
  }, []);

  return (
    <>
      <div className="container mx-auto h-screen flex">
        <div className="lg:w-1/4 md:w-1/4 w-1/2 bg-gray-200 h-screen">
          <ul className="list-none p-0">
            {contacts.map(contact => (
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
              <Message own={true} />
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
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
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
