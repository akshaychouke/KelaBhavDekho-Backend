const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // You may need to install this library as well

const User = require("../Model/User.js");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//controller to login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const responseUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = generateAccessToken(responseUser);
    res.status(200).json({ message: "Login successful", token:token,user:responseUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//controller to signUp
const SignUp = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.find({ email: email });

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    // Exclude the password field from the response
    const responseUser = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    res.status(201).json({ message: "User created successfully", user: responseUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { Login, SignUp };
