<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit();
}
// 假设简单验证通过
echo json_encode(["status" => "success"]);
?>
