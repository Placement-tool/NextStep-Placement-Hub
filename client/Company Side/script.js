document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('jobListingForm');
    const jobListingsContainer = document.querySelector('.main-content');
    let lastRemovedJob = null; 
    let toastTimeout = null; 
    
    function showToast(message, undoCallback) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        const undoButton = document.createElement('button');
        undoButton.textContent = 'Undo';
        undoButton.className = 'undo-button';
        undoButton.addEventListener('click', () => {
            undoCallback();
            toast.remove();
            clearTimeout(toastTimeout); // Clear the timeout if "Undo" is clicked
        });

        toast.appendChild(undoButton);
        document.body.appendChild(toast);

        toastTimeout = setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    function restoreLastRemovedJob() {
        if (lastRemovedJob) {
            jobListingsContainer.insertAdjacentHTML('afterbegin', lastRemovedJob);
            lastRemovedJob = null; 
            attachEventListenersToNewJob(); 
        }
    }

    function attachEventListenersToNewJob() {
        const newListing = jobListingsContainer.firstElementChild;
        const removeButton = newListing.querySelector('.remove-button');

        removeButton.addEventListener('click', function() {
            const jobToRemove = this.closest('.placement-opportunity');
            lastRemovedJob = jobToRemove.outerHTML; 
            jobToRemove.remove();

            showToast('Job removed', () => {
                restoreLastRemovedJob();
            });
        });
    }

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

        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        const errorMessages = [];
        if (!jobTitle) errorMessages.push("Job title is required");
        if (!companyName) errorMessages.push("Company name is required");
        if (!jobDescription) errorMessages.push("Job description is required");
        if (!location) errorMessages.push("Location is required");
        if (!deadline) errorMessages.push("Application deadline is required");
        if (!startDate) errorMessages.push("Start date is required");
        if (!jobType) errorMessages.push("Job type is required");
        if (!workMode) errorMessages.push("Work mode is required");

        if (errorMessages.length > 0) {
            errorMessages.forEach(msg => alert(msg));
            return;
        }

        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const jobHTML = `
            <div class="placement-opportunity">
                <div class="company-icon">🏢</div>
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
                    <button class="remove-button">- Remove</button>
                </div>
            </div>
        `;

        jobListingsContainer.insertAdjacentHTML('afterbegin', jobHTML);
        attachEventListenersToNewJob();
        form.reset();
        jobListingsContainer.firstElementChild.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function() {
            const jobToRemove = this.closest('.placement-opportunity');
            lastRemovedJob = jobToRemove.outerHTML; 
            jobToRemove.remove();

            showToast('Job removed', () => {
                restoreLastRemovedJob();
            });
        });
    });
});