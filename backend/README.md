# Todo App - Backend

This is the backend for the Todo App.

## Architecture Followed

MVC (Model View Controller) Architecture

## API Endpoints

The server provides the following API endpoints:

<ul>
    <li><strong>`POST /api/users/register`</strong> : Register a new user.</li>
    <li><strong>`POST /api/users/login`</strong> : Login an existing user.</li>
    <li><strong>`GET /api/todos`</strong> : Get all todos for the logged in user.</li>
    <li><strong>`POST /api/todos`</strong> : Create a new todo.</li>
    <li><strong>`PUT /api/todos/:id`</strong> : Update a todo.</li>
    <li><strong>`DELETE /api/todos/:id`</strong> : Delete a todo.</li>
    <li><strong>`DELETE /api/todos`</strong> : Delete all todos.</li>
</ul>
