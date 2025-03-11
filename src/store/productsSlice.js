import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// constant for sorting options
export const sortByOptions = [
  { name: "Price (High to low)", value: { sortBy: "price", order: "desc" } },
  {
    name: "Price (Low to high)",
    value: { sortBy: "price", order: "asc" },
  },
  {
    name: "Rating",
    value: { sortBy: "rating", order: "desc" },
  },
  {
    name: "Discount Percentage",
    value: { sortBy: "discountPercentage", order: "desc" },
  },
  { name: "None", value: { sortBy: "", order: "" } },
];

export const fetchData = createAsyncThunk(
  "products/fetchData",
  async ({ skip = 0, sortBy = "", order = "asc", category = "All" }) => {
    try {
      const result = await fetch(
        category !== "All"
          ? `https://dummyjson.com/products/category/${category}?limit=10&skip=${skip}&sortBy=${sortBy}&order=${order}`
          : `https://dummyjson.com/products?limit=10&skip=${skip}&sortBy=${sortBy}&order=${order}`
      );
      return result.json();
    } catch (error) {
      throw error;
    }
  }
);
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/products/category-list"
      );
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    selectedCategory: "All",
    selectedSort: { name: "None", value: { sortBy: "", order: "" } },
    categories: [],
    list: [],
    error: "",
    currency: "$",
    delivery_fee: 10,
  },
  reducers: {
    resetProducts: (state) => {
      state.list = [];
    },
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    sortProducts: (state, action) => {
      state.selectedSort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.list = [...state.list, ...(action.payload.products || [])];
        console.log(state.list, action.payload.total);
        state.hasMore = state.list.length < action.payload.total;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const { resetProducts, selectCategory, sortProducts } =
  productsSlice.actions;
