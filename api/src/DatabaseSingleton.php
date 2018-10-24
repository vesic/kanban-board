<?php

require './config.php';

class DatabaseSingleton extends PDO
{
    protected static $instance;
    protected $pdo;

    protected function __construct()
    {
        $opt = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        $dsn = sprintf('mysql:host=%s;dbname=%s', DB_HOST, DB_NAME);
        $this->pdo = new PDO($dsn, DB_USER, DB_PASS, $opt);
        parent::__construct($dsn, DB_USER, DB_PASS, $opt);
    }

    public static function instance()
    {
        if (self::$instance === null) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    // proxy to PDO
    public function __call($method, $args)
    {
        return call_user_func_array([$this->pdo, $method], $args);
    }

    // run query
    public function run($sql, $args = [])
    {
        if (!$args) {
            return $this->query($sql);
        }
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($args);
        return $stmt;
    }
}
