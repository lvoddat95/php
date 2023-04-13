<?php

use FTP\Connection;

define('_DIR_ROOT', str_replace('\\', '/', __DIR__));

if(!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on'){
    $web_root = 'https://'.$_SERVER['HTTP_HOST'];
}else{
    $web_root = 'http://'.$_SERVER['HTTP_HOST'];
}

// echo strtolower($_SERVER['DOCUMENT_ROOT']);
// echo "<br>";
// echo strtolower(_DIR_ROOT);
// echo "<br>";

$folder = str_replace(strtolower($_SERVER['DOCUMENT_ROOT']), '', strtolower(_DIR_ROOT));
$web_root = $web_root.$folder;
// echo _DIR_ROOT.basename(_DIR_ROOT);

define('_WEB_ROOT', $web_root);

// Tự động load config
$config_dir = scandir(_DIR_ROOT.'/configs');
if(!empty($config_dir)){
    foreach ($config_dir as $key => $value) {
        if($value !='.' && $value !='..' && file_exists(_DIR_ROOT.'/configs/'.$value)){
            require_once _DIR_ROOT.'/configs/'.$value;
        }
    }
}

require_once 'core/Route.php'; //Load Route class
require_once 'app/App.php'; //Load App class

// Kiểm tra config load DB
if(!empty($config['database'])){
    $db_config = array_filter($config['database']);

    if(!empty($db_config)){
        require_once 'core/Singleton.php'; //Load Singleton class
        $conn = Singleton::getInstance();
    }

}


require_once 'core/Controller.php'; //Load Controller class
