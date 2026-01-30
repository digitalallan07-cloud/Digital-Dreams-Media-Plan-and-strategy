/* ===================================
   Digital Dreams Media - Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initMobileMenu();
    initParticles();
    initCounterAnimation();
    initPortfolioFilter();
    initTestimonialSlider();
    initContactForm();
    initScrollAnimations();
});

/* --- Navbar Scroll Effect --- */
function initNavbar() {
    var navbar = document.getElementById('navbar');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
        var currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                document.getElementById('navLinks').classList.remove('active');
                document.getElementById('navToggle').classList.remove('active');
            }
        });
    });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

/* --- Floating Particles --- */
function initParticles() {
    var container = document.getElementById('particles');
    if (!container) return;

    var particleCount = 30;
    for (var i = 0; i < particleCount; i++) {
        var particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
        container.appendChild(particle);
    }
}

/* --- Counter Animation --- */
function initCounterAnimation() {
    var counters = document.querySelectorAll('.stat-number[data-target]');
    var animated = false;

    function animateCounters() {
        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            var duration = 2000;
            var start = 0;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                // Ease out cubic
                var eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(step);
        });
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    var statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/* --- Portfolio Filter --- */
function initPortfolioFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Update active button
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');

            cards.forEach(function (card) {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(function () {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* --- Testimonial Slider --- */
function initTestimonialSlider() {
    var track = document.getElementById('testimonialTrack');
    var slides = track ? track.children : [];
    var prevBtn = document.getElementById('sliderPrev');
    var nextBtn = document.getElementById('sliderNext');
    var dotsContainer = document.getElementById('sliderDots');
    var currentIndex = 0;
    var totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Create dots
    for (var i = 0; i < totalSlides; i++) {
        var dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        dotsContainer.appendChild(dot);
    }

    var dots = dotsContainer.querySelectorAll('.slider-dot');

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        dots.forEach(function (d, i) {
            d.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', function () {
        goToSlide(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
    });

    nextBtn.addEventListener('click', function () {
        goToSlide(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
    });

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            goToSlide(parseInt(this.getAttribute('data-index')));
        });
    });

    // Auto-advance every 5 seconds
    var autoPlay = setInterval(function () {
        goToSlide(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
    }, 5000);

    // Pause on hover
    var slider = document.getElementById('testimonialSlider');
    slider.addEventListener('mouseenter', function () {
        clearInterval(autoPlay);
    });
    slider.addEventListener('mouseleave', function () {
        autoPlay = setInterval(function () {
            goToSlide(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
        }, 5000);
    });
}

/* --- Contact Form --- */
function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic validation
        var firstName = document.getElementById('firstName').value.trim();
        var lastName = document.getElementById('lastName').value.trim();
        var email = document.getElementById('email').value.trim();
        var service = document.getElementById('service').value;
        var message = document.getElementById('message').value.trim();

        if (!firstName || !lastName || !email || !service || !message) {
            return;
        }

        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return;
        }

        // Show success message
        var wrapper = form.closest('.contact-form-wrapper');
        wrapper.innerHTML =
            '<div class="form-success">' +
                '<div class="success-icon">&#10003;</div>' +
                '<h3>Message Sent!</h3>' +
                '<p>Thank you, ' + firstName + '. We\'ll get back to you within 24 hours.</p>' +
            '</div>';
    });
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
    var animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .about-feature, .contact-item'
    );

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
