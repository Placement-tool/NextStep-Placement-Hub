import React, { useState, useEffect, useRef } from "react";
import { FaFilter, FaBars, FaUser, FaCog, FaSignOutAlt, FaBuilding, FaAmazon, FaIndustry } from "react-icons/fa";


const opportunities = [
  { title: "Investment Banking Analyst", description: "Join a top-tier investment bank and gain hands-on experience in financial analysis, market research, and client management...", tags: ["London", "£40,000", "Finance", "12 months"], company: "JPMorgan", icon: <FaBuilding />, deadline: "Apply by: 31 Oct 2023", startDate: "Start: Jan 2024" },
  { title: "Software Engineering Intern", description: "Work with a dynamic development team on cutting-edge applications, gaining exposure to full-stack development and cloud technologies...", tags: ["Manchester", "£30,000", "Software Engineering", "6 months"], company: "Amazon", icon: <FaAmazon />, deadline: "Apply by: 15 Nov 2023", startDate: "Start: Mar 2024" },
  { title: "Marketing & PR Associate", description: "Assist in executing marketing campaigns, social media management, and public relations strategies for a growing tech company...", tags: ["Birmingham", "£28,000", "Marketing", "9 months"], company: "Deloitte", icon: <FaBuilding />, deadline: "Apply by: 20 Nov 2023", startDate: "Start: Feb 2024" },
];

const applications = [
  { title: "Data Science Internship", description: "Analyze large datasets, create machine learning models, and contribute to data-driven decision-making for a leading AI firm...", tags: ["London", "£35,000", "Data Science", "12 months"], status: "Submitted", company: "Rolls Royce", icon: <FaIndustry />, deadline: "Apply by: 10 Oct 2023", startDate: "Start: Dec 2023" },
  { title: "Consulting Analyst Intern", description: "Collaborate with experienced consultants to solve business challenges, conduct market research, and prepare client presentations...", tags: ["Edinburgh", "£32,000", "Consulting", "10 months"], status: "Interview", company: "Deloitte", icon: <FaBuilding />, deadline: "Apply by: 25 Oct 2023", startDate: "Start: Jan 2024" },
  { title: "UX/UI Design Internship", description: "Work closely with product designers and engineers to create intuitive user experiences and refine product interfaces...", tags: ["Remote", "£30,000", "Design", "6 months"], status: "Waiting", company: "Amazon", icon: <FaAmazon />, deadline: "Apply by: 30 Oct 2023", startDate: "Start: Feb 2024" },
];

const filterOptions = {
  Location: ["London", "Manchester", "Birmingham", "Edinburgh", "Remote"],
  Salary: ["£30,000", "£32,000", "£35,000", "£40,000"],
  Category: ["Finance", "Software Engineering", "Marketing", "Data Science", "Consulting", "Design"],
  Length: ["6 months", "9 months", "10 months", "12 months"]
};

const PlacementOpportunity = ({ title, description, tags, status, company, icon, deadline, startDate, showAddButton, showRemoveButton, onAdd, onRemove }) => (
  <div className="placement-opportunity">
    <div className="company-icon">{icon}</div>
    <div className="placement-info">
      <div className="placement-title">
        {title}
        <span className="company-tag">{company}</span>
        <span className="deadline-tag">{deadline}</span>
      </div>
      <div className="placement-description">{description}</div>
      <div className="placement-tags">
        {startDate && <span className="start-date-tag">{startDate}</span>}
        {tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)}
      </div>
    </div>
    <div className="placement-actions">
      {status && (
        <div className="placement-status">
          <span className={`status ${status.toLowerCase()}`}>{status}</span>
        </div>
      )}
      {showAddButton && (
        <button className="add-button" onClick={onAdd}>
          + Add
        </button>
      )}
      {showRemoveButton && (
        <button className="remove-button" onClick={onRemove}>
          - Remove
        </button>
      )}
    </div>
  </div>
);

const App = () => {
  const [showFilterLeft, setShowFilterLeft] = useState(false);
  const [showFilterRight, setShowFilterRight] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedFiltersLeft, setSelectedFiltersLeft] = useState({});
  const [selectedFiltersRight, setSelectedFiltersRight] = useState({});
  
  const [allOpportunities, setAllOpportunities] = useState(opportunities);
  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities);
  
  const [allApplications, setAllApplications] = useState(applications);
  const [filteredApplications, setFilteredApplications] = useState(applications);
  
  const handleAddApplication = (opportunity) => {
    // Create a copy of the opportunity as an application with "Submitted" status
    const newApplication = {
      ...opportunity,
      status: "Submitted"
    };
    
    // Add the new application to the beginning of the applications array (LIFO)
    const updatedApplications = [newApplication, ...allApplications];
    setAllApplications(updatedApplications);
    
    // Update filtered applications accordingly
    const activeFilters = Object.values(selectedFiltersRight).filter(Boolean);
    if (activeFilters.length === 0) {
      setFilteredApplications(updatedApplications);
    } else {
      const filtered = updatedApplications.filter(application =>
        activeFilters.every(filter => application.tags.includes(filter))
      );
      setFilteredApplications(filtered);
    }
    
    // Remove the opportunity from the opportunities lists
    const updatedOpportunities = allOpportunities.filter(
      opp => opp.title !== opportunity.title || opp.company !== opportunity.company
    );
    setAllOpportunities(updatedOpportunities);
    
    // Update filtered opportunities
    const activeLeftFilters = Object.values(selectedFiltersLeft).filter(Boolean);
    if (activeLeftFilters.length === 0) {
      setFilteredOpportunities(updatedOpportunities);
    } else {
      const filtered = updatedOpportunities.filter(opp =>
        activeLeftFilters.every(filter => opp.tags.includes(filter))
      );
      setFilteredOpportunities(filtered);
    }
  };
  const menuRef = useRef(null);

  const handleRemoveApplication = (application) => {
    // Create a copy of the application as an opportunity (remove status)
    const { status, ...opportunityData } = application;
    
    // Add the opportunity to the beginning of opportunities array (LIFO)
    const updatedOpportunities = [opportunityData, ...allOpportunities];
    setAllOpportunities(updatedOpportunities);
    
    // Update filtered opportunities accordingly
    const activeLeftFilters = Object.values(selectedFiltersLeft).filter(Boolean);
    if (activeLeftFilters.length === 0) {
      setFilteredOpportunities(updatedOpportunities);
    } else {
      const filtered = updatedOpportunities.filter(opportunity =>
        activeLeftFilters.every(filter => opportunity.tags.includes(filter))
      );
      setFilteredOpportunities(filtered);
    }
    
    // Remove the application from applications lists
    const updatedApplications = allApplications.filter(
      app => app.title !== application.title || app.company !== application.company
    );
    setAllApplications(updatedApplications);
    
    // Update filtered applications
    const activeRightFilters = Object.values(selectedFiltersRight).filter(Boolean);
    if (activeRightFilters.length === 0) {
      setFilteredApplications(updatedApplications);
    } else {
      const filtered = updatedApplications.filter(app =>
        activeRightFilters.every(filter => app.tags.includes(filter))
      );
      setFilteredApplications(filtered);
    }
  };

  const toggleFilterDropdownLeft = (e) => {
    e.stopPropagation();
    setShowFilterLeft(!showFilterLeft);
  };

  const toggleFilterDropdownRight = (e) => {
    e.stopPropagation();
    setShowFilterRight(!showFilterRight);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleFilterChangeLeft = (category, option, e) => {
    e.stopPropagation();
    setSelectedFiltersLeft(prev => ({
      ...prev,
      [category]: prev[category] === option ? null : option
    }));
  };

  const handleFilterChangeRight = (category, option, e) => {
    e.stopPropagation();
    setSelectedFiltersRight(prev => ({
      ...prev,
      [category]: prev[category] === option ? null : option
    }));
  };

  const applyFiltersLeft = (e) => {
    e.stopPropagation();
    const activeFilters = Object.values(selectedFiltersLeft).filter(Boolean);
    if (activeFilters.length === 0) {
      setFilteredOpportunities(opportunities);
    } else {
      const filtered = opportunities.filter(opportunity =>
        activeFilters.every(filter => opportunity.tags.includes(filter))
      );
      setFilteredOpportunities(filtered);
    }
    setShowFilterLeft(false);
  };

  const applyFiltersRight = (e) => {
    e.stopPropagation();
    const activeFilters = Object.values(selectedFiltersRight).filter(Boolean);
    if (activeFilters.length === 0) {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter(application =>
        activeFilters.every(filter => application.tags.includes(filter))
      );
      setFilteredApplications(filtered);
    }
    setShowFilterRight(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Placement Tool</h1>
        <div className="menu-container" ref={menuRef}>
          <div className="menu-icon" onClick={toggleMenu}>
            <FaBars />
          </div>
          {showMenu && (
            <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="menu-item">
                <FaUser className="menu-icon" />
                <span>Profile</span>
              </div>
              <div className="menu-item">
                <FaCog className="menu-icon" />
                <span>Settings</span>
              </div>
              <div className="menu-item">
                <FaSignOutAlt className="menu-icon" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="tabs-container">
        <div className="tab">
          <div className="tab-title">
            <span>New Opportunities</span>
            <div className={`filter-container ${showFilterLeft ? "active" : ""}`} onClick={toggleFilterDropdownLeft}>
              <span className="filter-text">Filter by</span>
              <FaFilter className="filter-icon" />
              {showFilterLeft && (
                <div className="filter-dropdown" onClick={(e) => e.stopPropagation()}>
                  {Object.entries(filterOptions).map(([category, options]) => (
                    <div key={category} className="filter-category">
                      <span className="filter-category-title">{category}</span>
                      {options.map(option => (
                        <div key={option} className={`filter-option ${selectedFiltersLeft[category] === option ? "selected" : ""}`} onClick={(e) => handleFilterChangeLeft(category, option, e)}>
                          {option}
                        </div>
                      ))}
                    </div>
                  ))}
                  <button className="apply-button" onClick={applyFiltersLeft}>Apply</button>
                </div>
              )}
            </div>
          </div>
          <div className="tab-content">
          {filteredOpportunities.map((opportunity, index) => (
              <PlacementOpportunity 
                key={index} 
                {...opportunity} 
                showAddButton={true}
                showRemoveButton={false}
                onAdd={() => handleAddApplication(opportunity)} />))}
          </div>
        </div>
        <div className="tab">
          <div className="tab-title">
            <span>Your Applications</span>
            <div className={`filter-container ${showFilterRight ? "active" : ""}`} onClick={toggleFilterDropdownRight}>
              <span className="filter-text">Filter by</span>
              <FaFilter className="filter-icon" />
              {showFilterRight && (
                <div className="filter-dropdown" onClick={(e) => e.stopPropagation()}>
                  {Object.entries(filterOptions).map(([category, options]) => (
                    <div key={category} className="filter-category">
                      <span className="filter-category-title">{category}</span>
                      {options.map(option => (
                        <div key={option} className={`filter-option ${selectedFiltersRight[category] === option ? "selected" : ""}`} onClick={(e) => handleFilterChangeRight(category, option, e)}>
                          {option}
                        </div>
                      ))}
                    </div>
                  ))}
                  <button className="apply-button" onClick={applyFiltersRight}>Apply</button>
                </div>
              )}
            </div>
          </div>
          <div className="tab-content">
          {filteredApplications.map((application, index) => (
              <PlacementOpportunity 
                key={index} 
                {...application} 
                showAddButton={false}
                showRemoveButton={true}
                onRemove={() => handleRemoveApplication(application)} />))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;