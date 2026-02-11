import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });
      navigate("/");
    } catch {
      alert("User already exists");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>🔐 LinkVault Pro</h1>
        <p>Sqn Ldr Arnab Sanyal | Roll No: 25CS60D06</p>
        <p>Design Lab | IIT Kharagpur | Spring 2026</p>
      </div>

      <div style={styles.card}>
        <h2>Create Account</h2>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={register}>
          Register
        </button>

        <p style={{ marginTop: "15px" }}>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "15px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
