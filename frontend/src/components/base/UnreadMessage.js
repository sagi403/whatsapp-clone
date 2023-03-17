const UnreadMessage = ({ msgNumber, jumpToRef }) => {
  return (
    <div
      className={`mx-auto bg-white py-2 px-6 rounded-full mb-1 relative w-max clear-both lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs`}
      ref={jumpToRef}
    >
      <span className="pr-1.5">{`${msgNumber} UNREAD MESSAGE${
        msgNumber > 1 ? "S" : ""
      }`}</span>
    </div>
  );
};

export default UnreadMessage;
