const MessageSentDate = ({ date }) => {
  return (
    <div
      className={`mx-auto bg-blue-100 py-2 px-6 rounded-lg mb-1 relative w-max clear-both lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs`}
    >
      <span className="pr-1.5">{date}</span>
    </div>
  );
};

export default MessageSentDate;
