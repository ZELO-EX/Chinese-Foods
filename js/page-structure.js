function headerLoader() {
    const loggedInArea = document.getElementById("account-actions-logged-in");
    const loggedOutArea = document.getElementById("account-actions-logged-out");
    const userDropdownHeader = document.getElementById("user-dropdown-header");
    const usernameCookie = getCookie("username");
    if (usernameCookie) {
        // 用户已登录
        if (loggedInArea) loggedInArea.style.display = "inline";
        if (loggedOutArea) loggedOutArea.style.display = "none";
        if (userDropdownHeader) userDropdownHeader.textContent = usernameCookie;
        // console.log("用户已登录:", usernameCookie);
    } else {
        // 用户未登录
        if (loggedInArea) loggedInArea.style.display = "none";
        if (loggedOutArea) loggedOutArea.style.display = "inline";
        if (userDropdownHeader)
            userDropdownHeader.textContent = "Invalid Username";
        // console.log("用户未登录");
    }
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteUser(name) {
    const usernameCookie = getCookie("username");
    if (usernameCookie !== name) {
        alert("用户名不符，注销失败");
        return;
    }
    const readUserList = localStorage.getItem(name);
    if (!readUserList) {
        alert("用户信息不存在");
        return;
    }
    localStorage.removeItem(name);
    document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    alert("账号注销成功，请重新登录");
    window.location.href = "../login.html";
}

function logoutUser() {
    document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    alert("当前账号已退出，请重新登录");
    window.location.href = "../login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    headerLoader();
});