require("dotenv").config();
const express = require('express');
const connect = require("./config/connect");
const authRouter = require("./routes/auth.routes");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
connect();
app.use("/api/v1", authRouter);

// Start Server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
