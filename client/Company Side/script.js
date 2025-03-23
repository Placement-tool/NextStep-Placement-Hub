document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('jobListingForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const jobTitle = document.getElementById('jobTitle').value.trim();
        const companyName = document.getElementById('companyName').value.trim();
        const jobDescription = document.getElementById('jobDescription').value.trim();
        const location = document.getElementById('location').value.trim();
        const salary = document.getElementById('salary').value.trim();
        const deadline = document.getElementById('deadline').value;
        const startDate = document.getElementById('startDate').value;
        const jobType = document.getElementById('jobType').value;
        const workMode = document.getElementById('workMode').value;
        
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        const errorMessages = [];
        
        if (!jobTitle) {
            document.getElementById('jobTitleError').textContent = "Job title is required";
            errorMessages.push("Job title is required");
        }
        if (!companyName) {
            document.getElementById('companyNameError').textContent = "Company name is required";
            errorMessages.push("Company name is required");
        }
        if (!jobDescription) {
            document.getElementById('jobDescriptionError').textContent = "Job description is required";
            errorMessages.push("Job description is required");
        }
        if (!location) {
            document.getElementById('locationError').textContent = "Location is required";
            errorMessages.push("Location is required");
        }
        if (!deadline) {
            document.getElementById('deadlineError').textContent = "Application deadline is required";
            errorMessages.push("Application deadline is required");
        }
        if (!startDate) {
            document.getElementById('startDateError').textContent = "Start date is required";
            errorMessages.push("Start date is required");
        }
        if (!jobType) {
            document.getElementById('jobTypeError').textContent = "Job type is required";
            errorMessages.push("Job type is required");
        }
        if (!workMode) {
            document.getElementById('workModeError').textContent = "Work mode is required";
            errorMessages.push("Work mode is required");
        }
        
        if (errorMessages.length > 0) {
            return;
        }
        
        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };
        
        let jobIcon = '🏢';
        if (jobTitle.toLowerCase().includes('software') || jobTitle.toLowerCase().includes('developer')) {
            jobIcon = '💻';
        } else if (jobTitle.toLowerCase().includes('data')) {
            jobIcon = '📊';
        } else if (jobTitle.toLowerCase().includes('marketing')) {
            jobIcon = '📣';
        } else if (jobTitle.toLowerCase().includes('engineer')) {
            jobIcon = '⚙️';
        } else if (jobTitle.toLowerCase().includes('manager')) {
            jobIcon = '👔';
        }
        
        const jobHTML = `
            <div class="placement-opportunity">
                <div class="company-icon">${jobIcon}</div>
                <div class="placement-info">
                    <div class="placement-title">
                        ${jobTitle}
                        <span class="company-tag">${companyName}</span>
                        <span class="deadline-tag">Deadline: ${formatDate(deadline)}</span>
                    </div>
                    <div class="placement-description">
                        ${jobDescription}
                    </div>
                    <div class="placement-tags">
                        <span class="start-date-tag">Start Date: ${formatDate(startDate)}</span>
                        <span class="tag">${jobType}</span>
                        <span class="tag">${workMode}</span>
                    </div>
                </div>
                <div class="placement-actions">
                    <div class="placement-status">
                        <span class="status open">Open</span>
                    </div>
                    <button class="add-button">+ Add</button>
                    <button class="remove-button">- Remove</button>
                </div>
            </div>
        `;
        
        const jobListingsContainer = document.querySelector('.main-content');
        jobListingsContainer.insertAdjacentHTML('afterbegin', jobHTML);
        
        const newListing = jobListingsContainer.firstElementChild;
        const addButton = newListing.querySelector('.add-button');
        const removeButton = newListing.querySelector('.remove-button');
        
        addButton.addEventListener('click', function() {
            alert(`Job "${jobTitle}" has been added to your saved listings.`);
        });
        
        removeButton.addEventListener('click', function() {
            this.closest('.placement-opportunity').remove();
        });
        
        form.reset();
        newListing.scrollIntoView({ behavior: 'smooth' });
    });
    
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.closest('.placement-opportunity').querySelector('.placement-title').textContent.trim().split('\n')[0].trim();
            alert(`Job "${jobTitle}" has been added to your saved listings.`);
        });
    });
    
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.placement-opportunity').remove();
        });
    });
});