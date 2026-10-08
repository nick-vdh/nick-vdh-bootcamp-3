# Cloud Architecture Overview

This TODO application is an npm-workspaces monorepo with a React frontend and a Node.js/Express backend.

```mermaid
flowchart LR
    user[TODO App User]

    subgraph frontend[Frontend package]
        web[React single-page application]
    end

    subgraph backend[Backend package]
        api[Node.js / Express task API]
        database[(In-memory SQLite task database)]
    end

    user -->|Uses in a web browser| web
    web -->|HTTPS/JSON: /api/tasks| api
    api -->|Reads and writes tasks| database
```

## Create a TODO

```mermaid
sequenceDiagram
    actor User
    participant Web as React single-page application
    participant API as Node.js / Express task API
    participant DB as In-memory SQLite task database

    User->>Web: Enters task details and submits
    Web->>API: POST /api/tasks (title, description, due_date)
    API->>DB: INSERT task
    DB-->>API: Created task
    API-->>Web: 201 Created with task JSON
    Web-->>User: Shows the new task in the list
```

The frontend is responsible for the task-management experience. The backend exposes task CRUD, search, filtering, sorting, and completion-status operations through `/api/tasks`. The current SQLite database is in-memory, so task data is reset when the backend process restarts.