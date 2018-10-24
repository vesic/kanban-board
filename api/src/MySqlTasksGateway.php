<?php

class MySqlTasksGateway implements TasksGateway
{
    protected $db;

    public function __construct()
    {
        $this->db = DatabaseSingleton::instance();
    }

    public function getTasks()
    {
        $sql = "SELECT * FROM tasks";
        $results = $this->db->run($sql)->fetchAll();
        return $results;
    }

    public function getTask($id)
    {
        $sql = "SELECT * FROM tasks where id = :id";
        $results = $this->db->run($sql, ['id' => $id])->fetch();
        return $results;
    }

    public function createTask($payload)
    {
        $sql = "INSERT INTO tasks (id, name, description, stage) VALUES (null, :name, :description, :stage)";
        $results = $this->db->run($sql, [
            'name' => $payload['name'],
            'description' => $payload['description'],
            'stage' => $payload['stage'],
        ]);
        
        // get last id
        $sql = "SELECT (id) FROM tasks ORDER BY id DESC LIMIT 1";
        $lastId = $this->db->run($sql)->fetch();
        return ['results' => $results, 'id' => $lastId['id']];
    }

    public function destroyTask($id)
    {
        $sql = "DELETE FROM tasks WHERE id = :id";
        $results = $this->db->run($sql, ['id' => $id]);
        return $results;
    }

    public function updateTask($payload)
    {
        $sql = "UPDATE tasks SET name = :name, description = :description, stage = :stage WHERE id = :id";
        $results = $this->db->run($sql, [
            'id' => $payload['id'],
            'name' => $payload['name'],
            'description' => $payload['description'],
            'stage' => $payload['stage'],
        ]);
        return $results;
    }
}
