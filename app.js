const express = require("express");
const app = express();

// ENV VARIABLES
const APP_NAME = process.env.APP_NAME || "Default App";
const PORT = process.env.PORT || 3000;
const MODE = process.env.MODE || "development";

app.get("/", (req, res) => {
  res.send(`
    App Name: ${APP_NAME}
    Mode: ${MODE}
    Port: ${PORT}
  `);
});

app.get("/feature", (req, res) => {
  if (process.env.FEATURE_ENABLED === "true") {
    res.send("✅ Feature is ENABLED");
  } else {
    res.send("❌ Feature is DISABLED");
  }
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} running in ${MODE} mode on port ${PORT}`);
});

