import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("products/fetchData", async () => {
  try {
    const result = await fetch("https://dummyjson.com/products");
    return result.json();
  } catch (error) {
    throw error;
  }
});

console.dir(fetchData);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    list: [],
    error: "",
    currency: "$",
    delivery_fee: 10,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.products;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const productsReducer = productsSlice.reducer;
