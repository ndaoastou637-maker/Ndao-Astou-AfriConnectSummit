// ============================================
// DARK MODE / LIGHT MODE
// ============================================

// On récupère le bouton toggle et l'élément <html>
const themeToggleBtns = document.querySelectorAll('.theme-toggle');
const htmlElement = document.documentElement;

// Au chargement de la page : on vérifie si un thème est déjà enregistré
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
}

// Fonction qui bascule le thème
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        // On repasse en mode clair
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        // On passe en mode sombre
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// On écoute le clic sur le(s) bouton(s) toggle
themeToggleBtns.forEach(function(btn) {
    btn.addEventListener('click', toggleTheme);
});
// ============================================
// NAVBAR DYNAMIQUE AU SCROLL
// ============================================
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// BOUTON RETOUR EN HAUT
// ============================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// ANNÉE DYNAMIQUE DANS LE FOOTER
// ============================================
const yearSpan = document.getElementById('current-year');
yearSpan.textContent = new Date().getFullYear();
// ============================================
// ANIMATIONS AU SCROLL (IntersectionObserver)
// ============================================

// On sélectionne toutes les sections qu'on veut animer à l'apparition
const animatedElements = document.querySelectorAll(
    '.why-item, .stat-item, .speaker-card, .theme-card, .sponsor-level'
);

// Options de l'observer : déclenche quand 15% de l'élément est visible
const observerOptions = {
    threshold: 0.15
};

// Fonction appelée à chaque fois qu'un élément observé change de visibilité
function handleIntersection(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            // Une fois animé, on arrête de l'observer (évite de répéter l'animation)
            observer.unobserve(entry.target);
        }
    });
}

// Création de l'observer
const scrollObserver = new IntersectionObserver(handleIntersection, observerOptions);

// On demande à l'observer de surveiller chaque élément
animatedElements.forEach(function(element) {
    element.classList.add('fade-in-hidden');
    scrollObserver.observe(element);
});
// ============================================
// ONGLETS DU PROGRAMME
// ============================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const targetDay = button.getAttribute('data-day');

        // On retire "active" de TOUS les boutons, puis on l'ajoute seulement au bouton cliqué
        tabButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // On retire "active" de TOUS les contenus, puis on l'ajoute seulement à celui qui correspond
        tabContents.forEach(function(content) {
            content.classList.remove('active');
        });
        document.getElementById(targetDay).classList.add('active');
    });
});
// ============================================
// FILTRAGE DYNAMIQUE DES INTERVENANTS
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const speakerCards = document.querySelectorAll('.speaker-card[data-category]');

filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const selectedFilter = button.getAttribute('data-filter');

        // Mise en évidence du bouton actif
        filterButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Affichage/masquage des cartes selon la thématique choisie
        speakerCards.forEach(function(card) {
            const cardCategory = card.getAttribute('data-category');

            if (selectedFilter === 'tous' || cardCategory === selectedFilter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
// ============================================
// MENU HAMBURGER MOBILE
// ============================================
const hamburgerBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburgerBtn.addEventListener('click', function() {
    navLinks.classList.toggle('mobile-open');
});
// ============================================
// COMPTE À REBOURS (jusqu'à la conférence)
// ============================================

// Date cible : 12 novembre 2026, 09h00
const targetDate = new Date('2026-11-12T09:00:00').getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// On ne lance le compte à rebours QUE si ces éléments existent sur la page
// (utile car cette section n'est présente que sur index.html)
if (daysEl && hoursEl && minutesEl && secondsEl) {

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Si la date est déjà passée, on affiche 0 partout et on arrête
        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            clearInterval(countdownInterval);
            return;
        }

        // Calcul des jours/heures/minutes/secondes restants
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // padStart(2, '0') ajoute un zéro devant si le nombre est < 10 (ex: "7" devient "07")
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Premier appel immédiat (sinon on attendrait 1s avant le premier affichage)
    updateCountdown();

    // Puis mise à jour toutes les secondes
    const countdownInterval = setInterval(updateCountdown, 1000);
}
// ============================================
// COMPTEURS ANIMÉS DES STATS (au scroll)
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 1500; // durée totale de l'animation en ms
    const stepTime = 30; // on met à jour toutes les 30ms
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    let current = 0;

    const counterInterval = setInterval(function() {
        current += increment;

        if (current >= target) {
            element.textContent = target;
            clearInterval(counterInterval);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

function handleStatIntersection(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}

const statsObserver = new IntersectionObserver(handleStatIntersection, { threshold: 0.5 });

statNumbers.forEach(function(number) {
    statsObserver.observe(number);
});
// ============================================
// VALIDATION DU FORMULAIRE D'INSCRIPTION
// ============================================
const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {

    registrationForm.addEventListener('submit', function(event) {
        // On empêche l'envoi réel du formulaire (pas de backend ici)
        event.preventDefault();

        let isFormValid = true;

        // --- Validation Nom complet ---
        const fullname = document.getElementById('fullname');
        const fullnameError = document.getElementById('fullname-error');

        if (fullname.value.trim() === '') {
            fullnameError.textContent = 'Ce champ est requis.';
            fullname.style.borderColor = 'var(--color-secondary)';
            isFormValid = false;
        } else {
            fullnameError.textContent = '';
            fullname.style.borderColor = '#4CAF50';
        }

        // --- Validation Email (regex) ---
        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value.trim())) {
            emailError.textContent = 'Adresse email invalide.';
            email.style.borderColor = 'var(--color-secondary)';
            isFormValid = false;
        } else {
            emailError.textContent = '';
            email.style.borderColor = '#4CAF50';
        }

        // --- Validation Téléphone (minimum 8 chiffres) ---
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        const phoneDigitsOnly = phone.value.replace(/\D/g, ''); // enlève tout sauf les chiffres

        if (phoneDigitsOnly.length < 8) {
            phoneError.textContent = 'Numéro invalide (minimum 8 chiffres).';
            phone.style.borderColor = 'var(--color-secondary)';
            isFormValid = false;
        } else {
            phoneError.textContent = '';
            phone.style.borderColor = '#4CAF50';
        }

        // --- Validation Type de participation ---
        const participation = document.getElementById('participation');
        const participationError = document.getElementById('participation-error');

        if (participation.value === '') {
            participationError.textContent = 'Veuillez choisir une option.';
            participation.style.borderColor = 'var(--color-secondary)';
            isFormValid = false;
        } else {
            participationError.textContent = '';
            participation.style.borderColor = '#4CAF50';
        }

        // --- Validation Pays ---
        const country = document.getElementById('country');
        const countryError = document.getElementById('country-error');

        if (country.value === '') {
            countryError.textContent = 'Veuillez choisir un pays.';
            country.style.borderColor = 'var(--color-secondary)';
            isFormValid = false;
        } else {
            countryError.textContent = '';
            country.style.borderColor = '#4CAF50';
        }

        // --- Validation Message (minimum 20 caractères) ---
        const message = document.getElementById('message');
        const messageError = document.getElementById('message-error');

        if (message.value.trim().length < 20) {
            messageError.textContent = 'Minimum 20 caractères requis.';
            message.style.borderColor = 'var(--color-secondary)';
            isFormValid = false;
        } else {
            messageError.textContent = '';
            message.style.borderColor = '#4CAF50';
        }

        // --- Si tout est valide : message de succès + reset du formulaire ---
        if (isFormValid) {
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('visible');

            registrationForm.reset();

            // On enlève les bordures vertes après reset
            [fullname, email, phone, participation, country, message].forEach(function(field) {
                field.style.borderColor = '';
            });

            // On cache le message de succès après 4 secondes
            setTimeout(function() {
                successMessage.classList.remove('visible');
            }, 4000);
        }
    });

}