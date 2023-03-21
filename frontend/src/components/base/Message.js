const Message = ({ own, text, createdAt, date, isDifFromPrevValue }) => {
  return (
    <>
      {isDifFromPrevValue && (
        <div
          className={`mx-auto bg-sky-100 text-gray-600 text-xs py-2 px-6 m-2 rounded-lg w-max clear-both lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs`}
        >
          <span className="pr-1.5">{date}</span>
        </div>
      )}
      <div
        className={`${
          own ? "ml-auto mr-8 bg-green-200" : "mr-auto ml-8 bg-white"
        } py-2 pl-3 pr-10 rounded-lg mb-1 relative w-max clear-both lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs shadow`}
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
