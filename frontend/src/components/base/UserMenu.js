import { Menu, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import {
  EllipsisVerticalIcon,
  ArrowLeftOnRectangleIcon,
  DocumentDuplicateIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import UserAvatar from "./UserAvatar";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";

const UserMenu = ({ username, avatar, onClick }) => {
  const idRef = useRef(null);

  const { user, logout } = useAuth();
  const { socket } = useSocket();

  const handleCopyId = () => {
    navigator.clipboard.writeText(idRef.current.innerText);
  };

  const logoutUser = () => {
    socket.current.disconnect("User logged out");
    logout();
  };

  return (
    <div className="w-full">
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <Menu.Button className="inline-flex w-full bg-gray-200 px-4 py-2 text-lg font-normal text-gray-600 hover:bg-opacity-30">
            <div className="flex items-center w-full justify-between overflow-hidden">
              <UserAvatar name={username} colors={avatar} />
              {username}
              <EllipsisVerticalIcon
                className="h-7 w-7 text-gray-500"
                aria-hidden="true"
              />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 top-full w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item disabled>
                <div className="flex justify-between overflow-hidden">
                  <div className="text-sm text-gray-500 p-3">
                    Your Id: <span ref={idRef}>{user.id}</span>
                  </div>
                  <button
                    onClick={handleCopyId}
                    className="p-3 active:translate-y-0.5"
                  >
                    <DocumentDuplicateIcon
                      className="h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onClick}
                    className={`${
                      active ? "bg-green-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <UserPlusIcon
                      className={`mr-2 h-5 w-5 ${
                        active ? "text-green-600" : "text-green-400"
                      }`}
                      aria-hidden="true"
                    />
                    Add Conversation
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logoutUser}
                    className={`${
                      active ? "bg-green-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <ArrowLeftOnRectangleIcon
                      className={`mr-2 h-5 w-5 ${
                        active ? "text-green-600" : "text-green-400"
                      }`}
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserMenu;
