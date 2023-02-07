import { useState } from "react";
import ContactList from "../components/ContactList";
import MyMessage from "../components/MyMessage";
import OtherMessage from "../components/OthersMessage";

const WebScreen = () => {
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="container mx-auto h-screen">
        <div className="flex">
          <div className="w-1/4 bg-gray-200 p-4 h-screen">
            <ul className="list-none p-0">
              <ContactList />
              <ContactList />
              <ContactList />
              <ContactList />
            </ul>
          </div>
          <div className="w-3/4 h-screen">
            <div className="flex flex-col h-full">
              {/* User headline */}
              <div className="flex p-4 bg-gray-200">
                <img
                  src="https://via.placeholder.com/50x50"
                  alt="Sender Avatar"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">Today, 12:00 PM</p>
                </div>
              </div>
              {/* Chat */}
              <div className="container mx-auto p-4 bg-orange-100 overflow-auto h-full">
                <MyMessage />
                <MyMessage />
                <MyMessage />
                <OtherMessage />
                <OtherMessage />
                <OtherMessage />
                <MyMessage />
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
      </div>
    </>
  );
};

export default WebScreen;
