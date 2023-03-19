import SvgItem from "./SvgItem";
import { passwordSvg } from "../../data/svg";

const AwaitPick = () => {
  return (
    <div className="flex flex-col justify-center h-full bg-gray-100">
      <div className="flex-grow flex flex-col justify-center items-center text-center">
        <p className="font-extralight text-4xl p-4 text-gray-600">
          WhatsApp Clone
        </p>
        <p className="text-gray-500">
          Now send and receive messages without keeging your phone online.
        </p>
        <p className="text-gray-500">
          Use WhatsApp on multiple devices at the same time.
        </p>
        <div className="fixed bottom-10 w-full">
          <p className="flex items-center justify-center text-gray-400 text-sm">
            <SvgItem icon={passwordSvg} /> End to end encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default AwaitPick;
