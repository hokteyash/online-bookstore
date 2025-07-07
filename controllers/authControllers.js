const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "You need to register yourself first" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const payload = {
      id: user.id,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    return res.status(200).json({ message: "Login successfull", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  const { name, email, password, phone_no, address } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(401).json({ message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      phone_no,
      address,
    });
    console.log(newUser);
    const payload = {
      id: newUser.id,
      role: newUser.role,
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    res.status(201).json({ message: "User created successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
  register,
};
