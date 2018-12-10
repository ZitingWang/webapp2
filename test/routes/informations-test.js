import chai from 'chai';
import chaiHttp from 'chai-http' ;
import server from '../../bin/www';
let expect = chai.expect;
import things from 'chai-things'
chai.use( things);
chai.use(chaiHttp);
import _ from 'lodash' ;
import request from 'supertest';
describe('Informations', function (){
    describe('GET /informations',  () => {
        it('should return all the informations in an array', function(done) {
            request(server)
                .get('/informations')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    done();
                });
        });
        it('should return one of the informations in an array', function(done) {
            request(server)
                .get('/informations/5c0d5eb63c234784e0d8245b')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { id: inf.id,
                            username: inf.username,
                            sex: inf.sex}
                    });
                    expect(result).to.include( { id: 998, username:"bj",sex: "male"  } );
                    done();
                });

        });
    });
    describe('POST /informations', function () {
        it('should return confirmation message and update datastore', function(done) {
            let information = {
                id : 1000,
                username: 'test' ,
                sex: 'male',
                amountofmessage: 0
            };
            chai.request(server)
                .post('/informations')
                .send(information)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Information Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/informations')
                .end(function(err, res) {
                    let result = _.map(res.body, (information) => {
                        return { username: information.username,
                            sex: information.sex };
                    });
                    expect(result).to.include( { username: 'test', sex: 'male'  } );
                    done();
                });
        });
    });
    /*describe('GET /informations/f/:key',  () => {
        it('should return one of the informations in an array by fuzzy search', function(done) {
            chai.request(server)
                .get('/informations/f/t')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { id: inf.id,
                            username: inf.username,
                            sex: inf.sex}
                    });
                    //expect(result).to.include( { id: 999, username:"wzt",sex: "male"  } );
                    done();
                });
        });
    });*/
    describe('PUT /informations/:username', () => {
        it('should return a message and the information amountofmessage by 1', function(done) {
            chai.request(server)
                .put('/informations/test')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message ;
                    expect(information).to.include('Information Successfully Increased!');
                    done();
                });
        });
    });
    describe('GET /informations/a/aom', function () {
        it('should return the total amount of messages', function(done) {
            request(server)
                .get('/informations/a/aom')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.include( {"totalmessages":1} );
                    done();
                });
        });
    });
    describe('DELETE /informations/username', function () {
        it('should return Information Successfully Deleted!', function(done) {
            chai.request(server)
                .delete('/informations/test')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message;
                    expect(information).to.include('Information Successfully Deleted!');
                    done();
                });
        });
    });
});
