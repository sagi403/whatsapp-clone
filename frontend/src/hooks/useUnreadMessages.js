import { useMemo } from "react";
import Message from "../components/base/Message";

const useUnreadMessages = (arrivalUnreadMessages, lastMessageDate, userId) => {
  return useMemo(() => {
    const renderedUnreadMessages = [];
    let updatedLastMessageDate = lastMessageDate;

    const msgNumber = arrivalUnreadMessages.filter(
      msg => msg.receiverId === userId
    ).length;

    arrivalUnreadMessages.forEach(msg => {
      const isDifFromPrevValue =
        !updatedLastMessageDate || updatedLastMessageDate !== msg.date;

      renderedUnreadMessages.push(
        <Message
          own={msg.receiverId !== userId}
          text={msg.text}
          createdAt={msg.time}
          key={msg.id}
          date={msg.date}
          isDifFromPrevValue={isDifFromPrevValue}
        />
      );

      updatedLastMessageDate = msg.date;
    });

    return { renderedUnreadMessages, msgNumber };
  }, [arrivalUnreadMessages, lastMessageDate, userId]);
};

export default useUnreadMessages;
