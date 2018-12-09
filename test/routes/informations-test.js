import chai from 'chai';
import chaiHttp from 'chai-http' ;
import server from '../../bin/www';
let expect = chai.expect;
import things from 'chai-things'
chai.use( things);
chai.use(chaiHttp);
const request = require('supertest');
let _ = require('lodash' );
describe('Informations', function (){
    describe('POST /informations', function () {
        it('should return confirmation message and update datastore', function(done) {
            let information = {
                id : 1000,
                username: 'test' ,
                sex: 'male',
                amountofmessage: 0
            };
            request(server)
                .post('/informations')
                .send(information)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Information Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            request(server)
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
    describe('GET /informations',  () => {
        it('should return all the informations in an array', function(done) {
            request(server)
                .get('/informations')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (inf) => {
                        return { id: inf.id,
                            username: inf.username,
                            sex: inf.sex}
                    });
                    expect(result).to.include( { id: 1000, username:"test",sex: "male"  } );
                    done();
                });
        });
        it('should return one of the informations in an array by fuzzy search', function(done) {
            request(server)
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
                    expect(result).to.include({username:"test",sex: "male"});
                    done();
                });
        });
    });
    describe('PUT /informations/:username', () => {
        it('should return a message and the information amountofmessage by 1', function(done) {
            request(server)
                .put('/informations/test')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message ;
                    expect(information).to.include('Information Successfully Increased!');
                    done();
                });
        });
    });
    describe('DELETE /informations/:username', function () {
        it('should return Information Successfully Deleted!', function(done) {
            request(server)
                .delete('/informations/test')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message;
                    expect(information).to.include('Information Successfully Deleted!');
                    done();
                });
        });
    });
    describe('DELETE /informations', function () {
        it('should return All of the Informations Successfully Deleted!', function(done) {
            request(server)
                .delete('/informations')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message;
                    expect(information).to.include('All of Information Successfully Deleted!');
                    done();
                });
        });

    });
});
