import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRelatedData = createAsyncThunk(
  "relatedProducts/fetchData",
  async (category) => {
    try {
      const result = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      return result.json();
    } catch (error) {
      throw error;
    }
  }
);
const slice = createSlice({
  name: "relatedProducts",
  initialState: {
    isLoading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedData.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchRelatedData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.products;
    });
    builder.addCase(fetchRelatedData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export const relatedProductsReducer = slice.reducer;
