let Server = require('../server.js');

let expect = require('chai').expect;
let request = require('request');

// testing to see if the server render correctly
describe("Server status and API fetch", () => {
    it('status', function (completed) {
        request('http://localhost:8000/', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            completed();
        })
    })

    //testing the fetch to the API
    it('fetch correct data', () => {
        let term = 'adele'
        let option = 'artistName'
        request(`https://itunes.apple.com/search?term=${term}&media=${option}`, function (error, response, body) {
            expect(response.statusCode).to.equal(200)
        });
    })
})