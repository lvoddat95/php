<?php

/**
 * Singleton
 * @author Firstname Lastname
 * @version 1.0
 * */
class Singleton
{
    private static $instance = null, $conn = null;

    private function __construct($config)
    {
        // Kết nối database
        try {

            // Cấu hình dns
            $conn =  new PDO("sqlsrv:Server={" . $config['host'] . "};Database={" . $config['db'] . "};", $config['user'], $config['pass']);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$conn = $conn;
        } catch (Exception $exception) {
            $mess = $exception->getMessage();
            App::$app->loadError('database', ['error' => $mess]);
            die();
        }
    }

    public static function getInstance($config)
    {
        if (is_null(self::$instance)) {
            new Singleton($config);
            self::$instance = self::$conn;
        }
        return self::$instance;
    }
}
