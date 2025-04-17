document.addEventListener("DOMContentLoaded", () => {
    const words = ["ideas", "inspo", "moods"];
    const textElement = document.getElementById("animated-text");
    let currentWordIndex = 0;
    
    // Create different blur pattern containers
    const mainContent = document.querySelector(".main-content");
    
    // Define positions for each state - for desktop
    const desktopPositions = [
        // For "ideas"
        [
            {left: -2, top: 60, width: 350, height: 350, color: '#F36D2B', blur: 20},  // Left Large orange circle
            {left: 88, top: 35, width: 300, height: 300, color: '#F36D2B', blur: 20},  // Right Medium orange
            {left: 70, top: 10, width: 150, height: 150, color: '#98d1b0', blur: 30},  // Right Large green circle
            {left: 20, top: 80, width: 150, height: 150, color: '#98d1b0', blur: 30}   // Left Small green circle
        ],
        // For "inspo"
        [
            {left: -2, top: 40, width: 350, height: 350, color: '#F36D2B', blur: 20},  // Left Large orange circle 
            {left: 88, top: 45, width: 300, height: 300, color: '#F36D2B', blur: 20},  // Right Medium orange circle
            {left: 75, top: 25, width: 150, height: 150, color: '#98d1b0', blur: 30},  // Right Large green circle
            {left: 15, top: 70, width: 150, height: 150, color: '#98d1b0', blur: 30}   // Left Small green circle
        ],
        // For "moods"
        [
            {left: -2, top: 20, width: 350, height: 350, color: '#F36D2B', blur: 20},  // Left Large orange circle
            {left: 88, top: 55, width: 300, height: 300, color: '#F36D2B', blur: 20},  // Right Medium orange circle
            {left: 77, top: 50, width: 150, height: 150, color: '#98d1b0', blur: 30},  // Right Large green circle
            {left: 15, top: 60, width: 150, height: 150, color: '#98d1b0', blur: 30}   // Left Small green circle
        ]
    ];
    
    // Define positions for tablets
    const tabletPositions = [
        // For "ideas"
        [
            {left: -5, top: 70, width: 250, height: 250, color: '#F36D2B', blur: 25, opacity: 0.6},
            {left: 85, top: 35, width: 200, height: 200, color: '#F36D2B', blur: 25, opacity: 0.6},
            {left: 70, top: 10, width: 100, height: 100, color: '#98d1b0', blur: 20, opacity: 0.6},
            {left: 15, top: 60, width: 100, height: 100, color: '#98d1b0', blur: 20, opacity: 0.6}
        ],
        // For "inspo"
        [
            {left: -5, top: 50, width: 250, height: 250, color: '#F36D2B', blur: 25, opacity: 0.6},
            {left: 85, top: 45, width: 200, height: 200, color: '#F36D2B', blur: 25, opacity: 0.6},
            {left: 75, top: 20, width: 100, height: 100, color: '#98d1b0', blur: 20, opacity: 0.6},
            {left: 10, top: 75, width: 100, height: 100, color: '#98d1b0', blur: 20, opacity: 0.6}
        ],
        // For "moods"
        [
            {left: -5, top: 30, width: 250, height: 250, color: '#F36D2B', blur: 25, opacity: 0.6},
            {left: 85, top: 55, width: 200, height: 200, color: '#F36D2B', blur: 25, opacity: 0.6},
            {left: 77, top: 45, width: 100, height: 100, color: '#98d1b0', blur: 20, opacity: 0.6},
            {left: 10, top: 65, width: 100, height: 100, color: '#98d1b0', blur: 20, opacity: 0.6}
        ]
    ];
    
    // Define positions for mobiles
    const mobilePositions = [
        // For "ideas"
        [
            {left: -10, top: 70, width: 150, height: 150, color: '#F36D2B', blur: 30, opacity: 0.4},
            {left: 80, top: 30, width: 120, height: 120, color: '#F36D2B', blur: 30, opacity: 0.4},
            {left: 60, top: 10, width: 80, height: 80, color: '#98d1b0', blur: 25, opacity: 0.4},
            {left: 10, top: 90, width: 80, height: 80, color: '#98d1b0', blur: 25, opacity: 0.4}
        ],
        // For "inspo"
        [
            {left: -10, top: 50, width: 150, height: 150, color: '#F36D2B', blur: 30, opacity: 0.4},
            {left: 80, top: 40, width: 120, height: 120, color: '#F36D2B', blur: 30, opacity: 0.4},
            {left: 65, top: 20, width: 80, height: 80, color: '#98d1b0', blur: 25, opacity: 0.4},
            {left: 5, top: 80, width: 80, height: 80, color: '#98d1b0', blur: 25, opacity: 0.4}
        ],
        // For "moods"
        [
            {left: -10, top: 30, width: 150, height: 150, color: '#F36D2B', blur: 30, opacity: 0.4},
            {left: 80, top: 50, width: 120, height: 120, color: '#F36D2B', blur: 30, opacity: 0.4},
            {left: 70, top: 5, width: 80, height: 80, color: '#98d1b0', blur: 25, opacity: 0.4},
            {left: 5, top: 70, width: 80, height: 80, color: '#98d1b0', blur: 25, opacity: 0.4}
        ]
    ];
    
    // Function to determine which positions to use based on screen width
    function getPositions() {
        const width = window.innerWidth;
        if (width <= 767) {
            return mobilePositions;
        } else if (width <= 1024) {
            return tabletPositions;
        } else {
            return desktopPositions;
        }
    }
    
    // Create a single set of blur elements that will be animated
    const blurElements = [];
    
    // Get the maximum number of blur elements needed
    const maxBlurs = Math.max(...desktopPositions.map(set => set.length));
    
    // Create blur elements
    for (let i = 0; i < maxBlurs; i++) {
        const blur = document.createElement('div');
        blur.className = `tween-blur blur-${i}`;
        blur.style.position = 'absolute';
        blur.style.borderRadius = '50%';
        blur.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0)'; // Smooth easing
        blur.style.pointerEvents = 'none';
        blur.style.zIndex = '0';
        
        // Initialize with zero opacity
        blur.style.opacity = '0';
        
        mainContent.appendChild(blur);
        blurElements.push(blur);
    }
    
    // Hide the original blur elements
    const originalBlurs = document.querySelectorAll(".small-blur-1, .small-blur-2, .small-blur-3, .small-blur-4");
    originalBlurs.forEach(el => {
        if (el) el.style.opacity = '0';
    });
    
    // Helper function to update blur element with specific properties
    function updateBlurElement(element, props) {
        element.style.left = `${props.left}%`;
        element.style.top = `${props.top}%`;
        element.style.width = `${props.width}px`;
        element.style.height = `${props.height}px`;
        element.style.backgroundColor = props.color;
        element.style.filter = `blur(${props.blur}px)`;
        element.style.opacity = props.opacity || 0.8;
    }
    
    // Function to update all blur elements based on current screen size and word state
    function updateBlurs() {
        const positions = getPositions();
        blurElements.forEach((element, i) => {
            if (i < positions[currentWordIndex].length) {
                updateBlurElement(element, positions[currentWordIndex][i]);
            } else {
                element.style.opacity = '0';
            }
        });
    }
  
    function changeText() {
        // Apply fade-out effect to text only
        textElement.style.transition = 'opacity 0.3s ease-out';
        textElement.style.opacity = '0';
        
        // Calculate next word index
        const nextIndex = (currentWordIndex + 1) % words.length;
        
        // Get current position set based on screen size
        const positions = getPositions();
        
        // Update each blur element's position to match the next state
        blurElements.forEach((element, i) => {
            if (i < positions[nextIndex].length) {
                updateBlurElement(element, positions[nextIndex][i]);
            } else {
                element.style.opacity = '0';
            }
        });
  
        setTimeout(() => {
            // Change the text content
            currentWordIndex = nextIndex;
            textElement.textContent = words[currentWordIndex];
  
            // Apply fade-in effect to text
            textElement.style.transition = 'opacity 0.3s ease-in';
            textElement.style.opacity = '1';
        }, 300);
    }
    
    // Handle window resize
    window.addEventListener('resize', updateBlurs);
    
    // Initial update
    updateBlurs();
  
    // Set interval for cycling through words
    setInterval(changeText, 3000);
});