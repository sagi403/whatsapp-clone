import UserAvatar from "./UserAvatar";

const UserHeader = ({ name, lastConnected, avatar }) => {
  return (
    <div className="flex p-2 bg-gray-200 border-l border-gray-300">
      <UserAvatar name={name} colors={avatar} />
      <div>
        <p className="font-normal">{name}</p>
        <p className="text-xs text-gray-500">{lastConnected}</p>
      </div>
    </div>
  );
};

export default UserHeader;
