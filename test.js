process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./app.js');
var should = chai.should();

chai.use(chaiHttp);

/*
  * Test the /GET route
  * /api/santiago
  */
  describe('/GET api/:city', () => {
      it('Retorna datos AQI e info de ciudad', (done) => {
        chai.request(server)
            .get('/api/santiago')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('city');
                res.body.should.have.property('data');
                res.body.should.have.property('status');
              done();
            });
      });
  });

/*
  * Test the /GET route
  * /api/notcity
  */
describe('/GET api/:city', () => {
      it('Retorna datos AQI e info de ciudad', (done) => {
        chai.request(server)
            .get('/api/notcity')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('data');  res.body.should.have.property('status');
              done();
            });
      });
  });