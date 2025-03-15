import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "wishlist",
  initialState: {
    isLoading: false,
    error: "",
    success: "",
    list: {},
  },
  reducers: {
    setWishlistData: (state, { payload }) => {
      if (payload) return payload;
    },
    addItemToWishList: (state, { payload }) => {
      if (state.list[payload.id]) {
        state.error = {
          type: "addItemToWishList",
          msg: "Item is already added in Wishlist ",
        };
      } else {
        state.list = { ...state.list, [payload.id]: payload };
        localStorage.setItem("wishlist", JSON.stringify(state));
        state.success = {
          type: "addItemToWishList",
          msg: "Item is added into the Wishlist ",
        };
      }
    },
    removeItemFromWishList: (state, { payload: id }) => {
      if (state.list[id]) {
        delete state.list[id];
        localStorage.setItem("wishlist", JSON.stringify(state));
        state.success = {
          type: "removeItemFromWishList",
          msg: "Item is removed from the Wishlist ",
        };
      } else {
        state.error = {
          type: "removeItemFromWishList",
          msg: "Item is not found in Wishlist ",
        };
      }
    },
  },
});
export const wishlistReducer = slice.reducer;
export const { setWishlistData, addItemToWishList, removeItemFromWishList } =
  slice.actions;
