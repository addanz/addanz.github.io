// Author            : Addan Zahra and Rojauhn Noble
// Student ID        : 100883421   ||  100849533
// Date of Completion: January 27, 2024

// Index page

let slideIndex = 0;

/**
 * Function to display slides in a slideshow format.
 */
function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Move to the next slide
    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Display the current slide
    slides[slideIndex - 1].style.display = "block";

    // Change slide every 5 seconds
    setTimeout(showSlides, 5000);
}

// Portfolio Page

document.addEventListener("DOMContentLoaded", function () {
    showSlides();
});

document.addEventListener("DOMContentLoaded", function () {
    const projectList = document.getElementById("project-list");
    const loadMoreButton = document.getElementById("load-more");
    let projectsData = [
        { title: "Charity Basketball Event", description: "Harmony Hub focuses on bringing the community together " +
                "through sports and activities. The following image depicts a group of children playing " +
                "basketball with fellow community members. The event encouraged both physical exercise and " +
                "collecting money for charity!", imageSrc: "./images/basketballevent.jpg" },

        { title: "Community BBQ", description: "Harmony Hub's sizzling BBQ extravaganza united our " +
                "community in a feast of flavor, forging bonds over smoky delights and sun-soaked " +
                "camaraderie. The event focused on encouraging community " +
                "engagement!", imageSrc: "./images/bbqevent.jpg" },

        { title: "Back-to-School Bash", description: "Harmony Hub's Back-to-School Bash focused on unleashing " +
                "knowledge with smiles, free supplies, and community cheer. Empowering futures, " +
                "one backpack at a time. The event provided free activities and snacks for all students and parents" +
                "along with lots of games and giveaways!", imageSrc: "./images/backtoschoolevent.jpg" },

        { title: "Student Lounge", description: "Harmony Hub's recent initiative included a student lounge for " +
                "all teens!. This project encourages students from different schools to unite and interact" +
                " with each other in a positive way. Board, table and card games along" +
                "with other interactive activities are provided.", imageSrc: "./images/studentlounge.jpg" },

        { title: "Play-area & Library", description: "A library is also provided here at Harmony Hub, not only " +
                "for children but also for adults and parents. This will allow parents to read to their " +
                "children or alone while their children play in a safe and kid friendly " +
                "environment supervised by a professional.", imageSrc: "./images/playlibrary.jpg" },

        { title: "Free Therapy Sessions", description: "Harmony Hub focuses on both the physical and mental " +
                "health of all youth in the community, therefore providing free therapy for all " +
                "teens between 12-19. This allows one-on-one consoling in a safe confidential environment " +
                "to ensure healthy stress-free youth in the community.", imageSrc: "./images/teentherapy.jpg" },
    ];
    const projectsPerPage = 3;
    let projectsToShow = projectsData.slice(0, projectsPerPage);

    /**
     * Function to create a project card HTML element.
     * @param {Object} project - Project details.
     * @returns {HTMLDivElement} - Project card element.
     */
    function createProjectCard(project) {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <img src="${project.imageSrc}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        return card;
    }

    /**
     * Function to render a list of projects on the page.
     * @param {Array} projects - List of projects to render.
     */
    function renderProjects(projects) {
        projects.forEach((project) => {
            const card = createProjectCard(project);
            projectList.appendChild(card);
        });
    }

    /**
     * Function to load more projects when the "Load More" button is clicked.
     */
    function loadMoreProjects() {
        const remainingProjects = projectsData.slice(projectsToShow.length, projectsToShow.length
            + projectsPerPage);
        projectsToShow = projectsToShow.concat(remainingProjects);

        renderProjects(remainingProjects);

        if (projectsToShow.length === projectsData.length) {
            loadMoreButton.style.display = "none";
        }
    }

    loadMoreButton.addEventListener("click", loadMoreProjects);

    // Initial rendering of projects
    renderProjects(projectsToShow);
});

// Services Page

/**
 * Function to show details of a specific service.
 * @param {number} serviceNumber - The service number.
 */
function showService(serviceNumber) {
    // Hide all service details
    const allServiceDetails = document.querySelectorAll('.service-details');
    allServiceDetails.forEach((serviceDetail) => {
        serviceDetail.style.display = 'none';
    });

    // Show the selected service detail
    const selectedServiceDetail = document.getElementById(`service-details-${serviceNumber}`);
    if (selectedServiceDetail) {
        selectedServiceDetail.style.display = 'block';
    }
}

// Team Page

/**
 * Function to display a modal with team member details.
 * @param {string} name - Team member's name.
 * @param {string} role - Team member's role.
 * @param {string} image - URL of the team member's image.
 * @param {string} description - Team member's description.
 */
function showModal(name, role, image, description) {
    const modal = document.getElementById("myModal");
    const modalContent = document.getElementById("modal-content");

    // Display the modal
    modal.style.display = "block";

    // Populate modal content with team member details
    modalContent.innerHTML = `
        <img src="${image}" alt="${name}" style="width: 100%; border-radius: 50%;">
        <h2>${name}</h2>
        <p>${role}</p>
        <p>${description}</p>
    `;
}

/**
 * Function to close the modal.
 */
function closeModal() {
    const modal = document.getElementById("myModal");

    // Hide the modal
    modal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById("myModal");

    if (event.target === modal) {
        closeModal();
    }
};

// Blog Page
/**
 * Function to toggle content visibility in a blog article.
 * @param {HTMLAnchorElement} link - The link element triggering the toggle.
 */
function toggleContent(link) {
    const article = link.closest('article');
    article.classList.toggle('expanded');

    const isExpanded = article.classList.contains('expanded');
    link.textContent = isExpanded ? 'Read Less' : 'Read More';
}

// Contact Page

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const countdownTimer = document.getElementById('countdownTimer');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Display thank you message
        form.style.display = 'none';
        thankYouMessage.style.display = 'block';

        // Start countdown timer
        let countdown = 5;
        countdownTimer.textContent = String(countdown);

        const timerInterval = setInterval(function () {
            countdown--;
            countdownTimer.textContent = String(countdown);

            if (countdown <= 0) {
                clearInterval(timerInterval);
                // Redirect to the Home page after the countdown
                window.location.href = 'index.html';
            }
        }, 1000);
    });

    // Clear form when the cancel button is clicked
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function () {
        form.reset();
    });
});

// Add Careers to navbar and change blog to News
document.addEventListener("DOMContentLoaded", function () {
    // Change 'Blog' to 'News' using Javascript
    const blogLink = document.querySelector('a[href="blog.html"]');
    if (blogLink) {
        blogLink.innerHTML = `<i class="fa-solid fa-book-open-reader"> News`;
    }

    // Add 'Careers' link
    const navbar = document.querySelector(".navbar-nav");
    const careersLink = document.createElement("li");
    careersLink.className = "nav-item";
    careersLink.innerHTML = `<a class="nav-link" href="../careers.html"><i class="fa-solid fa-briefcase"></i>
    Careers</a>`;
    navbar.appendChild(careersLink);

});

// Validating login function
function CheckLogin () {

    if(sessionStorage.getItem("user")){
        $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fa-solid fa-undo"></i> Logout</a>`);
    }

    $("#logout").on("click", function () {

        sessionStorage.clear();
        location.href = "login.html";

    });
}

// Displaying the login page function using user data
function DisplayLoginPage(){
    console.log("called DisplayLoginPage...");

    let messageArea = $("#messageArea");

    $("#loginButton").on("click", function () {

        let success = false;
        let newUser = new core.User();

        $.get("./Data/users.json", function(data) {

            for(const user of data.users) {

                console.log(user);
                if(emailAddress.value === user.EmailAddress && password.value === user.Password) {

                    newUser.fromJSON(user);
                    success = true;
                    break;
                }
            }

            if(success){
                sessionStorage.setItem("user", newUser.serialize());
                messageArea.removeAttr("class").hide();

                // Display success message
                displaySuccessMessage();

                // Redirect after 5 seconds
                setTimeout(function () {
                    location.href = "portfolio.html";
                }, 5000);
            } else {
                $("#username").trigger("focus").trigger("select");
                messageArea
                    .addClass("alert alert-danger")
                    .text("Error: Invalid Credentials")
                    .show();
            }
        });
    });

    $("#cancelButton").on("click", function () {

        document.forms[0].reset();
        location.href = "index.html";

    });

    function displaySuccessMessage() {
        messageArea
            .removeClass("alert alert-danger")
            .addClass("alert alert-success")
            .text("Successful login... Welcome to Harmony Hub!\n You will be redirected to our portfolio in 5 seconds.")
            .show();
    }
}

// Function to load header
function LoadHeader(){
    $.get("./Components/header.html", function(html_data)
    {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
    });

}
// Function to load footer
function LoadFooter(){
    $.get("./Components/footer.html", function (html_data) {
        $("footer").html(html_data);
    });
}

// Function to load content
function LoadContent() {
    $.get("./${page_name}.html", function (html_data) {
        $("main").html(html_data);
    });
}

// Function for starting and loading the pages
function Start (){
    console.log("App started...");

    LoadHeader();
    LoadFooter();
    LoadContent();

    switch(document.title) {

        case "Login":
            DisplayLoginPage();
            break;
    }
}

window.addEventListener("load", Start);

