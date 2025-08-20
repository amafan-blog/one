
// Smooth scrolling pour les liens de navigation
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

// Animation des cartes au scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.blog-card, .product-card');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < window.innerHeight - cardVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Initialiser les animations
function initAnimations() {
    const cards = document.querySelectorAll('.blog-card, .product-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Header fixe avec effet de transparence
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
}

// Compteur animé pour les statistiques (optionnel)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
}

// Effet de parallaxe léger sur le hero
function handleParallax() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Gestion du menu mobile (si ajouté plus tard)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
}

// Validation de formulaire simple (si ajouté plus tard)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#d1d5db';
        }
    });
    
    return isValid;
}

// Effet de typing pour le titre principal
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

// Gestion des boutons CTA avec analytics (optionnel)
function trackButtonClicks() {
    const ctaButtons = document.querySelectorAll('.btn-product');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const platform = this.textContent.includes('Amazon') ? 'Amazon' : 
                           this.textContent.includes('Shopify') ? 'Shopify' : 'System.io';
            
            // Ici vous pourriez ajouter votre code d'analytics
            console.log(`Clic sur le bouton ${platform}`);
            
            // Animation de feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    toggleMobileMenu();
    trackButtonClicks();
    
    // Event listeners
    window.addEventListener('scroll', () => {
        animateOnScroll();
        handleHeaderScroll();
        handleParallax();
    });
    
    // Animation initiale
    setTimeout(() => {
        animateOnScroll();
    }, 300);
});

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.log('Erreur détectée:', e.error);
});

// Performance et optimisation
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimiser les événements de scroll
const optimizedScroll = debounce(() => {
    animateOnScroll();
    handleHeaderScroll();
    handleParallax();
}, 16);

window.addEventListener('scroll', optimizedScroll);
