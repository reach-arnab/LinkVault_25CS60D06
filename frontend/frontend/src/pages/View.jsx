import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function View() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/view/${id}`)
      .then((res) => {
        setData(res.data);
        startTimer(res.data.expires_at);
      })
      .catch(() => alert("Link expired or invalid"));
  }, []);

  const startTimer = (expiryTime) => {
    const expiry = new Date(expiryTime).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("EXPIRED");
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);
  };

  if (!data) return null;

  return (
    <div style={page}>
      <div style={card}>
        <h2>🔐 LinkVault Content</h2>

        {/* EXPIRY TIMER */}
        <p
          style={{
            fontWeight: "bold",
            color: timeLeft === "EXPIRED" ? "red" : "#444",
            marginBottom: "15px",
          }}
        >
          ⏳ Expires in: {timeLeft}
        </p>

        {timeLeft === "EXPIRED" && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            This link has expired.
          </p>
        )}

        {timeLeft !== "EXPIRED" && data.type === "text" && (
          <pre style={pre}>{data.text_content}</pre>
        )}

        {timeLeft !== "EXPIRED" && data.type === "file" && (
          <a
            style={button}
            href={`http://localhost:5000/${data.file_path}`}
            download
          >
            ⬇️ Download {data.file_name}
          </a>
        )}
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #ff9966, #ff5e62)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "600px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  textAlign: "center",
};

const pre = {
  background: "#f4f4f4",
  padding: "15px",
  borderRadius: "6px",
  whiteSpace: "pre-wrap",
  textAlign: "left",
};

const button = {
  display: "inline-block",
  padding: "12px 20px",
  background: "#ff5e62",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "6px",
  marginTop: "10px",
};
