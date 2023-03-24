const getDialogProperties = (dialog, dialogMessage, arrivalMessage, user) => {
  const lastMessage =
    dialogMessage?.senderId === dialog.userId
      ? dialogMessage.text
      : arrivalMessage?.receiverId === dialog.userId
      ? arrivalMessage.text
      : dialog.lastMessage;

  const unreadMessagesNumber =
    dialog.unreadMessagesNumber > 0 && dialog.lastSenderId !== user.id
      ? dialog.unreadMessagesNumber
      : null;

  const receivedAt =
    dialogMessage?.senderId === dialog.userId
      ? dialogMessage.time
      : arrivalMessage?.receiverId === dialog.userId
      ? arrivalMessage.time
      : dialog.receivedAt;

  return { lastMessage, unreadMessagesNumber, receivedAt };
};

export default getDialogProperties;
