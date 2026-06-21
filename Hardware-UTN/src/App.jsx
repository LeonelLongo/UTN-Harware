import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useAppContext } from "./context/AppContext";
import Terminos from "./components/terminos/Terminos";
import QuienesSomos from "./components/quienesSomos/QuienesSomos";
import ComoComprar from "./components/comoComprar/ComoComprar";
import Products from "./components/products/Products";
import Home from "./components/home/Home";
import Login from "./components/auth/Login/Login.jsx";
import Register from "./components/auth/Register.jsx";
import Cart from "./components/cart/Cart.jsx";
import AdminPanel from "./components/admin/AdminPanel";
import Protected from "./components/auth/Protected";
import NotFound from "./components/notFound/NotFound";
import ProductDetail from "./components/products/ProductDetail";
import MisCompras from "./components/purchases/MisCompras";

function App() {
  const {
    isAdmin,
    isSuperAdmin,
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    registerEmail,
    setRegisterEmail,
    setIsLoggedIn,
    setIsAdmin,
    setIsSuperAdmin,
    setCurrentUser,
  } = useAppContext();

  return (
    <BrowserRouter>
      {showLogin && (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setIsAdmin={setIsAdmin}
          setIsSuperAdmin={setIsSuperAdmin}
          setCurrentUser={setCurrentUser}
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={(email = "") => {
            setRegisterEmail(email);
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          initialEmail={registerEmail}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          path="/mis-compras"
          element={
            <Protected>
              <MisCompras />
            </Protected>
          }
        />
        <Route
          path="/admin"
          element={
            isAdmin || isSuperAdmin ? <AdminPanel /> : <Navigate to="/" replace />
          }
        />
        <Route path="/como-comprar" element={<ComoComprar />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
