// chat.js
let sessionKey = null; // 会话密钥

// 登录逻辑
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 向后端请求登录
    const response = await fetch("../server/server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", username, password })
    });

    const data = await response.json();
    if (data.success) {
        alert("Login successful!");
        const dh = new DiffieHellman(data.prime, data.generator);
        const sharedKey = dh.calculateSharedKey(data.serverPublicKey);
        sessionKey = await AES.generateKey(sharedKey.toString());
        window.location = "chat.html";
    } else {
        document.getElementById("errorMessage").textContent = data.message;
    }
});

// 发送消息
document.getElementById("sendMessage").addEventListener("click", async () => {
    const messageInput = document.getElementById("messageInput").value;
    if (!sessionKey || !messageInput) return;

    const encryptedMessage = await AES.encrypt(messageInput, sessionKey);

    await fetch("/server/server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            action: "sendMessage",
            message: encryptedMessage
        })
    });

    document.getElementById("messageInput").value = "";
});

// 更新在线用户
async function fetchUsers() {
    const response = await fetch("/server/server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetchUsers" })
    });
    const data = await response.json();
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    data.users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user.username;
        userList.appendChild(li);
    });
}

// 定时更新在线用户列表
setInterval(fetchUsers, 5000);
