// Cookis
getUserInfo();

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

function getUserInfo() {
    // document.querySelector('.form').addEventListener('submit', function () {
    //     e.preventDefault();
    //     // const idInput = getCookie('id');
    //     // const nameInput = document.getElementById('inputName');
    //     // const emailInput = document.getElementById('inputEmail');

    $.ajax({
        url: `https://localhost:44322/api/user/profile/${userId}`,
        method: "GET",
        contentType: "application/json",
        // data: JSON.stringify({
        //     name: name.value.trim(), email: email.value.trim()
        // }),
        success: function (response) {
            // فرض بر اینه که سرور فقط پیام موفقیت برمی‌گردونه
            // Swal.fire("ثبت‌نام موفق", "اکنون وارد شوید", "success");
            // فرض: سرور این دو مقدار رو برمی‌گردونه

            console.log(`Id = ${response.id}, Name = ${response.name}, Email: ${response.email},`);

            const id = response.id;
            const name = response.name;
            const email = response.email;
            if (response.id && response.email && response.name) {

                const idInput = document.getElementById('userId');
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');

                idInput.value = id;
                emailInput.value = email;
                nameInput.value = name;
                // window.location.href = "index.html";
                //});
            } else {
                // احتمالاً ساختار غیرمنتظره
                Swal.fire("خطا", "پاسخ سرور نامعتبر است", "error");
            }
        },
        error: function (xhr) {
            //Swal.fire("خطا", xhr.message, "error");
            try {
                const errorResponse = JSON.parse(xhr.responseText);
                Swal.fire("خطا", errorResponse.message, "warning");
            } catch {
                Swal.fire("خطا", "ارتباط با سرور برقرار نشد", "error");
            }
        }
    });
    //});
}

// وقتی فرم ارسال میشه
document.querySelector('.form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const userId = document.getElementById('userId');

    $.ajax({
        url: "https://localhost:44322/api/user/edit-profile",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            id: userId.value,
            name: name.value.trim(),
            email: email.value.trim()
        }),
        success: function (response) {
            // فرض بر اینه که سرور فقط پیام موفقیت برمی‌گردونه
            // Swal.fire("ثبت‌نام موفق", "اکنون وارد شوید", "success");
            // فرض: سرور این دو مقدار رو برمی‌گردونه
            // const id = response.id;
            //const name = response.name;
             if (response.isSuccess) {
            //     setCookie("id", id, 7);// 1 روز
                 setCookie("name", name.value.trim(), 7);
                Swal.fire("موفق", response.message, "success").then(() => {
                    window.location.href = "index.html";
                });
            } else {
                // احتمالاً ساختار غیرمنتظره
                Swal.fire("خطا", "پاسخ سرور نامعتبر است", "error");
            }
        },
        error: function (xhr) {
            //Swal.fire("خطا", xhr.message, "error");
            try {
                const errorResponse = JSON.parse(xhr.responseText);
                Swal.fire("خطا", errorResponse.message, "warning");
            } catch {
                Swal.fire("خطا", "ارتباط با سرور برقرار نشد", "error");
            }
        }
    });

});