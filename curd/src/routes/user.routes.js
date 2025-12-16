const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authorize = require('../middleware/authorize');


// router.post('/', userController.createUser);
// router.get('/', userController.getUsers);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

router.post('/login', userController.loginUser);

// Admin/Super Admin creates users
router.post('/', authorize(['admin', 'super admin']), userController.createUser);

// Get user by ID
router.get('/:id', authorize(['user', 'admin', 'super admin']), userController.getUserById);

// Delete user (super admin only)
router.delete('/:id', authorize(['super admin']), userController.deleteUser);

module.exports = router;
