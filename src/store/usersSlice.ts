import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersAPI } from "../api/fetchUsersAPI";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  username: string;
}

interface UsersState {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  total: 0,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    params: { page: number; pageSize: number; filter?: { key: string; value: string } },
    { rejectWithValue }
  ) => {
    try {
      return await fetchUsersAPI(params);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users. Please try again later."
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch users.";
      });
  },
});

export default usersSlice.reducer;
