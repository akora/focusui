// Simple drawer toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all drawer elements
    const drawers = {
        top: document.getElementById('drawer-top'),
        left: document.getElementById('drawer-left'),
        right: document.getElementById('drawer-right'),
        bottom: document.getElementById('drawer-bottom')
    };

    // Get secondary drawer elements
    const secondaryDrawer = document.getElementById('secondary-drawer');
    const secondaryTrigger = document.getElementById('secondary-trigger');

    // Add click handlers to each drawer
    Object.keys(drawers).forEach(position => {
        const drawer = drawers[position];
        
        drawer.addEventListener('click', function(e) {
            // Don't toggle main drawer if clicking on secondary trigger
            if (e.target.closest('.secondary-trigger')) {
                return;
            }
            
            // Toggle expanded class
            drawer.classList.toggle('expanded');
            
            // Close secondary drawer when main left drawer closes
            if (position === 'left' && !drawer.classList.contains('expanded')) {
                secondaryDrawer.classList.remove('active');
                secondaryTrigger.classList.remove('active');
            }
            
            // Optional: Close other drawers when one opens (uncomment if desired)
            // Object.keys(drawers).forEach(otherPosition => {
            //     if (otherPosition !== position) {
            //         drawers[otherPosition].classList.remove('expanded');
            //     }
            // });
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
        }
        
        // Arrow keys to toggle specific drawers
        switch(e.key) {
            case 'ArrowLeft':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    drawers.left.classList.toggle('expanded');
                }
                break;
            case 'ArrowRight':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    drawers.right.classList.toggle('expanded');
                }
                break;
            case 'ArrowUp':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    drawers.top.classList.toggle('expanded');
                }
                break;
            case 'ArrowDown':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    drawers.bottom.classList.toggle('expanded');
                }
                break;
        }
    });
});
