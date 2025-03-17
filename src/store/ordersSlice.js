import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "orders",
  initialState: {
    isLoading: false,
    error: "",
    success: "",
    data: [],
  },
  reducers: {
    addOrderData: (state, { payload }) => {
      console.log("add order ", payload);
      state.data.push(payload);
      localStorage.setItem("order_data", JSON.stringify(state.data));
      state.success = "Items Ordered successfully";
    },
  },
});
export const ordersReducer = slice.reducer;
export const { addOrderData } = slice.actions;
