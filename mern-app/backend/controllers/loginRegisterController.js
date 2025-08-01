import UserCredentials from '../models/UserCredentials.js';

// LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const user = await UserCredentials.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = Buffer.from(`${user._id}:${user.role}`).toString('base64');

    // Respond with user info
    res.status(200).json({
      id: user._id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      isProfileComplete: user.isProfileComplete,
      token
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// REGISTER CONTROLLER
export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }
    if (!['admin', 'volunteer'].includes(role)) {
      return res.status(400).json({ message: 'Role must be admin or volunteer.' });
    }

    const existingUser = await UserCredentials.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const newUser = await UserCredentials.create({
      email,
      password, // will be hashed
      role
    });
    console.log("!! New user created:", newUser); 

    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateCredentials = async (req, res) => {
  try {
    const { userId, isVerified, isProfileComplete } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const updateFields = {};

    if (typeof isVerified !== "undefined") updateFields.isVerified = isVerified;
    if (typeof isProfileComplete !== "undefined") updateFields.isProfileComplete = isProfileComplete;

    const updatedUser = await UserCredentials.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User credentials updated",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user credentials:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};