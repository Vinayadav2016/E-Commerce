import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchCartData = createAsyncThunk(
//   "cart/fetchData",
//   async (userId) => {
//     try {
//       const response = await fetch(
//         `https://dummyjson.com/carts/user/${userId}`
//       );
//       return response.json();
//     } catch (error) {
//       throw error;
//     }
//   }
// );

const slice = createSlice({
  name: "cart",
  initialState: {
    errorMsg: null,
    successMsg: null,
    data: {},
    total: 0,
    totalProducts: 0,
    totalQuantity: 0,
    shippingFee: 200,
  },
  reducers: {
    setCartData: (state, { payload }) => {
      if (payload) return payload;
    },
    resetCart: (state) => {
      state.errorMsg = null;
      state.successMsg = null;
      state.data = {};
      state.total = 0;
      state.totalProducts = 0;
      state.totalQuantity = 0;
      localStorage.removeItem("cart");
    },
    resetCartMsgs: (state) => {
      state.errorMsg = null;
      state.successMsg = null;
    },
    setCartError: (state, { payload }) => {
      state.errorMsg = payload;
    },
    addProductToCart: (state, { payload: { id, stock, price }, payload }) => {
      if (state.data[id]) {
        if (state.data[id].quantity < stock) {
          state.data[id].quantity++;
        } else {
          state.errorMsg = {
            type: "addItem",
            msg: "There is no more stock of the item",
          };
          return;
        }
      } else {
        state.data = { ...state.data, [id]: { ...payload, quantity: 1 } };
        state.totalProducts += 1;
      }
      state.total += price;
      state.total = Math.round(state.total * 100) / 100;
      state.totalQuantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeProductFromCart: (state, { payload: { id } }) => {
      if (state.data[id]) {
        state.total -= state.data[id].price;
        state.total = Math.round(state.total * 100) / 100;
        state.totalQuantity -= 1;
        if (state.data[id].quantity === 1) {
          delete state.data[id];
          state.totalProducts -= 1;
          state.successMsg = {
            type: "deleteItem",
            msg: "Successfully removed the item",
          };
        } else {
          state.data[id].quantity--;
        }
        localStorage.setItem("cart", JSON.stringify(state));
      } else {
        state.errorMsg = {
          type: "removeItem",
          msg: "there is no such product in cart",
        };
      }
    },
    deleteProductFromCart: (state, { payload: { id } }) => {
      if (state.data[id]) {
        state.total -= state.data[id].price * state.data[id].quantity;
        state.total = Math.round(state.total * 100) / 100;
        state.totalProducts -= 1;
        state.totalQuantity -= state.data[id].quantity;
        delete state.data[id];
        localStorage.setItem("cart", JSON.stringify(state));
        state.successMsg = {
          type: "deleteItem",
          msg: "Successfully removed the item",
        };
      } else {
        state.errorMsg = {
          type: "deleteItem",
          msg: "there is no such product in cart",
        };
      }
    },
  },
});

export const cartReducer = slice.reducer;
export const {
  addProductToCart,
  removeProductFromCart,
  setCartData,
  deleteProductFromCart,
  resetCartMsgs,
  setCartError,
  resetCart,
} = slice.actions;
