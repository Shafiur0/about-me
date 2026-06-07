/**
 * Shafiur Rahman Shafim - Portfolio Logic
 * Hybrid Wikipedia-Cyberpunk Theme
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initTypewriter();
    initParticles();
    initCustomCursor();
    initScrollReveal();
    initProjectFilters();
    initContactForm();
    initWikiContents();
    initFooterTime();
});

/* ==========================================================================
   Scroll Progress Indicator
   ========================================================================== */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        progressBar.style.width = scrolled + '%';
    });
}

/* ==========================================================================
   Typewriter Effect
   ========================================================================== */
function initTypewriter() {
    const element = document.getElementById('typewriter');
    const titles = [
        "Software Engineering Student",
        "AI Enthusiast & Developer",
        "Cybersecurity Learner",
        "Student Leader"
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            element.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            delay = 50; // faster deletion
        } else {
            element.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            delay = 120; // typing speed
        }

        // Handle title completion
        if (!isDeleting && charIndex === currentTitle.length) {
            delay = 2000; // Pause at full title
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            delay = 500; // Pause before typing next
        }

        setTimeout(type, delay);
    }

    type();
}

/* ==========================================================================
   Canvas Particles Animation
   ========================================================================== */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // Scale canvas to cover the whole window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        // Limit canvas particle area height to avoid performance loss on long pages
        canvas.height = Math.min(window.innerHeight * 1.5, document.documentElement.scrollHeight);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticleList();
    });
    
    resizeCanvas();

    // Responsive particle count
    const isMobile = window.innerWidth < 768;
    const maxParticles = isMobile ? 25 : 65;
    const connectionDistance = 110;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
            this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(171, 38, 255, 0.4)';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce on boundaries
            if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
            if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticleList() {
        particlesArray = [];
        for (let i = 0; i < maxParticles; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particlesArray.push(new Particle(x, y));
        }
    }

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.hypot(dx, dy);

                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    // Connection line color blends cyber cyan and purple
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.15})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        connectParticles();
        requestAnimationFrame(animate);
    }

    initParticleList();
    animate();
}

/* ==========================================================================
   Custom Cursor Glow
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    // Track real mouse coordinates
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate glow cursor position with lag using lerp for buttery smooth physics
    function updateGlowPosition() {
        posX += (mouseX - posX) * 0.1;
        posY += (mouseY - posY) * 0.1;

        cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        requestAnimationFrame(updateGlowPosition);
    }

    updateGlowPosition();
}

/* ==========================================================================
   Scroll Reveal Animation (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const observerOptions = {
        root: null, // viewport
        threshold: 0.12, // triggers when 12% is visible
        rootMargin: "0px 0px -50px 0px" // triggers slightly before screen entry
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Project Grid Filtering
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-categories').split(' ');

                // Standard fade-out, toggle display, fade-in transition logic
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   Contact Form Validation & Processing
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');

    // Live validation listener on blur
    nameInput.addEventListener('blur', () => validateField(nameInput, nameInput.value.trim().length >= 2));
    emailInput.addEventListener('blur', () => validateField(emailInput, validateEmailString(emailInput.value.trim())));
    messageInput.addEventListener('blur', () => validateField(messageInput, messageInput.value.trim().length >= 10));

    function validateField(element, condition) {
        const group = element.closest('.form-group');
        if (condition) {
            group.classList.remove('invalid');
            return true;
        } else {
            group.classList.add('invalid');
            return false;
        }
    }

    function validateEmailString(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Run full evaluation
        const nameVal = nameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const messageVal = messageInput.value.trim();

        const isNameValid = validateField(nameInput, nameVal.length >= 2);
        const isEmailValid = validateField(emailInput, validateEmailString(emailVal));
        const isMessageValid = validateField(messageInput, messageVal.length >= 10);

        if (isNameValid && isEmailValid && isMessageValid) {
            // Formulate subject & body payloads
            const mailtoAddress = 'shafiurrahman067@gmail.com';
            const subject = encodeURIComponent(`Secure Portfolio Uplink - ${nameVal}`);
            const body = encodeURIComponent(
                `System Transmission from:\n` +
                `Name: ${nameVal}\n` +
                `Email: ${emailVal}\n\n` +
                `Transmission Content:\n${messageVal}\n\n` +
                `--- System End Metadata ---`
            );

            // Execute client-side window mail redirection
            window.location.href = `mailto:${mailtoAddress}?subject=${subject}&body=${body}`;
            
            // Clear form after success
            form.reset();
            // Clear visual validation statuses
            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('invalid'));
        }
    });
}

/* ==========================================================================
   Wikipedia Interactive Contents Box (TOC)
   ========================================================================== */
function toggleContents() {
    const list = document.getElementById('contents-list');
    const toggleBtn = document.querySelector('.contents-toggle');
    
    if (list.style.display === 'none') {
        list.style.display = 'block';
        toggleBtn.textContent = '[hide]';
    } else {
        list.style.display = 'none';
        toggleBtn.textContent = '[show]';
    }
}

function initWikiContents() {
    const list = document.getElementById('contents-list');
    if (list) {
        list.style.display = 'block'; // defaults to open
    }
}

/* ==========================================================================
   Footer Cyberpunk Real-Time Clock
   ========================================================================== */
function initFooterTime() {
    const timeDisplay = document.getElementById('footer-time');
    if (!timeDisplay) return;

    function updateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        timeDisplay.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateTime, 1000);
    updateTime(); // initial load execution
}
