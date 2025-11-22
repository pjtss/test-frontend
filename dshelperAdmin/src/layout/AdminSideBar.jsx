// src/layout/AdminSidebar.jsx
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#66CC66",
        padding: "20px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        fontWeight: 600,

        // 반응형: 모바일에서는 상단바로 변경
        position: "sticky",
        top: 0,
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>💚 DSHelper Admin</h2>

      <Link style={linkStyle} to="/">🏠 Home</Link>
      <Link style={linkStyle} to="/admin/inquiry">📩 Inquiry List</Link>
      <Link style={linkStyle} to="/admin/reservations">📅 Reservations</Link>
      <Link style={linkStyle} to="/admin/create-post">📝 Create Post</Link>
    </aside>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.15)",
  transition: "0.2s",
  display: "block",
};
