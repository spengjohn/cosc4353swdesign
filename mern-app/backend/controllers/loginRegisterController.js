const users = [
  { id: 1, role: 'admin', email: 'admin@gmail.com', password: 'Admin123!' },
  { id: 2, role: 'volunteer', email: 'volunteer@gmail.com', password: 'Vol123!' }
];

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = Buffer.from(`${user.id}:${user.role}`).toString('base64');

    res.json({
      id: user.id,
      role: user.role,
      email: user.email,
      token
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const register = (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    if (role !== 'admin' && role !== 'volunteer') {
      return res.status(400).json({ message: 'Role must be admin or volunteer.' });
    }

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const newUser = {
      id: users.length + 1,
      email,
      password,
      role
    };

    users.push(newUser);

    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
