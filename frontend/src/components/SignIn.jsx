import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { UserSignIn } from "../api/index";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
const SignIn = ({ login, setOpenAuth, setLogin }) => {
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateInputs = () => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setButtonLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          dispatch(
            openSnackbar({
              message: "Login Successful",
              severity: "Success",
            })
          );
          // Close the sign-in modal after successful login
          setOpenAuth(false);
        })
        .catch((err) => {
          if (err.response) {
            setButtonLoading(false);
            setButtonDisabled(false);
            alert(err.response.data.message);
            dispatch(
              openSnackbar({
                message: err.response.data.message,
                severity: "error",
              })
            );
          } else {
            setButtonLoading(false);
            setButtonDisabled(false);
            dispatch(
              openSnackbar({
                message: err.message,
                severity: "error",
              })
            );
          }
        });
    }
    setButtonDisabled(false);
    setButtonLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full gap-2 justify-center h-full">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Dapstore</h1>
      <p className="text-gray-600 flex items-start">Sign in to continue</p>

      <div className="flex flex-col items-center justify-center gap-4 w-[80%]">
        <TextField
          size="small"
          type="email"
          label="Email Address"
          variant="outlined"
          className="w-full max-w-sm mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          size="small"
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          className="w-full max-w-sm mt-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <div className="w-full max-w-sm text-right">
          <button className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </button>
        </div>
      </div>
      <button
        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded mt-4"
        onClick={handleSignIn}
        disabled={buttonDisabled}
      >
        {buttonLoading ? "Loading..." : "Sign In"}
      </button>
      <p className="mt-2">
        Don&apos;t have an account?
        <button className="text-blue-500 hover:text-blue-700 font-bold ml-1">
          Sign up
        </button>
      </p>
    </div>
  );
};

export default SignIn;
