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
const userId = getCookie('id');
const getName = getCookie('name'); // فرض بر اینه که کوکی با نام 'name' ست شده
const join = document.getElementById('join');
const profile = document.getElementById('seeProfile');
const username = document.getElementById('username');

if (userId <= 0) {
    join.classList.remove("hidden");
    profile.classList.add("hidden");
} else {
    join.classList.add("hidden");
    profile.classList.remove("hidden");
    username.textContent = getName; // نمایش نام در navbar
}