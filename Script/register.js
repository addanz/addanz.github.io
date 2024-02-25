// Author            : Addan Zahra and Rojauhn Noble
// Student ID        : 100883421   ||  100849533
// Date of Completion: February 24, 2024

//Running the validation
$(document).ready(function () {
    $("#registerForm").submit(function (event) {
        event.preventDefault();
        validateForm();
    });

    // Function for validating the reigster form, for name, number, email and passwords
    function validateForm() {
        validateName();
        validatePhoneNumber();
        validateEmail();
        validatePasswords();

        // Additional logic to check if the form is valid before redirecting
        if ($("#messageArea").hasClass("alert alert-danger")) {
            return;
        }
        displaySuccessMessage();

        // Redirect after 5 seconds
        setTimeout(function () {
            window.location.href = "login.html";
        }, 5000);
    }

    function displaySuccessMessage() {
        let messageArea = $("#messageArea");
        messageArea.removeClass("alert alert-danger").addClass("alert alert-success").text("Successfully registered! Redirecting to login page in 5 seconds.").show();
    }

    function validateName() {
        let firstName = $("#FirstName").val();
        let lastName = $("#lastName").val();

        if (firstName.trim() === "" || lastName.trim() === "") {
            displayErrorMessage("Please enter both First and Last Name.");
        }
    }

    function validatePhoneNumber() {
        let phoneNumber = $("#phoneNumber").val();

        if (!/^\d{10}$/.test(phoneNumber)) {
            displayErrorMessage("Please enter a valid 10-digit Phone Number.");
        }
    }

    function validateEmail() {
        let emailAddress = $("#emailAddress").val();

        if (!/\S+@\S+\.\S+/.test(emailAddress)) {
            displayErrorMessage("Please enter a valid Email address.");
        }
    }

    function validatePasswords() {
        let password = $("#password").val();
        let confirmPassword = $("#confirmPassword").val();

        if (password !== confirmPassword) {
            displayErrorMessage("Passwords do not match.");
        }
    }

    function displayErrorMessage(message) {
        let messageArea = $("#messageArea");
        messageArea.addClass("alert alert-danger").text(message).show();
    }


});
