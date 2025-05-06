/**
 * Main JavaScript File
 * Author: Bhavyansh Soni
 * Description: Core functionality for personal website
 */

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize form interactions
    initFormInteractions();
    
    // Initialize typing animation
    initTypingAnimation();
});

/**
 * Theme Toggle Functionality
 * Handles switching between light and dark themes
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Apply the right theme based on saved preference or OS preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        body.classList.replace('light-theme', 'dark-theme');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
    }
    
    // Add transition class after initial load (prevents transition flash on page load)
    setTimeout(() => {
        document.documentElement.classList.add('theme-transition');
    }, 100);
    
    // Toggle theme when button is clicked
    themeToggleBtn.addEventListener('click', () => {
        // Add animation class
        themeToggleBtn.classList.add('rotate');
        
        // Toggle theme class
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            themeToggleBtn.classList.remove('rotate');
        }, 1000);
    });
    
    // Listen for OS theme preference changes
    prefersDarkScheme.addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) {
            if (event.matches) {
                body.classList.replace('light-theme', 'dark-theme');
            } else {
                body.classList.replace('dark-theme', 'light-theme');
            }
        }
    });
}

/**
 * Mobile Menu Functionality
 * Handles opening and closing the mobile navigation menu
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('.header');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Toggle mobile menu when button is clicked
    mobileMenuBtn.addEventListener('click', () => {
        header.classList.toggle('menu-open');
        document.body.classList.toggle('no-scroll');
        
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = header.classList.contains('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        
        // Add mobile navigation
        if (!document.querySelector('.mobile-nav')) {
            const mobileNav = document.createElement('div');
            mobileNav.className = 'mobile-nav';
            mobileNav.innerHTML = document.querySelector('.main-nav').innerHTML;
            header.appendChild(mobileNav);
            
            // Add event listeners to mobile nav items
            const mobileNavItems = mobileNav.querySelectorAll('.nav-link');
            mobileNavItems.forEach(item => {
                item.addEventListener('click', closeMobileMenu);
            });
        }
    });
    
    // Function to close mobile menu
    function closeMobileMenu() {
        header.classList.remove('menu-open');
        document.body.classList.remove('no-scroll');
        mobileMenuBtn.setAttribute('aria-expanded', false);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (header.classList.contains('menu-open') && 
            !event.target.closest('.header') && 
            !event.target.closest('.mobile-menu-btn')) {
            closeMobileMenu();
        }
    });
    
    // Close menu when escape key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && header.classList.contains('menu-open')) {
            closeMobileMenu();
        }
    });
}

/**
 * Smooth Scrolling
 * Enables smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Interactions
 * Handles form animations and validation
 */
function initFormInteractions() {
    const formInputs = document.querySelectorAll('.form-input');
    const contactForm = document.getElementById('contact-form');
    
    // Add focus and blur handlers for form inputs
    formInputs.forEach(input => {
        // Check if input has value on load (in case of browser autofill)
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Handle focus event
        input.addEventListener('focus', () => {
            input.classList.add('focused');
        });
        
        // Handle blur event
        input.addEventListener('blur', () => {
            input.classList.remove('focused');
            
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
        
        // Handle input event
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });
    
    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state to button
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission (would be replaced with actual form handling)
            setTimeout(() => {
                // Reset button and form
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success message
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Your message has been sent successfully!';
                contactForm.appendChild(formMessage);
                
                // Clear form inputs
                contactForm.reset();
                formInputs.forEach(input => {
                    input.classList.remove('has-value');
                });
                
                // Remove message after a delay
                setTimeout(() => {
                    formMessage.classList.add('fade-out');
                    setTimeout(() => {
                        formMessage.remove();
                    }, 500);
                }, 3000);
            }, 1500);
        });
    }
}

/**
 * Typing Animation
 * Creates a typing effect for the hero section
 */
function initTypingAnimation() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    
    const words = ['Developer', 'Designer', 'Creator', 'UI/UX Expert', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Deleting text
            typedElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
            
            // Prevent cursor from moving down when text is completely deleted
            if (charIndex === 0) {
                typedElement.style.minHeight = '1.5em';
                typedElement.style.display = 'inline-block';
            }
        } else {
            // Typing text
            typedElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150; // Slower when typing
        }
        
        // If word is complete, start deleting after a pause
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1000; // Pause at end of word
        } 
        // If deletion is complete, move to next word
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before starting next word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start the typing animation
    setTimeout(typeEffect, 1000);
}

/**
 * Scroll Handling
 * Handles scroll-based animations and effects
 */
window.addEventListener('scroll', () => {
    handleScrollAnimations();
    handleHeaderScroll();
});

/**
 * Header Scroll Effect
 * Changes header appearance on scroll
 */
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

/**
 * Scroll-triggered Animations
 * Reveals elements as they come into view
 */
function handleScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-element:not(.revealed)');
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // How many pixels from the viewport bottom to start revealing
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
            
            // If it's a staggered reveal container, add revealed class to it as well
            if (element.classList.contains('staggered-reveal')) {
                element.classList.add('revealed');
            }
        }
    });
}

/**
 * Initialize all animations on page load
 */
window.addEventListener('load', () => {
    // Trigger scroll animations on initial load
    handleScrollAnimations();
    
    // Remove page loader if it exists
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        pageLoader.classList.add('loaded');
        setTimeout(() => {
            pageLoader.remove();
        }, 500);
    }
});
