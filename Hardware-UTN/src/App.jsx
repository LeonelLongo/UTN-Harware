import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Protected from "./components/auth/Protected";
import NotFound from "./pages/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <Protected isSignedIn={isLoggedIn}>
              <Home />
            </Protected>
          }
        />

        <Route
          path="/cart"
          element={
            <Protected isSignedIn={isLoggedIn}>
              <Cart />
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
