const request = require("supertest");
var app = require("./server").app;

describe('server test suite with super-test', function () {
    it('should return welcome message', function (done) {
        request(app)
            .get('/')
            .expect(200)
            .end(done);
    });
});