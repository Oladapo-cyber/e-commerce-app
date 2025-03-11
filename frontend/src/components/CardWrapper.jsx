/* eslint-disable react/prop-types */
const CardWrapper = ({ children, className }) => {
  // className="flex flex-wrap gap-6 justify-center"
  return <div className={className}>{children}</div>;
};

export default CardWrapper;
