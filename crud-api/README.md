# Task API

A simple Express API for creating, reading, updating, and deleting tasks. Tasks are stored in memory and reset when the server restarts.

## Install and run

Requires Node.js and npm. From the repository root, run this command in Command Prompt, PowerShell 7+, or Bash:

```sh
npm install && node crud-api/app.js
```

The API runs at <http://localhost:3000>. Open <http://localhost:3000/docs/> for Swagger UI.

## Endpoints

| Method | Path | Description | Status codes |
| --- | --- | --- | --- |
| GET | `/` | API information | 200 |
| GET | `/health` | Health status | 200 |
| GET | `/tasks` | List all tasks | 200 |
| POST | `/tasks` | Create a task with JSON such as `{"title":"New task"}` | 201, 400 |
| GET | `/tasks/{id}` | Get a task by ID | 200, 404 |
| PUT | `/tasks/{id}` | Update a task with JSON such as `{"title":"Updated task","done":true}` | 200, 400, 404 |
| DELETE | `/tasks/{id}` | Delete a task | 204, 404 |
| GET | `/docs/` | Swagger UI | 200 |

## Example response

Actual output from `curl -i http://localhost:3000/health` (use `curl.exe` in Windows PowerShell):

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 15
ETag: W/"f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Date: Thu, 05 Nov 2026 06:42:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"status":"ok"}
```

## Swagger screenshot

![Swagger UI showing the Task API endpoints](media/swaggerUI-ss.png)
