const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Applied", "Interview", "Offer", "Rejected", "Accepted"],
    default: "Applied"
  },
  appliedDate: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
