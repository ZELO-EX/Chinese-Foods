const slider = document.querySelector(".banner-slider");
const slides = document.querySelectorAll(".banner-slide");
const dots = document.querySelectorAll(".dot");

let slideIndex = 0;
const totalSlides = slides.length;

updateSlider();
let autoPlayInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

function changeSlide(n) {
    slideIndex += n;

    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }

    updateSlider();
    resetAutoPlay();
}

function currentSlide(n) {
    slideIndex = n - 1;
    updateSlider();
    resetAutoPlay();
}

function updateSlider() {
    slider.style.transform = `translateX(${-slideIndex * 100}%)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === slideIndex);
    });
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}
