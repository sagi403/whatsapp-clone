import { useEffect, useMemo, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import Message from "../base/Message";
import UserHeader from "../base/UserHeader";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import Sidebar from "../base/Sidebar";
import { addNewMessage } from "../../fetchers/addNewMessage";
import AwaitPick from "../base/AwaitPick";
import { addNewUnreadMessage } from "../../fetchers/addNewUnreadMessage";
import UnreadMessage from "../base/UnreadMessage";

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

  const msgNumber = useMemo(
    () =>
      arrivalUnreadMessages.filter(msg => msg.receiverId === user.id).length,
    [arrivalUnreadMessages, user]
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
      arrivalUnreadMessages.length > 0 &&
      arrivalUnreadMessages[0].receiverId === user.id
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

  return (
    <>
      <div className="container mx-auto h-screen flex">
        <Sidebar
          currentDialog={currentDialog}
          arrivalMessage={arrivalMessage}
          setArrivalMessage={msg => setArrivalMessage(msg)}
          setCurrentDialog={setCurrentDialog}
          setArrivalMessages={setArrivalMessages}
          setArrivalUnreadMessages={setArrivalUnreadMessages}
          setLastMessageDate={setLastMessageDate}
        />
        <div className="lg:w-3/4 md:w-3/4 w-1/2 h-screen">
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
                {arrivalMessages?.map((msg, index) => {
                  const isDifFromPrevValue =
                    index === 0 ||
                    msg.date !== arrivalMessages[index - 1]?.date;

                  return (
                    <Message
                      own={msg.receiverId !== user.id}
                      text={msg.text}
                      createdAt={msg.time}
                      key={msg.id}
                      date={msg.date}
                      isDifFromPrevValue={isDifFromPrevValue}
                    />
                  );
                })}
                {msgNumber > 0 && (
                  <UnreadMessage msgNumber={msgNumber} jumpToRef={jumpToRef} />
                )}
                {arrivalUnreadMessages?.map((msg, index) => {
                  const isDifFromPrevValue =
                    msg.date !== lastMessageDate ||
                    (index > 0 &&
                      msg.date !== arrivalUnreadMessages[index - 1]?.date);

                  return (
                    <Message
                      own={msg.receiverId !== user.id}
                      text={msg.text}
                      createdAt={msg.time}
                      key={msg.id}
                      date={msg.date}
                      isDifFromPrevValue={isDifFromPrevValue}
                    />
                  );
                })}
              </div>
              {/* Input message */}
              <div className="flex p-3">
                <input
                  type="text"
                  className="p-2 w-full rounded-lg"
                  placeholder="Type a message..."
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
    </>
  );
};

export default WebScreen;
