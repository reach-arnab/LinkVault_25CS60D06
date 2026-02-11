import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function View() {
  const { linkId } = useParams();
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  const fetchContent = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/content/${linkId}`,
        { password }
      );
      setData(res.data);
      setError("");
    } catch {
      setError("Access denied / expired / wrong password");
    }
  };

  // Countdown timer
  useEffect(() => {
    if (!data?.expiresAt) return;

    const interval = setInterval(() => {
      const diff = new Date(data.expiresAt) - new Date();

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>🔐 LinkVault Pro</h1>
        <p>Sqn Ldr Arnab Sanyal | Roll No: 25CS60D06</p>
        <p>Design Lab | IIT Kharagpur | Spring 2026</p>
      </div>

      <div style={styles.card}>
        <h2>Secure Content Access</h2>

        {!data && (
          <>
            <input
              style={styles.input}
              placeholder="Enter password if required"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={styles.button} onClick={fetchContent}>
              Access Content
            </button>
          </>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {data && (
          <>
            <p style={styles.timer}>
              ⏳ Expires in: {timeLeft}
            </p>

            <p>👁 Views Used: {data.views}</p>

            {data.text && (
              <div style={styles.textBox}>{data.text}</div>
            )}

            {data.file && (
              <a
                href={`http://localhost:5000/${data.file}`}
                download
                style={styles.downloadBtn}
              >
                ⬇ Download File
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f78c5f, #ff6b6b)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
  },
  header: {
    textAlign: "center",
    padding: "20px",
  },
  card: {
    background: "#fff",
    color: "#333",
    padding: "40px",
    borderRadius: "15px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    background: "#ff6b6b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  downloadBtn: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 20px",
    background: "#ff4757",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  textBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#f4f4f4",
    borderRadius: "6px",
    wordBreak: "break-word",
  },
  timer: {
    fontWeight: "bold",
    marginTop: "10px",
  },
};
