const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);
chaiServer = chai.request(app).keepOpen()


describe('/crypto/btc', () => {  
    const route = "/api/crypto/btc";
    
    it('/POST testa  chamada sem token', (done) => {
        chaiServer
        .post(route)
        .send()
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Token inválido');
            done();
        });
    });

    it('/POST testa  chamada com token', (done) => {
        const postData = {
            "currency": "BRL",
            "value": "10"
          }
        chaiServer
        .post(route)
        .set({'Authorization': 'ayhdtge5t6i18dhY'})
        .send(postData)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Valor alterado com sucesso!');
            done();
        });
    });

    it('/GET testa chamada sem token', (done) => {
        chaiServer
       .get(route)
       .end((_err, res) => {
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
        .end((_err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('bpi').to.be.a('object');
            res.body.should.have.property('bpi').to.have.keys('BRL', 'BTC', 'CAD', 'EUR', 'USD')
            done();
        });
    });
});