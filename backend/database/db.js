
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./linkvault.db");

db.run(`
CREATE TABLE IF NOT EXISTS shares (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  unique_id TEXT UNIQUE,
  type TEXT,
  text_content TEXT,
  file_path TEXT,
  file_name TEXT,
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

module.exports = db;
