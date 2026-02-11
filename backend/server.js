const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cron = require("node-cron");
const { nanoid } = require("nanoid");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "supersecretkey"; // change in production

// ==================
// Upload Folder
// ==================
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use("/uploads", express.static(uploadDir));

// ==================
// Multer Config (File Validation)
// ==================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ==================
// Database Setup
// ==================
const db = new sqlite3.Database("./linkvault.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT UNIQUE,
      passwordHash TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      linkId TEXT UNIQUE,
      textContent TEXT,
      filePath TEXT,
      passwordHash TEXT,
      maxViews INTEGER,
      currentViews INTEGER DEFAULT 0,
      oneTime INTEGER DEFAULT 0,
      expiresAt TEXT,
      ownerId INTEGER,
      isDeleted INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// ==================
// Auth Middleware
// ==================
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// ==================
// Register
// ==================
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (username, email, passwordHash)
     VALUES (?, ?, ?)`,
    [username, email, hash],
    function (err) {
      if (err) return res.status(400).json({ error: "User exists" });
      res.json({ message: "User registered" });
    }
  );
});

// ==================
// Login
// ==================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  });
});

// ==================
// Upload (Authenticated)
// ==================
app.post("/api/upload", authenticate, upload.single("file"), async (req, res) => {
  const linkId = nanoid(24);
  const { text, password, maxViews, oneTime } = req.body;

  const textContent = text || null;
  const filePath = req.file ? `uploads/${req.file.filename}` : null;

  if (!textContent && !filePath)
    return res.status(400).json({ error: "No content provided" });

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const passwordHash = password
    ? await bcrypt.hash(password, 10)
    : null;

  db.run(
    `INSERT INTO links
    (linkId, textContent, filePath, passwordHash,
     maxViews, oneTime, expiresAt, ownerId)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      linkId,
      textContent,
      filePath,
      passwordHash,
      maxViews || null,
      oneTime === "true" ? 1 : 0,

      expiresAt,
      req.user.id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: "Upload failed" });

      res.json({
        link: `http://localhost:5173/view/${linkId}`,
      });
    }
  );
});

// ==================
// Get Content
// ==================
app.post("/api/content/:linkId", async (req, res) => {
  const { linkId } = req.params;
  const { password } = req.body;

  db.get(
    `SELECT * FROM links WHERE linkId = ? AND isDeleted = 0`,
    [linkId],
    async (err, row) => {
      if (!row) return res.status(404).json({ error: "Invalid link" });

      if (new Date() > new Date(row.expiresAt))
        return res.status(410).json({ error: "Expired" });

      if (row.passwordHash) {
        if (!password)
          return res.status(403).json({ error: "Password required" });

        const valid = await bcrypt.compare(password, row.passwordHash);
        if (!valid)
          return res.status(403).json({ error: "Wrong password" });
      }

      if (row.maxViews && row.currentViews >= row.maxViews)
        return res.status(410).json({ error: "View limit reached" });

      db.run(
        `UPDATE links SET currentViews = currentViews + 1 WHERE id = ?`,
        [row.id]
      );

      if (row.oneTime) {
        db.run(`UPDATE links SET isDeleted = 1 WHERE id = ?`, [row.id]);
      }

      res.json({
        text: row.textContent,
        file: row.filePath,
        expiresAt: row.expiresAt,
        views: row.currentViews + 1,
      });
    }
  );
});

// ==================
// Delete (Owner Only)
// ==================
app.delete("/api/delete/:linkId", authenticate, (req, res) => {
  const { linkId } = req.params;

  db.run(
    `UPDATE links SET isDeleted = 1
     WHERE linkId = ? AND ownerId = ?`,
    [linkId, req.user.id],
    function () {
      res.json({ message: "Deleted" });
    }
  );
});

// ==================
// Cron Cleanup Job
// ==================
cron.schedule("* * * * *", () => {
  db.run(
    `UPDATE links SET isDeleted = 1
     WHERE expiresAt < datetime('now')`
  );
});

// ==================
app.listen(5000, () => {
  console.log("LinkVault Pro running on port 5000");
});
