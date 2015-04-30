<?php
    require_once(__DIR__ . "/../model/config.php");
    require_once(__DIR__ . "/../controller/login-verify.php");
    
    if(!authenticateUser()) {
        header("location: " . $path . "index.php");
        die();
    }
    
    unset($_SESSION["authenticated"]);
    
    session_destroy();
    header("location: " . $path . "index.php");