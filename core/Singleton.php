<?php

class Singleton
{
    private static $instance = null;

    private function __construct()
    {
        // Kết nối database
        try {

            define('_ISA_DB_USER', 'sa');
            define('_ISA_DB_PASSWORD', 'aBc@123!qt');
            define('_ISA_DB_NAME', 'isa-qlbh');
            define('_ISA_SERVER_NAME', '10.86.0.40');

            // Cấu hình dns
            $conn =  new PDO("sqlsrv:Server={" . _ISA_SERVER_NAME . "};Database={" . _ISA_DB_NAME . "};", _ISA_DB_USER, _ISA_DB_PASSWORD);
            
            var_dump_r($conn);
        } catch (Exception $exception) {
            $mess = $exception->getMessage();

            if (preg_match('/Access denied for user/', $mess)) {
                die('Lỗi kết nối CSDL');
            }

            if (preg_match('/Unknown database/', $mess)) {
                die('Không tìm thấy CSDL');
            }
        }
    }

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new Singleton();
        }
        return self::$instance;
    }
}
