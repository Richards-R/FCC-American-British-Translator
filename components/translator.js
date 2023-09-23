const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

 checkIfAmericanOnly(text){
   
   let americanOnlyKeys = Object.keys(americanOnly).includes(text)
   console.log(americanOnlyKeys)
   
   if (americanOnlyKeys === true){
     console.log(americanOnly[text])
     return americanOnly[text];
    }
 } 
  
 // console.log(Object.keys(americanOnly).includes(text))

}

module.exports = Translator;