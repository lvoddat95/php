<?php

/**
 * Base Model
 * @author Firstname Lastname
 * @version 1.0
 * */

abstract class Model extends Singleton
{

    protected $db, $tableName;

    function __construct()
    {
        $this->db = new Database();
    }

    // Tên bảng
    abstract function tableFill();

    // Tên cột 
    abstract function fieldFill();

    // Primary Key 
    abstract function primaryKey();

    // Lấy lất tất cả bản ghi
    public function all()
    {
        $tableName = $this->tableFill();
        $fieldSelect = $this->fieldFill();

        if (empty($fieldSelect)) {
            $fieldSelect = '*';
        }

        $sql = "SELECT $fieldSelect FROM $tableName";
        $query = $this->db->query($sql);

        if (!empty($query)) {
            return $query->fetchAll(PDO::FETCH_ASSOC);
        }

        return false;
    }

    // Lấy 1 bản ghi
    public function find($id)
    {
        $tableName = $this->tableFill();
        $fieldSelect = $this->fieldFill();
        $primaryKey = $this->primaryKey();

        if (empty($fieldSelect)) {
            $fieldSelect = '*';
        }

        $sql = "SELECT $fieldSelect FROM $tableName $primaryKey = $id";
        $query = $this->db->query($sql);

        if (!empty($query)) {
            return $query->fetchAll(PDO::FETCH_ASSOC);
        }

        return false;
    }
}
