import UserAvatar from "./UserAvatar";

const UserHeader = ({ name, lastConnected, avatar }) => {
  return (
    <div className="flex p-4 bg-gray-200">
      <UserAvatar name={name} colors={avatar} />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{lastConnected}</p>
      </div>
    </div>
  );
};

export default UserHeader;
