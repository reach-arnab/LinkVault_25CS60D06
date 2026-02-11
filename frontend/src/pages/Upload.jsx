import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [oneTime, setOneTime] = useState(false);
  const [link, setLink] = useState("");

  const upload = async () => {
    const formData = new FormData();
    if (text) formData.append("text", text);
    if (file) formData.append("file", file);
    if (password) formData.append("password", password);
    if (maxViews) formData.append("maxViews", maxViews);
    formData.append("oneTime", oneTime);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLink(res.data.link);
    } catch {
      alert("Upload failed");
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
        <h2>Create Secure Link</h2>

        <textarea
          style={styles.input}
          placeholder="Text content"
          onChange={(e) => setText(e.target.value)}
        />

        <input
          style={styles.input}
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          style={styles.input}
          placeholder="Password (optional)"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Max Views (optional)"
          onChange={(e) => setMaxViews(e.target.value)}
        />

        <label style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            onChange={(e) => setOneTime(e.target.checked)}
          />{" "}
          One-Time View
        </label>

        <button style={styles.button} onClick={upload}>
          Generate Link
        </button>

        {link && (
          <div style={styles.linkBox}>
            <b>🔗 Share this link:</b>
            <p>{link}</p>
          </div>
        )}
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
    width: "450px",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "15px",
    padding: "12px 20px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  linkBox: {
    marginTop: "20px",
    padding: "10px",
    background: "#f1f5ff",
    borderRadius: "6px",
    wordBreak: "break-word",
  },
};
