<?php

interface TasksGateway
{
    public function getTasks();

    public function getTask($id);

    public function createTask($payload);

    public function destroyTask($id);

    public function updateTask($payload);
}
