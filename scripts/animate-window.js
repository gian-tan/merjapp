document.addEventListener('DOMContentLoaded', function() {
    // Track animation state
    let animationState = {
      currentStage: 0,
      animationPlaying: false,
      timeline: null
    };
  
    // Create window elements programmatically with responsive positioning
    const createWindows = (preserveState = false) => {
      const descriptionSection = document.querySelector('.description-section');
      
      // Ensure all windows are removed before creating new ones
      const existingWindows = document.querySelectorAll('.window');
      existingWindows.forEach(window => window.remove());
      
      // Reference point for centering - use the center of the viewport
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      const centerX = vw / 2;
      const centerY = vh / 2;
      
      // For smaller screens, use percentage-based values to maintain position
      let positionMultiplier = 1;
      if (vw < 480) {
        positionMultiplier = 0.7; // Mobile
      } else if (vw < 768) {
        positionMultiplier = 0.8; // Tablet
      } else if (vw < 1200) {
        positionMultiplier = 0.9; // Small desktop
      }
      
      // Fixed positions based on the screenshot layout
      // Using offsets from center to maintain centering
      // These positions place the windows where they appear in the screenshot
      const windowPositions = [
        // Set 1 - Large background windows
        { 
          set: 'window-set-1', 
          left: centerX - (750 * positionMultiplier),
          width: 500 * positionMultiplier,
          height: 350 * positionMultiplier,
          top: centerY - (300 * positionMultiplier)
        },
        { 
          set: 'window-set-1', 
          left: centerX + (250 * positionMultiplier),
          width: 500 * positionMultiplier,
          height: 350 * positionMultiplier,
          top: centerY - (300 * positionMultiplier)
        },
        
        // Set 2 - Medium windows
        { 
          set: 'window-set-2', 
          left: centerX - (700 * positionMultiplier),
          width: 400 * positionMultiplier,
          height: 250 * positionMultiplier,
          top: centerY - (100 * positionMultiplier)
        },
        { 
          set: 'window-set-2', 
          left: centerX - (200 * positionMultiplier),
          width: 400 * positionMultiplier,
          height: 400 * positionMultiplier,
          top: centerY + (-250 * positionMultiplier)
        },
        { 
          set: 'window-set-2', 
          left: centerX + (300 * positionMultiplier),
          width: 400 * positionMultiplier,
          height: 250 * positionMultiplier,
          top: centerY - (100 * positionMultiplier)
        },
        
        // Set 3 - Smaller foreground windows
        { 
          set: 'window-set-3', 
          left: centerX - (500 * positionMultiplier),
          width: 320 * positionMultiplier,
          height: 220 * positionMultiplier,
          top: centerY + (50 * positionMultiplier)
        },
        { 
          set: 'window-set-3', 
          left: centerX + (175 * positionMultiplier),
          width: 320 * positionMultiplier,
          height: 220 * positionMultiplier,
          top: centerY + (50 * positionMultiplier)
        }
      ];
      
      // Create all windows based on the positions array
      windowPositions.forEach(pos => {
        const windowEl = createWindowElement(
          pos.set,
          pos.left,
          pos.width,
          pos.height,
          pos.top
        );
        descriptionSection.appendChild(windowEl);
      });
      
      // Helper function to create a window element
      function createWindowElement(className, left, width, height, top) {
        const windowEl = document.createElement('div');
        windowEl.className = `window ${className}`;
        windowEl.style.position = 'absolute';
        windowEl.style.left = `${left}px`;
        windowEl.style.top = `${top}px`;
        windowEl.style.width = `${width}px`;
        windowEl.style.height = `${height}px`;
        windowEl.style.backgroundColor = '#f1f1f1'; // Light gray matching the screenshot
        windowEl.style.borderRadius = '8px';
        windowEl.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        windowEl.style.zIndex = '1';
        
        // Add window header
        const header = document.createElement('div');
        header.className = 'window-header';
        header.style.height = '24px';
        header.style.width = '100%';
        header.style.backgroundColor = '#333';
        header.style.borderTopLeftRadius = '8px';
        header.style.borderTopRightRadius = '8px';
        
        windowEl.appendChild(header);
        return windowEl;
      }
      
      // If we're preserving animation state, apply the current opacity based on stage
      if (preserveState) {
        const firstSetWindows = document.querySelectorAll('.window-set-1');
        const secondSetWindows = document.querySelectorAll('.window-set-2');
        const thirdSetWindows = document.querySelectorAll('.window-set-3');
        const productDesc = document.querySelector('.product-desc');
        
        // Default setup - all visible with proper opacity
        gsap.set(firstSetWindows, { opacity: 1 });
        gsap.set(secondSetWindows, { opacity: 1 });
        gsap.set(thirdSetWindows, { opacity: 1 });
        gsap.set(productDesc, { opacity: 1, scale: 1, zIndex: 10 });
        
        // Apply appropriate states based on current animation stage
        if (animationState.currentStage <= 0) {
          gsap.set(firstSetWindows, { opacity: 1 });
          gsap.set(secondSetWindows, { opacity: 0 });
          gsap.set(thirdSetWindows, { opacity: 0 });
          gsap.set(productDesc, { opacity: 0, scale: 0.8 });
        } else if (animationState.currentStage === 1) {
          gsap.set(firstSetWindows, { opacity: 1 });
          gsap.set(secondSetWindows, { opacity: 1 });
          gsap.set(thirdSetWindows, { opacity: 0 });
          gsap.set(productDesc, { opacity: 0, scale: 0.8 });
        } else if (animationState.currentStage === 2) {
          gsap.set(firstSetWindows, { opacity: 1 });
          gsap.set(secondSetWindows, { opacity: 1 });
          gsap.set(thirdSetWindows, { opacity: 1 });
          gsap.set(productDesc, { opacity: 0, scale: 0.8 });
        } else if (animationState.currentStage >= 3) {
          gsap.set([firstSetWindows, secondSetWindows, thirdSetWindows], { 
            opacity: 0.4,
            filter: 'blur(3px)'
          });
          gsap.set(productDesc, { opacity: 1, scale: 1 });
        }
      }
    };
    
    // Set up the animation sequence
    const animationSequence = () => {
      // Create the windows first if they don't exist
      if (!document.querySelector('.window')) {
        createWindows();
      }
      
      // Select the window sets
      const firstSetWindows = document.querySelectorAll('.window-set-1');
      const secondSetWindows = document.querySelectorAll('.window-set-2');
      const thirdSetWindows = document.querySelectorAll('.window-set-3');
      
      // Product description section
      const productDesc = document.querySelector('.product-desc');
      
      // Initial setup - make sure first set is visible, hide the others
      gsap.set(firstSetWindows, { opacity: 1 });
      gsap.set(secondSetWindows, { opacity: 0 });
      gsap.set(thirdSetWindows, { opacity: 0 });
      gsap.set(productDesc, { opacity: 0, scale: 1, zIndex: 10 }); // Higher z-index to ensure it's on top
      
      // Create a GSAP timeline for sequencing
      const tl = gsap.timeline({ 
        defaults: { ease: 'power2.inOut' },
        onUpdate: function() {
          // Update animation state based on timeline progress
          if (this.progress() === 0) {
            animationState.currentStage = 0;
          } else if (this.progress() < 0.4) {
            animationState.currentStage = 1;
          } else if (this.progress() < 0.7) {
            animationState.currentStage = 2;
          } else {
            animationState.currentStage = 3;
          }
        }
      });
      
      // Animation sequence
      tl
        // First state - first set of windows already visible (no animation needed)
        .to({}, { duration: 1 }) // Pause for a moment
        
        // Second state - fade in second set of windows all at once (not staggered)
        .to(secondSetWindows, { 
          duration: 1, 
          opacity: 1
        })
        
        // Third state - fade in third set of windows all at once
        .to(thirdSetWindows, { 
          duration: 1, 
          opacity: 1
        }, '+=0.5')
        
        // Fourth state - make all windows slightly transparent, show product and text
        .to([firstSetWindows, secondSetWindows, thirdSetWindows], { 
          duration: 0.8, 
          opacity: 0.4,
          filter: 'blur(3px)'
        }, '+=0.8')
        
        // Show the product image and text
        .to(productDesc, { 
          duration: 1, 
          opacity: 1,
          scale: 1,
          ease: 'back.out(1.2)'
        }, '-=0.4');
      
      // Store timeline in animation state
      animationState.timeline = tl;
      
      return tl;
    };
    
    // Handle window resize to make everything responsive
    let resizeTimeout;
    window.addEventListener('resize', function() {
      // Debounce the resize event
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        // Recreate windows with new dimensions while preserving animation state
        createWindows(true);
      }, 250);
    });
    
    // Add GSAP script if it's not already in the document
    if (!window.gsap) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = function() {
        // Start the animation after GSAP loads
        const masterTimeline = gsap.timeline();
        masterTimeline.add(animationSequence());
        animationState.animationPlaying = true;
      };
      document.head.appendChild(script);
    } else {
      // GSAP already exists, start animation
      const masterTimeline = gsap.timeline();
      masterTimeline.add(animationSequence());
      animationState.animationPlaying = true;
    }
  });