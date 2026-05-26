import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/home/Home";
import Login from "./components/auth/Login/Login.jsx";
import Cart from "./components/cart/Cart.jsx";
import Admin from "./components/admin/Admin";
import Protected from "./components/auth/Protected";
import NotFound from "./components/notFound/NotFound";
import ProductDetail from "./components/products/ProductDetail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/"
          element={<Home cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/producto/:id"
          element={<ProductDetail cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/cart"
          element={
            <Protected isSignedIn={isLoggedIn}>
              <Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Protected>
          }
        />

        <Route
          path="/admin"
          element={
            <Protected isSignedIn={isLoggedIn}>
              <Admin />
            </Protected>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
