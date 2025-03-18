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
  rows,
  columns,
  chipableInput,
  chipableArray,
  removeChip,
  height,
  small,
  popup,
  password,
  textArea, // if true, renders a textarea
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`${
        small ? "flex-1 flex flex-col gap-1" : "flex-1 flex flex-col gap-2"
      }`}
    >
      <label
        className={`text-xs px-1 ${error ? "text-red-500" : "text-gray-900"} ${
          small ? "text-xs" : ""
        } ${popup ? "text-gray-600" : ""}`}
      >
        {label}
      </label>
      <div
        className={`
          ${
            small
              ? "p-1 flex items-center gap-1 border border-gray-300 rounded-md"
              : "p-2 flex items-center gap-1 border border-gray-400 rounded-md"
          }
          ${error ? "border-red-500" : ""}
          ${popup ? "text-gray-600 border-gray-200" : ""}
          ${chipableInput ? `flex-col gap-1 min-h-[${height}]` : ""}
        `}
      >
        {chipableInput ? (
          <div className="flex flex-wrap gap-1">
            {chipableArray.map((chip, index) => (
              <div
                key={index}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded-md flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out"
                onClick={() => removeChip(name, index)}
              >
                <span>{chip}</span>
                <CloseRounded sx={{ fontSize: "12px" }} />
              </div>
            ))}
            <input
              className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-xs p-1"
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e) => handelChange(e)}
            />
          </div>
        ) : (
          <>
            {textArea ? (
              <textarea
                className={`w-full bg-transparent border-none outline-none text-gray-900 ${
                  small ? "text-xs p-1" : "text-sm p-2"
                }`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => handelChange(e)}
                rows={rows}
                cols={columns}
              />
            ) : (
              <input
                className={`w-full bg-transparent border-none outline-none text-gray-900 ${
                  small ? "text-xs p-1" : "text-sm p-2"
                }`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => handelChange(e)}
                type={password && !showPassword ? "password" : "text"}
              />
            )}
            {password && !textArea && (
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-900"
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
            popup ? "text-gray-600" : ""
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
