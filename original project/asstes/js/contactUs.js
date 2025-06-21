document.querySelector('#sendRequest').addEventListener('click', function (e) {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const text = document.getElementById('text');

    $.ajax({
        url: "https://localhost/api/home/contact-us",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: name.value.trim(),
            email: email.value.trim(),
            mobile: phone.value.trim(),
            text: text.value.trim()
        }),
        success: function (response) {
            // فرض بر اینه که سرور فقط پیام موفقیت برمی‌گردونه
            // Swal.fire("ثبت‌نام موفق", "اکنون وارد شوید", "success");
            // فرض: سرور این دو مقدار رو برمی‌گردونه
            if (response.isSuccess) {

                Swal.fire("درخواست موفق", response.message , "success").then(() => {
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
                swal.fire("خطا", errorResponse.message, "warning");
            } catch {
                Swal.fire("خطا", "ارتباط با سرور برقرار نشد", "error");
            }
        }
    });

});
