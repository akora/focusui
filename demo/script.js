// Comprehensive iPad detection
function detectIPad() {
    const ua = navigator.userAgent;

    // Check for iPad in user agent string (works for all iPad models)
    const hasIPadInUA = /iPad/.test(ua);

    // Check for Macintosh + touch (covers iPad Pro models that report as desktop)
    const isMacWithTouch = /Macintosh/.test(ua) && 'ontouchend' in document;

    // Check for iPad-specific screen dimensions (common iPad sizes)
    const screenWidth = Math.min(screen.width, screen.height);
    const screenHeight = Math.max(screen.width, screen.height);
    const isIPadSize = (
        // iPad (9.7", 10.2")
        (screenWidth === 768 && screenHeight === 1024) ||
        // iPad Air/Mini (10.5", 10.9")
        (screenWidth === 834 && screenHeight === 1112) ||
        // iPad Pro 11"
        (screenWidth === 834 && screenHeight === 1194) ||
        // iPad Pro 12.9"
        (screenWidth === 1024 && screenHeight === 1366)
    );

    // Check for iPad-specific device pixel ratios
    const isIPadDPR = window.devicePixelRatio === 2 || window.devicePixelRatio === 3;

    // Combined detection (most reliable)
    const isIPad = hasIPadInUA || (isMacWithTouch && isIPadSize) || (isMacWithTouch && isIPadDPR);

    console.log('iPad Detection Results:', {
        userAgent: ua,
        hasIPadInUA,
        isMacWithTouch,
        screenSize: `${screenWidth}x${screenHeight}`,
        isIPadSize,
        devicePixelRatio: window.devicePixelRatio,
        isIPadDPR,
        finalResult: isIPad
    });

    return isIPad;
}

// Detect browser type
function detectBrowser() {
    const ua = navigator.userAgent;

    // Safari detection (must check before Chrome)
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua) && !/CriOS/i.test(ua);

    // Chrome detection
    const isChrome = /Chrome/.test(ua) && /CriOS/i.test(ua);

    console.log('Browser Detection:', { userAgent: ua, isSafari, isChrome });

    return { isSafari, isChrome };
}

// Apply iPad-specific classes and styling
document.addEventListener('DOMContentLoaded', function() {
    const isIPad = detectIPad();
    const browser = detectBrowser();

    // Apply detection classes
    if (isIPad) {
        document.body.classList.add('is-ipad');

        if (browser.isSafari) {
            document.body.classList.add('ipad-safari');
        } else if (browser.isChrome) {
            document.body.classList.add('ipad-chrome');
        }
    }

    console.log('Applied classes:', Array.from(document.body.classList));

    // Get all drawers and app container
    const app = document.querySelector('.app');
    const drawers = {
        left: document.getElementById('drawer-left'),
        right: document.getElementById('drawer-right'),
        top: document.getElementById('drawer-top'),
        bottom: document.getElementById('drawer-bottom')
    };

    // Get secondary drawer elements
    const secondaryDrawer = document.getElementById('secondary-drawer');
    const secondaryTrigger = document.getElementById('secondary-trigger');
    
    // Function to update logo visibility based on drawer states
    function updateLogoVisibility() {
        const anyDrawerOpen = Object.values(drawers).some(drawer => 
            drawer.classList.contains('expanded')
        ) || secondaryDrawer.classList.contains('active');
        
        if (anyDrawerOpen) {
            app.classList.add('drawer-open');
        } else {
            app.classList.remove('drawer-open');
        }
    }

    // Add click handlers to each drawer
    Object.keys(drawers).forEach(position => {
        const drawer = drawers[position];
        
        drawer.addEventListener('click', function(e) {
            // Don't toggle main drawer if clicking on secondary trigger
            if (e.target.closest('.secondary-trigger')) {
                return;
            }
            
            // Close secondary drawer when main left drawer closes
            if (position === 'left' && drawer.classList.contains('expanded')) {
                secondaryDrawer.classList.remove('active');
                secondaryTrigger.classList.remove('active');
                drawers.left.classList.remove('secondary-active');
            }
            
            // Toggle this drawer (allow multiple drawers to be open)
            drawer.classList.toggle('expanded');
            
            // Update logo visibility
            updateLogoVisibility();
        });
    });

    // Secondary drawer toggle functionality
    if (secondaryTrigger && secondaryDrawer) {
        secondaryTrigger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent main drawer from toggling
            
            // Only work if left drawer is expanded
            if (drawers.left.classList.contains('expanded')) {
                secondaryDrawer.classList.toggle('active');
                secondaryTrigger.classList.toggle('active');
                // Add class to primary drawer to boost its z-index
                drawers.left.classList.toggle('secondary-active');
                
                // Update logo visibility
                updateLogoVisibility();
            }
        });
    }

    // Optional: Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC key closes all drawers
        if (e.key === 'Escape') {
            Object.values(drawers).forEach(drawer => {
                drawer.classList.remove('expanded');
            });
            // Also close secondary drawer
            secondaryDrawer.classList.remove('active');
            secondaryTrigger.classList.remove('active');
            drawers.left.classList.remove('secondary-active');
            
            // Update logo visibility
            updateLogoVisibility();
        }
        
        // Arrow keys to toggle specific drawers
        switch(e.key) {
            case 'ArrowLeft':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    // Close secondary drawer when left drawer closes
                    if (drawers.left.classList.contains('expanded')) {
                        secondaryDrawer.classList.remove('active');
                        secondaryTrigger.classList.remove('active');
                        drawers.left.classList.remove('secondary-active');
                    }
                    drawers.left.classList.toggle('expanded');
                    updateLogoVisibility();
                }
                break;
            case 'ArrowRight':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    drawers.right.classList.toggle('expanded');
                    updateLogoVisibility();
                }
                break;
            case 'ArrowUp':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    drawers.top.classList.toggle('expanded');
                    updateLogoVisibility();
                }
                break;
            case 'ArrowDown':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    drawers.bottom.classList.toggle('expanded');
                    updateLogoVisibility();
                }
                break;
        }
    });
});
