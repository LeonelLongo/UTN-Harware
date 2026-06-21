import { useState, useEffect } from "react";
import { AppContext } from "./AppContext";

const STORAGE_KEY = "hardware-utn-user";

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const AppContextProvider = ({ children }) => {
  const storedUser = getStoredUser();

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);
  const [isAdmin, setIsAdmin] = useState(storedUser?.rol === "admin");
  const [isSuperAdmin, setIsSuperAdmin] = useState(storedUser?.rol === "superAdmin");
  const [currentUser, setCurrentUser] = useState(storedUser);
  const [cart, setCart] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    setCurrentUser(null);
    setCart([]);
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
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
