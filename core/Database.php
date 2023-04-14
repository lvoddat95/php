<?php

/**
 * Base Database
 * @author Firstname Lastname
 * @version 1.0
 * */
class Database
{
    private $__conn;

    use QueryBuilder;

    // Kết nối với database
    function __construct()
    {
        global $db_config;
        $this->__conn = Singleton::getInstance($db_config);
    }

    // Thêm dữ liệu
    public function insert($table, $data)
    {
        if (!empty($data)) {
            $fieldStr = '';
            $valueStr = '';
            foreach ($data as $key => $value) {
                $fieldStr .= $key . ',';
                $valueStr .= "'" . $value . "',";
            }
            $fieldStr = rtrim($fieldStr, ',');
            $valueStr = rtrim($valueStr, ',');

            $sql = "INSERT INTO $table ($fieldStr) VALUES ($valueStr)";
            $status = $this->query($sql);

            if ($status) {
                return true;
            }
        }
    }

    // Sửa dữ liệu
    public function update($table, $data, $condition = '')
    {
        if (!empty($data)) {
            $updateStr = '';
            foreach ($data as $key => $value) {
                $updateStr .= $key . ' = "' . $value . '",';
            }

            $updateStr = rtrim($updateStr, ',');

            if (!empty($condition)) {
                $sql = "UPDATE $table SET $updateStr WHERE $condition";
            } else {
                $sql = "UPDATE $table SET $updateStr";
            }

            $status = $this->query($sql);

            if ($status) {
                return true;
            }
        }
    }

    // Xoá dữ liệu
    public function delete($table, $condition = '')
    {
        if (!empty($condition)) {
            $sql = "DELETE FROM $table WHERE $condition";
        } else {
            $sql = "DELETE FROM $table";
        }
        $status = $this->query($sql);

        if ($status) {
            return true;
        }
    }

    // Truy vấn câu lệnh SQL
    public function query($sql)
    {
        try {
            $statement = $this->__conn->prepare($sql);

            $statement->execute();

            return $statement;
        } catch (Exception $e) {
            $data['error'] = $e->getMessage();
            App::$app->loadError('database', $data);
            die();
        }
    }

    // Trả về ID mới nhất sau khi đã insert
    public function lastInsertId()
    {
        return $this->__conn->lastInsertId();
    }
}
