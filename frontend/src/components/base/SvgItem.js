const SvgItem = ({ icon, viewBox = "0 0 24 24", fill = "none" }) => {
  return (
    <svg
      className="h-6 w-6"
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox={viewBox}
      stroke="currentColor"
    >
      <path d={icon} />
    </svg>
  );
};

export default SvgItem;
