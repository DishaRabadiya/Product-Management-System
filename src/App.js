import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import React from "react";
import Product from "./pages/Product";
import Login from "./pages/Authentication/login";
import Register from "./pages/Authentication/register";
import PrivateRoutes from "./pages/Authentication/privateRoutes";
import AddToCart from "./pages/Product/addToCart";
import { CartProvider } from "./redux/context/cartContext";
function App() {
  const token = localStorage.getItem("UserData");
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route
              element={token ? <Navigate to="/product" /> : <Login />}
              path="/login"
            />
            <Route element={<PrivateRoutes />}>
              <Route element={<Product />} path="/product" />
              <Route element={<AddToCart />} path="/cart" />
            </Route>
            <Route element={<Register />} path="/register" />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
