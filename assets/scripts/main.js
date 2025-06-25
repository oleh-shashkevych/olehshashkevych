document.addEventListener('DOMContentLoaded', function () {
    // Header after scroll
    window.addEventListener('scroll', function () {
        const headerInner = document.querySelector('.header__inner');
        if (window.pageYOffset > 0) {
            headerInner.classList.add('scrolled');
        } else {
            headerInner.classList.remove('scrolled');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Hero parallax
    document.addEventListener('mousemove', function (e) {
        const maxOffset = 15;
        const x = (e.clientX / window.innerWidth - 0.5) * 2 * maxOffset;
        const y = (e.clientY / window.innerHeight - 0.5) * 2 * maxOffset;
        document.querySelector('.hero__background').style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // About heading animation
    const textContainer = document.getElementById('animated-text');
    const words = textContainer.dataset.words.split(',');
    let wordIndex = 0;

    function animateWord() {
        const currentWord = words[wordIndex];
        textContainer.textContent = '';

        Array.from(currentWord).forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.animation = `letterEntry 0.6s ${index * 0.1}s forwards, letterExit 0.6s ${currentWord.length * 0.1 + 2 + (currentWord.length - 1 - index) * 0.1}s forwards`;
            textContainer.appendChild(span);
        });

        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(animateWord, (currentWord.length * 0.2 + 4) * 1000);
    }

    animateWord();
});

document.addEventListener('DOMContentLoaded', function () {
    // Work slider
    const sliderWrapper = document.querySelector('.work__slider');
    if (!sliderWrapper) return;

    const items = sliderWrapper.querySelectorAll('.work__slider-item');
    const nextItem = sliderWrapper.querySelector('.next');
    const previousItem = sliderWrapper.querySelector('.prev');
    const scrollbar = document.querySelector('.work__scrollbar-inner > div');

    let currentIndex = 0;
    let startTouchPosition = null;

    function updateButtons() {
        previousItem.disabled = currentIndex === 0;
        nextItem.disabled = currentIndex === items.length - 1;

        previousItem.classList.toggle('disabled', currentIndex === 0);
        nextItem.classList.toggle('disabled', currentIndex === items.length - 1);
    }

    function updateImages() {
        items.forEach((item, index) => {
            const img = item.querySelector('img');
            if (index < currentIndex) {
                img.style.objectPosition = `${50 - 15 * (currentIndex - index)}% center`;
            } else if (index > currentIndex) {
                img.style.objectPosition = `${50 + 15 * (index - currentIndex)}% center`;
            } else {
                img.style.objectPosition = '50% center';
            }
        });
    }

    function updateScrollbar() {
        const width = (currentIndex / (items.length - 1)) * 100;
        scrollbar.style.width = `${width}%`;
    }

    function slideNext() {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            items.forEach((item, index) => {
                item.style.transform = `translateX(${-1 * (item.offsetWidth + 24) * currentIndex}px)`;
            });
        }
        updateButtons();
        updateImages();
        updateScrollbar();
    }

    function slidePrevious() {
        if (currentIndex > 0) {
            currentIndex--;
            items.forEach((item, index) => {
                item.style.transform = `translateX(${-1 * (item.offsetWidth + 24) * currentIndex}px)`;
            });
        }
        updateButtons();
        updateImages();
        updateScrollbar();
    }

    function handleTouchStart(e) {
        startTouchPosition = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        if (!startTouchPosition) {
            return;
        }

        var endTouchPosition = e.changedTouches[0].clientX;
        var diff = startTouchPosition - endTouchPosition;

        if (diff > 25) {
            slideNext();
        } else if (diff < -25) {
            slidePrevious();
        }

        startTouchPosition = null;
    }

    nextItem.addEventListener('click', slideNext);
    previousItem.addEventListener('click', slidePrevious);
    sliderWrapper.addEventListener('touchstart', handleTouchStart);
    sliderWrapper.addEventListener('touchend', handleTouchEnd);

    // Установка начального слайда и изображений
    updateButtons();
    updateImages();
    updateScrollbar();
});

document.addEventListener('DOMContentLoaded', function () {
    // Звезды в отзывах
    var canvas = document.getElementById('testimonialsSky');
    var ctx = canvas.getContext('2d');

    // Размеры canvas должны соответствовать размерам секции
    canvas.width = document.getElementById('testimonials').offsetWidth;
    canvas.height = document.getElementById('testimonials').offsetHeight;

    var stars = []; // Массив для хранения звезд
    var numStars = 100; // Количество звезд

    // Создаем звезды
    for (var i = 0; i < numStars; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * 1.5;
        var directionX = Math.random() * 2 - 1; // Направление движения по оси X
        var directionY = Math.random() * 2 - 1; // Направление движения по оси Y
        stars.push({ x: x, y: y, radius: radius, speed: Math.random() * 0.025 + 0.01, directionX: directionX, directionY: directionY, counter: 0, maxCounter: Math.random() * 200 + 100 });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas

        for (var i = 0; i < numStars; i++) {
            var star = stars[i];
            star.counter++;
            if (star.counter > star.maxCounter) { // Если звезда прожила свою жизнь
                star.x = Math.random() * canvas.width; // Начинаем с новой случайной позиции
                star.y = Math.random() * canvas.height; // Начинаем с новой случайной позиции
                star.directionX = (Math.random() * 2 - 1) / 10; // Новое направление движения по оси X
                star.directionY = (Math.random() * 2 - 1) / 10; // Новое направление движения по оси Y
                star.counter = 0;
                star.maxCounter = Math.random() * 200 + 100;
            }
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            var alpha = Math.min(star.counter / 100, 1); // Плавное появление звезды
            alpha = Math.min((star.maxCounter - star.counter) / 100, alpha); // Плавное исчезновение звезды
            // Проверяем, есть ли у body класс 'light-theme'
            if (document.body.classList.contains('light-theme')) {
                ctx.fillStyle = 'rgba(25, 105, 255, ' + alpha + ')';
            } else {
                ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
            }
            ctx.fill();
            star.x += star.directionX; // Добавляем направление движения к x
            star.y += star.directionY; // Добавляем направление движения к y
        }

        requestAnimationFrame(animate);
    }

    animate();
});

document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.services__grid-item');

    items.forEach(item => {
        const cursor = item.querySelector('.services__grid-cursor');

        document.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            if (e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom) {
                cursor.style.top = (e.clientY - rect.top - 250) + 'px';
                cursor.style.left = (e.clientX - rect.left - 250) + 'px';
            }
        })
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const matrixCanvas = document.getElementById('sourceMatrix');
    const matrixCtx = matrixCanvas.getContext('2d');

    matrixCanvas.height = window.innerHeight;
    matrixCanvas.width = window.innerWidth;

    const matrixSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()";
    const matrixColumns = matrixCanvas.width / 18; // каждый символ будет иметь ширину 15px
    const matrixDrops = [];

    for(let i = 0; i < matrixColumns; i++)
        matrixDrops[i] = 1; 

    function drawMatrixEffect() {
        // Проверяем, есть ли у body класс 'light-theme'
        if (document.body.classList.contains('light-theme')) {
            matrixCtx.fillStyle = 'rgba(249, 255, 254, 0.05)'; // прозрачность для эффекта трейлов
        } else {
            matrixCtx.fillStyle = 'rgba(9, 6, 24, 0.05)'; // прозрачность для эффекта трейлов
        }
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height); // заполнение холста

        matrixCtx.fillStyle = '#1969ff'; // цвет символов
        matrixCtx.font = '16px "Inter"'; // шрифт

        for(let i = 0; i < matrixDrops.length; i++) {
            const text = matrixSymbols[Math.floor(Math.random() * matrixSymbols.length)];
            matrixCtx.fillText(text, i * 18, matrixDrops[i] * 18); // рисование текста

            if(matrixDrops[i] * 18 > matrixCanvas.height && Math.random() > 0.975)
                matrixDrops[i] = 0;

            matrixDrops[i]++;
        }
    }

    setInterval(drawMatrixEffect, 40);
});


document.addEventListener('DOMContentLoaded', function () {
    const burgerToggle = document.getElementById('mobile-burger-toggle');
    const mobileNav = document.querySelector('.header__mobile');
    const headerBg = document.querySelector('.header__bg');
    const body = document.body;
    const navLinksMobile = mobileNav.querySelectorAll('a');

    burgerToggle.addEventListener('click', function () {
        mobileNav.classList.toggle('active');
        headerBg.classList.toggle('active');
        burgerToggle.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    navLinksMobile.forEach(link => {
        link.addEventListener('click', function () {
            mobileNav.classList.remove('active');
            headerBg.classList.remove('active');
            burgerToggle.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const themeButtons = document.querySelectorAll('.header__theme');

    // SVG для темной темы
    const darkThemeSvg = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="5" stroke="#f9fffe" stroke-width="1.5"></circle> <path d="M12 2V4" stroke="#f9fffe" stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 20V22" stroke="#f9fffe" stroke-width="1.5" stroke-linecap="round"></path> <path d="M4 12L2 12" stroke="#f9fffe" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12L20 12" stroke="#f9fffe" stroke-width="1.5" stroke-linecap="round"></path> <path d="M19.7778 4.22266L17.5558 6.25424" stroke="#f9fffe" stroke-width="1.5" stroke-linecap="round"></path> <path d="M4.22217 4.22266L6.44418 6.25424" stroke="#f9fffe" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6.44434 17.5557L4.22211 19.7779" stroke="#f9fffe" stroke-width="1.5" stroke-linecap="round"></path> <path d="M19.7778 19.7773L17.5558 17.5551" stroke="#f9fffe" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>';

    // SVG для светлой темы
    const lightThemeSvg = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z" fill="#090618"></path> </g></svg>';

    // Проверяем, есть ли куки с темой
    const theme = document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if (theme === 'light') {
        document.body.classList.add('light-theme');
        themeButtons.forEach(function(themeButton) {
            themeButton.innerHTML = lightThemeSvg;
        });
    } else if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        themeButtons.forEach(function(themeButton) {
            themeButton.innerHTML = darkThemeSvg;
        });
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-theme');
        themeButtons.forEach(function(themeButton) {
            themeButton.innerHTML = lightThemeSvg;
        });
    }

    themeButtons.forEach(function(themeButton) {
        themeButton.addEventListener('click', function() {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.remove('light-theme');
                themeButton.innerHTML = darkThemeSvg; // Меняем SVG на темную тему
                document.cookie = "theme=dark; max-age=86400; path=/";
            } else {
                document.body.classList.add('light-theme');
                themeButton.innerHTML = lightThemeSvg; // Меняем SVG на светлую тему
                document.cookie = "theme=light; max-age=86400; path=/";
            }
        });
    });
});

// JavaScript
$(window).on('load', function() { // makes sure the whole site is loaded 
    $('#preloader').addClass('hide'); // adds the 'hide' class to the preloader
})  