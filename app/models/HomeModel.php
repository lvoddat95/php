<?php 

class HomeModel{
    protected $_table = 'test';
    
    public function getAll(){
        $data =  [
            'id1',
            'id2',
            'id3',
        ];
        return $data;
    }

    public function getById($id){
        $data =  [
            'id1',
            'id2',
            'id3',
        ];
        return $data[$id];
    }
}
?>