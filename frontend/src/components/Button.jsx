/* eslint-disable react/prop-types */
import { CircularProgress } from "@mui/material";

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  return (
    <button
      onClick={() => {
        if (!isDisabled && !isLoading && onClick) onClick();
      }}
      disabled={isDisabled || isLoading}
      className={`
        ${isDisabled || isLoading ? "opacity-80 cursor-not-allowed" : ""}
        ${
          outlined
            ? "bg-transparent text-blue-500 border border-blue-500"
            : "bg-blue-500 text-white border border-blue-500"
        }
        ${flex ? "flex-1" : ""}
        ${small ? "px-4 py-1.5 text-sm" : "px-5 py-2 text-base"}
        ${full ? "w-full" : ""}
        rounded-lg mt-2 font-bold flex items-center justify-center gap-2
        transition duration-200 ease-in-out hover:opacity-90
      `}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "16px", height: "16px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> ...</>}
      {rightIcon}
    </button>
  );
};

export default Button;
