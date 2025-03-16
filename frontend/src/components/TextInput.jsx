/* eslint-disable react/prop-types */
import { CloseRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  error,
  handelChange,
  // textArea,
  rows,
  columns,
  chipableInput,
  chipableArray,
  removeChip,
  height,
  small,
  popup,
  password,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`${
        small ? "flex-1 flex flex-col gap-2" : "flex-1 flex flex-col gap-1"
      }`}
    >
      <label
        className={`text-xs px-1 ${error ? "text-red-500" : "text-primary"} ${
          small ? "text-xs" : ""
        } ${popup ? "text-secondary" : ""}`}
      >
        {label}
      </label>
      <div
        className={`${
          small
            ? "text-primary p-2 flex items-center gap-3 border border-secondary rounded-md"
            : "text-primary p-4 flex items-center gap-3 border border-text-secondary rounded-md"
        } ${error ? "border-red-500" : ""} ${
          popup ? "text-popup-text-secondary border-popup-text-secondary" : ""
        } ${chipableInput ? `flex-col gap-2 min-h-[${height}]` : ""}`}
      >
        {chipableInput ? (
          <div className="flex flex-wrap gap-2">
            {chipableArray.map((chip, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-primary text-primary text-xs rounded-md flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out"
              >
                <span>{chip}</span>
                <CloseRounded
                  sx={{ fontSize: "14px" }}
                  onClick={() => removeChip(name, index)}
                />
              </div>
            ))}
            <input
              className="w-full bg-transparent border-none outline-none text-primary"
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e) => handelChange(e)}
            />
          </div>
        ) : (
          <>
            <input
              className={`w-full bg-transparent border-none outline-none text-primary ${
                small ? "text-sm" : ""
              }`}
              // as={textArea ? "textarea" : "input"}
              name={name}
              rows={rows}
              cols={columns}
              placeholder={placeholder}
              value={value}
              onChange={(e) => handelChange(e)}
              type={password && !showPassword ? "password" : "text"}
            />
            {password && (
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-primary"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </button>
            )}
          </>
        )}
      </div>
      {error && (
        <p
          className={`text-xs text-red-500 px-1 ${small ? "text-xs" : ""} ${
            popup ? "text-popup-text-secondary" : ""
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
