document.getElementById('jobListingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const formData = {
        jobTitle: document.getElementById('jobTitle').value,
        companyName: document.getElementById('companyName').value,
        jobDescription: document.getElementById('jobDescription').value,
        location: document.getElementById('location').value,
        salary: document.getElementById('salary').value,
        deadline: document.getElementById('deadline').value,
        startDate: document.getElementById('startDate').value
    };
});