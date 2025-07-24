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
    const userCreated = {
      _id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      phone_no: user.phone_no,
      address: {
        street_name: user.address.street_name,
        city: user.address.city,
        state: user.address.state,
        pincode: user.address.pincode,
        country: user.address.country,
        house_no: user.address.house_no,
      },
    };
    return res.status(200).json({ token: accessToken, user: userCreated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  const { name, email, password, phone_no, address, role } = req.body;
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
      role,
    });
    console.log(newUser);
    const payload = {
      id: newUser.id,
      role: newUser.role,
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    const userCreated = {
      _id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
      phone_no: newUser.phone_no,
      address: {
        street_name: newUser.address.street_name,
        city: newUser.address.city,
        state: newUser.address.state,
        pincode: newUser.address.pincode,
        country: newUser.address.country,
        house_no: newUser.address.house_no,
      },
    };
    res.status(201).json({ token: accessToken, user: userCreated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
  register,
};
