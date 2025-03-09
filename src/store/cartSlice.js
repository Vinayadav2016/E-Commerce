import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCartData = createAsyncThunk(
  "cart/fetchData",
  async (userId) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/carts/user/${userId}`
      );
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);

const slice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    error: null,
    data: null,
  },
  reducers: {
    // addProductIntoCart(state, action) {
    //   const index = state.data.products.findIndex(
    //     (product) => product.id === action.payload.id
    //   );
    //   if (index == -1) {
    //     state.data.products.push(action.payload);
    //   } else {
    //     state.data.products[index].quantity += action.payload.quantity;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartData.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.carts[0] || [];
    });
    builder.addCase(fetchCartData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const cartReducer = slice.reducer;
