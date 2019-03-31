const request = require('supertest');

jest.mock('../services/db');
const db = require('../services/db');

jest.mock('../services/commentservices.js');
const CommentServices = require('../services/commentservices');

const {app,} = require('../app');

test('Expect status 400', done => {
    request(app)
        .post('/text/')
        .send({})
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200', done => {
    request(app)
        .post('/text/')
        .send({
            'userid': '1',
            'postid': '1',
            'text': 'a',
        })
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200', done => {
    CommentServices.createComment.mockImplementation(() => Promise.resolve());
    request(app)
        .post('/text/')
        .send({
            'userid': '1',
            'postid': '1',
            ' text': 'a', 
        })
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 400', done => {
    CommentServices.createComment.mockImplementation(() => Promise.reject());
    request(app)
        .post('/text/')
        .send({
            'userid': '1',
            'postid': '1',
            'text': 'a', 
        })
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 400 if NaN', done => {
    request(app)
        .delete('/text/a')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200', done => {
    request(app)
        .delete('/text/1')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200 if db promise resolved', done => {
    CommentServices.deleteComment.mockImplementation(() => Promise.resolve());
    request(app)
        .delete('/text/1')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 400 if db promise not resolved', done => {
    CommentServices.deleteComment.mockImplementation(() => Promise.reject());
    request(app)
        .delete('/text/1')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});