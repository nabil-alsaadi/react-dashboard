import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import productssReducer from "./productsSlice";
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productssReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
