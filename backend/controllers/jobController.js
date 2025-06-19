const Job = require('../models/Job');

// Create a new job
const createJob = async (req, res) => {
  const { company, role, status, appliedDate, notes } = req.body;

  try {
    const newJob = await Job.create({
      company,
      role,
      status,
      appliedDate,
      notes,
      user: req.user
    });

    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: 'Error creating job', error: err.message });
  }
};

// Get all jobs for logged-in user
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user }).sort({ appliedDate: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs', error: err.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company, role, status, appliedDate, notes } = req.body;

  try {
    const updatedJob = await Job.findOneAndUpdate(
      { _id: id, user: req.user },
      { company, role, status, appliedDate, notes },
      { new: true }
    );

    if (!updatedJob) return res.status(404).json({ message: 'Job not found or unauthorized' });

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: 'Error updating job', error: err.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await Job.findOneAndDelete({ _id: id, user: req.user });

    if (!deletedJob) return res.status(404).json({ message: 'Job not found or unauthorized' });

    res.status(200).json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting job', error: err.message });
  }
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob
};

