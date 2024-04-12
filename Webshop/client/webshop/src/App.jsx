import React, { useContext, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CreateProduct from "./components/CreateProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Store } from "./Store";

function App() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const isAdmin = userInfo && userInfo.role === "admin";

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        {isAdmin ? (
          <Route path="/createProduct" element={<CreateProduct />} />
        ) : (
          <Route path="/" element={<ProductList />} />
        )}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
