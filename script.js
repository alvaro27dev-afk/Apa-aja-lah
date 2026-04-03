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

function resetAll() {
    // keep background music playing / unchanged
    scrollToTop();

    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const videoPlayer = document.getElementById('videoPlayer');
    const finalTitle = document.getElementById('typingText');

    if (envelope) {
        envelope.classList.remove('open');
    }
    if (letter) {
        letter.classList.remove('open');
    }
    if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPlayer.style.display = 'none';
    }
    if (finalTitle) {
        finalTitle.textContent = "You're worth every heartbeat.";
    }

    // allow the letter to be opened again
    if (typeof isLetterOpen !== 'undefined') {
        isLetterOpen = false;
    }

    const openBtn = document.getElementById('openLetter');
    const closeBtn = document.getElementById('closeLetter');
    if (openBtn) {
        openBtn.textContent = 'Buka Surat 💌';
    }
    if (closeBtn) {
        closeBtn.style.display = 'none';
    }

    document.querySelectorAll('.fade-in').forEach(el => el.classList.remove('fade-in'));
    document.querySelectorAll('.message-paragraph, .memory-card, .note-card, .final-content, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// === MUSIC CONTROL ===
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
let isPlaying = false;
let isLetterOpen = false;
let isMusicPlaying = false;

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

// === LOVE LETTER FUNCTIONALITY ===
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const openBtn = document.getElementById('openLetter');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const particlesContainer = document.getElementById('particles');
    const videoPlayer = document.getElementById('videoPlayer');

    const closeBtn = document.getElementById('closeLetter');

    // Open letter functionality
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            if (!isLetterOpen) {
                envelope.classList.add('open');
                setTimeout(() => {
                    letter.classList.add('open');
                    // Show video when letter opens
                    if (videoPlayer) {
                        videoPlayer.style.display = 'block';
                    }
                    if (closeBtn) {
                        closeBtn.style.display = 'block';
                    }
                    openBtn.textContent = 'Tutup Surat ✕';
                    isLetterOpen = true;
                }, 300);
            } else {
                // close if already open
                if (envelope) envelope.classList.remove('open');
                if (letter) letter.classList.remove('open');
                if (videoPlayer) {
                    videoPlayer.pause();
                    videoPlayer.currentTime = 0;
                    videoPlayer.style.display = 'none';
                }
                if (closeBtn) {
                    closeBtn.style.display = 'none';
                }
                openBtn.textContent = 'Buka Surat 💌';
                isLetterOpen = false;
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (envelope) envelope.classList.remove('open');
            if (letter) letter.classList.remove('open');
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
                videoPlayer.style.display = 'none';
            }
            if (closeBtn) closeBtn.style.display = 'none';
            if (openBtn) openBtn.textContent = 'Buka Surat 💌';
            isLetterOpen = false;
        });
    }

    // Music button functionality
    if (musicBtn) {
        musicBtn.addEventListener('click', function() {
            if (!isMusicPlaying) {
                bgMusic.play().catch(e => console.log('Audio play failed:', e));
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<span class="music-icon">🎶</span><span class="music-text">Musik Sedang Diputar</span>';
                isMusicPlaying = true;
            } else {
                bgMusic.pause();
                bgMusic.currentTime = 0;
                musicBtn.classList.remove('playing');
                musicBtn.innerHTML = '<span class="music-icon">🎶</span><span class="music-text">Putar Musik</span>';
                isMusicPlaying = false;
            }
        });
    }

    // Floating hearts particles
    function createHeart() {
        if (!particlesContainer) return;
        
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '💕';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        particlesContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 7000);
    }

    // Create hearts periodically
    setInterval(createHeart, 800);

    // Button hover effects
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Prevent context menu on long press for mobile
    document.addEventListener('contextmenu', e => e.preventDefault());
});