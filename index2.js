// Initial job listings
let jobListings = [
    {
        title: "Frontend Developer",
        company: "Tech Corp",
        location: "Chennai",
        description: "Looking for a skilled frontend developer with experience in React and JavaScript.",
        postedDate: new Date().toLocaleDateString(),
        image: "https://media.licdn.com/dms/image/D4D12AQHZ4n9TunXXqQ/article-cover_image-shrink_720_1280/0/1673598310961?e=2147483647&v=beta&t=Zvay8rRuGCOPO6Fuf7S0o3CMLLVrEDI-UiKf0HS2Waw"
    },
    {
        title: "Backend Developer",
        company: "Innovate Solutions",
        location: "San Francisco",
        description: "Experienced backend developer needed with skills in Node.js and MongoDB.",
        postedDate: new Date().toLocaleDateString(),
        image: "https://media.licdn.com/dms/image/v2/D4D12AQFnxb2cyB4ExQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1669297731190?e=2147483647&v=beta&t=sRnBowDzBe2IKcdXjmCd8R94qJ4SlAJgst-0QiUIEEA"
    },
    {
        title: "DevOps Engineer",
        company: "Cloud Innovations",
        location: "Pune",
        description: "Hiring a DevOps engineer with experience in AWS and CI/CD tools.",
        postedDate: new Date().toLocaleDateString(),
        image: "https://www.softronix.in/uploads/blog/1725692496-M1XAjCdub1.jpg"
    },
    {
        title: "Data Scientist",
        company: "Data Analytics Inc.",
        location: "Bangalore",
        description: "Looking for a data scientist proficient in Python, R, and machine learning.",
        postedDate: new Date().toLocaleDateString(),
        image: "https://thumbs.dreamstime.com/b/big-data-center-analyzes-data-science-background-presentation-big-data-center-analyzes-data-science-background-159196598.jpg"
    },
    {
        title: "UI/UX Designer",
        company: "Creative Studio",
        location: "New York",
        description: "Seeking a passionate and creative UI/UX designer with proven experience in Figma, Sketch, and user research.",
        postedDate: new Date().toLocaleDateString(),
        image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149051557.jpg"
    },
    {
        title: "Project Manager",
        company: "TechPro Solutions",
        location: "Toronto",
        description: "Looking for a project manager with strong leadership skills and agile methodology experience.",
        postedDate: new Date().toLocaleDateString(),
        image: "https://i0.wp.com/pmcenter.bellevue.edu/wp-content/uploads/2021/11/project-management-manage.jpg?fit=800%2C617&ssl=1"
    },
    {
        title: "Cybersecurity ",
        company: "SecureTech",
        location: "Mumbai",
        description: "Hiring a cybersecurity specialist to protect company data and handle threat analysis.",
        postedDate: new Date().toLocaleDateString(),
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDW6jfR9TVlTppGkO4_kIcKT6OlzaNhPFeA&s"
    },
    {
        title: "Cloud Architect",
        company: "SkyTech Solutions",
        location: "Hyderabad",
        description: "Looking for a cloud architect with expertise in cloud platforms like AWS, Azure, or Google Cloud.",
        postedDate: new Date().toLocaleDateString(),
        image: "https://c8.alamy.com/comp/E9GEB8/cloud-computing-text-cloud-E9GEB8.jpg"
    },
    {
        title: "IoT Developer",
        company: "SmartHome Innovations",
        location: "Barcelona",
        description: "Hiring an IoT developer to work on smart device integration and development.",
        postedDate: new Date().toLocaleDateString(),
        image: "https://cdn4.vectorstock.com/i/1000x1000/82/63/iot-development-abstract-concept-vector-35518263.jpg"
    }
];

// Function to create a job card element with Apply and Save buttons
function createJobCard(job, index) {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");
    jobCard.innerHTML = `
        <img src="${job.image}" alt="${job.title}" class="job-image">
        <h3>${job.title}</h3>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Posted on:</strong> ${job.postedDate}</p>
        <p>${job.description}</p>
        <button class="apply-button" data-index="${index}">Apply</button>
        <button class="save-button" data-index="${index}">Save</button>
    `;
    return jobCard;
}

// Function to display job listings
function displayJobListings() {
    const jobListingsContainer = document.getElementById("job-listings");
    jobListingsContainer.innerHTML = ""; // Clear existing listings
    jobListings.forEach((job, index) => {
        const jobCard = createJobCard(job, index);
        jobListingsContainer.appendChild(jobCard);
    });

    // Add event listeners to Apply and Save buttons after the job cards are created
    document.querySelectorAll('.apply-button').forEach(button => {
        button.addEventListener('click', function() {
            this.textContent = 'Applied';
            this.disabled = true;
            this.classList.add('apply-clicked');
            alert('Your application has been submitted!');
        });
    });

    document.querySelectorAll('.save-button').forEach(button => {
        button.addEventListener('click', function() {
            this.textContent = 'Saved';
            this.disabled = true;
            this.classList.add('save-clicked');
            alert('Job has been saved to your profile!');
        });
    });
}

// Event listener for the job posting form
document.getElementById("job-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const company = document.getElementById("company").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;
    
    jobListings.push({
        title: title,
        company: company,
        location: location,
        description: description,
        postedDate: new Date().toLocaleDateString(),
        image: image
    });
    displayJobListings();
    this.reset(); // Reset the form
});

// Function to show the selected section and hide others
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach((section) => {
        section.style.display = "none"; // Hide all sections
    });
    document.getElementById(sectionId).style.display = "block"; // Show the selected section
}

// Add event listeners to navigation links
document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        const sectionId = this.getAttribute("href").substring(1); // Get target section ID from href
        showSection(sectionId); // Show the clicked section
    });
});

// Initial display of the home section
showSection("home");
// Initial display of job listings
displayJobListings();
