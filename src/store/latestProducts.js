import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLatestProducts = createAsyncThunk(
  "latestProducts/fetchData",
  async () => {
    try {
      const result = await fetch(
        "https://dummyjson.com/products?limit=20&skip=0&sortBy=id&order=desc"
      );
      return result.json();
    } catch (error) {
      throw error;
    }
  }
);
const slice = createSlice({
  name: "latestProducts",
  initialState: {
    isLoading: false,
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLatestProducts.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchLatestProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.products;
    });
    builder.addCase(fetchLatestProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export const latestProductsReducer = slice.reducer;
