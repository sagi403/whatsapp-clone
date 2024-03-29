const UnreadMessage = ({ msgNumber, jumpToRef }) => {
  return (
    <div className="py-1 my-2 bg-orange-100 bg-opacity-30">
      <div
        className={`mx-auto bg-white text-gray-600 text-xs py-2 px-6 rounded-full w-max clear-both lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs`}
        ref={jumpToRef}
      >
        <span className="pr-1.5">{`${msgNumber} UNREAD MESSAGE${
          msgNumber > 1 ? "S" : ""
        }`}</span>
      </div>
    </div>
  );
};

export default UnreadMessage;
