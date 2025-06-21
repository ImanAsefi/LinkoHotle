// Cookis





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
    const name = document.getElementById('nameSingUp');
    const email = document.getElementById('emailSingUp');
    const password = document.getElementById('passwordSingUp');

    $.ajax({
        url: "https://localhost:44322/api/auth/signup",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        }),
        success: function (response) {
            // فرض بر اینه که سرور فقط پیام موفقیت برمی‌گردونه
            // Swal.fire("ثبت‌نام موفق", "اکنون وارد شوید", "success");
            // فرض: سرور این دو مقدار رو برمی‌گردونه
            const id = response.id;
            const token = response.token;
            const refreshToken = response.refreshToken;
            if (response.id && response.refreshToken && response.token) {
                setCookie("id", id, 1);// 1 روز
                setCookie("token", token, 1);// 1 روز
                setCookie("refreshToken", refreshToken, 7);// 1 روز
                setCookie("name", name.value.trim(), 7);
                // Swal.fire("ثبت‌ نام موفق", "اکنون وارد شدید", "success").then(() => {
                    window.location.href = "index.html";
                // });
            } else {
                // احتمالاً ساختار غیرمنتظره
                Swal.fire("خطا", "پاسخ سرور نامعتبر است", "error");
            }
        },
        error: function (xhr) {
            //Swal.fire("خطا", xhr.message, "error");
            try {
                const errorResponse = JSON.parse(xhr.responseText);
                swal.fire("خطا", errorResponse.message, "warning");
            } catch {
                Swal.fire("خطا", "ارتباط با سرور برقرار نشد", "error");
            }
        }
    });

});


