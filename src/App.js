import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchCategories } from "./store/productsSlice";
import Footer from "./components/Footer";
import { setCartData } from "./store/cartSlice";
import { setWishlistData } from "./store/wishlistSlice";
import Wishlist from "./pages/Wishlist";
import MsgPopUp from "./components/MsgPopUp";
import { fetchUserData } from "./store/userSlice";
import { fetchLatestProducts } from "./store/latestProducts";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products.list);
  const { loggedIn, data = {} } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchData(productList.length));
    dispatch(setCartData(JSON.parse(localStorage.getItem("cart"))));
    dispatch(setWishlistData(JSON.parse(localStorage.getItem("wishlist"))));
    dispatch(fetchCategories());
    dispatch(fetchLatestProducts());
  }, []);
  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchUserData({ accessToken: data?.access_token || "" }));
    }
  }, [loggedIn]);
  return (
    <div className="w-full bg-gray-300 dark:bg-slate-600 overflow-y-scroll">
      <Navbar />
      <MsgPopUp />
      <ScrollToTop />
      <div className="min-h-[90dvh]">
        <Routes>
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
