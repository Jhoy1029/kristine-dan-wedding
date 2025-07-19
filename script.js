// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(245, 245, 222, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(245, 245, 222, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('August 9, 2025 15:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update main countdown display
    const countdownDaysElement = document.getElementById('countdown-days');
    const countdownHoursElement = document.getElementById('countdown-hours');
    const countdownMinutesElement = document.getElementById('countdown-minutes');
    const countdownSecondsElement = document.getElementById('countdown-seconds');
    
    if (countdownDaysElement) {
        countdownDaysElement.textContent = days;
    }
    if (countdownHoursElement) {
        countdownHoursElement.textContent = hours.toString().padStart(2, '0');
    }
    if (countdownMinutesElement) {
        countdownMinutesElement.textContent = minutes.toString().padStart(2, '0');
    }
    if (countdownSecondsElement) {
        countdownSecondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Update hero countdown display
    const heroCountdownDaysElement = document.getElementById('hero-countdown-days');
    const heroCountdownHoursElement = document.getElementById('hero-countdown-hours');
    const heroCountdownMinutesElement = document.getElementById('hero-countdown-minutes');
    const heroCountdownSecondsElement = document.getElementById('hero-countdown-seconds');
    
    if (heroCountdownDaysElement) {
        heroCountdownDaysElement.textContent = days;
    }
    if (heroCountdownHoursElement) {
        heroCountdownHoursElement.textContent = hours.toString().padStart(2, '0');
    }
    if (heroCountdownMinutesElement) {
        heroCountdownMinutesElement.textContent = minutes.toString().padStart(2, '0');
    }
    if (heroCountdownSecondsElement) {
        heroCountdownSecondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Update details page countdown
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement) {
        daysElement.textContent = days.toString().padStart(2, '0');
    }
    if (hoursElement) {
        hoursElement.textContent = hours.toString().padStart(2, '0');
    }
    if (minutesElement) {
        minutesElement.textContent = minutes.toString().padStart(2, '0');
    }
    if (secondsElement) {
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    if (distance < 0) {
        if (countdownDaysElement) {
            countdownDaysElement.textContent = '0';
        }
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = '<h3>🎉 The Wedding Day Has Arrived! 🎉</h3>';
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Lightbox Gallery
const galleryImages = [
    'Assests/518309189_663925536670945_6209795305200463025_n.jpg',
    'Assests/518272096_663925673337598_3966823947395530094_n.jpg',
    'Assests/518328662_663924443337721_2470835426998066250_n.jpg',
    'Assests/bg.jpg'
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = galleryImages[index];
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    document.getElementById('lightbox-img').src = galleryImages[currentImageIndex];
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// RSVP Form
const rsvpForm = document.getElementById('rsvpForm');

rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(rsvpForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const guests = formData.get('guests');
    const attending = formData.get('attending');
    const message = formData.get('message');
    
    // Show success message
    showNotification('Thank you for your RSVP! We look forward to celebrating with you!', 'success');
    
    // Reset form
    rsvpForm.reset();
    
    // In a real application, you would send this data to a server
    console.log('RSVP Data:', {
        name,
        email,
        guests,
        attending,
        message
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else {
        notification.style.background = '#333';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.story-content, .details-grid, .gallery-grid, .rsvp-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add click sound effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Add a subtle scale effect
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const names = heroTitle.querySelectorAll('.name');
        names.forEach((name, index) => {
            const text = name.textContent;
            name.textContent = '';
            name.style.opacity = '1';
            
            setTimeout(() => {
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        name.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                };
                typeWriter();
            }, 1000 + (index * 500));
        });
    }
});



// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add confetti effect for special interactions
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * window.innerWidth}px;
            top: -10px;
            pointer-events: none;
            z-index: 1000;
            animation: confettiFall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (document.body.contains(confetti)) {
                document.body.removeChild(confetti);
            }
        }, 3000);
    }
}

// Add confetti CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Trigger confetti on RSVP submission
rsvpForm.addEventListener('submit', createConfetti);

// Add smooth reveal animations for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Section background transitions
const sectionBackgrounds = {
    'story': 'Assests/5.jpg',
    'gallery': 'Assests/6.jpg',
    'rsvp': 'Assests/7.jpg'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionBackgrounds[sectionId]) {
                entry.target.style.backgroundImage = `linear-gradient(135deg, rgba(244, 232, 209, 0.7) 0%, rgba(245, 245, 222, 0.7) 100%), url('${sectionBackgrounds[sectionId]}')`;
            }
        }
    });
}, { threshold: 0.3 });

// Observe sections for background changes
document.querySelectorAll('#story, #gallery, #rsvp').forEach(section => {
    sectionObserver.observe(section);
});

// Timeline functionality
document.addEventListener('DOMContentLoaded', function() {
    const heartItems = document.querySelectorAll('.heart-item');
    const timelineStories = document.querySelectorAll('.timeline-story');
    const timelineSection = document.querySelector('.love-timeline');

    // Background image mapping for each heart
    const heartImages = ['3.jpg', '2.jpg', '1.jpg', '4.jpg', '6.jpg', '5.jpg', '7.jpg'];

    heartItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            const imageFile = heartImages[index];
            
            // Remove active class from all hearts and stories
            heartItems.forEach(heart => heart.classList.remove('active'));
            timelineStories.forEach(story => story.classList.remove('active'));
            
            // Add active class to clicked heart and corresponding story
            this.classList.add('active');
            const activeStory = document.querySelector(`.timeline-story[data-year="${year}"]`);
            if (activeStory) {
                activeStory.classList.add('active');
            }
            
            // Change background image
            if (timelineSection) {
                timelineSection.style.backgroundImage = `linear-gradient(135deg, rgba(245, 245, 222, 0.7) 0%, rgba(244, 232, 209, 0.7) 100%), url('Assests/${imageFile}')`;
            }
        });
    });
});

// Add revealed class styles
const revealedStyle = document.createElement('style');
revealedStyle.textContent = `
    section.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(revealedStyle); 