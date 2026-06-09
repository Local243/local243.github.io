(function() {
  emailjs.init("Y4ZbNfQ9HCDyqlN-3");
})();

  // Load updates on page load
 //       document.addEventListener('DOMContentLoaded', loadUpdates);

const banner = document.querySelector('#banner');

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const closeButton = document.querySelector('.hamburger-close');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('is-active');
    closeButton.style.display = navLinks.classList.contains('active') ? 'flex' : 'none';
}

// Handle Contact Form Submission

document.querySelector('.contact-form').addEventListener('submit', function(e) {
   e.preventDefault();

    /* uncomment in production */
       emailjs.sendForm('service_dm6vibp', 'template_08jj35i', this)
           .then(function(response) {
               alert('Email Sent! Thank you.');
           }, function(error) {
               alert('FAILED... Please try again.', error);
           }
       )
      document.getElementById("contact_name").reset();
	  document.getElementById("contact_email").reset();
	  document.getElementById("contact_message").reset();
	  
});

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