document.addEventListener("DOMContentLoaded", () => {
    // Get the product section element
    const productSection = document.querySelector(".product-section");
    const productContainer = document.querySelector(".product-container");
    // Get the animated text element
    const animatedText = document.querySelector(".product-text");
    
    // Initially hide the text with opacity 0
    if (animatedText) {
        animatedText.style.opacity = "0";
        animatedText.style.transition = "opacity 1s ease";
    }
    
    // Create a single set of blur elements that will be animated
    const blurElements = [];
    
    // Define positions for product section blurs - for desktop
    const desktopPositions = [
        // Initial state - elements positioned off-screen or subtle
        [
            {left: -2, top: 20, width: 350, height: 350, color: '#F36D2B', blur: 20},  // Left Large orange circle
            {left: 88, top: 55, width: 300, height: 300, color: '#F36D2B', blur: 20},  // Right Medium orange circle
            {left: 77, top: 50, width: 150, height: 150, color: '#98d1b0', blur: 30},  // Right Large green circle
            {left: 15, top: 60, width: 150, height: 150, color: '#98d1b0', blur: 30}   // Left Small green circle
        ],
        // Final state - elements positioned around the product
        [
            {left: -2, top: 60, width: 350, height: 350, color: '#F36D2B', blur: 20},  // Left Large orange circle
            {left: 88, top: 35, width: 300, height: 300, color: '#F36D2B', blur: 20},  // Right Medium orange
            {left: 70, top: 10, width: 150, height: 150, color: '#98d1b0', blur: 30},  // Right Large green circle
            {left: 20, top: 80, width: 150, height: 150, color: '#98d1b0', blur: 30}   // Left Small green circle
        ]
    ];
    
    // Define positions for tablets
    const tabletPositions = [
        // Initial state
        [
            {left: -5, top: 30, width: 250, height: 250, color: '#F36D2B', blur: 25, opacity: 0.6},
            {left: 85, top: 55, width: 200, height: 200, color: '#F36D2B', blur: 25, opacity: 0.6},
            {left: 77, top: 45, width: 100, height: 100, color: '#98d1b0', blur: 20, opacity: 0.6},
            {left: 10, top: 65, width: 100, height: 100, color: '#98d1b0', blur: 20, opacity: 0.6}
        ],
        // Final state
        [
            {left: -5, top: 70, width: 250, height: 250, color: '#F36D2B', blur: 25, opacity: 0.6},
            {left: 85, top: 35, width: 200, height: 200, color: '#F36D2B', blur: 25, opacity: 0.6},
            {left: 70, top: 10, width: 100, height: 100, color: '#98d1b0', blur: 20, opacity: 0.6},
            {left: 15, top: 60, width: 100, height: 100, color: '#98d1b0', blur: 20, opacity: 0.6}
        ]
    ];
    
    // Define positions for mobiles
    const mobilePositions = [
        // Initial state
        [
            {left: -10, top: 30, width: 150, height: 150, color: '#F36D2B', blur: 30, opacity: 0.4},
            {left: 80, top: 50, width: 120, height: 120, color: '#F36D2B', blur: 30, opacity: 0.4},
            {left: 70, top: 5, width: 80, height: 80, color: '#98d1b0', blur: 25, opacity: 0.4},
            {left: 5, top: 70, width: 80, height: 80, color: '#98d1b0', blur: 25, opacity: 0.4}
        ],
        // Final state
        [
            {left: -10, top: 70, width: 150, height: 150, color: '#F36D2B', blur: 30, opacity: 0.4},
            {left: 80, top: 30, width: 120, height: 120, color: '#F36D2B', blur: 30, opacity: 0.4},
            {left: 60, top: 10, width: 80, height: 80, color: '#98d1b0', blur: 25, opacity: 0.4},
            {left: 10, top: 90, width: 80, height: 80, color: '#98d1b0', blur: 25, opacity: 0.4}
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
    
    // Get the maximum number of blur elements needed
    const maxBlurs = Math.max(...desktopPositions.map(set => set.length));
    
    // Create blur elements
    for (let i = 0; i < maxBlurs; i++) {
        const blur = document.createElement('div');
        blur.className = `product-blur blur-${i}`;
        blur.style.position = 'absolute';
        blur.style.borderRadius = '50%';
        blur.style.transition = 'all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1.0)'; // Smooth easing
        blur.style.pointerEvents = 'none';
        blur.style.zIndex = '0';
        
        // Initialize with zero opacity
        blur.style.opacity = '0';
        
        productSection.appendChild(blur);
        blurElements.push(blur);
    }
    
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
    
    // Function to animate the product container from bottom to center
    function animateProductContainer() {
        // Set initial position (off-screen at bottom)
        productContainer.style.transform = 'translateY(100%)';
        productContainer.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1.0), opacity 1s ease';
        
        // Force browser to acknowledge the initial state
        setTimeout(() => {
            // Move to center
            productContainer.style.transform = 'translateY(0)';
            productContainer.style.opacity = '1';
            
            // Animate text after product container animation completes
            setTimeout(() => {
                if (animatedText) {
                    animatedText.style.opacity = "1";
                }
            }, 1000); // 1000ms delay after product is positioned
        }, 100);
    }
    
    // Function to animate blur elements
    function animateBlurs() {
        const positions = getPositions();
        
        // Start with initial positions
        blurElements.forEach((element, i) => {
            if (i < positions[0].length) {
                updateBlurElement(element, positions[0][i]);
            }
        });
        
        // Then animate to final positions
        setTimeout(() => {
            blurElements.forEach((element, i) => {
                if (i < positions[1].length) {
                    updateBlurElement(element, positions[1][i]);
                }
            });
        }, 500); // Small delay before starting the blur animation
    }
    
    // Handle window resize - update blur positions
    window.addEventListener('resize', () => {
        const positions = getPositions();
        blurElements.forEach((element, i) => {
            if (i < positions[1].length) { // Use final positions when resizing
                updateBlurElement(element, positions[1][i]);
            }
        });
    });
    
    // Function to trigger animations when section becomes visible or reset when not visible
    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is visible, play animation
                productSection.classList.add('visible');
                animateProductContainer();
                animateBlurs();
            } else {
                // Section is no longer visible, reset animations
                productSection.classList.remove('visible');
                
                // Reset product container to starting position
                productContainer.style.opacity = '0';
                productContainer.style.transform = 'translateY(100%)';
                productContainer.style.transition = 'none'; // Disable transition for instant reset
                
                // Reset text to be invisible
                if (animatedText) {
                    animatedText.style.opacity = "0";
                    animatedText.style.transition = 'none';
                }
                
                // Reset blur elements to initial state
                const positions = getPositions();
                blurElements.forEach((element, i) => {
                    if (i < positions[0].length) {
                        // Reset to initial position with no transition
                        element.style.transition = 'none';
                        updateBlurElement(element, positions[0][i]);
                    }
                });
                
                // Force reflow to apply the styles immediately
                void productSection.offsetWidth;
                
                // Re-enable transitions for next animation
                setTimeout(() => {
                    productContainer.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1.0), opacity 1s ease';
                    if (animatedText) {
                        animatedText.style.transition = 'opacity 1s ease';
                    }
                    blurElements.forEach(element => {
                        element.style.transition = 'all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1.0)';
                    });
                }, 50);
            }
        });
    }
    
    // Create intersection observer to trigger animations when section comes into view
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: "-10% 0px" // Small margin to prevent triggering too early
    });
    
    // Start observing the product section
    observer.observe(productSection);
});