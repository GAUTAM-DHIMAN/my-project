// server.js
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Secret key for JWT
const JWT_SECRET = "mysecretkey";

// ✅ Connect to MongoDB (Local or Compass)
mongoose
  .connect("mongodb://127.0.0.1:27017/bankApp") // change db name as needed
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Create User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 1000 },
});

const User = mongoose.model("User", userSchema);

// ✅ Create default user if not exists
async function createDefaultUser() {
  const existing = await User.findOne({ username: "user1" });
  if (!existing) {
    const newUser = new User({
      username: "user1",
      password: "password123",
      balance: 1000,
    });
    await newUser.save();
    console.log("👤 Default user created: user1 / password123");
  }
}
createDefaultUser();

// ✅ Login Route — Generates JWT token
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || user.password !== password)
    return res.status(401).json({ message: "Invalid username or password" });

  // Generate JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// ✅ Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).json({ message: "Token missing. Unauthorized access." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// ✅ Protected Route — Check Balance
app.post("/balance", verifyToken, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ balance: user.balance });
});

// ✅ Protected Route — Deposit
app.post("/deposit", verifyToken, async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  const user = await User.findOne({ username: req.user.username });
  user.balance += amount;
  await user.save();

  res.json({ message: `Deposited ₹${amount}`, newBalance: user.balance });
});

// ✅ Protected Route — Withdraw
app.post("/withdraw", verifyToken, async (req, res) => {
  const { amount } = req.body;
  const user = await User.findOne({ username: req.user.username });

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });
  if (user.balance < amount)
    return res.status(400).json({ message: "Insufficient balance" });

  user.balance -= amount;
  await user.save();

  res.json({ message: `Withdrew ₹${amount}`, newBalance: user.balance });
});

// ✅ Run Server
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
