const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');


// CREATE
// exports.createUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // READ ALL
// exports.getUsers = async (req, res) => {
//   const users = await User.findAll();
//   res.json(users);
// };

// // READ ONE
// exports.getUserById = async (req, res) => {
//   const user = await User.findByPk(req.params.id);
//   if (!user) return res.status(404).json({ message: 'User not found' });
//   res.json(user);
// };

// // UPDATE
// exports.updateUser = async (req, res) => {
//   const user = await User.findByPk(req.params.id);
//   if (!user) return res.status(404).json({ message: 'User not found' });

//   await user.update(req.body);
//   res.json(user);
// };

// // DELETE
// exports.deleteUser = async (req, res) => {
//   const user = await User.findByPk(req.params.id);
//   if (!user) return res.status(404).json({ message: 'User not found' });

//   await user.destroy();
//   res.json({ message: 'User deleted' });
// };



// Register User (admin or super admin)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, department, salary, contact } = req.body;

    // Prevent normal users from setting role
    let userRole = role;
    if (req.user && req.user.role === 'user') userRole = 'user';

    const user = await User.create({ name, email, password, role: userRole, department, salary, contact });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await user.validatePassword(password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Normal users can only access their own record
    if (req.user.role === 'user' && req.user.id != id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user (super admin only)
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'super admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
