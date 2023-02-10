import SvgItem from "./SvgItem";

const FormInputItem = ({ type, id, placeholder, icon }) => {
  return (
    <div className={`flex flex-col mb-6`}>
      <label
        htmlFor={id}
        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
      >
        {placeholder}
      </label>
      <div className="relative">
        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
          <SvgItem icon={icon} />
        </div>

        <input
          id={id}
          type={type}
          name={id}
          className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default FormInputItem;
