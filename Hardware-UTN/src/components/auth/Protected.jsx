import { useAppContext } from "../../context/AppContext";

function Protected({ children }) {
  const { isLoggedIn, setShowLogin } = useAppContext();

  if (!isLoggedIn) {
    setShowLogin(true);
    return null;
  }

  return children;
}

export default Protected;
