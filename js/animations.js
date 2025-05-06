/**
 * Animations JavaScript File
 * Author: Bhavyansh Soni
 * Description: Animation functionality for personal website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initializeAnimations();
});

/**
 * Main function to initialize all animations
 */
function initializeAnimations() {
    // Add scroll-based animation triggers
    initScrollAnimations();
    
    // Initialize sliding cards
    initSlidingCards();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize interactive elements
    initInteractiveElements();
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    // Create an Intersection Observer to detect when elements enter viewport
    const options = {
        root: null, // Use viewport as root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add appropriate animation class based on data attribute
                const element = entry.target;
                const animationType = element.dataset.animation;
                
                if (animationType) {
                    element.classList.add(animationType);
                } else {
                    // Default animation if none specified
                    element.classList.add('fade-in');
                }
                
                // If the element has "data-once" attribute, unobserve after animating
                if (element.hasAttribute('data-once')) {
                    observer.unobserve(element);
                }
            }
        });
    }, options);
    
    // Observe all elements with animation data attributes
    document.querySelectorAll('[data-animation]').forEach(element => {
        observer.observe(element);
    });
    
    // Also observe reveal elements
    document.querySelectorAll('.reveal-element').forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize sliding cards in About section
 */
function initSlidingCards() {
    const cards = document.querySelectorAll('.sliding-card');
    
    cards.forEach(card => {
        // Add hover listeners for mobile touch devices
        card.addEventListener('touchstart', () => {
            card.classList.add('touch-hover');
        }, { passive: true });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.classList.remove('touch-hover');
            }, 1000); // Keep flipped for a second to allow reading
        }, { passive: true });
    });
}

/**
 * Initialize hover effects for various elements
 */
function initHoverEffects() {
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-hover').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-hover').style.opacity = '0';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', createRippleEffect);
    });
    
    // Function to create ripple effect on buttons
    function createRippleEffect(e) {
        const button = e.currentTarget;
        
        // Remove any existing ripple
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        // Position the ripple
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        
        // Remove ripple after animation completes
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }
}

/**
 * Initialize interactive elements
 */
function initInteractiveElements() {
    // Parallax effect on scroll for hero section
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for geometric shape
        const geometricShape = document.querySelector('.geometric-shape');
        if (geometricShape) {
            geometricShape.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
        
        // Parallax effect for hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
    });
    
    // Animated counters for stats/numbers (if added later)
    initCounters();
    
    // Floating animation for certain elements
    const floatingElements = document.querySelectorAll('.float');
    
    floatingElements.forEach((element, index) => {
        // Add different delays to create more natural movement
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

/**
 * Initialize animated counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        // Set starting value
        counter.textContent = '0';
        
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.textContent;
            
            // Calculate increment
            const increment = target / 100;
            
            if (count < target) {
                // Update counter and call function again
                counter.textContent = `${Math.ceil(count + increment)}`;
                setTimeout(updateCounter, 10);
            } else {
                // Ensure exact target is set
                counter.textContent = target;
            }
        };
        
        // Create observer to start counting when visible
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                counterObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });
}

/**
 * Animate elements when they come into view
 */
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            // Get animation type from data attribute or use default
            const animationType = element.dataset.animation || 'fade-in';
            element.classList.add('animated', animationType);
        }
    });
}

// Add scroll listener for animation
window.addEventListener('scroll', animateOnScroll);

// Initial check for animated elements
window.addEventListener('load', () => {
    animateOnScroll();
    
    // Add page-loaded class to body
    document.body.classList.add('page-loaded');
});

/**
 * Cursor effects (optional enhancement)
 */
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Dot follows with slight delay
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });
    
    // Enlarge cursor on clickable elements
    document.querySelectorAll('a, button, .project-card, .sliding-card').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('expanded');
        });
        
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('expanded');
        });
    });
}

// Only init custom cursor for non-touch devices
if (!('ontouchstart' in document.documentElement)) {
    // Uncomment to enable custom cursor
    // initCustomCursor();
}
