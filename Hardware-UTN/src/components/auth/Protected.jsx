function Protected({ isSignedIn, children, setShowLogin }) {
  if (!isSignedIn) {
    if (setShowLogin) setShowLogin(true);
    return null;
  }

  return children;
}

export default Protected;
