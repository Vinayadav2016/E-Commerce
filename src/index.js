import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./store/productsSlice";
import { Provider } from "react-redux";
import { productReducer } from "./store/singleProductSlice";
import { relatedProductsReducer } from "./store/relatedProductsSlice";
import { cartReducer } from "./store/cartSlice";
import { wishlistReducer } from "./store/wishlistSlice";
import { userReducer } from "./store/userSlice";
import { ordersReducer } from "./store/ordersSlice";
import { latestProductsReducer } from "./store/latestProducts";
import ErrorBoundary from "./components/ErrorBoundary";

const store = configureStore({
  reducer: {
    products: productsReducer,
    singleProduct: productReducer,
    relatedProducts: relatedProductsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    orders: ordersReducer,
    latestProducts: latestProductsReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ErrorBoundary errorMsg="There was An Error. Please visit after some time.">
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
