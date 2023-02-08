const Contact = ({ name, lastMessage, image, onClick, receivedAt }) => {
  return (
    <li
      className="py-2 border-b border-gray-300 relative cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src={image}
          alt="Contact Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-2 h-12 w-full overflow-hidden">
          <p className="font-medium text-lg w-10/12">{name}</p>
          <p className="text-sm text-gray-500 w-11/12">{lastMessage}</p>
        </div>
        <span className="text-xs text-gray-500 absolute top-4 right-2">
          {receivedAt}
        </span>
      </div>
    </li>
  );
};

export default Contact;
