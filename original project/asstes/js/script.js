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
// بررسی پشتیبانی از Swiper
if (typeof Swiper === 'undefined') {
  // لود پلی‌فیل اگر Swiper وجود نداشت
  var script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js';
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
}

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

<<<<<<< HEAD
// شمارنده سوم: از 50 شروع، بین 50 تا 70 نوسان
createFluctuatingCounter("counter3", 50, 50, 70);

=======
>>>>>>> 19b2df7cc3ad2a68c29e2ea989adb7857b87c3f3
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


// اعتبار سنجی در دریافت


// انتخاب فرم ثبت‌نام و اضافه کردن گوش‌دهنده برای رویداد submit
// گوش دادن به ارسال فرم ثبت‌نام
document.querySelector('.form').addEventListener('submit', function (e) {
    e.preventDefault(); // جلوگیری از رفتار پیش‌فرض (ارسال فرم)

    // گرفتن مقادیر ورودی‌ها
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // بررسی نام و نام خانوادگی
    if (name.value.trim() === '') {
        Swal.fire({
            icon: "error",
            title: "خطا",
            text: "لطفاً نام و نام خانوادگی را وارد کنید!",
            confirmButtonText: "باشه"
        });
        name.focus();
        return;
    }

    // بررسی ایمیل
    if (!email.value.includes('@') || email.value.trim() === '') {
        Swal.fire({
            icon: "error",
            title: "خطا",
            text: "لطفاً یک ایمیل معتبر وارد کنید!",
            confirmButtonText: "باشه"
        });
        email.focus();
        return;
    }

    if (password.value.trim() === "") {
    Swal.fire({
        icon: "error",
        title: "خطا",
        text: "لطفاً رمز عبور را وارد کنید!",
        confirmButtonText: "باشه"
    }); // پیشنهاد: فوکوس روی فیلد برای تجربه کاربری بهتر
    return;
}

    // بررسی رمز عبور
    if (password.value.trim().length < 6) {
        Swal.fire({
            icon: "error",
            title: "خطا",
            text: "رمز عبور باید حداقل ۶ کاراکتر باشد!",
            confirmButtonText: "باشه"
        });
        password.focus();
        return;
    }
    
    // نمایش پیام موفقیت
    Swal.fire({
        icon: "success",
        title: "موفقیت",
        text: "ثبت‌نام با موفقیت انجام شد!",
        confirmButtonText: "ادامه"
    }).then(() => {
        // بعد از تأیید پیام، انتقال به صفحه اصلی
        window.location.href = 'index.html';
    });
});


// انتخاب فرم ورود و اضافه کردن گوش‌دهنده برای رویداد submit
document.querySelector('.form').addEventListener('submit', function (e) {
    // جلوگیری از رفتار پیش‌فرض ارسال فرم
    e.preventDefault();

    // گرفتن فیلدهای ایمیل و رمز عبور
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // بررسی صحت ایمیل وارد شده
    if (!email.value.includes('@') || email.value.trim() === '') {
        // alert('لطفاً ایمیل معتبر وارد کنید.');
        Swal.fire({
            icon: "error",
            title: "خطا",
            text: "لطفاً ایمیل معتبر وارد کنید!",
        });
        email.focus();
        return;
    }

    if (password.value.trim() === "") {
    Swal.fire({
        icon: "error",
        title: "خطا",
        text: "لطفاً رمز عبور را وارد کنید!",
        confirmButtonText: "باشه"
    }); // پیشنهاد: فوکوس روی فیلد برای تجربه کاربری بهتر
    return;
}

    // بررسی اینکه رمز عبور خالی نباشد
    if (password.value.length < 6) {
        // alert('لطفاً رمز عبور را وارد کنید.');
        Swal.fire({
            icon: "error",
            title: "خطا",
            text: "رمز عبور خود را بیشتر از 6 کاراکتر وارد کنید!",
        });
        password.focus();
        return;
    }

    // در صورت موفقیت، نمایش پیام و انتقال
    Swal.fire({
        title: "موفق!",
        text: "ثبت‌نام با موفقیت انجام شد!",
        icon: "success"
    })
        .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // Swal.fire("Saved!", "", "success");
                window.location.href = 'index.html';
            }
            //  else if (result.isDenied) {
            //     Swal.fire("Changes are not saved", "", "info");
            // }
        });

    // alert('ورود با موفقیت انجام شد!');

});
<<<<<<< HEAD
=======
// شمارنده سوم: از 50 شروع، بین 50 تا 70 نوسان
createFluctuatingCounter("counter3", 50, 50, 70);
>>>>>>> 19b2df7cc3ad2a68c29e2ea989adb7857b87c3f3
