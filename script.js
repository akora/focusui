// Simple drawer toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all drawer elements
    const drawers = {
        top: document.getElementById('drawer-top'),
        left: document.getElementById('drawer-left'),
        right: document.getElementById('drawer-right'),
        bottom: document.getElementById('drawer-bottom')
    };

    // Add click handlers to each drawer
    Object.keys(drawers).forEach(position => {
        const drawer = drawers[position];
        
        drawer.addEventListener('click', function() {
            // Toggle expanded class
            drawer.classList.toggle('expanded');
            
            // Optional: Close other drawers when one opens (uncomment if desired)
            // Object.keys(drawers).forEach(otherPosition => {
            //     if (otherPosition !== position) {
            //         drawers[otherPosition].classList.remove('expanded');
            //     }
            // });
        });
    });

    // Optional: Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC key closes all drawers
        if (e.key === 'Escape') {
            Object.values(drawers).forEach(drawer => {
                drawer.classList.remove('expanded');
            });
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
