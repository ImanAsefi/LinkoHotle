let name = document.getElementById('name');
let email = document.getElementById('email');



document.querySelector('.form').addEventListener('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: "https://your-api.com/api/signup",
        method: "GET",
        contentType: "application/json",
        data: JSON.stringify({
            name: name.value.trimStart().trimEnd(),
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
            setCookie("name", name, 7);
            
        },
        error: function (xhr) {
            Swal.fire("خطا", xhr.responseText || "مشکلی پیش آمده", "error");
        }
    });
    const name = document.getElementById('name');
    const email = document.getElementById('email');


    if (name.value.trim() === "") {
        Swal.fire("خطا", "نام وارد نشده", "error");
        return;
    }

    if (name.value.length < 5) {
        Swal.fire("خطا", "لطفا نام و نام خانوادگی خود را درست وارد کنید", "error");
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
    setCookie("Name", name.value.trim(), 10);


    Swal.fire({
        icon: "success",
        title: "  ",
        text: "در حال انتقال به صفحه اصلی..."
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'index.html';
        }
    });
});