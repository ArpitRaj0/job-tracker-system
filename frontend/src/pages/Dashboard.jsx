import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');


  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs', {
          headers: {
            Authorization: token
          }
        });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, [token]);

  const statusColor = {
    Applied: '#3498db',
    Interview: '#f1c40f',
    Offer: '#2ecc71',
    Rejected: '#e74c3c',
    Accepted: '#2ecc71'
  };

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f7f8fc, #e9eff5)',
        padding: '40px'
      }}>
        <h2 style={{
          fontSize: '36px',
          textAlign: 'center',
          marginBottom: '30px',
          color: '#2c3e50',
          letterSpacing: '1px'
        }}>
          📋 My Job Applications
        </h2>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
  <label style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '16px' }}>
    Filter by Status:
  </label>
  <select
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value)}
    style={{
      padding: '8px 12px',
      fontSize: '15px',
      borderRadius: '8px',
      border: '1px solid #ccc'
    }}
  >
    <option value="">All</option>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Offer">Offer</option>
    <option value="Rejected">Rejected</option>
    <option value="Accepted">Accepted</option>
  </select>
</div>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {jobs.length === 0 ? (
          <p style={{
            textAlign: 'center',
            fontSize: '18px',
            color: '#7f8c8d'
          }}>
            No jobs found.
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {jobs
  .filter(job => selectedStatus === '' || job.status === selectedStatus)
  .map((job) => (
              <div
                key={job._id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                  borderLeft: `5px solid ${statusColor[job.status] || '#ccc'}`,
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <h3 style={{ marginBottom: '10px', color: '#2c3e50' }}>{job.role}</h3>
                <p style={{ margin: '6px 0' }}><strong>Company:</strong> {job.company}</p>
                <p style={{ margin: '6px 0' }}>
                  <strong>Status:</strong>
                  <span style={{
                    marginLeft: '8px',
                    backgroundColor: statusColor[job.status] || '#bdc3c7',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '13px'
                  }}>{job.status}</span>
                </p>
                <p style={{ margin: '6px 0' }}>
                  <strong>Applied:</strong> {job.appliedDate?.split('T')[0]}
                </p>
                {job.notes && (
                  <p style={{ marginTop: '10px', fontStyle: 'italic', color: '#555' }}>
                    “{job.notes}”
                  </p>
                )}

                {/* ✏️ Edit Button */}
                <button
                  onClick={() => window.location.href = `/edit-job/${job._id}`}
                  style={{
                    marginTop: '12px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#2980b9',
                    color: 'white',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  ✏️ Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;




