<?php
session_start();

if ($_GET['action'] === 'getUsers') {
    // 示例：获取在线用户列表
    $users = json_decode(file_get_contents('users.json'), true);
    echo json_encode($users);
    exit;
}

if ($_GET['action'] === 'sendMessage') {
    // 示例：处理加密消息
    $data = json_decode(file_get_contents('php://input'), true);
    $encryptedMessage = $data['message'];
    $sessionKey = $_SESSION['sessionKey'];
    $decryptedMessage = decryptMessage($sessionKey, $encryptedMessage);
    // 发送消息给目标用户（示例）
    echo json_encode(['status' => 'success']);
    exit;
}

function decryptMessage($key, $message) {
    // 解密逻辑
    return $message; // 示例：返回原始消息
}
?>