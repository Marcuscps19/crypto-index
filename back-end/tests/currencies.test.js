const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');


chai.should();
chai.use(chaiHttp);
chaiServer = chai.request(app).keepOpen()


describe('/currencies', () => {  
    const route = "/api/currencies";
    
    it('/GET testa  chamada sem token', (done) => {
        chaiServer
        .get(route)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Token inválido');
            done();
        });
    });

    it('/GET testa chamada com token', (done) => {
        chaiServer
        .get(route)
        .set({'Authorization': 'ayhdtge5t6i18dhY'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.keys('BRL', 'EUR', 'CAD');
            done();
        });
    });
});