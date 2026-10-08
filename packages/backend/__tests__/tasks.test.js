const request = require('supertest');
const { app, db } = require('../src/app');

afterAll(() => {
  if (db) db.close();
});

describe('Tasks API', () => {
  let taskId;

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', description: 'A test task', due_date: '2025-09-30' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Task');
    expect(res.body.description).toBe('A test task');
    expect(res.body.due_date).toBe('2025-09-30');
    expect(res.body.completed).toBe(0);
    taskId = res.body.id;
  });

  it('should get all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a single task by id', async () => {
    const res = await request(app).get(`/api/tasks/${taskId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: 'Updated Task', description: 'Updated', due_date: '2025-10-01' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Task');
    expect(res.body.description).toBe('Updated');
    expect(res.body.due_date).toBe('2025-10-01');
  });

  it('should mark a task as completed', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(1);
  });

  it('should delete a task', async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.status).toBe(204);
  });

  describe('priority', () => {
    it('defaults to P3 when no priority is given', async () => {
      const res = await request(app).post('/api/tasks').send({ title: 'No priority' });
      expect(res.status).toBe(201);
      expect(res.body.priority).toBe('P3');
    });

    it('stores an explicit priority on create', async () => {
      const res = await request(app).post('/api/tasks').send({ title: 'Urgent', priority: 'P1' });
      expect(res.status).toBe(201);
      expect(res.body.priority).toBe('P1');
    });

    it('rejects an invalid priority on create', async () => {
      const res = await request(app).post('/api/tasks').send({ title: 'Bad', priority: 'P4' });
      expect(res.status).toBe(400);
    });

    it('updates priority via PATCH without changing completion', async () => {
      const created = await request(app).post('/api/tasks').send({ title: 'Patch me' });
      const res = await request(app).patch(`/api/tasks/${created.body.id}`).send({ priority: 'P2' });
      expect(res.status).toBe(200);
      expect(res.body.priority).toBe('P2');
      expect(res.body.completed).toBe(0);
    });

    it('rejects an invalid priority on PATCH', async () => {
      const created = await request(app).post('/api/tasks').send({ title: 'Patch me too' });
      const res = await request(app).patch(`/api/tasks/${created.body.id}`).send({ priority: 'high' });
      expect(res.status).toBe(400);
    });

    it('keeps priority when a task is edited via PUT', async () => {
      const created = await request(app).post('/api/tasks').send({ title: 'Keep', priority: 'P1' });
      const res = await request(app).put(`/api/tasks/${created.body.id}`).send({ title: 'Kept' });
      expect(res.status).toBe(200);
      expect(res.body.priority).toBe('P1');
    });
  });
});
