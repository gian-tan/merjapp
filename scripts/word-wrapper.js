document.addEventListener("DOMContentLoaded", () => {
    const words = ["ideas", "inspo", "creativity"];
    const textElement = document.getElementById("animated-text");
    let currentWordIndex = 0;
  
    function changeText() {
        // Apply fade-out effect
        textElement.classList.add("fade-out");
  
        setTimeout(() => {
            // Change the text content
            currentWordIndex = (currentWordIndex + 1) % words.length;
            textElement.textContent = words[currentWordIndex];
  
            // Apply fade-in effect
            textElement.classList.remove("fade-out");
            textElement.classList.add("fade-in");
  
            setTimeout(() => {
                textElement.classList.remove("fade-in");
            }, 500);
        }, 500); // Matches CSS transition duration
    }
  
    // Set interval for cycling through words
    setInterval(changeText, 3000);
  });
  