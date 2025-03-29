import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaBuilding, 
  FaIndustry, 
  FaRegClock, 
  FaCalendarAlt, 
  FaFileAlt, 
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaEnvelope
} from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

// Hardcoded data for the Data Science Internship application
const dataScience = {
  id: "data-science-internship",
  title: "Data Science Internship",
  company: "Rolls Royce",
  icon: <FaIndustry />,
  description: "Analyze large datasets, create machine learning models, and contribute to data-driven decision-making for a leading AI firm. You'll work with a team of experienced data scientists to solve complex problems and develop innovative solutions using advanced analytical techniques.",
  tags: ["London", "£35,000", "Data Science", "12 months"],
  status: "Interview",
  applicationHistory: [
    { date: "15 Sep 2024", time: "14:32", status: "Application Submitted", icon: <FaFileAlt /> },
    { date: "20 Sep 2024", time: "09:45", status: "Application Under Review", icon: <FaHourglassHalf /> },
    { date: "28 Sep 2024", time: "16:20", status: "Interview Invitation Sent", icon: <FaEnvelope /> },
    { date: "30 Sep 2024", time: "10:00", status: "Interview Scheduled", icon: <FaCalendarAlt /> }
  ],
  interviewDate: "10 Oct 2024",
  interviewTime: "14:00",
  interviewLocation: "Virtual (Zoom)",
  deadline: "10 Oct 2025",
  startDate: "Dec 2025",
  submittedDate: "15 Sep 2024",
  submittedTime: "14:32",
  requirements: [
    "Bachelor's degree in Computer Science, Statistics or related field",
    "Experience with Python, R, or similar",
    "Knowledge of machine learning algorithms",
    "Strong analytical skills"
  ],
  responsibilities: [
    "Analyze large datasets to extract insights",
    "Develop and implement machine learning models",
    "Create data visualizations",
    "Collaborate with cross-functional teams"
  ],
  nextSteps: [
    "Prepare for interview scheduled on 10 Oct 2024",
    "Research common data science interview questions",
    "Review your portfolio projects",
    "Prepare questions about the role and company"
  ]
};

// Status badge classnames and icons mapping
const statusInfo = {
  "Submitted": { class: "submitted", icon: <FaFileAlt /> },
  "Under Review": { class: "waiting", icon: <FaHourglassHalf /> },
  "Interview": { class: "interview", icon: <FaCalendarAlt /> },
  "Rejected": { class: "rejected", icon: <FaTimesCircle /> },
  "Accepted": { class: "accepted", icon: <FaCheckCircle /> },
  "Waiting": { class: "waiting", icon: <FaHourglassHalf /> }
};

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
      }
    });

    // For demo, we'll just use our hardcoded data science application
    if (id === "data-science-internship") {
      setApplication(dataScience);
    }
    
    setLoading(false);
    
    return () => unsubscribe();
  }, [id, navigate]);

  const handleWithdraw = () => {
    console.log("Application withdrawn:", id);
    setWithdrawModalOpen(false);
    navigate('/main');
  };

  const getStatusClass = (status) => {
    return statusInfo[status]?.class || "";
  };

  const getStatusIcon = (status) => {
    return statusInfo[status]?.icon || <FaFileAlt />;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!application) {
    return (
      <div className="not-found" style={{ textAlign: 'center', margin: '50px auto', color: '#DC5F2E' }}>
        <h2>Application not found</h2>
        <button 
          className="add-button" 
          onClick={() => navigate('/main')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', margin: '20px auto' }}
        >
          <FaArrowLeft /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <div className="menu-container">
          <div className="menu-icon" onClick={() => navigate('/main')}>
            <FaArrowLeft />
          </div>
        </div>
        <h1>Application Details</h1>
      </div>
    
      <div className="tabs-container">
        <div className="tab">
          <div className="tab-title">
            <div className="placement-title">
              {application.title}
              <span className="company-tag">{application.company}</span>
              <span className="deadline-tag">Deadline: {application.deadline}</span>
              <span className="start-date-tag">Start: {application.startDate}</span>
            </div>
          </div>
        
          <div className="tab-content">
            <div className="placement-opportunity">
              <div className="company-icon">{application.icon}</div>
              <div className="placement-info">
                <div className="opportunity-meta">
                  <div className="placement-tags">
                    {application.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <p className="placement-description">{application.description}</p>
              </div>
            </div>

            <div className="details-section" style={{ 
              marginBottom: '20px',
              padding: '15px',
              background: '#F3F1DE', 
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ color: '#DC5F2E', borderBottom: '2px solid #DC5F2E', paddingBottom: '10px' }}>
                Application Status
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div className={`status ${getStatusClass(application.status)}`} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  padding: '8px 12px'
                }}>
                  {getStatusIcon(application.status)} {application.status}
                </div>
              </div>
              
              <div style={{ 
                marginTop: '20px', 
                borderLeft: '3px solid #DC5F2E',
                paddingLeft: '20px'
              }}>
                {application.applicationHistory.map((event, index) => (
                  <div key={index} style={{ 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{ 
                      color: '#DC5F2E', 
                      fontSize: '1.5rem'
                    }}>{event.icon}</div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{event.status}</div>
                      <div style={{ fontSize: '0.9rem', color: '#555' }}>{event.date} at {event.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {application.interviewDate && (
                <div style={{ 
                  marginTop: '20px',
                  padding: '15px',
                  background: '#F4F4DC',
                  borderRadius: '10px',
                  border: '2px solid #DC5F2E'
                }}>
                  <h3 style={{ color: '#DC5F2E', marginTop: '0' }}>Upcoming Interview</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FaCalendarAlt style={{ color: '#DC5F2E' }} />
                      <span>Date: {application.interviewDate}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FaRegClock style={{ color: '#DC5F2E' }} />
                      <span>Time: {application.interviewTime}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FaBuilding style={{ color: '#DC5F2E' }} />
                      <span>Location: {application.interviewLocation}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="details-section" style={{ 
              marginBottom: '20px',
              padding: '15px',
              background: '#F3F1DE',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ color: '#DC5F2E', borderBottom: '2px solid #DC5F2E', paddingBottom: '10px' }}>
                Requirements
              </h2>
              <ul style={{ 
                paddingLeft: '20px',
                color: '#333',
                lineHeight: '1.6'
              }}>
                {application.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="details-section" style={{ 
              marginBottom: '20px',
              padding: '15px',
              background: '#F3F1DE',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ color: '#DC5F2E', borderBottom: '2px solid #DC5F2E', paddingBottom: '10px' }}>
                Responsibilities
              </h2>
              <ul style={{ 
                paddingLeft: '20px',
                color: '#333',
                lineHeight: '1.6'
              }}>
                {application.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            {application.nextSteps && (
              <div className="details-section" style={{ 
                marginBottom: '20px',
                padding: '15px',
                background: '#F3F1DE',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{ color: '#DC5F2E', borderBottom: '2px solid #DC5F2E', paddingBottom: '10px' }}>
                  Next Steps
                </h2>
                <ul style={{ 
                  paddingLeft: '20px',
                  color: '#333',
                  lineHeight: '1.6'
                }}>
                  {application.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="details-section" style={{ 
              marginBottom: '20px',
              padding: '15px',
              background: '#F3F1DE',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ color: '#DC5F2E', borderBottom: '2px solid #DC5F2E', paddingBottom: '10px' }}>
                Key Dates
              </h2>
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                marginTop: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <FaFileAlt style={{ color: '#DC5F2E', fontSize: '1.5rem' }} />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Application Submitted</div>
                    <div style={{ color: '#555' }}>{application.submittedDate} at {application.submittedTime}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <FaRegClock style={{ color: '#DC5F2E', fontSize: '1.5rem' }} />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Application Deadline</div>
                    <div style={{ color: '#555' }}>{application.deadline}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <FaCalendarAlt style={{ color: '#DC5F2E', fontSize: '1.5rem' }} />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Placement Start Date</div>
                    <div style={{ color: '#555' }}>{application.startDate}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              textAlign: 'center', 
              marginTop: '30px', 
              marginBottom: '30px' 
            }}>
              <button 
                className="remove-button"
                onClick={() => setWithdrawModalOpen(true)}
              >
                <FaTimesCircle /> Withdraw Application
              </button>
            </div>

            {/* Extra space at bottom */}
            <div style={{ height: '50px', width: '100%' }}></div>
          </div>
        </div>
      </div>

      {withdrawModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#F3F1DE',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            border: '2px solid #DC5F2E'
          }}>
            <h2 style={{ color: '#DC5F2E', marginTop: 0 }}>Withdraw Application</h2>
            <p>Are you sure you want to withdraw your application for {application.title} at {application.company}?</p>
            <p style={{ fontWeight: 'bold', color: '#F44336' }}>This action cannot be undone.</p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '10px',
              marginTop: '20px'
            }}>
              <button 
                onClick={() => setWithdrawModalOpen(false)}
                style={{
                  padding: '8px 15px',
                  background: '#F3F1DE',
                  border: '2px solid #DC5F2E',
                  borderRadius: '5px',
                  color: '#DC5F2E',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                className="remove-button"
                onClick={handleWithdraw}
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetails;