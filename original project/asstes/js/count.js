// بررسی پشتیبانی از Swiper
if (typeof Swiper === 'undefined') {
    // لود پلی‌فیل اگر Swiper وجود نداشت
    var script = document.createElement('script');
    script.src = '';
    document.head.appendChild(script);
}
// live graph
// گرفتن عنصر شمارنده با آیدی خاص
const counter = document.getElementById("counter");
let current = 0; // مقدار فعلی عدد
let isStablePhase = false; // آیا وارد فاز نوسانی شده‌ایم؟
let stableInterval; // شناسه‌ی تایمر

// تابع انیمیشن عدد از مقدار فعلی به مقدار هدف
function animateTo(target) {
    const duration = 800; // مدت زمان انیمیشن (ms)
    const start = current; // عدد شروع
    const startTime = performance.now(); // زمان شروع
}
// تابع داخلی برای آپدیت تدریجی مقدار
function update(now) {
    const progress = Math.min((now - startTime) / duration, 1); // درصد پیشرفت
    const value = Math.floor(start + (target - start) * progress); // محاسبه عدد فعلی
    counter.textContent = value; // نمایش عدد در DOM

    if (progress < 1) {
        requestAnimationFrame(update); // ادامه انیمیشن
    } else {
        current = target; // ذخیره مقدار نهایی
    }
}

requestAnimationFrame(update); // شروع انیمیشن


// تابعی برای گرفتن عدد جدید (شبیه‌سازی دریافت از سرور)
function fetchNewRoomCount() {
    if (isStablePhase) return; // اگر در حالت نوسانی هستیم، کاری نکن

    const newCount = 20; // شروع عدد با 20
    animateTo(newCount); // نمایش انیمیشنی عدد

    // پس از ۱.۲ ثانیه وارد فاز نوسانی می‌شویم
    setTimeout(() => {
        isStablePhase = true;
        startStableFluctuation();
    }, 1200);
}

// اجرای نوسان عدد بین ۲۰ تا ۳۵ به صورت آرام
function startStableFluctuation() {
    stableInterval = setInterval(() => {
        const direction = Math.random() > 0.5 ? 1 : -1; // جهت تغییر: بالا یا پایین
        const step = Math.floor(Math.random() * 2) + 1; // مقدار تغییر: 1 یا 2

        let next = current + direction * step; // محاسبه عدد بعدی

        // محدود کردن عدد بین 20 تا 35
        if (next < 20) next = 20;
        if (next > 35) next = 35;

        animateTo(next); // انیمیشن تا عدد جدید
    }, 10000); // هر ۱۰ ثانیه یک‌بار
}

// شروع اولیه شمارنده ساده
fetchNewRoomCount();


// تابع عمومی برای ایجاد شمارنده با بازه قابل تنظیم
function createFluctuatingCounter(counterId, startValue, min, max) {
    const counterEl = document.getElementById(counterId); // گرفتن عنصر شمارنده با ID
    let current = 0; // مقدار فعلی

    // انیمیشن عدد به مقدار جدید
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

    // تابع نوسان عدد بین min و max
    function startFluctuation() {
        setInterval(() => {
            const direction = Math.random() > 0.5 ? 1 : -1; // بالا یا پایین
            const step = Math.floor(Math.random() * 2) + 1; // تغییر 1 یا 2 واحدی
            let next = current + direction * step;

            // جلوگیری از خروج از بازه
            if (next < min) next = min;
            if (next > max) next = max;

            animateTo(next);
        }, 10000); // نوسان هر ۱۰ ثانیه
    }

    animateTo(startValue); // مقدار اولیه

    // بعد از ۱.۲ ثانیه شروع نوسان
    setTimeout(() => {
        startFluctuation();
    }, 1200);
}
// شمارنده اول: از 20 شروع، بین 20 تا 35 نوسان
createFluctuatingCounter("counter1", 20, 20, 35);

// شمارنده دوم: از 40 شروع، بین 40 تا 65 نوسان
createFluctuatingCounter("counter2", 40, 40, 65);

// شمارنده سوم: از 50 شروع، بین 50 تا 70 نوسان
createFluctuatingCounter("counter3", 50, 50, 70);

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

