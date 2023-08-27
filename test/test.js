// Import the Chai assertion library
const chai = require('chai');
// Import the Chai-HTTP plugin to enable HTTP request testing
const chaiHttp = require('chai-http');
// Import the server file, which defines the app and its routes
const server = require('../server');
// Use the 'should' assertion style from Chai
const should = chai.should();

// Use Chai-HTTP for all subsequent tests in this file
chai.use(chaiHttp);

// Describe the test suite for the "Cats API"
describe('Cats API', () => {
    // Describe the test case for the GET method to retrieve all cats
    describe('/GET cats', () => {
        // Define what the test should do
        it('Should GET all the cats', (done) => {
            // Send a GET request to the server
            chai.request(server)
                .get('/api/cats')
                .end((err, res) => {
                    // Assertions to verify the response
                    res.should.have.status(200); // Should return status 200 OK
                    res.body.should.be.a('object'); // Response should be an object
                    res.body.should.have.property('statusCode').eql(200); // // Should have statusCode property of 200
                    res.body.should.have.property('data').be.a('array');
                    res.body.should.have.property('message').eql('Get All Cats successful');

                    // Call the 'done' function to indicate that the test is complete
                    done();
                });
        });
    });

    //.............................................................................................

    describe('/GET cats when database is empty', () => {
        it('it should GET an empty array', (done) => {
            chai.request(server)
                .get('/api/cats')
                .end((err, res) => {
                    if (err || res.status !== 200) {
                        console.log(res.body);  // Output the body for debugging
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('statusCode').eql(200);
                    res.body.should.have.property('data').be.a('array').that.is.empty;
                    res.body.should.have.property('message').eql('Get All Cats successful');
                    done();
                });
        });
    });

    //................... Pass Test.........................................................................
    describe('/POST cat with duplicate title', () => {
        it('it should not POST a cat with a duplicate title', (done) => {
            const cat = {
                title: 'Duplicate Cat',  // Assuming there's already a cat with this title in DB
                subTitle: 'Test Subtitle',
                path: '/path/to/image',
                description: 'Test Description'
            };
            chai.request(server)
                .post('/api/cat')
                .send(cat)
                .end((err, res) => {
                    if (err || res.status !== 500) {
                        console.log(res.body);  // Output the body for debugging
                    }
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Failed to post cat.');
                    done();
                });
        });
    });
    //.................................................................................................


    //..............................................................................
    describe('/POST cat', () => {
        it('it should POST a cat ', (done) => {
            const cat = {
                title: 'Test Cat',
                subTitle: 'Test Subtitle',
                path: '/path/to/image',
                description: 'Test Description'
            };
            chai.request(server)
                .post('/api/cat')
                .send(cat)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('statusCode').eql(201);
                    res.body.should.have.property('message').eql('success');
                    done();
                });
        });
    });

    describe('/POST cat with missing fields', () => {
        it('it should not POST a cat without title field', (done) => {
            const cat = {
                subTitle: 'Test Subtitle',
                path: '/path/to/image',
                description: 'Test Description'
            };
            chai.request(server)
                .post('/api/cat')
                .send(cat)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('message').eql('Failed to post cat.');
                    done();
                });
        });
    });

    describe('/GET status', () => {
        it('it should GET the server status', (done) => {
            chai.request(server)
                .get('/status')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql("Server is running");
                    done();
                });
        });
    });
});