const express = require("express");

const app = express();

// Route
app.get("/", (req, res) => {
  res.send("Hello 🚀 Backend is running through Nginx Reverse Proxy!");
});

// Server start
app.listen(3000, () => {
  console.log("✅ Backend running on port 3000");
});
