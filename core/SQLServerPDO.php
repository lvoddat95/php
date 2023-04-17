<?php

class SQLServerPDO extends \PDO
{
    protected $stmt;
    protected $withIdentitySelect;

    public function __construct($dsn, $username = null, $password = null, $options = null)
    {
        parent::__construct($dsn, $username, $password, $options);
        $this->withIdentitySelect = false;
    }

    public function prepare($statement, $driver_options = null)
    {
        $this->withIdentitySelect = false;

        if (preg_match('/^insert/i', $statement)) {
            $statement = "{$statement}; select SCOPE_IDENTITY() AS 'Identity';";
            $this->withIdentitySelect = true;
        }

        $this->stmt = parent::prepare($statement, is_array($driver_options) ? $driver_options : []);
        return $this->stmt;
    }

    public function query($statement)
    {
        $this->withIdentitySelect = false;

        if (preg_match('/^insert/i', $statement)) {
            $statement = "{$statement}; select SCOPE_IDENTITY() AS 'Identity';";
            $this->withIdentitySelect = true;
        }

        $this->stmt = parent::query($statement);
        return $this->stmt;
    }

    public function lastInsertId($name = null)
    {
        $lastIndex = 0;

        if (($this->withIdentitySelect) && ($this->stmt->columnCount() > 0)) {
            $lastIndex = $this->stmt->fetchColumn(0);
            $this->stmt->closeCursor();
        }

        return $lastIndex;
    }
}

?>