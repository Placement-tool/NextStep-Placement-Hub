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
import "../styles/global.css";

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
  const { applicationId } = useParams();
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
    if (applicationId === "data-science-internship") {
      setApplication(dataScience);
    }
    
    setLoading(false);
    
    return () => unsubscribe();
  }, [applicationId, navigate]);

  const handleWithdraw = () => {
    console.log("Application withdrawn:", applicationId);
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
      <div className="not-found">
        <h2>Application not found</h2>
        <button className="back-button" onClick={() => navigate('/main')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="application-details-container">
      <button className="back-button" onClick={() => navigate('/main')}>
        <FaArrowLeft /> Back to Dashboard
      </button>

      <div className="application-header">
        <div className="company-icon large">{application.icon}</div>
        <div className="header-content">
          <h1>{application.title}</h1>
          <div className="company-name">{application.company}</div>
          <div className="tags-container">
            {application.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="application-status-section">
        <h2>Application Status</h2>
        <div className="status-container">
          <div className={`status-badge ${getStatusClass(application.status)}`}>
            {getStatusIcon(application.status)} {application.status}
          </div>
          
          <div className="status-timeline">
            {application.applicationHistory.map((event, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-icon">{event.icon}</div>
                <div className="timeline-content">
                  <div className="timeline-status">{event.status}</div>
                  <div className="timeline-date">{event.date} at {event.time}</div>
                </div>
              </div>
            ))}
          </div>

          {application.interviewDate && (
            <div className="interview-details">
              <h3>Upcoming Interview</h3>
              <div className="interview-info">
                <div className="info-item">
                  <FaCalendarAlt className="info-icon" />
                  <span>Date: {application.interviewDate}</span>
                </div>
                <div className="info-item">
                  <FaRegClock className="info-icon" />
                  <span>Time: {application.interviewTime}</span>
                </div>
                <div className="info-item">
                  <FaBuilding className="info-icon" />
                  <span>Location: {application.interviewLocation}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="application-details-section">
        <h2>Job Description</h2>
        <p>{application.description}</p>
      </div>

      <div className="requirements-section">
        <h2>Requirements</h2>
        <ul>
          {application.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="responsibilities-section">
        <h2>Responsibilities</h2>
        <ul>
          {application.responsibilities.map((resp, index) => (
            <li key={index}>{resp}</li>
          ))}
        </ul>
      </div>

      {application.nextSteps && (
        <div className="next-steps-section">
          <h2>Next Steps</h2>
          <ul>
            {application.nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="key-dates">
        <h2>Key Dates</h2>
        <div className="dates-container">
          <div className="date-item">
            <FaFileAlt className="date-icon" />
            <div>
              <div className="date-label">Application Submitted</div>
              <div className="date-value">{application.submittedDate} at {application.submittedTime}</div>
            </div>
          </div>
          <div className="date-item">
            <FaRegClock className="date-icon" />
            <div>
              <div className="date-label">Application Deadline</div>
              <div className="date-value">{application.deadline}</div>
            </div>
          </div>
          <div className="date-item">
            <FaCalendarAlt className="date-icon" />
            <div>
              <div className="date-label">Placement Start Date</div>
              <div className="date-value">{application.startDate}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="application-actions">
        <button 
          className="withdraw-button"
          onClick={() => setWithdrawModalOpen(true)}
        >
          Withdraw Application
        </button>
      </div>

      {withdrawModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Withdraw Application</h2>
            <p>Are you sure you want to withdraw your application for {application.title} at {application.company}?</p>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setWithdrawModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-button"
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