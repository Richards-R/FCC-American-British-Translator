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
      
      let returnedTranslatedWord = 
        //translator.checkWordLists(text, locale);
        translator.translateFunc(text, locale);
      return res.json({"translation" : returnedTranslatedWord}) 
    });
};


