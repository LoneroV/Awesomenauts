<?php
    require_once(__DIR__ . "/../model/config.php");
    //these strings make it so you know when you mess up entering in their username or password
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
    
    $salt = "$5$" . "rounds=500$" . uniqid(mt_rand(), true) . "$";
    
    $hashedPassword = crypt($password, $salt);
    //This allows me to create my user using password and username
    $query = $_SESSION["connection"]->query("INSERT INTO users SET "
            . "username = '$username',"
            . "password = '$hashedPassword',"
            . "salt = '$salt', "
            . "exp = 0, "
            . "exp1 = 0, "
            . "exp2 = 0, "
            . "exp3 = 0, "
            . "exp4 = 0");
    
    $_SESSION["name"] = $username;

    if($query) {
        //need this for ajax on index.php
        echo "true";
        //allows us to see the  link in the nav bar
    }
    else{
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }