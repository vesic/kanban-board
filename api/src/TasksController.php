<?php

class TasksController
{
    protected $mysqlGateway;

    public function __construct($mysqlGateway)
    {
        $this->mysqlGateway = $mysqlGateway;
    }

    public function index($request, $response)
    {
        return $response->withJson($this->mysqlGateway->getTasks());
    }

    public function find($request, $response, $args)
    {
        $id = (int) $args['id'];
        $query = $this->mysqlGateway->getTask($id);
        if ($query) {
            return $response->withJson(['task' => $query]);
        }
        return $response->withJson(['error' => 'Not Found']);
    }

    public function create($request, $response)
    {
        $data = $request->getParsedBody();
        $name = filter_var($data['name'], FILTER_SANITIZE_STRING) ?? "";
        $description = filter_var($data['description'], FILTER_SANITIZE_STRING) ?? "";
        $stage = filter_var($data['stage'], FILTER_SANITIZE_STRING) ?? "";
        $query = $this->mysqlGateway->createTask([
            'name' => $name,
            'description' => $description,
            'stage' => $stage,
        ]);
        return $response->withJson([
            'rows' => $query['results']->rowCount(),
            'id' => $query['id']
        ]);
    }

    public function destroy($request, $response, $args)
    {
        $id = (int) $args['id'];
        $query = $this->mysqlGateway->destroyTask($id);
        if ($query->rowCount()) {
            return $response->withJson(['success' => 'Task Deleted']);
        }
        return $response->withJson(['error' => 'Task Not Found']);
    }

    public function update($request, $response, $args)
    {
        $id = (int) $args['id'];
        $data = $request->getParsedBody();
        $name = filter_var($data['name'], FILTER_SANITIZE_STRING) ?? "";
        $description = filter_var($data['description'], FILTER_SANITIZE_STRING) ?? "";
        $stage = filter_var($data['stage'], FILTER_SANITIZE_STRING) ?? "";
        $query = $this->mysqlGateway->updateTask([
            'id' => $id,
            'name' => $name,
            'description' => $description,
            'stage' => $stage,
        ]);
        if ($query->rowCount()) {
            return $response->withJson(['success' => 'Task Update']);
        }
        return $response->withJson(['error' => 'Task Not Found']);
    }
}
