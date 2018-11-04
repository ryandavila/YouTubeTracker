<?php
$password = $_GET['password'];
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
echo $hashed_password;
?>
