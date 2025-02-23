const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve React frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.post("/analyze", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const pythonProcess = spawn("python3", ["predict.py", text]);

  pythonProcess.stdout.on("data", (data) => {
    const sentiment = data.toString().trim();
    res.json({ sentiment });
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
    res.status(500).json({ error: "Internal server error" });
  });
});

// Serve frontend for any other request
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
