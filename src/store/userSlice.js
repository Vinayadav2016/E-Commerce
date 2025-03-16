import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password, // optional, defaults to 60
          }),
        }
      );

      // **Handle HTTP errors manually**
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ username, password, email }, { rejectWithValue }) => {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
          avatar: "https://picsum.photos/800",
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw rejectWithValue(errorData.message);
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
);

const refreshAccessToken = async () => {
  try {
    const res = await fetch(
      "https://api.escuelajs.co/api/v1/auth/refresh-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchUserData = createAsyncThunk(
  "user/fetchData",
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      let res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 401) {
        let tokenData = await refreshAccessToken();
        if (!tokenData.ok) {
          return rejectWithValue(tokenData);
        }
        tokenData = await tokenData.json();
        accessToken = tokenData.access_token;
        localStorage.setItem("refreshToken", tokenData.refresh_token);
        res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      const data = await res.json();
      if (res.ok) {
        return { ...data, access_token: accessToken };
      } else {
        return rejectWithValue(data);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const slice = createSlice({
  name: "user",
  initialState: {
    data: {},
    isLoading: false,
    loggedIn: localStorage.getItem("loggedIn") ? true : false,
    error: "",
    success: "",
  },
  reducers: {
    logOutUser: () => {
      localStorage.clear();
      window.location.reload();
    },
    resetUserMsgs: (state) => {
      state.success = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.data = { ...state.data, ...payload };
        localStorage.setItem("refreshToken", payload.refresh_token);
        state.loggedIn = true;
        state.success = "User is logged in";
        localStorage.setItem("loggedIn", true);
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload?.message;
        state.isLoading = false;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state) => {
        state.data.userCreated = true;
        state.success = "User created successfully";
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, { payload, error }) => {
        state.error = payload?.message || error?.message;
        state.isLoading = false;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        console.log(action);
        state.data = { ...state.data, ...action.payload };
        state.loggedIn = true;
        localStorage.setItem("loggedIn", true);
        state.isLoading = false;
      })
      .addCase(fetchUserData.rejected, (state, { payload }) => {
        state.loggedIn = false;
        state.data = {};
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("loggedIn");
        state.error = "Session Timeout. Please Login!!!";
        state.isLoading = false;
      });
  },
});

export const userReducer = slice.reducer;
export const { logOutUser, resetUserMsgs } = slice.actions;
