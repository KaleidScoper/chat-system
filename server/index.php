<?php
// 示例：用户登录和会话密钥协商
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $users = json_decode(file_get_contents('users.json'), true);
    foreach ($users as $user) {
        if ($user['username'] === $username && $user['password'] === $password) {
            $_SESSION['username'] = $username;
            // 生成会话密钥
            $privateKey = openssl_pkey_new();
            $publicKey = openssl_pkey_get_details($privateKey)['key'];
            $_SESSION['privateKey'] = $privateKey;
            $_SESSION['publicKey'] = $publicKey;
            echo json_encode(['status' => 'success', 'publicKey' => $publicKey]);
            exit;
        }
    }
    echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
}
?>