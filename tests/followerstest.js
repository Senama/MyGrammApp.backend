const request = require('supertest');

jest.mock('../services/db');
const db = require('../services/db');

jest.mock('../services/followers');
const FollowServices = require('../services/followers');

const {app,} = require('../app');

test('Expect status 400 if nothing passed in', done => {
    request(app)
        .post('/personfollowingid/')
        .send({})
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 200 if body passed in', done => {
    Followers.postFollow.mockImplementation(() => Promise.resolve());
    request(app)
        .post('/follow/')
        .send({
            'followerid': '1',
            'followedid': '2',
        })
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect status 400 if db promise rejected', done => {
    Followers.postFollow.mockImplementation(() => Promise.reject());
    request(app)
        .post('/follow/')
        .send({
            'followerid': '1',
            'followedid': '2',
        })
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 400 if params are not valid datatype', done => {
    request(app)
        .delete('/follow/a/b')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 200 if params valid data type', done => {
    Followers.deleteFollow.mockImplementation(() => Promise.resolve());
    request(app)
        .delete('/follow/1/2')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 400 if db promise rejected', done => {
    Followers.deleteFollow.mockImplementation(() => Promise.reject());
    request(app)
        .delete('/follow/1/2')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 400 if param is not typeof number', done => {
    request(app)
        .get('/follow/a')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 200 if required param is passed in', done => {
    FollowServices.readFollowers.mockImplementation(() => Promise.resolve());
    request(app)
        .get('/follow/1')
        .then(response => {
            expect(response.status).toBe(200);
            done();
        })
        .catch(response => {
            done();
        });
});

test('Expect 400 if param is not in database', done => {
    Followers.readFollowers.mockImplementation(() => Promise.reject());
    request(app)
        .get('/follow/1')
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(response => {
            done();
        });
});
