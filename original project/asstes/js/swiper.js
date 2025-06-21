document.addEventListener("DOMContentLoaded", function (e) {
    new Swiper(".swiper", {
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        fadeEffect: {
            crossFade: true,
        },
    });
});