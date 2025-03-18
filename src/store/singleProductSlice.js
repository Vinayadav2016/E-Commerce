import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductData = createAsyncThunk(
  "product/fetchData",
  async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);
const slice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    error: "",
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductData.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProductData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProductData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export const productReducer = slice.reducer;
