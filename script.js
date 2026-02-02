/**
 * Well Trust Home Care - JavaScript
 * Handles interactivity, animations, and form logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initContactForm();
    initMobileCallButton();
    initServiceLinks();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
    // Elements to animate
    const revealElements = [
        '.service-card',
        '.testimonial-card',
        '.about-content',
        '.about-images',
        '.contact-info',
        '.contact-form-wrapper',
        '.section-header'
    ];
    
    // Add reveal class to elements
    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // Intersection Observer for reveal
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * Contact form handling - submits to Netlify
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simple validation
        if (!data.firstName || !data.lastName || !data.email || !data.phone) {
            showFormMessage(form, 'Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage(form, 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Submit to Netlify
        try {
            const response = await fetch(form.action || '/', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showFormMessage(form, 'Thank you! We\'ll be in touch within 24 hours.', 'success');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            showFormMessage(form, 'Something went wrong. Please try again or call us directly.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

/**
 * Show form message (success/error)
 */
function showFormMessage(form, message, type) {
    // Remove existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.style.cssText = `
        padding: 16px 20px;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: 500;
        text-align: center;
        animation: fadeInUp 0.3s ease;
        ${type === 'success' 
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
    `;
    messageEl.textContent = message;
    
    // Insert after submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.parentNode.insertBefore(messageEl, submitBtn.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(-10px)';
        messageEl.style.transition = 'all 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

/**
 * Add active state to nav links based on scroll position
 */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/**
 * Parallax effect for hero section (subtle)
 */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
});

/**
 * Counter animation for stats
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(parseInt(target));
        
        if (!isNumber) return;
        
        const endValue = parseInt(target);
        const suffix = target.replace(/[0-9]/g, '');
        let current = 0;
        const increment = endValue / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= endValue) {
                counter.textContent = endValue + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    });
}

// Trigger counter animation when stats are in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

/**
 * Mobile call button - hide when in contact section or footer
 */
function initMobileCallButton() {
    const callBtn = document.querySelector('.mobile-call-btn');
    const contactSection = document.getElementById('contact');
    const footer = document.querySelector('.footer');
    
    if (!callBtn || !contactSection) return;
    
    const handleScroll = () => {
        const contactTop = contactSection.getBoundingClientRect().top;
        const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
        const windowHeight = window.innerHeight;
        
        // Hide when contact section or footer is visible
        if (contactTop < windowHeight - 100 || footerTop < windowHeight) {
            callBtn.style.opacity = '0';
            callBtn.style.pointerEvents = 'none';
            callBtn.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            callBtn.style.opacity = '1';
            callBtn.style.pointerEvents = 'auto';
            callBtn.style.transform = 'translateX(-50%) translateY(0)';
        }
    };
    
    // Add transition for smooth hide/show
    callBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on load
}
/**
 * Service links - pre-select service in contact form
 */
function initServiceLinks() {
    const serviceLinks = document.querySelectorAll('.service-link[data-service]');
    const serviceSelect = document.getElementById('service');
    
    if (!serviceSelect) return;
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const serviceValue = link.getAttribute('data-service');
            if (serviceValue) {
                // Set the select value after a short delay to allow scroll
                setTimeout(() => {
                    serviceSelect.value = serviceValue;
                    // Add a highlight effect
                    serviceSelect.style.transition = 'box-shadow 0.3s ease';
                    serviceSelect.style.boxShadow = '0 0 0 3px rgba(74, 103, 65, 0.3)';
                    setTimeout(() => {
                        serviceSelect.style.boxShadow = '';
                    }, 1500);
                }, 800);
            }
        });
    });
}
