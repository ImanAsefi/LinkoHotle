//Slider
document.addEventListener("DOMContentLoaded", function () {
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
// live graph
const counter = document.getElementById("counter");
let current = 0;
let isStablePhase = false;
let stableInterval;

// انیمیشن عدد از current به target
function animateTo(target) {
    const duration = 800;
    const start = current;
    const startTime = performance.now();

    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + (target - start) * progress);
        counter.textContent = value;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            current = target;
        }
    }

    requestAnimationFrame(update);
}

// شبیه‌سازی عدد جدید از سرور
function fetchNewRoomCount() {
    if (isStablePhase) return;

    const newCount = 20; // به عدد 20 برسیم، بعدش وارد فاز پایداری می‌شیم
    animateTo(newCount);

    // بعد از رسیدن به عدد 20، وارد فاز تغییر نرم بین 20 تا 35 می‌شیم
    setTimeout(() => {
        isStablePhase = true;
        startStableFluctuation();
    }, 1200);
}

// اجرای تغییرات نرم بین 20 تا 35
function startStableFluctuation() {
    stableInterval = setInterval(() => {
        const direction = Math.random() > 0.5 ? 1 : -1;
        const step = Math.floor(Math.random() * 2) + 1; // 1 یا 2
        let next = current + direction * step;

        // محدود کردن بین 20 تا 35
        if (next < 20) next = 20;
        if (next > 35) next = 35;

        animateTo(next);
    }, 10000); 
}

// شروع اولیه
fetchNewRoomCount();

// تابع ساخت شمارنده نوسانی عمومی
function createFluctuatingCounter(counterId, startValue, min, max) {
    const counterEl = document.getElementById(counterId);
    let current = 0;
    let isStable = false;

    function animateTo(target) {
        const duration = 800;
        const start = current;
        const startTime = performance.now();

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(start + (target - start) * progress);
            counterEl.textContent = value;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                current = target;
            }
        }

        requestAnimationFrame(update);
    }

    function startFluctuation() {
        setInterval(() => {
            const direction = Math.random() > 0.5 ? 1 : -1;
            const step = Math.floor(Math.random() * 2) + 1; // 1 یا 2
            let next = current + direction * step;
            if (next < min) next = min;
            if (next > max) next = max;
            animateTo(next);
        }, 10000);
    }

    // شروع اولیه با مقدار startValue
    animateTo(startValue);

    setTimeout(() => {
        isStable = true;
        startFluctuation();
    }, 1200);
}

// ایجاد دو شمارنده
createFluctuatingCounter("counter1", 20, 20, 35);
createFluctuatingCounter("counter2", 40, 40, 65);

function createFluctuatingCounter(counterId, startValue, min, max) {
    const counterEl = document.getElementById(counterId);
    let current = 0;

    function animateTo(target) {
        const duration = 800;
        const start = current;
        const startTime = performance.now();

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(start + (target - start) * progress);
            counterEl.textContent = value;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                current = target;
            }
        }

        requestAnimationFrame(update);
    }

    function startFluctuation() {
        setInterval(() => {
            const direction = Math.random() > 0.5 ? 1 : -1;
            const step = Math.floor(Math.random() * 2) + 1;
            let next = current + direction * step;
            if (next < min) next = min;
            if (next > max) next = max;
            animateTo(next);
        }, 10000);
    }

    animateTo(startValue);

    setTimeout(() => {
        startFluctuation();
    }, 1200);
}

// ایجاد ۳ شمارنده مجزا
createFluctuatingCounter("counter1", 20, 20, 35);   
createFluctuatingCounter("counter2", 40, 40, 65);   
createFluctuatingCounter("counter3", 50, 50, 70);  