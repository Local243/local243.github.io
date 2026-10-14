'use strict';

// --- Mobile navigation ------------------------------------------------------

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');

function setMenuOpen(open) {
    navMenu.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.querySelector('.visually-hidden').textContent = open ? 'Close menu' : 'Menu';
}

function initializeNavigation() {
    if (!header || !navToggle || !navMenu) {
        return;
    }

    navToggle.addEventListener('click', () => {
        setMenuOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close the menu after choosing a section, pressing Escape, or clicking elsewhere.
    navMenu.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
            setMenuOpen(false);
            navToggle.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (navMenu.classList.contains('is-open') && !header.contains(event.target)) {
            setMenuOpen(false);
        }
    });

}

// Highlight the menu item for the section currently on screen.
const navLinks = navMenu ? Array.from(navMenu.querySelectorAll('a[href^="#"]')) : [];
const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function updateCurrentSection() {
    if (!navSections.length) {
        return;
    }

    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    const line = window.innerHeight * 0.4;
    let current = navSections[0];

    if (atBottom) {
        current = navSections[navSections.length - 1];
    } else {
        navSections.forEach((section) => {
            if (section.getBoundingClientRect().top <= line) {
                current = section;
            }
        });
    }

    navLinks.forEach((link) => {
        if (link.getAttribute('href') === '#' + current.id) {
            link.setAttribute('aria-current', 'true');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

// --- Scroll effects ---------------------------------------------------------

function initializeScrollEffects() {
    const toTop = document.getElementById('to-top');
    let ticking = false;

    function update() {
        const y = window.scrollY;
        if (header) {
            header.classList.toggle('is-scrolled', y > 8);
        }
        if (toTop) {
            toTop.hidden = y < 700;
        }
        updateCurrentSection();
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    update();
}

// --- Stewards & Officers directory filter -----------------------------------

function initializeDirectory() {
    const search = document.getElementById('directory-search');
    const chips = Array.from(document.querySelectorAll('.chip[data-filter]'));
    const people = Array.from(document.querySelectorAll('.person'));
    const groups = Array.from(document.querySelectorAll('.directory-group'));
    const status = document.getElementById('directory-status');
    const empty = document.getElementById('directory-empty');

    if (!search || !people.length) {
        return;
    }

    let activeFilter = 'all';

    function matchesFilter(person) {
        if (activeFilter === 'all') {
            return true;
        }
        return person.dataset.unit === activeFilter || person.dataset.campus === activeFilter;
    }

    function apply() {
        const query = search.value.trim().toLowerCase();
        let shown = 0;

        people.forEach((person) => {
            const visible = matchesFilter(person) && person.textContent.toLowerCase().includes(query);
            person.hidden = !visible;
            if (visible) {
                shown += 1;
            }
        });

        groups.forEach((group) => {
            group.hidden = !group.querySelector('.person:not([hidden])');
        });

        empty.hidden = shown > 0;

        const filtered = query !== '' || activeFilter !== 'all';
        status.textContent = filtered
            ? `Showing ${shown} of ${people.length} people`
            : '';
    }

    search.addEventListener('input', apply);

    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            activeFilter = chip.dataset.filter;
            chips.forEach((other) => other.setAttribute('aria-pressed', String(other === chip)));
            apply();
        });
    });
}

// --- Small helpers ----------------------------------------------------------

function initializeExtras() {
    const year = document.getElementById('year');
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    const message = document.getElementById('contact_message');
    const count = document.getElementById('contact-count');
    if (message && count) {
        const max = message.maxLength;
        const updateCount = () => {
            count.textContent = `${message.value.length} / ${max}`;
        };
        message.addEventListener('input', updateCount);
        message.form.addEventListener('reset', () => window.setTimeout(updateCount));
        updateCount();
    }
}

initializeNavigation();
initializeScrollEffects();
initializeDirectory();
initializeExtras();

// --- Contact form -----------------------------------------------------------

// Keep the contact form unavailable until EmailJS has initialized and this
// submission handler has been registered. This prevents the form from falling
// back to an unsafe browser GET submission when JavaScript or EmailJS fails.
const contactForm = document.getElementById('contact-form');
const contactFields = document.getElementById('contact-fields');
const contactSubmit = document.getElementById('contact-submit');
const contactStatus = document.getElementById('contact-status');
let contactFormIsSubmitting = false;

function setContactStatus(message) {
    contactStatus.textContent = message;
}

function enableContactForm() {
    contactFields.disabled = false;
    contactSubmit.disabled = false;
    contactSubmit.textContent = 'Send a message to Local 243';
    setContactStatus('');
}

function disableContactForm(message) {
    contactFields.disabled = true;
    contactSubmit.disabled = true;
    contactSubmit.textContent = 'Contact form unavailable';
    setContactStatus(message);
}

async function handleContactSubmission(event) {
    event.preventDefault();

    if (contactFormIsSubmitting) {
        return;
    }

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    contactFormIsSubmitting = true;
    contactSubmit.disabled = true;
    contactSubmit.textContent = 'Sending…';
    setContactStatus('Sending your message…');

    try {
        await window.emailjs.sendForm(
            'service_dm6vibp',
            'template_08jj35i',
            contactForm
        );

        contactForm.reset();
        setContactStatus('Your message was sent successfully. Thank you.');
    } catch (error) {
        console.error('Contact form submission failed:', error);
        setContactStatus('Your message could not be sent. Please try again or email local243@gmail.com.');
    } finally {
        contactFormIsSubmitting = false;
        contactSubmit.disabled = false;
        contactSubmit.textContent = 'Send a message to Local 243';
    }
}

function initializeContactForm() {
    if (!contactForm || !contactFields || !contactSubmit || !contactStatus) {
        console.error('Contact form initialization failed: required page elements are missing.');
        return;
    }

    if (!window.emailjs || typeof window.emailjs.sendForm !== 'function') {
        disableContactForm('The contact form is temporarily unavailable. Please email local243@gmail.com.');
        return;
    }

    try {
        window.emailjs.init('Y4ZbNfQ9HCDyqlN-3');

        // Register the handler before enabling any form controls.
        contactForm.addEventListener('submit', handleContactSubmission);
        enableContactForm();
    } catch (error) {
        console.error('Email service initialization failed:', error);
        disableContactForm('The contact form is temporarily unavailable. Please email local243@gmail.com.');
    }
}

initializeContactForm();

/*
        async function loadUpdates() {
            try {
                const response = await fetch('./data/updates.json');
                const updates = await response.json();
                const updatesFeed = document.getElementById('updates-feed');
                updatesFeed.innerHTML = '';
                updates.forEach(update => {
                    const article = document.createElement('article');
                    article.classList.add('update');
                    article.innerHTML = `<h3>${update.date}</h3><p>${update.content}</p>`;
                    updatesFeed.appendChild(article);
                });
            } catch (error) {
                console.error('Error loading updates:', error);
            }
        }
*/
