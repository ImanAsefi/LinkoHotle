// ذخیره کوکی
function setCookie(cName, cValue, cDays) {
    let d = new Date();
    d.setTime(d.getTime() + (cDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
}

// گرفتن کوکی
function getCookie(cName) {
    let name = cName + "=";
    let decoded = decodeURIComponent(document.cookie);
    let cookies = decoded.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length);
        }
    }
    return "";
}

// چک کردن کوکی
function checkCookie() {
    let email = getCookie("userEmail");
    if (email !== "") {
        Swal.fire("خوش آمدید!", "ایمیل شما: " + email, "success");
    }
}

// وقتی فرم ارسال میشه
document.querySelector('.form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('emailLogin');
const password = document.getElementById('passwordLogin');

if (!email || !password) {
    Swal.fire("خطا", "خطا در بارگذاری فرم!", "error");
    return;
}

if (email.value.trim() === "" || !email.value.includes("@")) {
    Swal.fire("خطا", "ایمیل معتبر وارد کن", "error");
    return;
}

if (password.value.trim() === "") {
    Swal.fire("خطا", "رمز عبور وارد نشده", "error");
    return;
}
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


    // ذخیره کوکی
    setCookie("Name", email.value.trim(), 10);

    Swal.fire({
        icon: "success",
        title: "ورود با موفقیت انجام شد" ,
        text: "در حال انتقال به صفحه اصلی..."
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'index.html';
        }
    });

    $.ajax({
        url: "https://your-api.com/api/signup",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            email: email.value.trimStart().trimEnd(),
            password: password.value.trimStart().trimEnd()
        }),
        success: function (response) {
            // فرض بر اینه که سرور فقط پیام موفقیت برمی‌گردونه
            // Swal.fire("ثبت‌نام موفق", "اکنون وارد شوید", "success");
            // فرض: سرور این دو مقدار رو برمی‌گردونه
            const token = response.token;
            const refreshToken = response.refreshToken;

            setCookie("token", token, 1);      // 1 روز
            setCookie("refreshToken", refreshToken, 7);
            
        },
        error: function (xhr) {
            Swal.fire("خطا", xhr.responseText || "مشکلی پیش آمده", "error");
        }
    });
});