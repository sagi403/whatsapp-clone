const ContactList = ({ name, lastMessage, image, onClick }) => {
  return (
    <li className="py-2 border-b border-gray-300" onClick={onClick}>
      <div className="flex items-center">
        <img
          src={image}
          alt="Contact Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-2">
          <p className="font-medium text-lg">{name}</p>
          <p className="text-sm text-gray-500">{lastMessage}</p>
        </div>
      </div>
    </li>
  );
};

export default ContactList;
