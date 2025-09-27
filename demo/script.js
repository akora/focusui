// Clean production drawer functionality
document.addEventListener('DOMContentLoaded', function() {
    // Optional: Create hidden indicator for debugging (invisible by default)
    var indicator = document.createElement('div');
    indicator.id = 'js-indicator';
    indicator.style.cssText = 'position: fixed; top: 10px; right: 10px; background: green; color: white; padding: 10px; z-index: 10000; font-size: 12px; border-radius: 5px; display: none;';
    indicator.textContent = 'JS LOADED';
    document.body.appendChild(indicator);

    // iPad detection and positioning
    var ua = navigator.userAgent;
    var isIPad = ua.indexOf('iPad') !== -1 || (ua.indexOf('Macintosh') !== -1 && 'ontouchend' in document);
    var isChrome = ua.indexOf('Chrome') !== -1;
    var isSafari = ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1;

    if (isIPad) {
        // iPad detected - apply alignment fixes silently
        setTimeout(function() {
            var vh = window.innerHeight;
            var topOffset = Math.round(vh * 0.14);
            var measuredHeight = Math.round(vh - topOffset * 2);
            
            // Force secondary drawer to match left drawer positioning exactly
            var leftDrawer = document.getElementById('drawer-left');
            var secondaryDrawer = document.getElementById('secondary-drawer');
            
            if (leftDrawer && secondaryDrawer) {
                // Get the computed position of the left drawer
                var leftRect = leftDrawer.getBoundingClientRect();
                var leftTop = leftRect.top;
                
                // Chrome on iPad needs different alignment approach
                if (isChrome) {
                    // For Chrome, use the computed style top value instead of getBoundingClientRect
                    var computedStyle = window.getComputedStyle(leftDrawer);
                    var computedTop = computedStyle.top;
                    
                    secondaryDrawer.style.setProperty('top', computedTop, 'important');
                    secondaryDrawer.style.setProperty('transform', 'translateY(-50%) translateX(-100%)', 'important');
                    
                    // Chrome iPad alignment applied
                } else {
                    // Safari approach - use getBoundingClientRect
                    secondaryDrawer.style.setProperty('top', leftTop + 'px', 'important');
                    secondaryDrawer.style.setProperty('transform', 'translateX(-100%)', 'important');
                    
                    // Safari iPad alignment applied
                }
            } else {
                // iPad layout ready
            }
            
            // Alignment complete
        }, 250);
    } else {
        // Desktop mode - no special handling needed
    }

    // Logo visibility management
    function updateLogoVisibility() {
        var app = document.querySelector('.app');
        var anyDrawerExpanded = document.querySelector('.drawer.expanded');
        var secondaryDrawerActive = document.querySelector('.secondary-drawer.active');
        
        if (anyDrawerExpanded || secondaryDrawerActive) {
            app.classList.add('drawer-open');
        } else {
            app.classList.remove('drawer-open');
        }
    }

    var drawerIds = ['drawer-left', 'drawer-right', 'drawer-top', 'drawer-bottom'];
    drawerIds.forEach(function(id) {
        var drawer = document.getElementById(id);
        if (!drawer) {
            return;
        }

        drawer.addEventListener('click', function(event) {
            event.stopPropagation();
            this.classList.toggle('expanded');
            
            // Update logo visibility after drawer state change
            setTimeout(updateLogoVisibility, 10);
            
            // Drawer toggled silently
        });
    });

    var leftDrawer = document.getElementById('drawer-left');
    var secondaryDrawer = document.getElementById('secondary-drawer');
    var secondaryTrigger = document.getElementById('secondary-trigger');
    if (leftDrawer && secondaryDrawer && secondaryTrigger) {
        secondaryTrigger.addEventListener('click', function(event) {
            event.stopPropagation();
            var isActive = secondaryDrawer.classList.toggle('active');
            leftDrawer.classList.toggle('secondary-active', isActive);
            
            // On iPad, maintain alignment when toggling
            if (isIPad && leftDrawer && secondaryDrawer) {
                if (isChrome) {
                    // Chrome approach - use computed style
                    var computedStyle = window.getComputedStyle(leftDrawer);
                    var computedTop = computedStyle.top;
                    secondaryDrawer.style.setProperty('top', computedTop, 'important');
                    if (isActive) {
                        secondaryDrawer.style.setProperty('transform', 'translateY(-50%) translateX(0)', 'important');
                    } else {
                        secondaryDrawer.style.setProperty('transform', 'translateY(-50%) translateX(-100%)', 'important');
                    }
                } else {
                    // Safari approach - use getBoundingClientRect
                    var leftRect = leftDrawer.getBoundingClientRect();
                    var leftTop = leftRect.top;
                    secondaryDrawer.style.setProperty('top', leftTop + 'px', 'important');
                    if (isActive) {
                        secondaryDrawer.style.setProperty('transform', 'translateX(0)', 'important');
                    } else {
                        secondaryDrawer.style.setProperty('transform', 'translateX(-100%)', 'important');
                    }
                }
            }
            
            // Update logo visibility after secondary drawer state change
            setTimeout(updateLogoVisibility, 10);
            
            // Secondary drawer toggled silently
        });
    }

    // Setup complete - all functionality ready
});
