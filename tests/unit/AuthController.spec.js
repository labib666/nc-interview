const chai = require('chai');
const sinon = require('sinon');
const createError = require('http-errors');

const JWT = require('jsonwebtoken');
const Token = require('../../models/Token');
const auth = require('../../controllers/AuthController');

const sandbox = sinon.createSandbox();
const expect = chai.expect;

describe('Test for AuthController:getUserData', function () {
    let req, res, resJsonSpy, resStatusSpy, nextSpy;

    // before each test
    beforeEach( function (done) {
        req = {
            token: 'abcdd'
        };
        resJsonSpy = sandbox.spy();
        res = {
            json: resJsonSpy
        };
        resStatusSpy = sandbox.stub().returns(res);
        nextSpy =  sandbox.spy();
        done();
    });

    // after each test
    afterEach( function (done) {
        sandbox.restore();
        done();
    });

    // tests

    it('placeholder', function (done) {
        expect(1+1).to.equal(2);
        done();
    });

    it('a valid token', function (done) {
        sandbox.stub(JWT, 'verify')
            .returns({
                _id: 'abcd',
                isModerator: false
            });

        sandbox.stub(Token, 'findOne')
            .callsFake( function(token) {
                return new Promise( resolve => {
                    resolve(token);
                });
            });
        
        auth.getUserData(req, { status: resStatusSpy }, nextSpy);
        
        setTimeout(function() {
            expect(nextSpy.callCount).to.equal(1);
            expect(resJsonSpy.callCount).to.equal(0);
            expect(nextSpy.args[0].length).to.equal(0);
            expect(req.user._id).to.equal('abcd');
            done();
        }, 250);
    });
    
    it('token is expired', function (done) {
        sandbox.stub(JWT, 'verify')
            .throws(createError(401));

        sandbox.stub(Token, 'findOne')
            .callsFake( function(token) {
                return new Promise( resolve => {
                    resolve(token);
                });
            });
        
        auth.getUserData(req, { status: resStatusSpy }, nextSpy);
        
        setTimeout(function() {
            expect(nextSpy.callCount).to.equal(1);
            expect(resJsonSpy.callCount).to.equal(0);
            expect(nextSpy.args[0].length).to.equal(0);
            expect(req.user).to.equal(null);
            done();
        }, 250);
    });
});
