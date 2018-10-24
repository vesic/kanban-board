<?php

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

// db config
define("DB_HOST", getenv('DB_HOST'));
define("DB_USER", getenv('DB_USER'));
define("DB_PASS", getenv('DB_PASS'));
define("DB_NAME", getenv('DB_NAME'));
