document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".nav-container"); // Adjust based on your navbar class
    const firstTrigger = window.innerHeight * 0.8;  // First scroll point
    const secondTrigger = window.innerHeight * 1.8; // Second scroll point

    window.addEventListener("scroll", function () {
        if (window.scrollY > firstTrigger && window.scrollY < secondTrigger) {
            navbar.classList.add("scrolled"); // Apply dark navbar
        } else {
            navbar.classList.remove("scrolled"); // Revert to default navbar
        }
    });
});
