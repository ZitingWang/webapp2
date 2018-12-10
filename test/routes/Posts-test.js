import chai from 'chai';
import chaiHttp from 'chai-http' ;
import server from '../../bin/www';
let expect = chai.expect;
import things from 'chai-things'
chai.use( things);
chai.use(chaiHttp);
import _ from 'lodash';
import request from 'supertest';
describe('Posts', function (){
    describe('GET /Post',  () => {
        it('should return all the posts in an array', function(done) {
            request(server)
                .get('/Post')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(6);
                    done();
                });
        });
    });
    describe('POST /Post', function () {
        it('should return confirmation message and update datastore', function(done) {
            let post = {
                writer: 'test' ,
                content: 'xxxxxx',
                likenumber: 0
            };
            request(server)
                .post('/Post')
                .send(post)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Post sent by test Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            request(server)
                .get('/Post')
                .end(function(err, res) {
                    let result = _.map(res.body, (post) => {
                        return { writer: post.writer,
                            content: post.content };
                    });
                    expect(result).to.include( { writer: 'test', content: 'xxxxxx'  } );
                    done();
                });
        });
    });
    /*describe('GET /Post/f/:key',  () => {
        it('should return one of the informations in an array by fuzzy search', function(done) {
            chai.request(server)
                .get('/Post/f/t')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (post) => {
                        return { writer: post.writer,
                            content: post.content };
                    });
                    //expect(result).to.include( { id: 999, username:"wzt",sex: "male"  } );
                    done();
                });
        });
    });*/
    describe('PUT /Post/:writer/uplike', () => {
        it('should return a message and the information amountofmessage by 1', function(done) {
            request(server)
                .put('/Post/test/uplike')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message ;
                    expect(information).to.include('Post likenumber Successfully Increased!');
                    done();
                });
        });
    });
    describe('DELETE /Post/:username', function () {
        it('should return Post Successfully Deleted!', function(done) {
            request(server)
                .delete('/Post/test')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message;
                    expect(information).to.include('Post Successfully Deleted!');
                    done();
                });
        });
    });
});
