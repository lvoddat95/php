<?php

/**
 * Base Controller
 * @author Firstname Lastname
 * @version 1.0
 * */
class Controller
{
    public function __construct()
    {
    }

    public function model($model)
    {
        if (file_exists(_DIR_ROOT . '/app/models/' . $model . '.php')) {
            require_once _DIR_ROOT . '/app/models/' . $model . '.php';
            if (class_exists($model)) {
                $model = new $model();
                return $model;
            }
        }
        return false;
    }


    public function render($view, $data = [])
    {
        extract($data);
        if (file_exists(_DIR_ROOT . '/app/views/' . $view . '.php')) {
            require_once _DIR_ROOT . '/app/views/' . $view . '.php';
        }
    }
}
