const Message = ({ own, text, createdAt }) => {
  return (
    <>
      <div
        className={`${
          own ? "float-right bg-green-200" : "float-left bg-white"
        } py-2 pl-3 pr-10 rounded-lg mb-1 relative w-max clear-both lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs`}
      >
        <span className="pr-1.5">{text}</span>
        <span className="text-xs text-gray-500 absolute bottom-1.5 right-2">
          {createdAt}
        </span>
      </div>
    </>
  );
};

export default Message;
