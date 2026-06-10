const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://localhost:5501",
      "http://127.0.0.1:5500",
      "http://127.0.0.1:5501",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});
