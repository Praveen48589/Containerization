const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

/* ===============================
   ✅ Proper CORS Setup (Safe)
   Frontend: http://3.108.227.232:8080
   Backend : http://3.108.227.232:3000
   =============================== */

app.use(
  cors({
    origin: "http://3.108.227.232:8080", // allow frontend only
    methods: ["GET", "POST"],            // allowed methods
    allowedHeaders: ["Content-Type"]     // allowed headers
  })
);

/* Parse JSON request bodies */
app.use(express.json());

/* ===============================
   ✅ MySQL Connection Pool (Stable)
   =============================== */

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("✅ MySQL Pool Created");

/* ===============================
   ✅ Health Check Route
   =============================== */

app.get("/", (req, res) => {
  res.send("Backend is alive 🚀");
});

/* ===============================
   ✅ Add Contact API
   =============================== */

app.post("/add", (req, res) => {
  const { username, contact } = req.body;

  if (!username || !contact) {
    return res.status(400).send("❌ Missing fields");
  }

  db.query(
    "INSERT INTO contacts (username, contact) VALUES (?, ?)",
    [username, contact],
    (err) => {
      if (err) {
        console.error("❌ MYSQL INSERT ERROR:", err.message);
        return res.status(500).send("Database insert failed");
      }

      res.send("✅ Contact saved successfully!");
    }
  );
});

/* ===============================
   ✅ Get All Contacts API
   =============================== */

app.get("/contacts", (req, res) => {
  db.query("SELECT * FROM contacts", (err, results) => {
    if (err) {
      console.error("❌ MYSQL FETCH ERROR:", err.message);
      return res.status(500).send("Database fetch failed");
    }

    res.json(results);
  });
});

/* ===============================
   ✅ Start Server
   =============================== */

app.listen(3000, "0.0.0.0", () => {
  console.log("🚀 Backend running on port 3000");
});
