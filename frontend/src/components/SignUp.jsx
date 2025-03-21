import { TextField } from "@mui/material";

/* eslint-disable react/prop-types */
const SignUp = ({ login, setLogin }) => {
  return (
    <div className="flex flex-col items-center w-full gap-2 justify-center h-full">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Dapstore</h1>
      <span className="text-gray-600 flex items-start">
        Enter your details to create a new account:{" "}
      </span>

      <div className="flex flex-col items-center justify-center gap-4 w-[80%]">
        <TextField
          type="text"
          label="Enter Full Name"
          variant="outlined"
          className="w-full max-w-sm mt-4"
        />
        <TextField
          type="email"
          label="Email Address"
          variant="outlined"
          className="w-full max-w-sm mt-4"
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          className="w-full max-w-sm mt-4"
        />
      </div>
      <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded mt-4">
        Sign Up
      </button>
      <p className="mt-2">
        Already have an account?
        <button
          className="text-blue-500 hover:text-blue-700 font-bold ml-1"
          onClick={() => setLogin(true)}
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default SignUp;
