const request = require('supertest');

const {app,} = require('../app');

test('GET request to be 200', done => {
    request(app)
        .get('/user/1')
        .expect(200)
        .end((err, res) => {
            if (err) throw new Error(`${err}`);
            done();
        });
});