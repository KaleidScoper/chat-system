document.getElementById("login-btn").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://testgames.me/chat-system/server/api/login.php", {
        // 此处使用相对路径有问题，不知道怎么回事
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    if (result.status === "success") {
        window.location.href = "chat.html";
    } else {
        alert("用户名或密码错误！");
    }
});
