document.getElementById("login-btn").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/server/api/login.php", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    if (result.status === "success") {
        window.location.href = "chat.html";
    } else {
        alert("Login failed!");
    }
});
