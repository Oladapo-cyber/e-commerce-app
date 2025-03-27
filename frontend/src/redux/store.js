// Import necessary modules from Redux Toolkit and redux-persist
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// Import default storage engine from redux-persist (localStorage for web)
import storage from "redux-persist/lib/storage";
// Import reducers
import userReducer from "./reducers/userSlice";
import snackbarReducer from "./reducers/snackbarSlice";

// Configuration object for redux-persist.
// key: the key for the persisted state in storage.
// version: version number of the persisted state.
// storage: the storage engine used (localStorage in this example).
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine multiple slice reducers into a single root reducer.
const rootReducer = combineReducers({
  user: userReducer,
  snackbar: snackbarReducer,
});

// Enhance the root reducer with persistence capabilities.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer and default middleware.
// Some actions from redux-persist are ignored for serializability checks.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor linked to the store, which will manage rehydration and persistence.
export const persistor = persistStore(store);
