const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const { getAllUsers, getAllJobs, deleteAnyJob } = require('../controllers/adminController');

// Admin-only routes
router.get('/users', authMiddleware, isAdmin, getAllUsers);
router.get('/jobs', authMiddleware, isAdmin, getAllJobs);
router.delete('/jobs/:id', authMiddleware, isAdmin, deleteAnyJob);

module.exports = router;
