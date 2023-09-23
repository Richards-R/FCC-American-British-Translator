'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
     console.log(req.body)
      let {text, locale} = req.body;
      console.log("locale ", locale)
      console.log("text ", text)
      if (locale = 'american-to-british'){
      let americanOnlyCheck = translator.checkIfAmericanOnly(text);
     console.log(americanOnlyCheck)
    return res.json({"translation" : americanOnlyCheck}) }
    });
};
