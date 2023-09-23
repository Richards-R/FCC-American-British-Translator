const americanOnly = require("./american-only.js");
const britishOnly = require("./british-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
let locale = require("../routes/api.js");

class Translator {
  
  checkWordLists(text, locale) {
    let wordList = "";
    let wordListKeys = false;
    let wordListValues = "";
    
    const getKeyByValue = (obj, val) =>
    Object.keys(obj).find((key) => obj[key] === val);

    if (locale === "american-to-british") {
      wordList = americanOnly;}

    if (locale === "british-to-american") {
      wordList = britishOnly;}

    wordListKeys = Object.keys(wordList).includes(text);

    if (wordListKeys === true) {
      // console.log(wordList[text])
      
      return wordList[text];
    }
      
     if (wordListKeys === false) {
       
     wordList = americanToBritishSpelling;

      wordListKeys = Object.keys(wordList).includes(text);
      if (wordListKeys === false){
        wordListKeys = Object.values(wordList).includes(text);
      }
      
      if (locale === "american-to-british" && wordListKeys === true){ 
         console.log("wordList[text]0000 ", wordList[text])
        return wordList[text]
        
      } else if (locale === "british-to-american" && wordListKeys === true) {

          const A2BSpellkeyResult = getKeyByValue(wordList, text);
          console.log("A2BSpellkeyResult ", A2BSpellkeyResult);
          return A2BSpellkeyResult;
      
      } else {
      
      wordList = americanToBritishTitles;
      
      console.log("Titleswordlist", wordList)
      
         wordListKeys = Object.keys(wordList).includes(text);
      if (wordListKeys === false){
        wordListKeys = Object.values(wordList).includes(text);
      }
      
      if (locale === "american-to-british" && wordListKeys === true) {
         console.log("wordList[text]1224", wordList[text])
        return wordList[text]
        
      } else if (locale === "british-to-american" && wordListKeys === true) {
          const titleskeyResult = getKeyByValue(wordList, text);
          console.log("TitleskeyResult ", titleskeyResult);
          return titleskeyResult;
       }
      }
    }
  }
}
module.exports = Translator;