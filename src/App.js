import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchCategories } from "./store/productsSlice";
import Footer from "./components/Footer";
import { fetchCartData } from "./store/cartSlice";

const App = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products.list);
  useEffect(() => {
    dispatch(fetchData(productList.length));
    dispatch(fetchCartData(6));
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="w-full bg-gray-300 dark:bg-slate-600 overflow-y-scroll">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
