const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
chaiServer = chai.request(app).keepOpen()


describe('POST /login', () => {  
    it('testa  login válido', (done) => {
        const loginData = {
            email: 'email@email.com',
            password: '123456'
        }
        chaiServer
        .post("/api/login")
        .send(loginData)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token').length(16);
            done();
        });
    });

    it('testa  login com e-mail inválido', (done) => {
        const loginData = {
            email: 'email.com',
            password: '123456'
        }
        chaiServer
        .post("/api/login")
        .send(loginData)
        .end((_err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Campos inválidos');
            done();
        });
    });

    it('testa  login com e-password inválido', (done) => {
        const loginData = {
            email: 'email@email.com',
            password: '12346'
        }
        chaiServer
        .post("/api/login")
        .send(loginData)
        .end((_err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Campos inválidos');
            done();
        });
    });
});