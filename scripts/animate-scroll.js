document.addEventListener("scroll", () => {
    const productSection = document.querySelector(".product-section");
    const sectionTop = productSection.getBoundingClientRect().top;
    const sectionHeight = productSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // If the product section is in the viewport
    if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        productSection.classList.add("visible"); // Add class to change background and reveal image
        
        // Delay adding blur circles
        setTimeout(() => {
            productSection.classList.add("show-blur-circles");
        }, 1500); // Match this duration with your CSS transition time
    } else {
        productSection.classList.remove("visible"); // Remove class to reset
        productSection.classList.remove("show-blur-circles"); // Reset blur circles
    }
});
