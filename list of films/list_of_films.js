// Function to update the date and time
function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();

    const options = { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true 
    };
    const formattedDate = now.toLocaleDateString('en-US', options);
    
    dateTimeElement.textContent = `Current Date and Time: ${formattedDate}`;
}

setInterval(updateDateTime, 1000);

// Function to change the background color 
function changeBackgroundColor(color) {
    // Play sound
    const clickSound = document.getElementById('clickSound');
    clickSound.play();
    
    // Change background color
    document.body.style.backgroundColor = color;

    // 6 assignment
    localStorage.setItem('backgroundColor', color);
}

// local storage
document.addEventListener("DOMContentLoaded", () => {
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }
});

// 
document.getElementById('change-bg-btn').addEventListener('click', () => {
    const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#34495e', '#1abc9c', '#b6c2ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    changeBackgroundColor(randomColor);
});

//
document.addEventListener('keydown', (event) => {
    const clickSound = document.getElementById('clickSound');

    if (event.key === 'ArrowRight') {
        // 
        clickSound.play();
        changeBackgroundColor('#ff9999'); // Light red
    } else if (event.key === 'ArrowLeft') {
        //
        clickSound.play();
        changeBackgroundColor('#9999ff'); // Light blue
    }
});

// Sorting films
const filmList = document.querySelector('.film-list');
const sortBtn = document.getElementById('sort-btn');

//sort order (true for descending, false for ascending)
let isDescending = true;

// sort films and save order in local storage
function sortFilms() {
    const filmItems = Array.from(filmList.querySelectorAll('.film-item'));

    // Sort film items by year
    filmItems.sort((a, b) => {
        const yearA = parseInt(a.getAttribute('data-year'));
        const yearB = parseInt(b.getAttribute('data-year'));
        return isDescending ? yearB - yearA : yearA - yearB; // Toggle sort order
    });

    // Clear the film list and re-append sorted items
    filmItems.forEach(film => filmList.append(film));

    // 6 assignment local storage
    localStorage.setItem('sortedOrder', filmItems.map(film => film.getAttribute('data-year')).join(','));
}

// сортировка обнуляется когда нажимают повторно на кнопку
sortBtn.addEventListener('click', () => {
    sortFilms();
    isDescending = !isDescending; 
});

// Load sorted order from local storage 
document.addEventListener("DOMContentLoaded", () => {
    // проверяет, есть ли сохраненный порядок сортировки
    const sortedOrder = localStorage.getItem('sortedOrder');
    if (sortedOrder) {
        //создает массив годов из сохраненной строки
        const years = sortedOrder.split(',');
        const filmItems = Array.from(filmList.querySelectorAll('.film-item'));

        // sort films based on the saved order
        filmItems.sort((a, b) => years.indexOf(a.getAttribute('data-year')) - years.indexOf(b.getAttribute('data-year')));

        // обновляет DOM, чтобы отобразить фильмы в нужном порядке
        filmItems.forEach(film => filmList.append(film));
    }
});

// Rating system
document.querySelectorAll('.rating').forEach(ratingSection => {
    const stars = ratingSection.querySelectorAll('.star');
    const message = ratingSection.querySelector('.rating-message');

    // Function to set the rating
    function setRating(rating) {
        // Update the style for each star
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
        // сообщение после того как рейтинг отметили
        message.textContent = `You rated this ${rating} stars!`;
    }

    // рейтинг определяется при нажатии
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            setRating(rating);
        });
    });




    // Theme toggle functionality
    const themeToggle = document.getElementById('#theme-toggle');

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
const apiKey = '599a8672';
// Получаем элементы
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const movieDetails = document.getElementById('movie-details');

// Обработчик кнопки поиска
searchBtn.addEventListener('click', () => {
    const movieName = searchInput.value.trim();
    if (movieName) {
        searchMovie(movieName);
    } else {
        // Если строка пустая, скрыть контейнер с результатами
        movieDetails.style.display = 'none';
    }
});

// Функция для поиска фильма
function searchMovie(movieName) {
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovie(data);
            } else {
                movieDetails.innerHTML = `<p>Movie not found. Please try again.</p>`;
                movieDetails.style.display = 'block';
            }
        })
        .catch(error => {
            movieDetails.innerHTML = `<p>Error: ${error.message}</p>`;
            movieDetails.style.display = 'block';
        });
}

// Функция для отображения данных о фильме
function displayMovie(movie) {
    const htmlContent = `
        <div class="movie-info">
            <h2 class="movie-title">${movie.Title} (${movie.Year})</h2>
            <p class="movie-year"><strong>Year:</strong> ${movie.Year}</p>
            <p class="movie-rating"><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
            <p class="movie-plot"><strong>Plot:</strong> ${movie.Plot}</p>
        </div>
        <img src="${movie.Poster}" alt="${movie.Title}">
    `;
    movieDetails.innerHTML = htmlContent;
    movieDetails.style.display = 'flex'; // Показываем контейнер, если фильм найден
}