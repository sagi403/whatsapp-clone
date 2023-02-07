const UserHeader = ({ name, lastConnected, image }) => {
  return (
    <div className="flex p-4 bg-gray-200">
      <img
        src={image}
        alt="Sender Avatar"
        className="w-10 h-10 rounded-full mr-4"
      />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{lastConnected}</p>
      </div>
    </div>
  );
};

export default UserHeader;
