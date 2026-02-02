const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

/* Enable CORS */
app.use(cors());

/* Parse JSON bodies */
app.use(express.json());

/* MySQL connection */
const db = mysql.createConnection({
  host: "db",           // Docker container name
  user: "appuser",
  password: "apppass",
  database: "contactdb"
});

/* Log DB connection status */
db.connect((err) => {
  if (err) {
    console.error("❌ DB CONNECT ERROR:", err.message);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

/* Health check route */
app.get("/", (req, res) => {
  res.send("Backend is alive 🚀");
});

/* Add contact API */
app.post("/add", (req, res) => {
  const { username, contact } = req.body;

  if (!username || !contact) {
    return res.status(400).send("Missing fields");
  }

  db.query(
    "INSERT INTO contacts (username, contact) VALUES (?, ?)",
    [username, contact],
    (err) => {
      if (err) {
        console.error("❌ MYSQL INSERT ERROR:", err.message);
        return res.status(500).send(err.message);
      }

      res.send("Contact saved successfully");
    }
  );
});

/* Listen on all interfaces for Docker */
app.listen(3000, "0.0.0.0", () => {
  console.log("🚀 Backend running on port 3000");
});

