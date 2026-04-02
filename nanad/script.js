// === DOM ELEMENTS ===
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// === SMOOTH SCROLLING ===
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

// === MUSIC CONTROL ===
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.style.background = 'rgba(255, 255, 255, 0.2)';
    } else {
        backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
        musicToggle.style.background = 'rgba(34, 197, 94, 0.3)';
    }
    isPlaying = !isPlaying;
});

// === SCROLL ANIMATIONS (Intersection Observer) ===
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections and elements
sections.forEach(section => observer.observe(section));
document.querySelectorAll('.message-paragraph, .memory-card, .note-card, .final-content, .section-title').forEach(el => {
    observer.observe(el);
});

// === TYPING EFFECT ===
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Start typing effect when final section is visible
const finalTitle = document.getElementById('typingText');
const typingText = "You're worth every heartbeat, Ade.";

const finalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !finalTitle.textContent) {
            setTimeout(() => typeWriter(finalTitle, typingText, 120), 300);
        }
    });
}, { threshold: 0.3 });

finalObserver.observe(document.getElementById('final'));

// === SMOOTH SCROLL BEHAVIOR POLYFILL ===
if ('scrollBehavior' in document.documentElement.style === false) {
    window.scrollTo = smoothScrollPolyfill;
}

// === INITIAL LOAD ANIMATION ===
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});