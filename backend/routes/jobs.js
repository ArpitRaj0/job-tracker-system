const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createJob,
  getJobs,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

// ✅ Get a specific job by ID
router.get('/:id', authMiddleware, async (req, res) => {
  console.log("🛠️ Job ID param:", req.params.id);
console.log("🧑 Authenticated user ID:", req.user);

  try {
    const job = await require('../models/Job').findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (!job.user || job.user.toString() !== req.user) {
      return res.status(403).json({ message: 'Not authorized to view this job' });
    }
    console.log("✅ Job fetched:", job);

    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Other routes
router.post('/', authMiddleware, createJob);
router.get('/', authMiddleware, getJobs);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);

module.exports = router;

