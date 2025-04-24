// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white', 'shadow-sm');
    } else {
        navbar.classList.remove('bg-white', 'shadow-sm');
    }
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .service-item, .feature-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate-fade-in');
        }
    });
};

// Initial animation check
animateOnScroll();

// Check for animations on scroll
window.addEventListener('scroll', animateOnScroll);

// Form submission handling
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Mobile menu handling
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            navbarCollapse.classList.remove('show');
        }
    });
}

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', '');
        updateThemeIcon('');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        updateThemeIcon('dark-mode');
    }
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark-mode') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Product Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        productItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Testimonials Slider
const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Homeowner",
        text: "RAJ Interior transformed my space with their premium wall art collection. The customization options were incredible!",
        image: "images/testimonials/sarah.jpg"
    },
    {
        name: "Michael Chen",
        role: "Interior Designer",
        text: "As a designer, I appreciate the quality and uniqueness of RAJ Interior's products. They're my go-to for premium materials.",
        image: "images/testimonials/michael.jpg"
    },
    {
        name: "Emma Davis",
        role: "Commercial Client",
        text: "The attention to detail and customer service at RAJ Interior is unmatched. Highly recommended!",
        image: "images/testimonials/emma.jpg"
    }
];

function createTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function createSlide(testimonial) {
        return `
            <div class="testimonial-slide">
                <div class="testimonial-content">
                    <div class="testimonial-image">
                        <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy">
                    </div>
                    <div class="testimonial-text">
                        <p>${testimonial.text}</p>
                        <div class="testimonial-author">
                            <h4>${testimonial.name}</h4>
                            <span>${testimonial.role}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function updateSlider() {
        slider.innerHTML = createSlide(testimonials[currentSlide]);
        currentSlide = (currentSlide + 1) % testimonials.length;
    }

    // Initial slide
    updateSlider();

    // Auto-advance slides
    setInterval(updateSlider, slideInterval);
}

// Initialize testimonials slider
createTestimonialSlider();

// Form Validation
const contactFormElement = document.querySelector('.contact-form');
if (contactFormElement) {
    contactFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Here you would typically send the form data to your server
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 