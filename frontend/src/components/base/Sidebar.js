import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { getContactList } from "../../fetchers/getContactList";
import { getMessages } from "../../fetchers/getMessages";
import Dialog from "./Dialog";
import { useAuth } from "../../hooks/useAuth";
import AddConversationModal from "../modals/AddConversation";
import { addNewConversation } from "../../fetchers/addNewConversation";

const Sidebar = ({
  currentDialog,
  setCurrentDialog,
  setArrivalMessages,
  setArrivalMessage,
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
    if (data) {
      setConversations(data);
      setCurrentDialog(data[0]);

      socket.current = io(`ws://localhost:8000/${data[0].roomId}`);
      socket.current.on("messageToClient", data => {
        const { text, receiverId, time, id } = data;

        setArrivalMessage({ text, receiverId, time, id });
      });
      // socket.current.on("updateMembers", data => {
      //   console.log(data);
      // });
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
    <div className="lg:w-1/4 md:w-1/4 w-1/2 bg-gray-200 flex flex-col">
      <div className="overflow-auto flex-1">
        <ul className="list-none p-0">
          {conversations?.map(dialog => (
            <Dialog
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
