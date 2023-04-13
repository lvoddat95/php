<?php

class Home extends Controller
{
    public $model_home;

    public function __construct() 
    {
        $this->model_home = $this->model('HomeModel');
    }

    public function index()
    {
        $data = $this->model_home->getAll();
        $detail = $this->model_home->getById(0);
        $this->render('home/index', $data);
    }
}