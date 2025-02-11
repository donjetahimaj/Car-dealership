// Form Validation for the Contact Form
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || !name.match(/^[A-Za-z]+$/)) {
        alert("Please enter a valid name (letters only).");
        return;
    }

    if (email === "" || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (subject === "" || !subject.match(/^[A-Za-z0-9\s]+$/)) {
        alert("Please enter a valid subject (letters and numbers only).");
        return;
    }

    if (message === "") {
        alert("Message field cannot be empty.");
        return;
    }
});


// "Clicking on the 'Order Now' button redirects to the Shop page" 
document.querySelectorAll(".order-btn").forEach(button => {
    button.addEventListener("click", () => {
            window.location.href = "shop.html";
    });
});
