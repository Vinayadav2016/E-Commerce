import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: `${username}@something.com`,
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
  async ({ username, password }) => {
    console.log("create user ", username, password);
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          email: `${username}@something.com`,
          password: password,
          avatar: "https://i.imgur.com/LDOO4Qs.jpg",
        }),
      }).then((res) => res.json());
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
            Authorization: `Bearer ${accessToken}1`,
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
  },
  reducers: {
    logOutUser: (state) => {
      state.data = {};
      state.loggedIn = false;
      state.isLoading = false;
      state.error = "";
      localStorage.clear();
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.data = { ...state.data, ...payload };
        localStorage.setItem("refreshToken", payload.refresh_token);
        state.loggedIn = true;
        localStorage.setItem("loggedIn", true);
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.error = error;
        state.isLoading = false;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.data.userCreated = true;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, { error }) => {
        state.error = error;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
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
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const userReducer = slice.reducer;
export const { logOutUser } = slice.actions;
