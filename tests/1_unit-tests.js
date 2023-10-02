const chai = require('chai');
const assert = chai.assert;
const server = require('../server.js');

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {
  after(function() {
    chai.request(server).get("/api");
  });

  suite("A. To British tests", function() {
    let locale = "american-to-british";
    test("T1. Translate Mangoes are my favorite fruit. to British English",
      function(done) {
        let inputText = "Mangoes are my favorite fruit.";
        let expectedTransOutput = "Mangoes are my <span class=\"highlight\">favourite</span> fruit."
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T2. I ate yogurt for breakfast. to British English",
      function(done) {
        let inputText = "I ate yogurt for breakfast.";
        let expectedTransOutput = "I ate <span class=\"highlight\">yoghurt</span> for breakfast.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T3. We had a party at my friend's condo. to British English",
      function(done) {
        let inputText = "We had a party at my friend's condo.";
        let expectedTransOutput = "We had a party at my friend's <span class=\"highlight\">flat</span>.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T4. Can you toss this in the trashcan for me? to British English",
      function(done) {
        let inputText = "Can you toss this in the trashcan for me?";
        let expectedTransOutput = "Can you toss this in the <span class=\"highlight\">bin</span> for me?";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T5. The parking lot was full. to British English",
      function(done) {
        let inputText = "The parking lot was full.";
        let expectedTransOutput = "The <span class=\"highlight\">car park</span> was full.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T6. Like a high tech Rube Goldberg machine. to British English",
      function(done) {
        let inputText = "Like a high tech Rube Goldberg machine.";
        let expectedTransOutput = "Like a high tech <span class=\"highlight\">Heath Robinson device</span>.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T7. To play hooky means to skip class or work. to British English",
      function(done) {
        let inputText = "To play hooky means to skip class or work.";
        let expectedTransOutput = "To <span class=\"highlight\">bunk off</span> means to skip class or work.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T8. No Mr. Bond, I expect you to die. to British English",
      function(done) {
        let inputText = "No Mr. Bond, I expect you to die.";
        let expectedTransOutput = "No <span class=\"highlight\">Mr</span> Bond, I expect you to die.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T9. Dr. Grosh will see you now. to British English",
      function(done) {
        let inputText = "Dr. Grosh will see you now.";
        let expectedTransOutput = "<span class=\"highlight\">Dr</span> Grosh will see you now.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T10. Lunch is at 12:15 today. to British English",
      function(done) {
        let inputText = "Lunch is at 12:15 today.";
        let expectedTransOutput = "Lunch is at <span class=\"highlight\">12.15</span> today.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });
  });

  suite("B. To American tests", function() {
    let locale = "british-to-american";
    test("T11. We watched the footie match for a while. to American English",
      function(done) {
        let inputText = "We watched the footie match for a while.";
        let expectedTransOutput = "We watched the <span class=\"highlight\">soccer</span> match for a while.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T12. Paracetamol takes up to an hour to work. to American English",
      function(done) {
        let inputText = "Paracetamol takes up to an hour to work.";
        let expectedTransOutput = "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T13. First, caramelise the onions. to American English",
      function(done) {
        let inputText = "First, caramelise the onions.";
        let expectedTransOutput = "First, <span class=\"highlight\">caramelize</span> the onions.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T14. I spent the bank holiday at the funfair. to American English",
      function(done) {
        let inputText = "I spent the bank holiday at the funfair.";
        let expectedTransOutput = "I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T15. I had a bicky then went to the chippy. to American English",
      function(done) {
        let inputText = "I had a bicky then went to the chippy.";
        let expectedTransOutput = "I had a <span class=\"highlight\">cookie</span> then went to the <span class=\"highlight\">fish-and-chip shop</span>.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T16. I've just got bits and bobs in my bum bag. to American English",
      function(done) {
        let inputText = "I've just got bits and bobs in my bum bag.";
        let expectedTransOutput = "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });


    test("T17. The car boot sale at Boxted Airfield was called off. to American English",
      function(done) {
        let inputText = "The car boot sale at Boxted Airfield was called off.";
        let expectedTransOutput = "The <span class=\"highlight\">swap meet</span> at Boxted Airfield was called off.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T18. Have you met Mrs Kalyani? to American English",
      function(done) {
        let inputText = "Have you met Mrs Kalyani?";
        let expectedTransOutput = "Have you met <span class=\"highlight\">Mrs.</span> Kalyani?";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T19. Prof Joyner of King's College, London.",
      function(done) {
        let inputText = "Prof Joyner of King's College, London.";
        let expectedTransOutput = "<span class=\"highlight\">Prof.</span> Joyner of King's College, London.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T20. Tea time is usually around 4 or 4.30. to American English",
      function(done) {
        let inputText = "Tea time is usually around 4 or 4.30.";
        let expectedTransOutput = "Tea time is usually around 4 or <span class=\"highlight\">4:30</span>.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });
  });

  suite("C. Highlight change tests", function() {
    test("T21. Highlight translation in Mangoes are my favorite fruit.",
      function(done) {
        let locale = "american-to-british";
        let inputText = "Mangoes are my favorite fruit.";
        let expectedTransOutput = "Mangoes are my <span class=\"highlight\">favourite</span> fruit.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T22. Highlight translation in I ate yogurt for breakfast.",
      function(done) {
        let locale = "american-to-british";
        let inputText = "I ate yogurt for breakfast.";
        let expectedTransOutput = "I ate <span class=\"highlight\">yoghurt</span> for breakfast.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T23. Highlight translation in We watched the footie match for a while.",
      function(done) {
        let locale = "british-to-american";
        let inputText = "We watched the footie match for a while.";
        let expectedTransOutput = "We watched the <span class=\"highlight\">soccer</span> match for a while.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

    test("T24. Highlight translation in Paracetamol takes up to an hour to work.",
      function(done) {
        let locale = "british-to-american";
        let inputText = "Paracetamol takes up to an hour to work.";
        let expectedTransOutput = "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.";
        let result = { text: inputText, translation: expectedTransOutput };
        assert.deepEqual(translator.translateFunc(inputText, locale), result);
        done();
      });

  });

});
