const Contact = ({ name, lastMessage, image, onClick, receivedAt, active }) => {
  return (
    <li
      className={`${
        active && "bg-gray-400"
      } py-2 px-4 border-b border-gray-300 relative cursor-pointer hover:bg-gray-400`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src={image}
          alt="Contact Avatar"
          className="mx-2 w-10 h-10 rounded-full"
        />
        <div className="h-12 w-full overflow-hidden">
          <p className="font-medium text-lg w-10/12">{name}</p>
          <p className="text-sm text-gray-500 w-11/12">{lastMessage}</p>
        </div>
        <span className="text-xs text-gray-500 absolute top-4 right-4">
          {receivedAt}
        </span>
      </div>
    </li>
  );
};

export default Contact;
