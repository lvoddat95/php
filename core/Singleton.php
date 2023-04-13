<?php 

class Singleton
{
    private static $instance = null;

    private function __construct(){
        echo "Kết nối thành công";
    }

    public static function getInstance()
    {
        if(is_null(self::$instance))
        {
            self::$instance = new Singleton();
        }
        return self::$instance;
    }
}

?>