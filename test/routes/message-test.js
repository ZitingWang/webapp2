import chai from 'chai';
import chaiHttp from 'chai-http' ;
import server from '../../bin/www';
let expect = chai.expect;
import things from 'chai-things'
chai.use( things);
chai.use(chaiHttp);
import _ from 'lodash' ;
import request from 'supertest';
describe('Message', function (){
        describe('GET /message',  () => {
        it('should return all the messages in an array', function(done) {
            chai.request(server)
                .get('/message')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(4);
                    done();
                });
        });
        it('should return one of the messages in an array', function(done) {
            request(server)
                .get('/message/5bd304a01cfbbb49085ee606')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { sender: inf.sender,
                            content: inf.content}
                    });
                    expect(result).to.include( { sender : "bj", content : "This mine!"  } );
                    done();
                });
        });
    });
    describe('POST /message', function () {
        it('should return confirmation message and update datastore', function(done) {
            let information = {
                sender: 'test' ,
                content: '123'
            };
            request(server)
                .post('/message')
                .send(information)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Message sent by test Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            request(server)
                .get('/message')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(5);
                    done();
                });
        });
    });

    describe('DELETE /message/:sender', function () {
        describe('DELETE /message/:sender', function () {
            it('should return Information Successfully Deleted!', function(done) {
                request(server)
                    .delete('/message/test')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        let information = res.body.message;
                        expect(information).to.include('Message Successfully Deleted!');
                        done();
                    });
            });
            after(function  (done) {
                request(server)
                    .get('/message/f/123')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.empty
                        done();
                    });
            });
        });
        describe('DELETE /message/:sender', function () {
            it('should return message Deleted err!', function(done) {
                request(server)
                    .delete('/message/tt')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });
    });
});
