
document.addEventListener("DOMContentLoaded", function() {
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