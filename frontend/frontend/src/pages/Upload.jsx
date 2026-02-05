import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");

  const uploadData = async () => {
    const formData = new FormData();
    if (text) formData.append("text", text);
    if (file) formData.append("file", file);

    const res = await axios.post("http://localhost:5000/api/upload", formData);
    setLink(res.data.link);
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={{ margin: 0 }}>🔐 LinkVault</h1>
        <p style={{ margin: 0 }}>
          Sqn Ldr Arnab Sanyal | Roll No: <b>25CS60D06</b>
        </p>
      </div>

      {/* MAIN CARD */}
      <div style={styles.card}>
        <h2>📤 Upload Text or File</h2>

        <textarea
          style={styles.textarea}
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <p style={{ margin: "10px 0", fontWeight: "bold" }}>OR</p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <button style={styles.button} onClick={uploadData}>
          🚀 Upload & Generate Link
        </button>

        {link && (
          <div style={styles.linkBox}>
            <p><b>🔗 Share this link:</b></p>
            <a href={link} target="_blank" rel="noreferrer">
              {link}
            </a>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <p>Design Lab, IIT Kharagpur | Full Stack Assignment | Spring 2026</p>
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
    width: "100%",
    padding: "20px",
    textAlign: "center",
    background: "rgba(0,0,0,0.25)",
  },
  card: {
    background: "#ffffff",
    color: "#333",
    marginTop: "40px",
    padding: "30px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "none",
  },
  button: {
    padding: "12px 20px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  linkBox: {
    marginTop: "20px",
    padding: "10px",
    background: "#f1f5ff",
    borderRadius: "6px",
    wordBreak: "break-all",
  },
  footer: {
    marginTop: "auto",
    padding: "15px",
    fontSize: "14px",
    opacity: 0.9,
  },
};
