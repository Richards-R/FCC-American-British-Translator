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
    let wordResult = "";

   console.log("-1. text ", text)
    const getKeyByValue = (obj, val) =>
    Object.keys(obj).find((key) => obj[key] === val);

    if (locale === "american-to-british") {
      wordList = americanOnly;
    }

    if (locale === "british-to-american") {
      wordList = britishOnly;
    }

    wordListKeys = Object.keys(wordList).includes(text);

    if (wordListKeys === true) {
      console.log("0. wordlisttext ", wordList[text])

      wordResult = wordList[text];
      // return wordResult;
    }
      
     if (wordListKeys === false) {
       
     wordList = americanToBritishSpelling;

     wordListKeys = Object.keys(wordList).includes(text);
     if (wordListKeys === false){
     wordListKeys = Object.values(wordList).includes(text);
      console.log("1. onA2BwordList ", wordListKeys)
                
              if (locale === "american-to-british" && wordListKeys === true){ 
                 
              wordResult = wordList[text];
                console.log("2. wordList[text]0000 ", wordResult)
              }
            
              if (locale === "british-to-american" && wordListKeys === true) {
        
                  wordResult = getKeyByValue(wordList, text);
                  console.log("3. A2BSpellkeyResult ", wordResult);
                  // return A2BSpellkeyResult;
              } else {
                 return text;}
     }
            
            
      wordList = americanToBritishTitles;
      
      wordListKeys = Object.keys(wordList).includes(text)
       
          if (wordListKeys === false){
          wordListKeys = Object.values(wordList).includes(text);
                    
              if (locale === "american-to-british" && wordListKeys === true) {
                 console.log("4. wordList[text]1224", wordList[text])
               wordResult = wordList[text];
              }
                
              if (locale === "british-to-american" && wordListKeys === true) {
               wordResult = getKeyByValue(wordList, text);
          } 
                
          

            
          //console.log("TitleskeyResult ", wordResult);
          // return titleskeyResult;
        
      // if (wordListKeys === false){
      //   let regex = new RegExp(/(?<!\.)\.\z/);
      //   let hasPeriod = regex.test(text);
      //   if (hasPeriod){
      //   wordResult = this.checkWordLists(newText, locale);
      // }
          }
              } 
 return wordResult;
  }


  translateFunc(text, locale){
    let postTranslateArray = [];
    let textArray = text.split(' ');
    console.log("textArr", textArray)
    console.log("textArrISARRAY ", Array.isArray(textArray))

    for (let i = 0; i < textArray.length; i++){
       console.log("5. textArray[i]", textArray[i])
     let testWord = this.checkWordLists(textArray[i], locale);
      console.log("6. testWord", testWord)
      let hasPeriod = textArray[i].endsWith(".");
      console.log("7. has period ", hasPeriod)
      
      if (testWord === "" && hasPeriod === true){
      let deperiodedWord = textArray[i].replace(".", "")
        console.log("deperiodedWord ", deperiodedWord)
      let translatedDeperiodedWord = this.checkWordLists(deperiodedWord, locale);
          if (translatedDeperiodedWord != "") {
        postTranslateArray.push(translatedDeperiodedWord)
         console.log("7.5. translatedDeperiodedWord word ", translatedDeperiodedWord)    
        }else if (translatedDeperiodedWord === "") {   
         postTranslateArray.push(textArray[i])
        console.log("8. nottranslating word ", textArray[i])
      }else{
        postTranslateArray.push(testWord)
                console.log("9. translating word ", testWord)
      }
    }
    }
    console.log("10. postTranslateArray ", postTranslateArray)
   return postTranslateArray.join(' ');
    }
  
}
module.exports = Translator;