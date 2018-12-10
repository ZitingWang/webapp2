import chai from 'chai';
import chaiHttp from 'chai-http' ;
import server from '../../bin/www';
let expect = chai.expect;
import things from 'chai-things'
chai.use( things);
chai.use(chaiHttp);
import _ from 'lodash' ;
import request from 'supertest';

describe('User', function (){

    describe('GET /user',  () => {
        it('should return all the users in an array', function(done) {
            request(server)
                .get('/user')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return {username: inf.username,
                            password: inf.password}
                    });
                    expect(result).to.include( {username:"bj",password: "b123456"  } );
                    done();
                });
        });
        it('should return one of the users in an array', function(done) {
            request(server)
                .get('/user/5c0e91a56f3b1029743e53c5')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return {username: inf.username,
                            password: inf.password}
                    });
                    expect(result).to.include( {username:"bj",password: "b123456"  } );
                    done();
                });

        });
    });
    describe('POST /user', function () {
        it('should return confirmation message and update datastore', function(done) {
            let information = {
                username: 'test' ,
                password: 'mmxzs66'
            };
            request(server)
                .post('/user')
                .send(information)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('User Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            request(server)
                .get('/user')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    let result = _.map(res.body, (inf) => {
                        return {username: inf.username,
                            password: inf.password}
                    });
                    expect(result).to.include( {username:"test",password: "mmxzs66"  } );
                    done();
                });
        });
    });
    describe('DELETE /user/:username', function () {
        describe('DELETE /user/:username', function () {
            it('should return User Successfully Deleted!', function(done) {
                request(server)
                    .delete('/user/test')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        let information = res.body.message;
                        expect(information).to.include('User Successfully Deleted!');
                        done();
                    });
            });
            after(function  (done) {
                request(server)
                    .get('/user')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body.length).to.equal(1);
                        done();
                    });
            });
        });
        describe('DELETE /user/:username', function () {
            it('should return User Deleted err!', function(done) {
                request(server)
                    .delete('/user/jj')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });
    });
});
