const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, rollNumber, batch } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { rollNumber }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or roll number already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      rollNumber,
      batch
    });

    await user.save();

    res.status(201).json({ 
      message: 'User registered successfully',
      userId: user._id 
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account has been blocked by admin. Contact support.' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        batch: user.batch,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
// Register new admin with secret code
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, rollNumber, batch, adminSecret } = req.body;

    // Check admin secret code
    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'your-super-secret-admin-code-2025';
    
    if (adminSecret !== ADMIN_SECRET) {
      return res.status(403).json({ 
        message: 'Invalid admin secret code' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { rollNumber }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or roll number already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      rollNumber,
      batch,
      role: 'admin',  // Set role as admin
      verified: true  // Auto-verify admins
    });

    await user.save();

    res.status(201).json({ 
      message: 'Admin registered successfully',
      userId: user._id 
    });

  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};
// Register Super Admin with super secret code
exports.registerSuperAdmin = async (req, res) => {
  try {
    const { name, email, password, rollNumber, batch, superSecretCode } = req.body;

    // Check super secret code
    if (superSecretCode !== process.env.SUPERADMIN_SECRET) {
      return res.status(403).json({ message: 'Invalid super admin secret code' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { rollNumber }] 
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or roll number already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create super admin user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      rollNumber,
      batch,
      role: 'superadmin',
      verified: true
    });

    await user.save();

    res.status(201).json({ 
      message: 'Super Admin registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Super admin registration error:', error);
    res.status(500).json({ message: 'Error registering super admin' });
  }
};

// Get current logged in user details
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        batch: user.batch,
        role: user.role,
        isBlocked: user.isBlocked
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
};