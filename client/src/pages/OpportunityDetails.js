import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBuilding, FaCalendar, FaClock, FaMoneyBillWave, FaMapMarkerAlt } from 'react-icons/fa';

const opportunities = [
  { 
    id: 1,
    title: "Investment Banking Analyst", 
    company: "JPMorgan",
    description: "Join a top-tier investment bank and gain hands-on experience in financial analysis, market research, and client management.",
    tags: ["London", "£40,000", "Finance", "12 months"],
    fullDescription: `
      As an Investment Banking Analyst at JPMorgan, you will:
      • Assist senior bankers in financial modeling and valuation
      • Conduct in-depth market research and competitive analysis
      • Prepare comprehensive presentation materials for client meetings
      • Support deal execution and transaction processes
      • Collaborate with cross-functional teams across different divisions

      Requirements:
      • Currently studying Finance, Economics, or a related field
      • Strong analytical and quantitative skills
      • Excellent Excel and financial modeling capabilities
      • Ability to work in a fast-paced, dynamic environment
      • Strong communication and presentation skills
    `,
    applyInstructions: `
      Application Process:
      1. Prepare your updated CV/Resume
      2. Write a compelling cover letter highlighting your interest and relevant skills
      3. Complete the online application form
      4. Prepare for potential psychometric tests
      5. Shortlisted candidates will be invited for interviews

      Key Dates:
      • Application Deadline: 31 Oct 2025
      • Internship Start Date: Jan 2026
      • Interview Period: Nov-Dec 2025
    `,
    icon: <FaBuilding />,
    deadline: "Apply by: 31 Oct 2025", 
    startDate: "Start: Jan 2026",
    applicationLink: "https://careers.jpmorgan.com/global/en/students/programs/investment-banking-summer-analyst?search=&tags=location__EuropeMiddleEastandAfrica__UnitedKingdom"
  },
];

const OpportunityDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    // Find the opportunity by ID 
    const foundOpportunity = opportunities.find(opp => 
      opp.title.replace(/\s+/g, '-').toLowerCase() === id
    );
    
    setOpportunity(foundOpportunity);
  }, [id]);

  if (!opportunity) {
    return <div>Opportunity not found</div>;
  }

  return (
    <div>
      <div className="header" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '80px',  
        paddingRight: '100px'  
      }}>
        <div 
          className="menu-icon" 
          onClick={() => navigate('/main')}
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center',
            marginTop: '20px'  
          }}
        >
          <FaArrowLeft />
        </div>
        <h1>Opportunity Details</h1>
      </div>
      <div className="tabs-container">
        <div className="tab">
          <div className="tab-title">
            <div className="placement-title">
              {opportunity.title}
              <span className="company-tag">{opportunity.company}</span>
              <span className="deadline-tag">{opportunity.deadline}</span>
            </div>
          </div>
          <div className="tab-content">
            <div className="opportunity-details">
              <div className="placement-opportunity">
                <div className="company-icon">{opportunity.icon}</div>
                <div className="placement-info">
                  <div className="opportunity-meta">
                    <div className="placement-tags">
                      {opportunity.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <p className="placement-description">{opportunity.description}</p>
                </div>
              </div>

              <div className="details-section">
                <h2 style={{ color: '#DC5F2E', borderBottom: '2px solid #DC5F2E', paddingBottom: '10px' }}>
                  Job Description
                </h2>
                <pre style={{ 
                  whiteSpace: 'pre-wrap', 
                  fontFamily: 'inherit', 
                  fontSize: '1rem', 
                  color: '#555',
                  lineHeight: '1.6'
                }}>
                  {opportunity.fullDescription}
                </pre>
              </div>

              <div className="details-section">
                <h2 style={{ color: '#DC5F2E', borderBottom: '2px solid #DC5F2E', paddingBottom: '10px' }}>
                  How to Apply
                </h2>
                <pre style={{ 
                  whiteSpace: 'pre-wrap', 
                  fontFamily: 'inherit', 
                  fontSize: '1rem', 
                  color: '#555',
                  lineHeight: '1.6'
                }}>
                  {opportunity.applyInstructions}
                </pre>
              </div>

              <a 
                href={opportunity.applicationLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  textDecoration: 'none',
                  display: 'block',
                  width: '90%',
                  maxWidth: '400px',
                  margin: '20px auto'
                }}
              >
                <button 
                  className="add-button"
                  style={{ 
                    width: '100%',
                    padding: '12px', 
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  Apply Now!
                </button>
              </a>
            </div>

            <div style={{ 
              height: '50px',
              width: '100%'
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailsPage;