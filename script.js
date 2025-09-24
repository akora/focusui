// Simple drawer toggle functionality
document.addEventListener('DOMContentLoaded', function() {
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
