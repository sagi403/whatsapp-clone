const SvgItem = ({ icon }) => {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d={icon} />
    </svg>
  );
};

export default SvgItem;
