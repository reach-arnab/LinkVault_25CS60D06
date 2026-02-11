
const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const db = require("../database/db");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});
const upload = multer({ storage });

router.post("/upload", upload.single("file"), (req, res) => {
  const uniqueId = uuidv4().replace(/-/g, "");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const type = req.file ? "file" : "text";
  const text = req.body.text || null;
  const filePath = req.file ? req.file.path : null;
  const fileName = req.file ? req.file.originalname : null;

  db.run(
    `INSERT INTO shares (unique_id, type, text_content, file_path, file_name, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [uniqueId, type, text, filePath, fileName, expiresAt],
    () => res.json({ link: `http://localhost:5173/view/${uniqueId}` })
  );
});

router.get("/view/:id", (req, res) => {
  db.get(`SELECT * FROM shares WHERE unique_id = ?`, [req.params.id], (err, row) => {
    if (!row || new Date(row.expires_at) < new Date()) {
      return res.status(403).json({ message: "Link expired or invalid" });
    }
    res.json(row);
  });
});

module.exports = router;
