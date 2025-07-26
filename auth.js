const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (user) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

module.exports = router;