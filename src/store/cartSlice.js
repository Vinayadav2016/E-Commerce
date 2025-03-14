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
    updateErrorMsg: null,
    updateSuccessMsg: null,
    data: null,
  },
  reducers: {
    addProductToCart: (state, { payload: { data, id } }) => {
      if (state.data[id]) {
        if (state.data[id].quantity < data.stock) state.data[id].quantity++;
        else
          state.updateErrorMsg = {
            type: "addItem",
            msg: "There is no more stock of the item",
          };
      } else {
        state.data[id] = { ...data, quantity: 1 };
        state.updateSuccessMsg = {
          type: "addItem",
          msg: "Item is added into the cart",
        };
      }
    },
    removeProductFromCart: (state, { payload: { id } }) => {
      if (state.data[id]) {
        if (state.data[id].quantity === 1) {
          delete state.data[id];
        } else {
          state.data[id].quantity--;
        }
        state.updateSuccessMsg = {
          type: "removeItem",
          msg: "Successfully removed the item",
        };
      } else {
        state.updateErrorMsg = {
          type: "removeItem",
          msg: "there is no such product in cart",
        };
      }
    },
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
export const { addProductToCart, removeProductFromCart } = slice.actions;
