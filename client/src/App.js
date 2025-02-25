import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const opportunities = [
  { title: "Investment Banking Analyst", description: "Join a top-tier investment bank and gain hands-on experience in financial analysis, market research, and client management...", tags: ["London", "£40,000", "Finance", "12 months"] },
  { title: "Software Engineering Intern", description: "Work with a dynamic development team on cutting-edge applications, gaining exposure to full-stack development and cloud technologies...", tags: ["Manchester", "£30,000", "Software Engineering", "6 months"] },
  { title: "Marketing & PR Associate", description: "Assist in executing marketing campaigns, social media management, and public relations strategies for a growing tech company...", tags: ["Birmingham", "£28,000", "Marketing", "9 months"] },
];

const applications = [
  { title: "Data Science Internship", description: "Analyze large datasets, create machine learning models, and contribute to data-driven decision-making for a leading AI firm...", tags: ["London", "£35,000", "Data Science", "12 months"] },
  { title: "Consulting Analyst Intern", description: "Collaborate with experienced consultants to solve business challenges, conduct market research, and prepare client presentations...", tags: ["Edinburgh", "£32,000", "Consulting", "10 months"] },
  { title: "UX/UI Design Internship", description: "Work closely with product designers and engineers to create intuitive user experiences and refine product interfaces...", tags: ["Remote", "£30,000", "Design", "6 months"] },
];

const filterOptions = {
  Location: ["London", "Manchester", "Birmingham", "Edinburgh", "Remote"],
  Salary: ["£30,000", "£32,000", "£35,000", "£40,000"],
  Category: ["Finance", "Software Engineering", "Marketing", "Data Science", "Consulting", "Design"],
  Length: ["6 months", "9 months", "10 months", "12 months"]
};

const PlacementOpportunity = ({ title, description, tags }) => (
  <div className="placement-opportunity">
    <div className="placement-title">{title}</div>
    <div className="placement-description">{description}</div>
    <div className="placement-tags">
      {tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)}
    </div>
  </div>
);

const App = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilterDropdown = () => setShowFilter(!showFilter);

  const handleFilterChange = (category, option) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category] === option ? null : option
    }));
  };

  return (
    <div>
      <h1>Placement Tool</h1>
      <div className="tabs-container">
        <div className="tab">
        <div className="tab-title">
          <span>New Opportunities</span>
          <div className={`filter-container ${showFilter ? "active" : ""}`} onClick={toggleFilterDropdown}>
            <span className="filter-text">Filter by</span>
            <FaFilter className="filter-icon" />
            {showFilter && (
              <div className="filter-dropdown">
                {Object.entries(filterOptions).map(([category, options]) => (
                  <div key={category} className="filter-category">
                    <span className="filter-category-title">{category}</span>
                    {options.map(option => (
                      <div key={option} className={`filter-option ${selectedFilters[category] === option ? "selected" : ""}`} onClick={() => handleFilterChange(category, option)}>
                        {option}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

          <div className="tab-content">
            {opportunities.map((opportunity, index) => <PlacementOpportunity key={index} {...opportunity} />)}
          </div>
        </div>
        <div className="tab">
          <div className="tab-title">Your Applications</div>
          <div className="tab-content">
            {applications.map((application, index) => <PlacementOpportunity key={index} {...application} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
