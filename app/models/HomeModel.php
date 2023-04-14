<?php

class HomeModel extends Model
{
    private $_table = '[vni-kpi].[dbo].[T_BANG_KPI]';

    public function tableFill()
    {
        return $this->_table;
    }

    public function fieldFill()
    {
        return 'PK_ID, C_TEN_BANG_KPI';
    }

    public function getAll()
    {
        $data = $this->db->query("SELECT * FROM $this->_table")->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
}
