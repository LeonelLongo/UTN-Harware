import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Terminos from "./components/terminos/Terminos";
import QuienesSomos from "./components/quienesSomos/QuienesSomos";

import Home from "./components/home/Home";
import Login from "./components/auth/Login/Login.jsx";
import Cart from "./components/cart/Cart.jsx";
import Admin from "./components/admin/Admin";
import Protected from "./components/auth/Protected";
import NotFound from "./components/notFound/NotFound";
import ProductDetail from "./components/products/ProductDetail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCart([]);
  };

  return (
    <BrowserRouter>
      {showLogin && (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setIsAdmin={setIsAdmin}
          onClose={() => setShowLogin(false)}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              onLogout={handleLogout}
              setShowLogin={setShowLogin}
              isAdmin={isAdmin}
              products={products}
            />
          }
        />

        <Route
          path="/producto/:id"
          element={
            <ProductDetail
              cart={cart}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setShowLogin={setShowLogin}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Protected isSignedIn={isLoggedIn} setShowLogin={setShowLogin}>
              <Cart
                cart={cart}
                setCart={setCart}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Protected>
          }
        />

        <Route
          path="/admin"
          element={
            isAdmin ? (
              <Admin
                products={products}
                setProducts={setProducts}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/terminos"
          element={<Terminos setShowLogin={setShowLogin} />}
        />
        <Route
          path="/quienes-somos"
          element={<QuienesSomos setShowLogin={setShowLogin} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
