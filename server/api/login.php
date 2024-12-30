<?php
session_start();
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

$users = json_decode(file_get_contents('../db/users.json'), true);
foreach ($users as $user) {
    if ($user['username'] === $username && $user['password'] === $password) {
        $_SESSION['username'] = $username;
        echo json_encode(["status" => "success"]);
        exit();
    }
}
echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
?>
