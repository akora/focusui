// Drawer functionality with iPad-first positioning and theme switching
document.addEventListener('DOMContentLoaded', function() {
    // Detect iPad (Safari and Chrome)
    var ua = navigator.userAgent;
    var isIPad = ua.indexOf('iPad') !== -1 || 
                 (ua.indexOf('Macintosh') !== -1 && 'ontouchend' in document) ||
                 (ua.indexOf('CriOS') !== -1) || // Chrome on iOS
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPad Pro detection
    
    // Detect specific iPad browsers for fine-tuned adjustments
    var isIPadSafari = isIPad && (ua.indexOf('Safari') !== -1 && ua.indexOf('CriOS') === -1);
    var isIPadChrome = isIPad && ua.indexOf('CriOS') !== -1;
    
    // Theme definitions
    var themes = {
        slate: {
            name: 'Original Slate',
            colors: {
                'bg-gradient-start': '#475569',
                'bg-gradient-25': '#64748b',
                'bg-gradient-50': '#94a3b8',
                'bg-gradient-75': '#cbd5e1',
                'bg-gradient-end': '#e2e8f0'
            }
        },
        ocean: {
            name: 'Deep Ocean',
            colors: {
                'bg-gradient-start': '#3b82f6',
                'bg-gradient-25': '#60a5fa',
                'bg-gradient-50': '#93c5fd',
                'bg-gradient-75': '#bfdbfe',
                'bg-gradient-end': '#dbeafe'
            }
        },
        forest: {
            name: 'Forest Green',
            colors: {
                'bg-gradient-start': '#4a7c59',
                'bg-gradient-25': '#6b9080',
                'bg-gradient-50': '#84cc9c',
                'bg-gradient-75': '#a4c3b2',
                'bg-gradient-end': '#cce3de'
            }
        },
        amber: {
            name: 'Warm Amber',
            colors: {
                'bg-gradient-start': '#92400e',
                'bg-gradient-25': '#d97706',
                'bg-gradient-50': '#f59e0b',
                'bg-gradient-75': '#fbbf24',
                'bg-gradient-end': '#fef3c7'
            }
        },
        dark: {
            name: 'Dark Theme',
            colors: {
                'bg-gradient-start': '#0f0f0f',
                'bg-gradient-25': '#1f1f1f',
                'bg-gradient-50': '#374151',
                'bg-gradient-75': '#6b7280',
                'bg-gradient-end': '#9ca3af'
            },
            textColor: '#ffffff',
            iconColor: '#9ca3af' // Light gray for dark theme
        },
        light: {
            name: 'Light Theme',
            colors: {
                'bg-gradient-start': '#f3f4f6',
                'bg-gradient-25': '#f9fafb',
                'bg-gradient-50': '#ffffff',
                'bg-gradient-75': '#ffffff',
                'bg-gradient-end': '#ffffff'
            },
            textColor: '#1f2937', // Dark text for light theme
            iconColor: '#6b7280' // Medium gray for light theme
        }
    };
    
    var currentTheme = 'slate';
    
    // Logo visibility management
    function updateLogoVisibility() {
        var body = document.body;
        var anyDrawerExpanded = document.querySelector('.drawer.expanded');
        var secondaryDrawerActive = document.querySelector('.secondary-drawer.active');
        
        if (anyDrawerExpanded || secondaryDrawerActive) {
            body.classList.add('drawer-open');
        } else {
            body.classList.remove('drawer-open');
        }
    }
    
    // Theme switching functionality
    function switchTheme(themeName) {
        if (themes[themeName]) {
            var theme = themes[themeName];
            var root = document.documentElement;
            
            // Update CSS variables
            Object.keys(theme.colors).forEach(function(key) {
                root.style.setProperty('--' + key, theme.colors[key]);
            });
            
            // Update text color based on theme
            var textColor = theme.textColor || '#ffffff'; // Default to white
            var themeOptions = document.querySelectorAll('.theme-option');
            themeOptions.forEach(function(option) {
                option.style.color = textColor;
            });
            
            // Update theme toggle icon color (separate from text color)
            var iconColor = theme.iconColor || textColor; // Use iconColor if defined, otherwise textColor
            var themeToggleIcon = document.querySelector('.theme-toggle i');
            if (themeToggleIcon) {
                themeToggleIcon.style.color = iconColor;
            }
            
            // Update logo based on theme
            var logoImg = document.querySelector('.focusui-logo');
            if (logoImg) {
                if (themeName === 'light') {
                    logoImg.src = 'FocusUI-logo-light-theme.png';
                } else {
                    logoImg.src = 'FocusUI-eventhorizon-v2.png';
                }
            }
            
            // Update secondary trigger button colors for light theme
            var secondaryTrigger = document.querySelector('.secondary-trigger');
            var secondaryTriggerIcon = document.querySelector('.secondary-trigger i');
            if (secondaryTrigger && secondaryTriggerIcon) {
                if (themeName === 'light') {
                    // Use gray colors for light theme (same as theme toggle)
                    secondaryTrigger.classList.add('light-theme');
                    secondaryTrigger.style.background = 'linear-gradient(135deg, rgba(107, 114, 128, 0.3) 0%, rgba(107, 114, 128, 0.1) 100%)';
                    secondaryTrigger.style.borderColor = 'rgba(107, 114, 128, 0.3)';
                    secondaryTriggerIcon.style.color = '#6b7280';
                } else {
                    // Reset to white for other themes
                    secondaryTrigger.classList.remove('light-theme');
                    secondaryTrigger.style.background = '';
                    secondaryTrigger.style.borderColor = '';
                    secondaryTriggerIcon.style.color = '';
                }
            }
            
            currentTheme = themeName;
            
            // Update active state in UI
            document.querySelectorAll('.theme-option').forEach(function(option) {
                option.classList.remove('active');
            });
            document.querySelector('[data-theme="' + themeName + '"]').classList.add('active');
            
            console.log('Theme switched to:', theme.name);
        }
    }
    
    // Theme selector UI
    var themeSelector = document.getElementById('theme-selector');
    var themeToggle = document.getElementById('theme-toggle');
    var themeOptions = document.querySelectorAll('.theme-option');
    
    // Toggle theme selector
    themeToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        themeSelector.classList.toggle('active');
    });
    
    // Close theme selector when clicking outside
    document.addEventListener('click', function(e) {
        if (!themeSelector.contains(e.target)) {
            themeSelector.classList.remove('active');
        }
    });
    
    // Theme option clicks
    themeOptions.forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            var themeName = this.getAttribute('data-theme');
            switchTheme(themeName);
            themeSelector.classList.remove('active');
        });
    });
    
    // Set initial active theme
    document.querySelector('[data-theme="' + currentTheme + '"]').classList.add('active');
    
    if (isIPad) {
        var detectionMethod = '';
        if (ua.indexOf('iPad') !== -1) detectionMethod = 'iPad user agent';
        else if (ua.indexOf('Macintosh') !== -1 && 'ontouchend' in document) detectionMethod = 'Macintosh + touch';
        else if (ua.indexOf('CriOS') !== -1) detectionMethod = 'Chrome on iOS';
        else if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) detectionMethod = 'iPad Pro detection';
        
        console.log('iPad detected (' + detectionMethod + ') - applying JavaScript-based drawer centering');
        
        function centerDrawers() {
            var viewportHeight = window.innerHeight;
            var viewportWidth = window.innerWidth;
            
            // Get all drawers
            var leftDrawer = document.getElementById('drawer-left');
            var rightDrawer = document.getElementById('drawer-right');
            var topDrawer = document.getElementById('drawer-top');
            var bottomDrawer = document.getElementById('drawer-bottom');
            
            // Position vertical drawers (left/right)
            if (leftDrawer && rightDrawer) {
                var verticalDrawerHeight = Math.round(viewportHeight * 0.8);
                var centerY = (viewportHeight - verticalDrawerHeight) / 2;
                
                // Left drawer positioning
                leftDrawer.style.top = centerY + 'px';
                leftDrawer.style.transform = 'none';
                leftDrawer.style.height = verticalDrawerHeight + 'px';
                // Handle expanded width
                if (leftDrawer.classList.contains('expanded')) {
                    leftDrawer.style.width = '80px';
                } else {
                    leftDrawer.style.width = '40px';
                }
                
                // Right drawer positioning
                rightDrawer.style.top = centerY + 'px';
                rightDrawer.style.transform = 'none';
                rightDrawer.style.height = verticalDrawerHeight + 'px';
                // Handle expanded width
                if (rightDrawer.classList.contains('expanded')) {
                    rightDrawer.style.width = '80px';
                } else {
                    rightDrawer.style.width = '40px';
                }
            }
            
            // Position horizontal drawers (top/bottom)
            if (topDrawer && bottomDrawer) {
                var drawerWidth = Math.round(viewportWidth * 0.75); // 75vw
                var centerX = (viewportWidth - drawerWidth) / 2;
                var horizontalDrawerHeight = 40; // Standard drawer height
                var margin = 8; // Standard margin
                
                // Browser-specific margin adjustments
                var topMargin = margin; // Default 8px margin
                var bottomMargin = margin; // Default 8px margin
                
                if (isIPadSafari) {
                    // iPad Safari needs different adjustments for top vs bottom
                    topMargin = 16; // More space from top for Safari UI
                    bottomMargin = 4; // Closer to bottom edge for Safari
                } else if (isIPadChrome) {
                    // iPad Chrome works better with smaller adjustments
                    topMargin = 12; // Slight adjustment for top
                    bottomMargin = 12; // Slight adjustment for bottom
                }
                
                // Top drawer - using browser-specific top margin
                var topDrawerHeight = topDrawer.classList.contains('expanded') ? 80 : 40;
                topDrawer.style.left = centerX + 'px';
                topDrawer.style.transform = 'none';
                topDrawer.style.width = drawerWidth + 'px';
                topDrawer.style.top = topMargin + 'px';
                topDrawer.style.bottom = 'auto';
                topDrawer.style.height = topDrawerHeight + 'px';
                
                // Bottom drawer - using browser-specific bottom margin
                var bottomDrawerHeight = bottomDrawer.classList.contains('expanded') ? 80 : 40;
                var bottomDrawerTop = viewportHeight - bottomDrawerHeight - bottomMargin;
                bottomDrawer.style.left = centerX + 'px';
                bottomDrawer.style.transform = 'none';
                bottomDrawer.style.width = drawerWidth + 'px';
                bottomDrawer.style.top = bottomDrawerTop + 'px';
                bottomDrawer.style.bottom = 'auto'; // Clear any bottom positioning
                bottomDrawer.style.height = bottomDrawerHeight + 'px';
            }
            
            console.log('iPad drawer centering applied:', {
                viewport: viewportWidth + 'x' + viewportHeight,
                browser: isIPadSafari ? 'iPad Safari' : (isIPadChrome ? 'iPad Chrome' : 'Desktop'),
                margins: topDrawer ? 'top: ' + (topDrawer.style.top || 'N/A') + ', bottom: ' + bottomMargin + 'px' : 'N/A',
                verticalDrawers: (leftDrawer ? verticalDrawerHeight + 'px height at ' + centerY + 'px' : 'N/A'),
                horizontalDrawers: (topDrawer ? drawerWidth + 'px width at ' + centerX + 'px' : 'N/A'),
                topDrawer: (topDrawer ? 'top: ' + (topDrawer.style.top || 'N/A') : 'N/A'),
                bottomDrawer: (bottomDrawer ? 'top: ' + (bottomDrawer.style.top || 'N/A') : 'N/A')
            });
        }
        
        // Center drawers on load
        centerDrawers();
        
        // Re-center on resize/orientation change
        window.addEventListener('resize', centerDrawers);
        window.addEventListener('orientationchange', function() {
            setTimeout(centerDrawers, 100); // Small delay for orientation change
        });
    }
    
    // Drawer expansion functionality
    var drawers = document.querySelectorAll('.drawer');
    drawers.forEach(function(drawer) {
        drawer.addEventListener('click', function() {
            var drawerId = this.id;
            var isExpanded = this.classList.contains('expanded');
            
            if (isExpanded) {
                // Collapse drawer
                this.classList.remove('expanded');
                console.log('Drawer collapsed:', drawerId);
                
                // If left drawer is collapsed, also hide secondary drawer
                if (drawerId === 'drawer-left') {
                    var secondaryDrawer = document.getElementById('secondary-drawer');
                    var secondaryTrigger = document.getElementById('secondary-trigger');
                    if (secondaryDrawer) {
                        secondaryDrawer.classList.remove('active');
                        console.log('Secondary drawer hidden (left drawer collapsed)');
                    }
                    if (secondaryTrigger) {
                        secondaryTrigger.classList.remove('active'); // Reset button state
                    }
                }
            } else {
                // Expand drawer
                this.classList.add('expanded');
                console.log('Drawer expanded:', drawerId);
            }
            
            // Update logo visibility after drawer state change
            setTimeout(updateLogoVisibility, 10);
            
            // Re-center drawers on iPad after expansion/collapse
            if (isIPad) {
                setTimeout(centerDrawers, 50); // Small delay for CSS transition
            }
        });
    });
    
    // Secondary drawer trigger functionality
    var secondaryTrigger = document.getElementById('secondary-trigger');
    var secondaryDrawer = document.getElementById('secondary-drawer');
    
    if (secondaryTrigger && secondaryDrawer) {
        secondaryTrigger.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent triggering parent drawer click
            
            var isActive = secondaryDrawer.classList.contains('active');
            
            if (isActive) {
                // Hide secondary drawer
                secondaryDrawer.classList.remove('active');
                secondaryTrigger.classList.remove('active'); // Remove active class from button
                console.log('Secondary drawer hidden (button clicked)');
            } else {
                // Show secondary drawer
                secondaryDrawer.classList.add('active');
                secondaryTrigger.classList.add('active'); // Add active class to button
                console.log('Secondary drawer shown (button clicked)');
            }
            
            // Update logo visibility after secondary drawer state change
            setTimeout(updateLogoVisibility, 10);
        });
    }
});
