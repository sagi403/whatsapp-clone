import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import UserHeader from "../base/UserHeader";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import Sidebar from "../base/Sidebar";
import { addNewMessage } from "../../fetchers/addNewMessage";
import AwaitPick from "../base/AwaitPick";
import { addNewUnreadMessage } from "../../fetchers/addNewUnreadMessage";
import UnreadMessage from "../base/UnreadMessage";
import useMessages from "../../hooks/useMessages";
import useUnreadMessages from "../../hooks/useUnreadMessages";
import SendOptions from "../base/SendOptions";

const WebScreen = () => {
  const [message, setMessage] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [arrivalMessages, setArrivalMessages] = useState([]);
  const [arrivalUnreadMessages, setArrivalUnreadMessages] = useState([]);
  const [currentDialog, setCurrentDialog] = useState(null);
  const [connected, setConnected] = useState(false);
  const [lastMessageDate, setLastMessageDate] = useState("");

  const jumpToRef = useRef(null);
  const jumpToEndRef = useRef(null);

  const { user } = useAuth();
  const { socket } = useSocket();

  const { renderedMessages } = useMessages(arrivalMessages, user.id);
  const { renderedUnreadMessages, msgNumber } = useUnreadMessages(
    arrivalUnreadMessages,
    lastMessageDate,
    user.id
  );

  useEffect(() => {
    if (jumpToRef.current) {
      jumpToRef.current.scrollIntoView();
    }
  }, [jumpToRef, arrivalUnreadMessages]);

  useEffect(() => {
    if (jumpToEndRef.current) {
      jumpToEndRef.current.scrollTo({
        top: jumpToEndRef.current.scrollHeight,
      });
    }
  }, [jumpToEndRef, arrivalMessages, arrivalMessage, msgNumber]);

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
      arrivalUnreadMessages.length > 0
        ? setArrivalUnreadMessages(prev => [...prev, arrivalMessage])
        : setArrivalMessages(prev => [...prev, arrivalMessage]);
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

    if (message === "") return;

    const receiverId = currentDialog.userId;
    const msg = {
      senderId: user.id,
      receiverId,
      text: message,
    };
    const messages = { receiverId, text: message };

    socket.current.emit("newMessageToServer", msg);
    connected
      ? await addNewMessage(messages)
      : await addNewUnreadMessage(messages);

    setMessage("");
    setStartTyping(false);
  };

  const handleSendEther = async etherAmount => {
    const amount = (etherAmount * 0.00001).toString();

    try {
      // Set up the provider using MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      // Retrieve the connected wallet address
      const signer = provider.getSigner();

      // Define the transaction
      const transaction = {
        to: currentDialog.etherAddress, // Replace this with the receiver's Ethereum address
        value: ethers.utils.parseEther(amount), // Convert the amount from Ether to Wei
      };

      // Send the transaction
      const tx = await signer.sendTransaction(transaction);
      // console.log("Transaction sent:", tx.hash);

      const txReceipt = await provider.waitForTransaction(tx.hash);
      console.log(txReceipt);

      // Reset the Ether amount input field
    } catch (error) {
      console.error("Error sending Ether:", error);
    }
  };

  return (
    <div className="h-screen relative">
      <div className="h-1/6 bg-green-600"></div>
      <div className="h-5/6 bg-gray-300"></div>
      <div className="absolute inset-x-0 bottom-5 pt-10 container mx-auto h-full flex shadow-2xl">
        <Sidebar
          currentDialog={currentDialog}
          arrivalMessage={arrivalMessage}
          setArrivalMessage={msg => setArrivalMessage(msg)}
          setCurrentDialog={setCurrentDialog}
          setArrivalMessages={setArrivalMessages}
          setArrivalUnreadMessages={setArrivalUnreadMessages}
          setLastMessageDate={setLastMessageDate}
        />
        <div className="lg:w-3/4 md:w-3/4 w-1/2 h-full">
          {currentDialog ? (
            <div className="flex flex-col h-full">
              {/* User headline */}
              <UserHeader
                name={currentDialog?.name}
                lastConnected={
                  connected ? (typing ? "Typing..." : "Connected") : null
                }
                avatar={currentDialog?.avatar}
              />
              {/* Chat */}
              <div
                className="container pb-2 overflow-auto h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${"./wallpaper.png"})` }}
                ref={jumpToEndRef}
              >
                {renderedMessages}
                {msgNumber > 0 && (
                  <UnreadMessage msgNumber={msgNumber} jumpToRef={jumpToRef} />
                )}
                {renderedUnreadMessages}
              </div>
              {/* Input message */}
              <div className="flex p-3 bg-gray-200">
                <SendOptions handleSendEther={handleSendEther} />
                <input
                  type="text"
                  className="p-2 w-full rounded-lg focus:outline-none shadow-input shadow-gray-300"
                  placeholder="Type a message..."
                  autoFocus
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyUp={handleKeyUp}
                />
                <button className="py-2 px-3" onClick={handleSubmit}>
                  <PaperAirplaneIcon
                    className="h-7 w-7 text-gray-500"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          ) : (
            <AwaitPick />
          )}
        </div>
      </div>
    </div>
  );
};

export default WebScreen;
