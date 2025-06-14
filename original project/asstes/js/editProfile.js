let name = document.getElementById('name');
let email = document.getElementById('email');

document.querySelector('.form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('nameSingUp');
    const email = document.getElementById('emailSingUp');
    const password = document.getElementById('passwordSingUp');

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