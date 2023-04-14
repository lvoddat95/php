<?php

class App
{

    private $__controller, $__action, $__params, $__routes;

    static public $app;

    function __construct()
    {
        global $routes, $config;

        self::$app = $this;

        $this->__routes = new Route();

        if (!empty($routes['default_controller'])) {
            $this->__controller = $routes['default_controller'];
        }
        $this->__action = 'index';
        $this->__params = [];
        $this->handleUrl();

        // var_dump_r($config);
    }

    // Lấy url từ đường dẫn
    function getUrl()
    {
        if (!empty($_SERVER['PATH_INFO'])) {
            $url =  $_SERVER['PATH_INFO'];
        } else {
            $url = '/';
        }
        return $url;
    }

    public function handleUrl()
    {
        // Xử lý url
        $url = $this->getUrl();

        $this->__routes->handleRoute($url);

        $urlArr = array_filter(explode('/', $url));
        $urlArr = array_values($urlArr);

        $urlCheck = '';

        if (!empty($urlArr)) {
            foreach ($urlArr as $key => $value) {
                $urlCheck .= $value . '/';
                $fileCheck = rtrim($urlCheck, '/');
                $fileArr = explode('/', $fileCheck);
                $fileArr[count($fileArr) - 1] = ucfirst($fileArr[count($fileArr) - 1]);
                $fileCheck = implode('/', $fileArr);

                if (!empty($urlArr[$key - 1])) {
                    unset($urlArr[$key - 1]);
                }

                if (file_exists('app/controllers/' . ($fileCheck) . '.php')) {
                    $urlCheck = $fileCheck;
                    break;
                }
            }

            $urlArr = array_values($urlArr);
        }


        // Xử lý controller
        if (!empty($urlArr[0])) {
            $this->__controller = ucfirst($urlArr[0]);
        } else {
            // Không tìm thấy controller trả về mặc định
            $this->__controller = ucfirst($this->__controller);
        }

        // Xử lý khi $urlCheck = ''
        if (empty($urlCheck)) {
            $urlCheck = $this->__controller;
        }

        // Xử lý class action
        if (file_exists('app/controllers/' . ($urlCheck) . '.php')) {
            require_once 'controllers/' . ($urlCheck) . '.php';

            // Kiểm tra class $this->__controller có tồn tại hay không
            if (class_exists($this->__controller)) {
                $this->__controller = new $this->__controller;
                unset($urlArr[0]);
            }
        } else {
            $this->loadError('404');
        }

        // Xử lý class action
        if (!empty($urlArr[1])) {
            $this->__action = $urlArr[1];
            unset($urlArr[1]);
        }

        // Xử lý params
        $this->__params = array_values($urlArr);
        // var_dump_r($this->__params);

        // Kiểm tra xem method, action có tồn tại hay không
        if (method_exists($this->__controller, $this->__action)) {
            // Chuyển params sau controller và action thành mảng để truyền vào hàm
            call_user_func_array([$this->__controller, $this->__action], $this->__params);
        } else {
            $this->loadError('404');
        }
    }

    // Trang 404
    public function loadError($name = '404', $data = [])
    {
        extract($data);
        require_once 'app/errors/' . $name . '.php';
    }
}


function var_dump_r($data)
{
    echo '<pre>' . var_export($data, true) . '</pre>';
}
