document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');

    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000;

    // Создаем индикаторы
    function createDots() {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    // Переход к конкретному слайду
    function goToSlide(slideIndex) {
        slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.slider-dot')[currentSlide].classList.remove('active');
        
        currentSlide = (slideIndex + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.slider-dot')[currentSlide].classList.add('active');
        
        resetTimer();
    }

    // Следующий слайд
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Предыдущий слайд
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Автопереключение
    function startTimer() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    // Инициализация
    function initSlider() {
        createDots();
        startTimer();
        
        // Обработчики событий
        nextArrow.addEventListener('click', nextSlide);
        prevArrow.addEventListener('click', prevSlide);
        
        // Остановка при наведении
        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startTimer);
    }

    initSlider();
});