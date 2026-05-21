import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>¡Oops! Página no encontrada</h2>
      <Button onClick={() => navigate("/login")}>
        Volver al login
      </Button>
    </div>
  );
}

export default NotFound;