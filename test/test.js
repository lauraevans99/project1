// //
// // test/test.js
// //

// var request = require('request');
// var expect = require('chai').expect;

// // DESCRIBE WHAT WE ARE TESTING
//   // SAY WHAT BEHAVIOR 'IT' AUGHT TO HAVE
//     // SEND THE REQUEST
//       // USE CHAI-EXPECT TO EXPECT THE STATUS RESULT
//       // CHECK FALSE VALUE TO SEE IF WE CAN MAKE TEST FAIL
//       // CALL DONE();

// describe('fierce-shore-7664.herokuapp.com', function() {
//   it('should have a HTTP of 200 - success', function(done) {
//     request('https://fierce-shore-7664.herokuapp.com/mainGame', function(err, res, body) {
//       expect(res.statusCode).to.equal(200);
//       // expect(res.statusCode).to.equal(300)
//       done();
//     });
//   });
// });

var request = require('request');
var expect = require('chai').expect;
var cheerio = require('cheerio');

var baseUrl = 'http://localhost:4050';

describe('Google.com', function() {
  it('should have a title of "Google"', function(done) {
    request('https://google.com/', function(err, res, body) {
      var $ = cheerio.load(body);
      var title = $('title').text();
      // expect(title).to.equal('Google');
      expect(title).to.equal('Moogle');
      done();
    });
  });
});