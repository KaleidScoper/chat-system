<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit();
}

$message = base64_decode($_POST['message']);
$iv = base64_decode($_POST['iv']);
$key = $_SESSION['shared_key'];

// 解密消息
$decrypted = openssl_decrypt($message, 'aes-256-cbc', $key, 0, $iv);

// 模拟转发给另一个用户
$encrypted = openssl_encrypt($decrypted, 'aes-256-cbc', $key, 0, $iv);

echo json_encode(["encrypted_message" => base64_encode($encrypted), "iv" => base64_encode($iv)]);
?>
