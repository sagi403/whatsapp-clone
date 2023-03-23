import { useMemo } from "react";
import Message from "../components/base/Message";

const useMessages = (arrivalMessages, userId) => {
  return useMemo(() => {
    const renderedMessages = [];
    let lastMessageDate = null;

    arrivalMessages.forEach(msg => {
      const isDifFromPrevValue =
        !lastMessageDate || lastMessageDate !== msg.date;

      renderedMessages.push(
        <Message
          own={msg.receiverId !== userId}
          text={msg.text}
          createdAt={msg.time}
          key={msg.id}
          date={msg.date}
          isDifFromPrevValue={isDifFromPrevValue}
        />
      );

      lastMessageDate = msg.date;
    });

    return { renderedMessages };
  }, [arrivalMessages, userId]);
};

export default useMessages;
