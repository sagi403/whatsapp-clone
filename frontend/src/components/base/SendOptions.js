import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BoltIcon } from "@heroicons/react/20/solid";
import { ETHER_SEND_AMOUNT } from "../../constants/consts";

const SendOptions = ({ handleSendEther }) => {
  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="py-2 px-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 focus:outline-none">
            <BoltIcon className="h-7 w-7 text-yellow-500" aria-hidden="true" />
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
          <Menu.Items className="absolute left-0 top-0 mt-[-48px] rounded-md shadow-lg bg-opacity-20 bg-gray-500">
            <div className="flex justify-around py-1" role="none">
              {ETHER_SEND_AMOUNT.map((amount, index) => (
                <Menu.Item key={index}>
                  <button
                    className="text-gray-700 mx-1 bg-white border-2 border-yellow-400 rounded-full w-10 h-10 flex items-center justify-center hover:bg-yellow-100 focus:outline-none"
                    role="menuitem"
                    tabIndex="-1"
                    onClick={() => handleSendEther(amount)}
                  >
                    {amount}
                  </button>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default SendOptions;
