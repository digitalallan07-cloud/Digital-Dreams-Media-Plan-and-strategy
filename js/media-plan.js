/* ===================================
   Media Plan & Strategy - JavaScript
   Allan Rufus - UAE Lead Generation
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initMobileMenu();
    initParticles();
    initCounterAnimation();
    initScrollAnimations();
    initParallax();
    initDonutAnimation();
    initBarAnimations();
    initDrawLines();
});

/* --- Navbar Scroll Effect --- */
function initNavbar() {
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
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

    for (var i = 0; i < 35; i++) {
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
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
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
    if (statsSection) observer.observe(statsSection);
}

/* --- Scroll Animations (AOS-like) --- */
function initScrollAnimations() {
    var elements = document.querySelectorAll('[data-aos]');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var delay = parseInt(entry.target.getAttribute('data-aos-delay') || '0');
                setTimeout(function () {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
}

/* --- Parallax Effect --- */
function initParallax() {
    var parallaxBgs = document.querySelectorAll('.parallax-bg');
    if (parallaxBgs.length === 0) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                var scrollY = window.pageYOffset;
                parallaxBgs.forEach(function (bg) {
                    var speed = parseFloat(bg.getAttribute('data-speed') || '0.2');
                    var parent = bg.parentElement;
                    var rect = parent.getBoundingClientRect();
                    var offset = (rect.top + scrollY - window.innerHeight) * speed;
                    bg.style.transform = 'translateY(' + (-offset * 0.3) + 'px)';
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* --- Donut Chart Animation --- */
function initDonutAnimation() {
    var chart = document.getElementById('donutChart');
    if (!chart) return;

    var googleSegment = chart.querySelector('.donut-google');
    var metaSegment = chart.querySelector('.donut-meta');

    // Start with 0
    googleSegment.style.strokeDasharray = '0 502.65';
    metaSegment.style.strokeDasharray = '0 502.65';
    metaSegment.style.strokeDashoffset = '0';

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Animate Google (60% = 301.6)
                setTimeout(function () {
                    googleSegment.style.strokeDasharray = '301.6 502.65';
                }, 200);
                // Animate Meta (40% = 201.06)
                setTimeout(function () {
                    metaSegment.style.strokeDasharray = '201.06 502.65';
                    metaSegment.style.strokeDashoffset = '-301.6';
                }, 600);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(chart);
}

/* --- LP Element Bar Animations --- */
function initBarAnimations() {
    var elements = document.querySelectorAll('.lp-element');
    if (elements.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('bar-animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    elements.forEach(function (el) { observer.observe(el); });
}

/* --- Draw Line Animations --- */
function initDrawLines() {
    var lines = document.querySelectorAll('.draw-line');
    if (lines.length === 0) return;

    lines.forEach(function (line) {
        var length = line.getTotalLength ? line.getTotalLength() : 200;
        line.style.strokeDasharray = length;
        line.style.strokeDashoffset = length;
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var lines = entry.target.querySelectorAll('.draw-line');
                lines.forEach(function (line, i) {
                    setTimeout(function () {
                        line.style.transition = 'stroke-dashoffset 1.5s ease-out';
                        line.style.strokeDashoffset = '0';
                    }, i * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.investigation-card, .kpi-report-card, .investigation-card-white, .kpi-card-white').forEach(function (card) {
        observer.observe(card);
    });
}
