// Хешировать пароль на фронте нет смысла, если она умеет открывать DevTools, 
// но для базовой логики пока зашьем простую строку.
const SECRET_PASSWORD = "dol"; // Замени на ваш пароль

const authScreen = document.getElementById('auth-screen');
const bookScreen = document.getElementById('book-screen');
const passwordInput = document.getElementById('password-input');
const unlockBtn = document.getElementById('unlock-btn');
const errorMsg = document.getElementById('error-message');

const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageCounter = document.getElementById('page-counter');

let currentPage = 1;
const totalPages = pages.length;

// Логика разблокировки
unlockBtn.addEventListener('click', () => {
    if (passwordInput.value === SECRET_PASSWORD) {
        authScreen.classList.remove('active');
        bookScreen.classList.add('active');
    } else {
        errorMsg.textContent = "Неверный код. Попробуй еще раз ❤️";
        passwordInput.value = "";
    }
});

// Навигация по страницам
function updateBook() {
    pages.forEach(page => {
        page.classList.remove('active-page');
        if (parseInt(page.dataset.page) === currentPage) {
            page.classList.add('active-page');
        }
    });

    pageCounter.textContent = `${currentPage} / ${totalPages}`;
    
    // Блокировка кнопок на крайних страницах
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updateBook();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateBook();
    }
});



// =========== BTN ================

const btnYes = document.querySelector('.btn-yes');
const btnNo = document.querySelector('.btn-no');
const finalPageContent = document.querySelector('[data-page="3"] .page-content');

// Функция создания следа (частиц)
function createTrail(x, y) {
    // Создаем 5 маленьких частиц на месте исчезновения кнопки
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        particle.textContent = '💔'; // Можно заменить на '✨' или '🎈'
        
        // Ставим частицу точно туда, где была кнопка
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Задаем случайное направление вылета для анимации через CSS переменные
        const moveX = (Math.random() - 0.5) * 100; // влево или вправо на 50px
        const moveY = (Math.random() - 0.5) * 100; // вверх или вниз на 50px
        particle.style.setProperty('--mx', `${moveX}px`);
        particle.style.setProperty('--my', `${moveY}px`);

        document.body.appendChild(particle);

        // Удаляем элемент из DOM после окончания анимации
        setTimeout(() => particle.remove(), 800);
    }
}

// Функция побега по всему экрану
function moveButton(e) {
    // Получаем текущие координаты кнопки перед прыжком для создания следа
    const rect = btnNo.getBoundingClientRect();
    const oldX = rect.left + rect.width / 2;
    const oldY = rect.top + rect.height / 2;

    // Включаем fixed, чтобы кнопка летала независимо от разметки книги
    btnNo.style.position = 'fixed';

    // Вычисляем случайные координаты по всему экрану (минусуем размеры кнопки с запасом)
    const padding = 50;
    const randomX = Math.floor(Math.random() * (window.innerWidth - rect.width - padding)) + padding/2;
    const randomY = Math.floor(Math.random() * (window.innerHeight - rect.height - padding)) + padding/2;

    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;

    // Создаем спецэффект следа
    createTrail(oldX, oldY);
}

// Перехватываем любые попытки взаимодействия
btnNo.addEventListener('mouseover', moveButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});
btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
});

// Победный финал
btnYes.addEventListener('click', () => {
    // Если кнопка "Нет" успела улететь куда-то на экран, прячем её насовсем
    btnNo.style.display = 'none';

    finalPageContent.innerHTML = `
        <h3 style="font-size: 50px; margin-bottom: 15px; animation: pulse 1s infinite;">❤️</h3>
        <h3>Я знал, что ты согласишься!</h3>
        <p style="margin-top: 15px; font-size: 18px;">У тебя отличный вкус. Загляни в телефон, я скоро напишу тебе... 🥰</p>
    `;
    document.querySelector('.book-controls').style.display = 'none';
});