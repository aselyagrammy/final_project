document.addEventListener("DOMContentLoaded", function() {
    // Display greeting based on the time of day
    function displayGreeting() {
        const now = new Date();
        const hours = now.getHours();
        let greeting;

        if (hours < 12) {
            greeting = "Good Morning!";
        } else if (hours < 18) {
            greeting = "Good Afternoon!";
        } else {
            greeting = "Good Evening!";
        }

        document.getElementById('greeting').innerHTML = `<h2>${greeting}</h2>`;
    }
    displayGreeting(); // зовем гритинг

    // FAQ 
    const faqs = document.querySelectorAll('.faq');
    faqs.forEach(faq => {
        const question = faq.querySelector('.question');
        question.addEventListener('click', () => {
            faq.classList.toggle('active');
        });
    });

    // Popup contact form
    const popup = document.getElementById('popup');
    const openPopupBtn = document.getElementById('openPopup');
    const closePopupBtn = document.getElementById('closePopup');

    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    

    // Form submit
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                formMessage.textContent = "Thank you! Your message has been sent.";
                formMessage.style.color = "green";
            } else {
                formMessage.textContent = "Oops! Something went wrong. Please try again.";
                formMessage.style.color = "red";
            }
        } catch (error) {
            formMessage.textContent = "An error occurred. Please try again later.";
            formMessage.style.color = "red";
        }
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');

    // Apply dark theme if saved in local storage
    if (localStorage.getItem('theme') === 'dark') {
        applyDarkTheme(true);
        themeToggle.checked = true;
    }

    // Toggle dark theme on switch change
    themeToggle.addEventListener('change', () => {
        const isDark = themeToggle.checked;
        applyDarkTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Function to apply dark theme
    function applyDarkTheme(enable) {
        document.body.classList.toggle('dark', enable);

        // List of elements to apply the dark theme
        const elementsToToggle = [
            document.querySelector('header'),
            document.querySelector('footer'),
            ...document.querySelectorAll('nav a'),
            document.querySelector('.intro'),
            document.querySelector('table'),
            ...document.querySelectorAll('.watch-button')
        ];

        elementsToToggle.forEach(el => {
            if (el) el.classList.toggle('dark', enable);
        });
    }
});
