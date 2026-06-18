import { useState, useEffect } from "react";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsSuperAdmin(false);
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
