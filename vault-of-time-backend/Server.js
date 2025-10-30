const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// POST route to analyze image
app.post("/api/analyze", upload.single("coinImage"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });

  const imagePath = path.join(__dirname, req.file.path);

  try {
    // Read image and convert to Base64
    const imageData = fs.readFileSync(imagePath, { encoding: "base64" });

    // Send Base64 to Colab endpoint
    const colabResponse = await axios.post("YOUR_COLAB_API_URL", {
      imageBase64: imageData,
    });

    const metadata = colabResponse.data;

    // Delete uploaded image
    fs.unlinkSync(imagePath);

    // Send metadata to frontend
    res.json(metadata);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze coin" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
