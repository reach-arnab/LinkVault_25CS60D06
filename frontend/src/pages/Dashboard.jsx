import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Dashboard</h2>
        <button onClick={() => navigate("/upload")}>Create Link</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f78c5f",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    textAlign: "center",
  },
};
