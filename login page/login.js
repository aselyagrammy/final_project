// Получаем элементы
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const resetButton = document.getElementById('reset-button');
const logoutButton = document.getElementById('logout-button');
const formTitle = document.getElementById('form-title');
const submitButton = document.getElementById('submit-button');
const emailInput = document.getElementById('email-input');
const password2Input = document.getElementById('password2-input');
const goToIndexButton = document.getElementById('go-to-index-button');

// Проверяем, авторизован ли пользователь
if (localStorage.getItem('user')) {
    showLogoutState();
}

// Обработчик отправки формы (регистрация)
form.addEventListener('submit', e => {
    //предотвращает стандартное поведение формы (перезагрузку страницы)
    e.preventDefault();
    //проверяет правильность введенных данных
    if (validateInputs()) {
        const userData = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        // Сохраняем данные пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        alert('User registered successfully!');
        showLogoutState();

        // Показываем кнопку перехода на главную страницу
        goToIndexButton.style.display = 'block';
    }
});

// Обработчик выхода
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    showLoginState();
});

// Обработчик сброса формы
resetButton.addEventListener('click', () => {
    form.reset();
    resetValidationStyles();
});

// Обработчик кнопки перехода на главную
goToIndexButton.addEventListener('click', () => {
    window.location.href = 'profile.html';
});

// Функция для валидации полей
function validateInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    let isValid = true;

    // Проверка имени пользователя
    if (usernameValue === '') {
        setError(username, 'Username is required');
        isValid = false;
    } else {
        setSuccess(username);
    }

    // Проверка email
    if (emailInput.style.display !== 'none') {
        if (emailValue === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
            isValid = false;
        } else {
            setSuccess(email);
        }
    }

    // Проверка пароля
    if (passwordValue === '') {
        setError(password, 'Password is required');
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        setSuccess(password);
    }

    // Проверка повторного ввода пароля
    if (password2Input.style.display !== 'none') {
        if (password2Value === '') {
            setError(password2, 'Please confirm your password');
            isValid = false;
        } else if (password2Value !== passwordValue) {
            setError(password2, "Passwords don't match");
            isValid = false;
        } else {
            setSuccess(password2);
        }
    }

    return isValid;
}

// Утилиты для отображения ошибок и успеха
function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

// Проверка валидности email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Сброс стилей валидации
function resetValidationStyles() {
    const inputControls = document.querySelectorAll('.input-control');
    inputControls.forEach(inputControl => {
        inputControl.classList.remove('error', 'success');
        inputControl.querySelector('.error').innerText = '';
    });
}

// Показ состояния авторизации
function showLogoutState() {
    const userData = JSON.parse(localStorage.getItem('user'));
    username.value = userData.username;
    emailInput.style.display = 'none';
    password2Input.style.display = 'none';
    formTitle.innerText = `Welcome, ${userData.username}`;
    submitButton.style.display = 'none';
    logoutButton.style.display = 'block';
}

// Показ состояния регистрации (неавторизованный пользователь)
function showLoginState() {
    emailInput.style.display = 'block';
    password2Input.style.display = 'block';
    formTitle.innerText = 'Registration';
    submitButton.style.display = 'block';
    logoutButton.style.display = 'none';
    goToIndexButton.style.display = 'none';
}
