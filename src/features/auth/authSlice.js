import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  users:[],
  userInfo: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message = error.response.data.errors[0].message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await authService.logout();
  } catch (error) {
    console.error(error);
  }
});

export const getAllUsers = createAsyncThunk("auth/getAllUsers", async () => {
  try {
    return await authService.getAllUsers();
  } catch (error) {
    console.error(error);
  }
});

export const loggedIn = createAsyncThunk("auth/loggedIn", async () => {
  try {
    return await authService.loggedIn();
  } catch (error) {
    console.error(error);
  }
});

export const deleteUserById = createAsyncThunk(
  "auth/deleteUserById",
  async (_id) => {
    try {
      return await authService.deleteUserById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateUserById = createAsyncThunk(
  "auth/updateUserById",
  async (myObj) => {
    try {
      return await authService.updateUserById(myObj);
    } catch (error) {
      console.error(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    resetPassword: (state) => {
      state.user.password = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(loggedIn.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })

      .addCase(loggedIn.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload.user._id
        );
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(updateUserById.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        
      });
  },
});

export const { reset, resetPassword } = authSlice.actions;

export default authSlice.reducer;
