import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContactList } from "../../fetchers/getContactList";
import { getMessages } from "../../fetchers/getMessages";
import Dialog from "./Dialog";
import { useAuth } from "../../hooks/useAuth";
import AddConversationModal from "../modals/AddConversation";
import { addNewConversation } from "../../fetchers/addNewConversation";

const Sidebar = ({
  currentDialog,
  arrivalMessage,
  setArrivalMessage,
  setCurrentDialog,
  setArrivalMessages,
  socket,
}) => {
  const [conversations, setConversations] = useState([]);
  const [newConversationId, setNewConversationId] = useState(null);
  const [showAddConversationModal, setShowAddConversationModal] =
    useState(false);

  const { data, error, refetch } = useQuery(["conversations"], getContactList, {
    staleTime: 3000,
  });

  const { user } = useAuth();

  useEffect(() => {
    if (socket.current) {
      socket.current?.on("messageToClient", data => {
        const { text, receiverId, senderId, time, id } = data;

        setArrivalMessage({ text, receiverId, senderId, time, id });
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

    setArrivalMessages(await getMessages(dialog.userId));
  };

  const handleAddConversation = () => {
    setShowAddConversationModal(true);
  };

  return (
    <div className="lg:w-1/4 md:w-1/4 w-1/2 bg-white flex flex-col">
      <div className="overflow-auto flex-1">
        <ul className="list-none p-0">
          {conversations?.map(dialog => (
            <Dialog
              name={dialog.name}
              lastMessage={
                arrivalMessage?.receiverId === dialog.userId ||
                dialog.userId === arrivalMessage?.senderId
                  ? arrivalMessage.text
                  : dialog.lastMessage
              }
              receivedAt={
                arrivalMessage?.receiverId === dialog.userId ||
                dialog.userId === arrivalMessage?.senderId
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
        <div className="text-sm text-gray-500 p-4">
          Your Id: <span className="">{user.id}</span>
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 w-full"
          onClick={handleAddConversation}
        >
          Add Conversation
        </button>
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
