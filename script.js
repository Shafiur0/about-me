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
    
    // New Feature Initializers
    initRadarChart();
    initCipherSandbox();
    initDykWidget();
    initCitationModal();
    initCliTerminal();
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


/* ==========================================================================
   SVG Skills Radar Chart
   ========================================================================== */
function initRadarChart() {
    const svg = document.getElementById('skills-radar-chart');
    const legend = document.getElementById('chart-legend');
    if (!svg || !legend) return;

    const skillsData = [
        { label: "AI/ML Dev", value: 90 },
        { label: "Web Apps", value: 85 },
        { label: "Cybersecurity", value: 75 },
        { label: "Robotics", value: 70 },
        { label: "QA/Testing", value: 80 }
    ];

    const width = 400;
    const height = 400;
    const cx = width / 2;
    const cy = height / 2;
    const r = 135;
    const totalAxes = skillsData.length;

    // Populate Legend
    legend.innerHTML = skillsData.map(d => `
        <div class="legend-item">
            <span class="legend-color-dot" style="background: ${d.value >= 80 ? 'var(--neon-cyan)' : 'var(--neon-purple)'}"></span>
            <span>${d.label} (${d.value}%)</span>
        </div>
    `).join('');

    // Clear previous dynamic contents
    svg.innerHTML = '';

    // Draw background grid concentric levels
    const levels = 5;
    for (let j = 1; j <= levels; j++) {
        const levelRadius = (r / levels) * j;
        const points = [];
        for (let i = 0; i < totalAxes; i++) {
            const angle = i * (2 * Math.PI / totalAxes) - Math.PI / 2;
            const x = cx + Math.cos(angle) * levelRadius;
            const y = cy + Math.sin(angle) * levelRadius;
            points.push(`${x},${y}`);
        }
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', points.join(' '));
        polygon.setAttribute('class', 'radar-grid-web');
        svg.appendChild(polygon);
        
        // Draw helper concentric circle indicators
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', levelRadius);
        circle.setAttribute('class', 'radar-grid-line');
        svg.appendChild(circle);
    }

    // Draw axes and labels
    const axisCoords = [];
    skillsData.forEach((skill, i) => {
        const angle = i * (2 * Math.PI / totalAxes) - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        axisCoords.push({ x, y, angle });

        // Line from center
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', cx);
        line.setAttribute('y1', cy);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('class', 'radar-axis-line');
        svg.appendChild(line);

        // Label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const labelRadius = r + 24;
        const lx = cx + Math.cos(angle) * labelRadius;
        const ly = cy + Math.sin(angle) * labelRadius;
        
        text.setAttribute('x', lx);
        text.setAttribute('y', ly + 4);
        text.setAttribute('class', 'radar-axis-label');
        text.textContent = skill.label;
        svg.appendChild(text);
    });

    // Plot data polygon
    const dataPoints = [];
    skillsData.forEach((skill, i) => {
        const angle = i * (2 * Math.PI / totalAxes) - Math.PI / 2;
        const valueRadius = (r * skill.value) / 100;
        const x = cx + Math.cos(angle) * valueRadius;
        const y = cy + Math.sin(angle) * valueRadius;
        dataPoints.push(`${x},${y}`);
    });

    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', dataPoints.join(' '));
    polygon.setAttribute('class', 'radar-polygon');
    svg.appendChild(polygon);

    // Plot vertex dots with interactivity
    skillsData.forEach((skill, i) => {
        const angle = i * (2 * Math.PI / totalAxes) - Math.PI / 2;
        const valueRadius = (r * skill.value) / 100;
        const x = cx + Math.cos(angle) * valueRadius;
        const y = cy + Math.sin(angle) * valueRadius;

        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', x);
        dot.setAttribute('cy', y);
        dot.setAttribute('r', '4');
        dot.setAttribute('class', 'radar-dot');
        
        // Dynamic tooltip logic on hover
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${skill.label}: ${skill.value}%`;
        dot.appendChild(title);
        
        svg.appendChild(dot);
    });
}

/* ==========================================================================
   Decryption Cipher Sandbox
   ========================================================================== */
function initCipherSandbox() {
    const input = document.getElementById('cipher-input');
    const select = document.getElementById('cipher-type');
    const output = document.getElementById('cipher-output');
    const status = document.getElementById('cipher-status');

    if (!input || !select || !output || !status) return;

    let cipherInterval = null;

    function processCipher() {
        const text = input.value;
        const algorithm = select.value;
        let finalResult = '';

        if (!text) {
            output.textContent = 'NO_DATA';
            return;
        }

        // Encryption logic
        if (algorithm === 'rot13') {
            finalResult = text.replace(/[a-zA-Z]/g, c => {
                const base = c.toLowerCase() < 'n' ? 13 : -13;
                return String.fromCharCode(c.charCodeAt(0) + base);
            });
        } else if (algorithm === 'base64') {
            try {
                // Safeguard against non-Latin1 chars for standard base64 encoding
                finalResult = btoa(unescape(encodeURIComponent(text)));
            } catch (e) {
                finalResult = 'ENCODING_ERROR';
            }
        } else if (algorithm === 'binary') {
            finalResult = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        } else if (algorithm === 'hex') {
            finalResult = text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase()).join(' ');
        }

        // Trigger visual decrypt animation
        status.innerHTML = `<span class="status-pulse-green status-pulse-anim"></span> PROCESSING...`;
        status.style.color = 'var(--neon-pink)';
        
        if (cipherInterval) clearInterval(cipherInterval);
        
        let counter = 0;
        const duration = 12; // iterations
        const charset = '01ABCDEFGHIKLMNOPQRSTVXYZ@#$%&*+-';

        cipherInterval = setInterval(() => {
            if (counter >= duration) {
                clearInterval(cipherInterval);
                output.textContent = finalResult;
                status.innerHTML = `<span class="status-pulse-green"></span> SECURE`;
                status.style.color = '#00ff66';
            } else {
                // Shuffle output string characters randomly
                output.textContent = text.split('').map(() => charset[Math.floor(Math.random() * charset.length)]).join('');
                counter++;
            }
        }, 30);
    }

    input.addEventListener('input', processCipher);
    select.addEventListener('change', processCipher);

    // Run once on load
    processCipher();
}

/* ==========================================================================
   Did You Know? Widget
   ========================================================================== */
function initDykWidget() {
    const textEl = document.getElementById('dyk-text');
    const nextBtn = document.getElementById('dyk-next-btn');
    if (!textEl || !nextBtn) return;

    const facts = [
        "...that Shafim's autonomous firefighter robot Fenix uses computer vision pathfinding and thermal imaging?",
        "...that the SQAT Club at DIU organizes coding hackathons and automated test bootcamps?",
        "...that Shafim's team Cortex Crew won 1st Runner-Up at the ICADHI IEEE International Congress?",
        "...that Shafim holds an Object-Oriented Programming in Java certification from Simplilearn?",
        "...that this portfolio's black/neon layout is styled to blend Wikipedia guidelines with Gibsonian cyberpunk hacker elements?"
    ];

    let currentFactIndex = 0;
    let dykTimer = null;

    function showNextFact() {
        textEl.style.opacity = '0';
        setTimeout(() => {
            currentFactIndex = (currentFactIndex + 1) % facts.length;
            textEl.textContent = facts[currentFactIndex];
            textEl.style.opacity = '1';
        }, 300);
    }

    nextBtn.addEventListener('click', () => {
        showNextFact();
        resetTimer();
    });

    function resetTimer() {
        if (dykTimer) clearInterval(dykTimer);
        dykTimer = setInterval(showNextFact, 12000); // cycle every 12s
    }

    resetTimer();
}

/* ==========================================================================
   Citation System & Modal
   ========================================================================== */
function initCitationModal() {
    const citeBtn = document.getElementById('cite-article-btn');
    const modal = document.getElementById('cite-modal');
    const closeBtn = document.getElementById('close-cite-modal');
    const tabBtns = document.querySelectorAll('.modal-tab-btn');
    const outputText = document.getElementById('citation-text');
    const copyBtn = document.getElementById('copy-citation-btn');

    if (!citeBtn || !modal || !closeBtn || !outputText || !copyBtn) return;

    const url = "https://shafiur-rahaman-shafim.vercel.app";

    const citations = {
        ieee: `S. R. Shafim, "Shafiur Rahman Shafim | Software Engineer & AI Enthusiast Portfolio," Vercel Projects, 2026. [Online]. Available: ${url}.`,
        bibtex: `@misc{shafim2026portfolio,\n  author = {Shafim, Shafiur Rahman},\n  title = {Shafiur Rahman Shafim | Software Engineer \\& AI Enthusiast Portfolio},\n  year = {2026},\n  howpublished = {\\url{${url}}}\n}`,
        apa: `Shafim, S. R. (2026). Shafiur Rahman Shafim | Software Engineer & AI Enthusiast Portfolio. Retrieved from ${url}`,
        mla: `Shafim, Shafiur Rahman. "Shafiur Rahman Shafim | Software Engineer & AI Enthusiast Portfolio." Vercel Projects, 2026, ${url}.`
    };

    function updateCitation(style) {
        outputText.textContent = citations[style];
    }

    citeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCitation('ieee'); // default load style
        // reset active tabs
        tabBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.modal-tab-btn[data-style="ieee"]').classList.add('active');
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close when clicking overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateCitation(btn.getAttribute('data-style'));
        });
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.textContent).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> COPIED_SUCCESSFULLY`;
            copyBtn.style.background = '#00ff66';
            copyBtn.style.color = '#050508';
            copyBtn.style.borderColor = '#00ff66';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
                copyBtn.style.color = '';
                copyBtn.style.borderColor = '';
            }, 2000);
        });
    });
}

/* ==========================================================================
   Collapsible & Draggable Cyberpunk CLI Terminal
   ========================================================================== */
function initCliTerminal() {
    const term = document.getElementById('terminal-widget');
    const toggleBtn = document.getElementById('terminal-toggle-btn');
    const input = document.getElementById('terminal-input');
    const history = document.getElementById('terminal-history');
    const termBody = document.getElementById('terminal-body');
    
    // Window actions buttons
    const minBtn = document.getElementById('term-min-btn');
    const maxBtn = document.getElementById('term-max-btn');
    const closeBtn = document.getElementById('term-close-btn');

    if (!term || !toggleBtn || !input || !history || !termBody) return;

    // Draggable code
    const header = document.getElementById('terminal-drag');
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    header.addEventListener('mousedown', (e) => {
        if (e.target.closest('.terminal-header-right')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = term.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        
        term.style.right = 'auto';
        term.style.bottom = 'auto';
        term.style.left = initialLeft + 'px';
        term.style.top = initialTop + 'px';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        term.style.left = (initialLeft + dx) + 'px';
        term.style.top = (initialTop + dy) + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Window action states
    toggleBtn.addEventListener('click', () => {
        term.classList.remove('minimized');
        input.focus();
    });

    minBtn.addEventListener('click', () => {
        term.classList.add('minimized');
    });

    maxBtn.addEventListener('click', () => {
        term.classList.toggle('maximized');
    });

    closeBtn.addEventListener('click', () => {
        term.classList.add('minimized');
    });

    // Focus input on body click
    termBody.addEventListener('click', () => {
        input.focus();
    });

    // Command handling
    let hackInterval = null;
    let isHacking = false;

    function stopHack() {
        if (hackInterval) {
            clearInterval(hackInterval);
            hackInterval = null;
        }
        isHacking = false;
        history.innerHTML = '';
        input.value = '';
        input.disabled = false;
        writeOutput("Matrix sequence halted. Secure prompt restored.");
        writeOutput("Type 'help' to review commands.");
        input.focus();
    }

    input.addEventListener('keydown', (e) => {
        if (isHacking) {
            stopHack();
            e.preventDefault();
            return;
        }

        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            input.value = '';

            if (!cmd) return;

            // log input
            writeLogInput(cmd);

            // route commands
            switch (cmd) {
                case 'help':
                    writeOutput(
                        "Available system commands:\n" +
                        "  help      - Display this list of options.\n" +
                        "  bio       - Render quick summary biography.\n" +
                        "  skills    - List programming stack and frameworks.\n" +
                        "  projects  - Show active codebase coordinates.\n" +
                        "  hack      - Execute matrix threat simulation display.\n" +
                        "  clear     - Wipe shell scroll logging history.\n" +
                        "  minimize  - Drop shell terminal link to background."
                    );
                    break;
                case 'bio':
                    writeOutput(
                        "Subject: Shafiur Rahman Shafim\n" +
                        "Affiliation: Software Engineering Dept, DIU\n" +
                        "Position: Deputy Secretary, SQAT Club\n" +
                        "Focus: Full stack AI automation, cybersecurity analysis."
                    );
                    break;
                case 'skills':
                    writeOutput(
                        "Systems Stacks:\n" +
                        "  - Core Languages: JavaScript, Python, TypeScript, Java\n" +
                        "  - Front-end: HTML, CSS, Next.js, Tailwind CSS\n" +
                        "  - Back-end: Node.js, Express.js, Prisma ORM\n" +
                        "  - DB: PostgreSQL, MySQL\n" +
                        "  - Operations: Git, Software Testing, Prompt Engineering"
                    );
                    break;
                case 'projects':
                    writeOutput(
                        "Code repositories identified:\n" +
                        "  - AIDoc      : Sympton Analyzer [https://github.com/Shafiur0/AiDoc.s]\n" +
                        "  - Portfolio  : Wiki-Cyberpunk [https://shafiur-rahman-web-portfolio.vercel.app]\n" +
                        "  - WhisperWall: Confession board [https://whisper-wall-zeta.vercel.app]\n" +
                        "  - FitCheck   : Health track system [https://fitcheck-sand.vercel.app]"
                    );
                    break;
                case 'clear':
                    history.innerHTML = '';
                    break;
                case 'minimize':
                    term.classList.add('minimized');
                    break;
                case 'hack':
                    runHackScreensaver();
                    break;
                default:
                    writeError(`SHELL_ERROR: Command '${cmd}' not recognized.`);
            }

            termBody.scrollTop = termBody.scrollHeight;
        }
    });

    // Global keypress listener during matrix hack to stop screensaver
    document.addEventListener('keydown', () => {
        if (isHacking) stopHack();
    });

    function writeLogInput(cmd) {
        const row = document.createElement('div');
        row.className = 'terminal-log-row';
        row.innerHTML = `<span class="terminal-log-input">guest@shafim_wiki:~$. ${cmd}</span>`;
        history.appendChild(row);
    }

    function writeOutput(text) {
        const row = document.createElement('div');
        row.className = 'terminal-log-row terminal-log-output';
        row.textContent = text;
        history.appendChild(row);
    }

    function writeError(text) {
        const row = document.createElement('div');
        row.className = 'terminal-log-row terminal-log-error';
        row.textContent = text;
        history.appendChild(row);
    }

    function runHackScreensaver() {
        isHacking = true;
        input.disabled = true;
        history.innerHTML = '';
        const banner = document.createElement('div');
        banner.style.color = '#00ff66';
        banner.style.fontFamily = 'monospace';
        history.appendChild(banner);

        const columns = 24;
        hackInterval = setInterval(() => {
            let rowText = '';
            for (let i = 0; i < columns; i++) {
                if (Math.random() > 0.3) {
                    rowText += Math.random() > 0.5 ? '1 ' : '0 ';
                } else {
                    rowText += '  ';
                }
            }
            const line = document.createElement('div');
            line.style.whiteSpace = 'pre';
            line.textContent = rowText;
            history.appendChild(line);
            
            // Limit output lines to prevent memory crash
            if (history.children.length > 30) {
                history.removeChild(history.firstChild);
            }
            termBody.scrollTop = termBody.scrollHeight;
        }, 60);
    }
}
