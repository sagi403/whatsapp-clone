import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContactList } from "../../fetchers/getContactList";
import { getMessages } from "../../fetchers/getMessages";
import Dialog from "./Dialog";

const Sidebar = ({ currentDialog, setCurrentDialog, setArrivalMessages }) => {
  const [conversations, setConversations] = useState([]);

  const { data, error } = useQuery(["conversations"], getContactList, {
    staleTime: 60000,
  });

  useEffect(() => {
    if (data) {
      setConversations(data);
      setCurrentDialog(data[0]);
    }
  }, [data]);

  const handleDialogClick = async dialog => {
    setCurrentDialog(dialog);

    setArrivalMessages(await getMessages(dialog.userId));
  };

  return (
    <div className="lg:w-1/4 md:w-1/4 w-1/2 bg-gray-200 h-screen">
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
  );
};

export default Sidebar;
