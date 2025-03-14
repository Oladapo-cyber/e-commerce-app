/* eslint-disable react/prop-types */
const CardWrapper = ({ children }) => {
  // className="flex flex-wrap gap-6 justify-center"
  return (
    <div className="mx-3 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {children}
    </div>
  );
};

export default CardWrapper;
