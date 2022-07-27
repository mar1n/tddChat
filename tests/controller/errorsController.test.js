const errors = require("../../src/controller/errors");


const req = jest.fn();
const res = {
    status: jest.fn(),
    json: jest.fn()
}
const next = jest.fn();

describe('Errors Controller', () => {
    test('should first', () => {
        const err = { name: "Validation" };
        errors(err, req, res, next);
        expect(res.status.mock.calls.length).toEqual(1);
        expect(res.status.mock.calls[0][0]).toEqual(500);
     })
});