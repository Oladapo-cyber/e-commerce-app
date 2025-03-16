/* eslint-disable react/prop-types */
import { CircularProgress } from "@mui/material";
const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  return (
    <button
      onClick={() => !isDisabled && !isLoading && onClick()}
      className={`
        ${isDisabled || isLoading ? "opacity-80 cursor-not-allowed" : ""}
        ${
          type === "secondary"
            ? "bg-secondary border-secondary"
            : "bg-primary border-primary"
        }
        ${
          outlined
            ? "bg-transparent text-primary border-2 border-primary shadow-none"
            : "shadow-lg"
        }
        ${flex ? "flex-1" : ""}
        ${small ? "px-6 py-2" : "px-6 py-4"}
        ${full ? "w-full" : ""}
        rounded-lg text-black bg-amber-300 mt-3.5 text-md font-bold w-full flex items-center justify-center gap-2
        transition-all duration-300 ease-in-out
      `}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </button>
  );
};

export default Button;
