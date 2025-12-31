function deleteUser(name) {
    const readUserList = localStorage.getItem(formObject["username"]);
    if (!readUserList) {
        alert("用户信息不存在");
        return;
    }
    localStorage.removeItem(name);
    alert("账号注销成功，请重新登录");
    window.location.href = "../login.html";
}

function logoutUser() {
    document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    alert("当前账号已退出，请重新登录");
    window.location.href = "../login.html";
}

function loginUser(formObject) {
    const readUserList = localStorage.getItem(formObject["username"]);
    if (!readUserList) {
        alert("用户信息不存在");
        return;
    }
    const readUserObj = JSON.parse(readUserList);
    if (
        formObject["username"] === readUserObj["username"] &&
        formObject["password"] === readUserObj["password"]
    ) {
        let nowDate = new Date();
        nowDate.setTime(nowDate.getTime() + 20 * 60 * 1000);
        document.cookie = `username=${
            formObject["username"]
        };expires=${nowDate.toUTCString()}`;
        alert(`登录成功\n${formObject["username"]}，欢迎回来`);
        window.location.href = "./index.html";
    } else {
        alert("用户名或密码错误");
    }
}

function signupUser(formObject) {
    const readUserList = localStorage.getItem(formObject["username"]);
    if (readUserList) {
        alert("用户名已被占用");
        return;
    }
    const saveUserInfo = JSON.stringify(formObject);
    localStorage.setItem(formObject["username"], saveUserInfo);
    alert("注册成功\n请返回登录页进行登陆操作");
    window.location.href = "./login.html";
}

function forgetUser(formObject) {
    const readUserList = localStorage.getItem(formObject["username"]);
    if (!readUserList) {
        alert("用户信息不存在");
        return;
    }
    const readUserObj = JSON.parse(readUserList);
    if (readUserObj["password"] === formObject["password"]) {
        alert("旧密码不得与新密码重复");
        return;
    }
    readUserObj["password"] = formObject["password"];
    const saveUserInfo = JSON.stringify(readUserObj);
    localStorage.setItem(formObject["username"], saveUserInfo);
    alert("修改成功\n请返回登录页进行登陆操作");
    window.location.href = "./login.html";
}

{
    document
        .getElementById("account-form")
        .addEventListener("submit", function (event) {
            // 阻止表单提交
            event.preventDefault();

            // 判断表单内容是否合法
            const pwd = document.getElementById("password").value;
            if (pwd.length < 8 || pwd.length > 20) {
                alert("密码位数必须在8位到20位之间");
                return;
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/.test(pwd)) {
                alert(
                    "密码必须同时包含大小写字母与数字\n" +
                        "，且不含有任何特殊字符"
                );
                return;
            }
            if (
                document.getElementById("confirmPassword") &&
                document.getElementById("agree")
            ) {
                const cpwd = document.getElementById("confirmPassword").value;
                const agree = document.getElementById("agree");
                if (pwd !== cpwd) {
                    alert("两次密码输入不一致");
                    return;
                }
                if (!agree.checked) {
                    alert("请同意用户协议");
                    return;
                }
            }

            // 存储密码
            const formData = new FormData(this);
            const funcSelector = {
                login: (fd) => loginUser(fd),
                signup: (fd) => signupUser(fd),
                forgetpwd: (fd) => forgetUser(fd),
            };
            funcSelector[event.submitter.getAttribute("name")](
                Object.fromEntries(formData.entries())
            );
        });
}
