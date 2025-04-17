import { Button, TextField } from "@mui/material";
import { UserSignUp } from "../api";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginSuccess } from "../redux/reducers/userSlice";

/* eslint-disable react/prop-types */
const SignUp = ({ login, setLogin }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Enter all fields");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignUp({ name, email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          dispatch(
            openSnackbar({
              message: "Sign up Successful",
              severity: "Success",
            })
          );
          setLoading(false);
          setButtonDisabled(false);
          setOpenAuth(false);
        })
        .catch((error) => {
          setButtonDisabled(false);
          if (error.response) {
            setLoading(false);
            setButtonDisabled(false);
            alert(error.response.data.message);
            dispatch(
              openSnackbar({
                message: error.response.data.message,
                severity: "error",
              })
            );
          } else {
            setLoading(false);
            setButtonDisabled(false);
            dispatch(
              openSnackbar({
                message: error.message,
                severity: "error",
              })
            );
          }
        });
    }

    setButtonDisabled(false);
    setLoading(false);
  };

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
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="email"
          label="Email Address"
          variant="outlined"
          className="w-full max-w-sm mt-4"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          className="w-full max-w-sm mt-4"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        onClick={handleSignup}
        isLoading={loading}
        isDisabled={buttonDisabled}
        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded mt-4"
      >
        Sign Up
      </Button>
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
