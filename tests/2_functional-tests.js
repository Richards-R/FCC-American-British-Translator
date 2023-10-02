const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

const agent = chai.request.agent(server).keepOpen(); // to keep app accessible after testing

suite('Functional Tests', () => {

  // after(function() {
  //   chai.request(server).get("/api");
  // });

  suite("POST /api/translate/{text, locale} ",
    function() {
      test("FT 1. Translation with text and locale fields", function(done) {
        let inputText = "Mangoes are my favorite fruit.";
        let locale = "american-to-british";
        let expectedTransOutput = "Mangoes are my <span class=\"highlight\">favourite</span> fruit.";
          agent
        // chai
          // .request(server)
          .post("/api/translate")
          .send({ text: inputText, locale: locale })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.text, inputText);
            assert.equal(res.body.translation, expectedTransOutput);
            done();
          });
      });

      test("FT 2. Translation with text and invalid locale field", function(done) {
        let inputText = "Mangoes are my favorite fruit.";
        let locale = "american-to-japanese";
        agent
        // chai
         // .request(server)
          .post("/api/translate")
          .send({ text: inputText, locale: locale })
          .end(function(err, res) {
            assert.equal(res.body.error, "Invalid value for locale field");
            done();
          });
      });

      test("FT 3. Translation with missing text field", function(done) {
        let locale = "american-to-british";
          agent
        // chai
        // .request(server)
          .post("/api/translate")
          .send({ locale: locale })
          .end(function(err, res) {
            assert.equal(res.body.error, "Required field(s) missing");
            done();
          });
      });

      test("FT 4. Translation with missing locale field", function(done) {
        let inputText = "Mangoes are my favorite fruit.";
             agent
        // chai
        //  .request(server)
          .post("/api/translate")
          .send({ text: inputText })
          .end(function(err, res) {
            assert.equal(res.body.error, "Required field(s) missing");
            done();
          });
      });

      test("FT 5. Translation with with empty text", function(done) {
        let inputText = "";
        let locale = "american-to-british";
            agent
        // chai
        //  .request(server)
          .post("/api/translate")
          .send({ text: inputText, locale: locale })
          .end(function(err, res) {
            assert.equal(res.body.error, "No text to translate");
            done();
          });
      });

      test("FT 6. Translation with text that needs no translation", function(done) {
        let inputText = "Mangoes are my favourite fruit.";
        let locale = "american-to-british";
             agent
        // chai
        //  .request(server)
          .post("/api/translate")
          .send({ text: inputText, locale: locale })
          .end(function(err, res) {
            assert.equal(res.body.translation, "Everything looks good to me!");
            done();
          });
      });
    });

});
