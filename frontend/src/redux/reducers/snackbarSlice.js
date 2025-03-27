// Import createSlice function from Redux Toolkit to help create a slice of the store
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the snackbar slice
const initialState = {
  // Indicates whether the snackbar is currently visible
  open: false,
  // The message to display in the snackbar
  message: "",
  // The severity level of the snackbar (e.g., "success", "error")
  severity: "success",
};

// Create the snackbar slice, which automatically generates actions and reducers
export const snackbarSlice = createSlice({
  // The name of the slice for action type prefixes
  name: "snackbar",
  // Set the initial state defined above
  initialState,
  // Define reducers which specify how state is updated based on actions
  reducers: {
    // Reducer to open the snackbar
    // It takes an action payload containing a message and severity, and sets the state accordingly
    openSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    // Reducer to close the snackbar by setting open to false
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

// Export the generated action creators so they can be dispatched from components
export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

// Export the reducer to be included in the Redux store
export default snackbarSlice.reducer;
