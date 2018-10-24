<?php

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

require 'vendor/autoload.php';

// log errors
$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];

$app = new \Slim\App($configuration);

// register dependecies with DIC
$container = $app->getContainer();

$container['mysqlGateway'] = function ($c) {
    return new MySqlTasksGateway();
};

$container['TasksController'] = function ($c) {
    return new TasksController($c->get('mysqlGateway'));
};

// enable CORS
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->get('/', function (
    Request $request, Response $response
) {
    return $response->getBody()->write('hello world!');
});

$app->group('/api', function () use ($app) {
    $app->get('/tasks', \TasksController::class . ':index');
    $app->get('/tasks/{id}', \TasksController::class . ':find');
    $app->post('/tasks', \TasksController::class . ':create');
    $app->delete('/tasks/{id}', \TasksController::class . ':destroy');
    $app->put('/tasks/{id}', \TasksController::class . ':update');
});

$app->run();
