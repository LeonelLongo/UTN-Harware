import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiUser, FiShoppingBag, FiLogOut } from "react-icons/fi";
import { useAppContext } from "../../context/AppContext";

function UserMenu() {
  const { currentUser, handleLogout } = useAppContext();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  const displayName = currentUser?.userName ?? "";

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        bsPrefix="user-menu-toggle"
        style={{
          background: "none",
          border: "none",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          padding: "6px 4px",
        }}
      >
        <FiUser size={20} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            maxWidth: "140px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {displayName}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => navigate("/mis-compras")}>
          <FiShoppingBag style={{ marginRight: "8px" }} />
          Mis compras
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogoutClick} className="text-danger">
          <FiLogOut style={{ marginRight: "8px" }} />
          Cerrar sesión
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserMenu;
