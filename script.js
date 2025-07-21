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



// Reminders Carousel Functionality
function initRemindersCarousel() {
    const slides = document.querySelectorAll('.reminder-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('reminderPrev');
    const nextBtn = document.getElementById('reminderNext');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isAnimating = false;
    
    function showSlide(index, direction = 'right') {
        if (isAnimating) return;
        isAnimating = true;
        
        // Remove active class from current slide
        const currentActiveSlide = document.querySelector('.reminder-slide.active');
        if (currentActiveSlide) {
            currentActiveSlide.classList.remove('active');
        }
        
        // Remove animation classes from all slides
        slides.forEach(slide => {
            slide.classList.remove('slide-in-center', 'slide-out-to-center');
        });
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        // Add active class and animation to new slide
        slides[index].classList.add('active', 'slide-in-center');
        
        // Remove animation class after completion
        setTimeout(() => {
            slides[index].classList.remove('slide-in-center');
            isAnimating = false;
        }, 500);
    }
    
    function nextSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide, 'right');
    }
    
    function prevSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide, 'left');
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isAnimating || index === currentSlide) return;
            const direction = index > currentSlide ? 'right' : 'left';
            currentSlide = index;
            showSlide(currentSlide, direction);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    initRemindersCarousel();
});

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

// Mobile-specific improvements
document.addEventListener('DOMContentLoaded', function() {
    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '16px';
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '';
            }
        });
    });

    // Improve touch interactions for timeline
    const heartItems = document.querySelectorAll('.heart-item');
    heartItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        item.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Better mobile navigation handling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a small delay for mobile to ensure smooth transition
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }, 300);
            }
        });
    });

    // Improve scroll performance on mobile
    let ticking = false;
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(245, 245, 222, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(245, 245, 222, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate any layout-dependent elements
            window.dispatchEvent(new Event('resize'));
        }, 500);
    });
});

// RSVP Form
const rsvpForm = document.getElementById('rsvpForm');

rsvpForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(rsvpForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const guests = formData.get('guests');
    const attending = formData.get('attending');
    const message = formData.get('message');
    
    // Show loading state
    const submitBtn = rsvpForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Create RSVP entry
        const rsvpEntry = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            guests: parseInt(guests),
            attending,
            message: message ? message.trim() : '',
            timestamp: new Date().toISOString(),
            source: 'form'
        };

        // Get existing RSVPs from localStorage
        const existingRSVPs = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
        
        // Check if email already exists
        const existingIndex = existingRSVPs.findIndex(rsvp => rsvp.email === rsvpEntry.email);
        
        if (existingIndex !== -1) {
            // Update existing RSVP
            existingRSVPs[existingIndex] = { ...existingRSVPs[existingIndex], ...rsvpEntry };
        } else {
            // Add new RSVP
            existingRSVPs.push(rsvpEntry);
        }
        
        // Save back to localStorage
        localStorage.setItem('weddingRSVPs', JSON.stringify(existingRSVPs));
        
        // Show success message
        showNotification('RSVP submitted successfully! Thank you for your response.', 'success');
        
        // Reset form
        rsvpForm.reset();
        
        // Create confetti effect
        createConfetti();
        
    } catch (error) {
        console.error('RSVP submission error:', error);
        showNotification('Error submitting RSVP. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 20px 30px;
        border-radius: 15px;
        color: white;
        font-weight: 600;
        font-size: 16px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        max-width: 350px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.2);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
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
            if (document.body.contains(notification)) {
            document.body.removeChild(notification);
            }
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

// Confetti is now triggered within the main RSVP submission handler

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

    // Background image mapping for each heart (same order for all devices now)
    const heartImages = ['3.jpg', '2.jpg', '1.jpg', '4.jpg', '6.jpg', '5.jpg', '7.jpg'];

    // Desktop/Tablet timeline functionality
    const desktopHearts = document.querySelectorAll('.timeline-hearts .heart-item');
    if (desktopHearts.length > 0) {
        desktopHearts.forEach((heart, index) => {
            heart.addEventListener('click', () => {
                // Remove active class from all hearts
                desktopHearts.forEach(h => h.classList.remove('active'));
                
                // Add active class to clicked heart
                heart.classList.add('active');
                
                // Update timeline story
                const year = heart.getAttribute('data-year');
                timelineStories.forEach(story => story.classList.remove('active'));
                const story = document.querySelector(`.timeline-story[data-year="${year}"]`);
                if (story) {
                    story.classList.add('active');
                }
                
                // Change background image
                if (timelineSection) {
                    timelineSection.style.backgroundImage = `linear-gradient(135deg, rgba(245, 245, 222, 0.7) 0%, rgba(244, 232, 209, 0.7) 100%), url('Assests/${heartImages[index]}')`;
                }
            });
        });
    }


    
    // Mobile Timeline - Static Display
    const carousel = document.querySelector('.timeline-carousel');
    
    if (carousel) {
        const container = carousel.querySelector('.timeline-carousel-container');
        const items = carousel.querySelectorAll('.timeline-carousel-item');
        const timelineStories = document.querySelectorAll('.timeline-story');
        const timelineSection = document.querySelector('.love-timeline');
        const nextBtn = carousel.querySelector('.mobile-next-btn');

        let currentSlide = 0;
        let showingFirstFour = true;
        const totalSlides = items.length;
        
        // Background images for timeline (same order for all devices)
        const heartImages = [
            'intro.jpg',
            '1.jpg', 
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg',
            '6.jpg'
        ];
        
        function updateTimeline() {
            // Update heart items with visual feedback
            items.forEach((item, index) => {
                const heartItem = item.querySelector('.heart-item');
                if (heartItem) {
                    heartItem.classList.toggle('active', index === currentSlide);
                    
                    // Add scale effect for active heart
                    if (index === currentSlide) {
                        heartItem.style.transform = 'scale(1.1)';
                    } else {
                        heartItem.style.transform = 'scale(1)';
                    }
                }
            });
            
            // Update timeline story
            const year = items[currentSlide].getAttribute('data-year');
            timelineStories.forEach(story => story.classList.remove('active'));
            const story = document.querySelector(`.timeline-story[data-year="${year}"]`);
            if (story) {
                story.classList.add('active');
            }
            
            // Change background image
            const imageFile = heartImages[currentSlide];
            if (timelineSection) {
                timelineSection.style.backgroundImage = `linear-gradient(135deg, rgba(245, 245, 222, 0.7) 0%, rgba(244, 232, 209, 0.7) 100%), url('Assests/${imageFile}')`;
            }
        }
        
        function goToSlide(slideIndex) {
            if (slideIndex >= 0 && slideIndex < totalSlides) {
                currentSlide = slideIndex;
                updateTimeline();
            }
        }
        
        function toggleMobileView() {
            showingFirstFour = !showingFirstFour;
            
            if (showingFirstFour) {
                // Show first 4 hearts
                container.style.transform = 'translateX(0)';
                nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            } else {
                // Show last 3 hearts
                container.style.transform = 'translateX(-57%)';
                nextBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            }
        }
        
        // Add click event listeners to hearts for direct selection
        items.forEach((item, index) => {
            const heartItem = item.querySelector('.heart-item');
            if (heartItem) {
                heartItem.addEventListener('click', () => {
                    goToSlide(index);
                });
            }
        });
        
        // Add click event listener to next button
        if (nextBtn) {
            nextBtn.addEventListener('click', toggleMobileView);
        }
        
        // Initialize with "The Beginning" selected and first 4 hearts visible
        goToSlide(0);
    }
    
    // Mobile Heart Navigation functionality
    const mobileHeartNext = document.getElementById('mobileHeartNext');
    const mobileHeartPrev = document.getElementById('mobileHeartPrev');
    
    if (mobileHeartNext || mobileHeartPrev) {
        let currentStoryIndex = 0;
        const timelineStories = document.querySelectorAll('.timeline-story');
        const timelineSection = document.querySelector('.love-timeline');
        const totalStories = timelineStories.length;
        
        // Background images for timeline
        const heartImages = [
            '3.jpg',  // The Beginning
            '1.jpg', 
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg',
            '6.jpg'
        ];
        
        function updateMobileTimeline() {
            // Hide all stories
            timelineStories.forEach(story => story.classList.remove('active'));
            
            // Show current story
            if (timelineStories[currentStoryIndex]) {
                timelineStories[currentStoryIndex].classList.add('active');
            }
            
            // Update background image
            if (timelineSection && heartImages[currentStoryIndex]) {
                timelineSection.style.backgroundImage = `linear-gradient(135deg, rgba(245, 245, 222, 0.7) 0%, rgba(244, 232, 209, 0.7) 100%), url('Assests/${heartImages[currentStoryIndex]}')`;
            }
            
            // Update button text and visibility
            if (mobileHeartNext) {
                const nextBtnText = mobileHeartNext.querySelector('.btn-text');
                if (nextBtnText) {
                    if (currentStoryIndex === totalStories - 1) {
                        nextBtnText.textContent = 'Back to Beginning';
                    } else {
                        // Get the title of the next story
                        const nextStory = timelineStories[currentStoryIndex + 1];
                        if (nextStory) {
                            const nextTitle = nextStory.querySelector('h3').textContent;
                            nextBtnText.textContent = nextTitle;
                        } else {
                            nextBtnText.textContent = 'Continue Our Story';
                        }
                    }
                }
            }
            
            if (mobileHeartPrev) {
                if (currentStoryIndex === 0) {
                    // Hide the previous button on the first story
                    mobileHeartPrev.style.display = 'none';
                } else {
                    // Show the previous button
                    mobileHeartPrev.style.display = 'flex';
                }
            }
        }
        
        function nextStory() {
            currentStoryIndex = (currentStoryIndex + 1) % totalStories;
            updateMobileTimeline();
        }
        
        function prevStory() {
            currentStoryIndex = (currentStoryIndex - 1 + totalStories) % totalStories;
            updateMobileTimeline();
        }
        
        if (mobileHeartNext) {
            mobileHeartNext.addEventListener('click', nextStory);
        }
        
        if (mobileHeartPrev) {
            mobileHeartPrev.addEventListener('click', prevStory);
        }
        
        // Initialize mobile timeline
        updateMobileTimeline();
    }
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