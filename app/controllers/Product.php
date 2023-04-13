<?php 

class Product extends Controller
{
    public $data = [];

    public function index()
    {
        $this->data['content'] = "product/index";
        $this->render('layouts/master_layout', $this->data);
    }

    public function list($id,$s){
        // var_dump($id);
        // var_dump($s);
        $this->data['content'] = "product/list";

        $product = $this->model('ProductModel');
        $this->data['list'] = $product->getList();
        $this->data['title'] = "Td".$id;

        $this->render('layouts/master_layout', $this->data);
    }
}

?>