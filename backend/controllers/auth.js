// auth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const { nanoid } = require("nanoid");
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { full_name, email, birth_date, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email is already in use");
  }

  const verificationToken = nanoid();
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    full_name,
    email,
    password: hashPassword,
    birth_date,
    verificationToken,
  });

  const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  // const mail = {
  //   to: email,
  //   subject: "Подтверждение email",
  //   html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  // };

  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new HttpError(401, "Username or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw new HttpError(401, "Username or password invalid");
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res
        .status(error.status || 500)
        .json({ message: error.message || "Server error" });
  }
};


const getCurrent = async (req, res) => {
  const { email, full_name } = req.user;

  res.json({
    email,
    full_name,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const updateAvatar = async (req, res) => {
  // Your avatar update logic here
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
