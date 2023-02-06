import React from "react";

const ContactList = () => {
  return (
    <li className="py-2 border-b border-gray-300">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/50x50"
          alt="Contact Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-2">
          <p className="font-medium text-lg">John Doe</p>
          <p className="text-sm text-gray-500">Last message...</p>
        </div>
      </div>
    </li>
  );
};

export default ContactList;
