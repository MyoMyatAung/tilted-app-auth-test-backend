require("dotenv").config();
const express = require('express');
const cors = require("cors");
const connect = require("./config/connect");
const authRouter = require("./routes/auth.routes");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
connect();
app.use("/api/v1", authRouter);
app.get("/api/v1/health-check", (req, res) => res.status(200).json({ message: "SERVER IS RUNNING" }))

// Start Server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
