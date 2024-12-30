const sendButton = document.getElementById("send-btn");
sendButton.addEventListener("click", async () => {
    const message = document.getElementById("message-input").value;
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encryptedMessage = await encryptMessage(message, sessionKey, iv);

    const response = await fetch("/server/api/chat.php", {
        method: "POST",
        body: JSON.stringify({ message: encryptedMessage, iv: btoa(String.fromCharCode(...iv)) }),
        headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    if (result.encrypted_message) {
        addMessage("You: " + message);
    }
});
