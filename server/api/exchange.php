<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit();
}

$serverPrivateKey = random_bytes(32); // 服务端私钥
$serverPublicKey = hash('sha256', $serverPrivateKey); // 模拟公钥
$_SESSION['shared_key'] = hash('sha256', $serverPublicKey . $_POST['client_public_key']); // 协商密钥

echo json_encode(["status" => "success", "server_public_key" => $serverPublicKey]);
?>
