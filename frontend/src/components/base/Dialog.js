import UserAvatar from "./UserAvatar";

const Dialog = ({
  name,
  lastMessage,
  unreadMessagesNumber,
  avatar,
  onClick,
  receivedAt,
  active,
}) => {
  return (
    <li
      className={`${
        active && "bg-gray-200"
      } py-3 px-4 border-b border-gray-300 relative cursor-pointer hover:bg-gray-200`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <UserAvatar name={name} colors={avatar} />
        <div className="h-12 w-full overflow-hidden">
          <p
            className={`${
              unreadMessagesNumber ? "font-medium" : "font-normal"
            } text-lg w-10/12`}
          >
            {name}
          </p>
          <p className="text-sm text-gray-500 w-11/12">{lastMessage}</p>
        </div>
        <span
          className={`${
            unreadMessagesNumber ? "text-green-600" : "text-gray-500"
          } text-xs absolute top-4 right-4`}
        >
          {receivedAt}
        </span>
        <div className="absolute top-9 right-4">
          {unreadMessagesNumber && (
            <p className="flex h-2 w-2 min-w-min items-center justify-center rounded-full bg-green-400 py-3 px-2 text-xs text-white">
              {unreadMessagesNumber}
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

export default Dialog;
