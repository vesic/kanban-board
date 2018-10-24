<?php

class TaskTest extends PHPUnit_Framework_TestCase
{
    private $http;

    public function setUp()
    {
        $this->http = new GuzzleHttp\Client(['base_uri' => 'http://localhost:8080']);
    }

    public function testIndex()
    {
        $response = $this->http->request('GET', '/');
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('hello world!', (string)$response->getBody());
    }

    public function testGetAllTasks()
    {
        $response = $this->http->request('GET', '/api/tasks');
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json;charset=utf-8", $contentType);
        $res = json_decode($response->getBody());
        $this->assertInternalType('array', $res);
    }

    public function testGetTasksById()
    {
        $response = $this->http->request('GET', '/api/tasks/1');
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json;charset=utf-8", $contentType);
        $res = json_decode($response->getBody());
        $actual = new stdClass;
        $actual->id = 1;
        $actual->name = 'Task 1';
        $actual->description = '';
        $actual->stage = 1;
        $this->assertEquals($actual, $res->task);
    }


    public function testCreateTask()
    {
        $body['name'] = "Task 42";
        $body['description'] = "description";
        $body['stage'] = 1;
        $response = $this->http->post('/api/tasks', [
            GuzzleHttp\RequestOptions::JSON => $body
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json;charset=utf-8", $contentType);
        $result = json_decode($response->getBody());
        $this->assertEquals(1, $result->rows);
    }

    public function testDeleteTask()
    {
        $body['name'] = "Task 42";
        $body['description'] = "description";
        $body['stage'] = 1;
        $response = $this->http->post('/api/tasks', [
            GuzzleHttp\RequestOptions::JSON => $body
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json;charset=utf-8", $contentType);
        $result = json_decode($response->getBody());
        $this->assertEquals(1, $result->rows);

        // now delete
        $response = $this->http->request('DELETE', '/api/tasks/' . $result->id);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json;charset=utf-8", $contentType);
        $result = json_decode($response->getBody());
        $actual = new stdClass;
        $actual->success = 'Task Deleted';
        $this->assertEquals($actual, $result);
    }

    public function tearDown() {
        $this->http = null;
    }
}