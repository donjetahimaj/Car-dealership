// Email validation for the subscribe form 

document.querySelector(".input-wrapper span").addEventListener("click", function() {
    document.getElementById("subscribe-form").requestSubmit();
});

document.getElementById("subscribe-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let emailAddress = document.getElementById("emailadd").value.trim();

    if (emailAddress === "" || !emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert("Please enter a valid email address.");
        return;
    }
});
