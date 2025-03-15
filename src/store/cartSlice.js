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
    isLoading: false,
    error: null,
    updateErrorMsg: null,
    updateSuccessMsg: null,
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
    addProductToCart: (state, { payload: { id, stock, price }, payload }) => {
      if (state.data[id]) {
        if (state.data[id].quantity < stock) {
          state.data[id].quantity++;
        } else {
          state.updateErrorMsg = {
            type: "addItem",
            msg: "There is no more stock of the item",
          };
          return;
        }
      } else {
        state.data = { ...state.data, [id]: { ...payload, quantity: 1 } };
        state.updateSuccessMsg = {
          type: "addItem",
          msg: "Item is added into the cart",
        };
      }
      state.total += price;
      state.totalProducts += 1;
      state.totalQuantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeProductFromCart: (state, { payload: { id } }) => {
      if (state.data[id]) {
        state.total -= state.data[id].price;
        state.totalProducts -= 1;
        state.totalQuantity -= 1;
        if (state.data[id].quantity === 1) {
          delete state.data[id];
        } else {
          state.data[id].quantity--;
        }
        state.updateSuccessMsg = {
          type: "removeItem",
          msg: "Successfully removed the item",
        };
        localStorage.setItem("cart", JSON.stringify(state));
      } else {
        state.updateErrorMsg = {
          type: "removeItem",
          msg: "there is no such product in cart",
        };
      }
    },
    deleteProductFromCart: (state, { payload: { id } }) => {
      if (state.data[id]) {
        state.total -= state.data[id].price * state.data[id].quantity;
        state.totalProducts -= 1;
        state.totalQuantity -= state.data[id].quantity;
        delete state.data[id];
        localStorage.setItem("cart", JSON.stringify(state));
        state.updateSuccessMsg = {
          type: "deleteItem",
          msg: "Successfully deleted the item",
        };
      } else {
        state.updateErrorMsg = {
          type: "deleteItem",
          msg: "there is no such product in cart",
        };
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchCartData.pending, (state, action) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(fetchCartData.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.data = action.payload.carts[0] || [];
  //   });
  //   builder.addCase(fetchCartData.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.error.message;
  //   });
  // },
});

export const cartReducer = slice.reducer;
export const {
  addProductToCart,
  removeProductFromCart,
  setCartData,
  deleteProductFromCart,
} = slice.actions;
