import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import { createWrapper } from "next-redux-wrapper";
import { combineReducers } from 'redux';

// Combine your reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['dropdownValues'], // <-- only this part will persist
};

// Wrap combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with persisted reducer
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // important for redux-persist
      }),
  });
};

// Infer types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Create wrapper for Next.js
export const wrapper = createWrapper<AppStore>(makeStore);
