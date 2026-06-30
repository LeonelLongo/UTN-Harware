import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AppContext } from "./AppContext";
import { BASE_URL, TOKEN_KEY } from "../services/apiConfig";
import { isTokenValid } from "../services/auth/auth.helpers";

const LOGIN_DRAFT_KEY = "login_draft_email";
const CART_KEY = "hardware-utn-cart";

const getUserFromToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!isTokenValid(token)) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const AppContextProvider = ({ children }) => {
  const storedUser = getUserFromToken();

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);
  const [isAdmin, setIsAdmin] = useState(storedUser?.rol === "admin");
  const [isSuperAdmin, setIsSuperAdmin] = useState(
    storedUser?.rol === "superAdmin",
  );
  const [currentUser, setCurrentUser] = useState(storedUser);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!isTokenValid(localStorage.getItem(TOKEN_KEY))) {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch(`${BASE_URL}/items`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleUserLogin = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    const decoded = jwtDecode(token);
    setCurrentUser(decoded);
    setIsLoggedIn(true);
    setIsAdmin(decoded.rol === "admin");
    setIsSuperAdmin(decoded.rol === "superAdmin");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    setCurrentUser(null);
    setCart([]);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LOGIN_DRAFT_KEY);
    localStorage.removeItem(CART_KEY);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin,
        isSuperAdmin,
        setIsSuperAdmin,
        currentUser,
        setCurrentUser,
        cart,
        setCart,
        showLogin,
        setShowLogin,
        showRegister,
        setShowRegister,
        registerEmail,
        setRegisterEmail,
        products,
        setProducts,
        handleUserLogin,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
