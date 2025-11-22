// src/components/admin/AdminCard.jsx
export default function AdminCard({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "14px",
        border: "1px solid #d6f5d6",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        marginBottom: "24px",
      }}
    >
      {children}
    </div>
  );
}
