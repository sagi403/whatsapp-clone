import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContactList } from "../../fetchers/getContactList";
import { getMessages } from "../../fetchers/getMessages";
import Dialog from "./Dialog";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import AddConversationModal from "../modals/AddConversation";
import { addNewConversation } from "../../fetchers/addNewConversation";
import UserMenu from "./UserMenu";
import { addUnreadToRead } from "../../fetchers/addUnreadToRead";

const Sidebar = ({
  currentDialog,
  arrivalMessage,
  setArrivalMessage,
  setCurrentDialog,
  setArrivalMessages,
  setArrivalUnreadMessages,
}) => {
  const [conversations, setConversations] = useState([]);
  const [dialogMessage, setDialogMessage] = useState(null);
  const [newConversationId, setNewConversationId] = useState(null);
  const [showAddConversationModal, setShowAddConversationModal] =
    useState(false);

  const { data, error, refetch } = useQuery(["conversations"], getContactList, {
    staleTime: 3000,
  });

  const { user } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    if (socket.current) {
      socket.current.on("messageToClient", data => {
        setArrivalMessage(data);
      });

      socket.current.on("lastMessageToClient", data => {
        setDialogMessage(data);
      });

      // socket.current.on("updateMembers", data => {
      //   console.log(data);
      // });
    }
  }, [socket.current]);

  useEffect(() => {
    if (data) {
      setConversations(data);
    }
  }, [data]);

  useEffect(() => {
    if (newConversationId) {
      (async () => {
        await addNewConversation(newConversationId);

        refetch();
      })();
    }
  }, [newConversationId]);

  const handleDialogClick = async dialog => {
    setCurrentDialog(dialog);

    const { read, unread } = await getMessages(dialog.userId);

    setArrivalMessages(read);
    setArrivalUnreadMessages(unread);

    if (unread.length !== 0 && user.id === unread[0].receiverId) {
      await addUnreadToRead({ roomId: dialog.roomId });
      refetch();
    }
  };

  const handleAddConversation = () => {
    setShowAddConversationModal(true);
  };

  return (
    <div className="lg:w-1/4 md:w-1/3 w-1/2 bg-white flex flex-col">
      <div className="overflow-auto flex-1">
        <ul className="list-none p-0">
          {conversations?.map(dialog => (
            <Dialog
              name={dialog.name}
              lastMessage={
                dialogMessage?.senderId === dialog.userId
                  ? dialogMessage.text
                  : arrivalMessage?.receiverId === dialog.userId
                  ? arrivalMessage.text
                  : dialog.lastMessage
              }
              unreadMessagesNumber={
                dialog.unreadMessagesNumber > 0 &&
                dialog.lastSenderId !== user.id
                  ? dialog.unreadMessagesNumber
                  : null
              }
              receivedAt={
                dialogMessage?.senderId === dialog.userId
                  ? dialogMessage.time
                  : arrivalMessage?.receiverId === dialog.userId
                  ? arrivalMessage.time
                  : dialog.receivedAt
              }
              avatar={dialog.avatar}
              key={dialog.userId}
              active={currentDialog?.userId === dialog.userId}
              onClick={() => handleDialogClick(dialog)}
            />
          ))}
        </ul>
      </div>
      <div className="border-t-2 border-gray-300">
        <UserMenu
          username={user.username}
          avatar={user.avatarColors}
          onClick={handleAddConversation}
        />
      </div>
      <AddConversationModal
        show={showAddConversationModal}
        onHide={() => setShowAddConversationModal(false)}
        onAddConversation={id => setNewConversationId(id)}
      />
    </div>
  );
};

export default Sidebar;
