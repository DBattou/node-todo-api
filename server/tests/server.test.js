const expect = require('expect');
const request = require('supertest')

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed')
const { ObjectId } = require('mongodb')

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {
  it('Should add a new todo', (done) => {
    var text = 'test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e))
      })
  });

  it('Should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos[0].text).toEqual(todos[0].text);
        expect(res.body.todos[1].text).toEqual(todos[1].text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos/:id', () => {
  it('Should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should receive a 404', (done) => {
    var hexId = todos[0]._id.toHexString();

    request(app)
      .get(`/todos/${hexId}` + 'coucou')
      .expect(404)
      .end(done)
  });

  it('Should receive a empty todo', (done) => {
    request(app)
      .get(`/todos/${123}`)
      .expect(404)
      .end(done)
  });
});

describe('DELETE /todos/:id', () => {
  it('Should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return a 404 if todo is not found', (done) => {
    var id = new ObjectId().toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done)
  });

  it('Should return 404 object is not valid', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}coucou`)
      .expect(404)
      .end(done)
  });
});



describe('PATCH /todos/:id', () => {
  it('Should modify a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof(res.body.todo.completedAt)).toBe('number');
      })
      .end(done)
  })
})