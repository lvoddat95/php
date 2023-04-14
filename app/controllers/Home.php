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
        // $data = $this->model_home->getAll();

        $data = $this->model_home->get();

        $this->render('home/index', $data);

    }
}