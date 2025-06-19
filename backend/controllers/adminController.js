const User = require('../models/user');
const Job = require('../models/Job');

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Don't return passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

// GET /api/admin/jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('userId', 'name email');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
};

// DELETE /api/admin/jobs/:id
const deleteAnyJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully by admin' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job', error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getAllJobs,
  deleteAnyJob
};
