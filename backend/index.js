const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const userRoutes = require("./userRoutes");
var cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/user", userRoutes);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const PORT = process.env.PORT;
const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("API is running..");
});