import UserAvatar from "./UserAvatar";

const Dialog = ({
  name,
  lastMessage,
  unreadMessageNumber,
  avatar,
  onClick,
  receivedAt,
  active,
}) => {
  return (
    <li
      className={`${
        active && "bg-gray-400"
      } py-3 px-4 border-b border-gray-300 relative cursor-pointer hover:bg-gray-400`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <UserAvatar name={name} colors={avatar} />
        <div className="h-12 w-full overflow-hidden">
          <p className="font-medium text-lg w-10/12">{name}</p>
          <p className="text-sm text-gray-500 w-11/12">{lastMessage}</p>
        </div>
        <span className="text-xs text-gray-500 absolute top-4 right-4">
          {receivedAt}
        </span>
        <div className="absolute top-9 right-4">
          {unreadMessageNumber && (
            <p className="flex h-2 w-2 min-w-min items-center justify-center rounded-full bg-green-400 py-3 px-2 text-xs text-white">
              {unreadMessageNumber}
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

export default Dialog;
