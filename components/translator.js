const americanOnly = require("./american-only.js");
const britishOnly = require("./british-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
let locale = require("../routes/api.js");

class Translator {
  
  translateFunc(text, locale) {
    let textArray = [];
    let lastChar = text.slice(-1);
    let postTranslateArray = [];

    if (lastChar === "." || lastChar === "?") {
      let deperiodedTextStr = text.slice(0, -1);
      textArray = deperiodedTextStr.split(" ");
    } else {
      textArray = text.split(" ");
      console.log("textArr", textArray);
      console.log("textArrISARRAY ", Array.isArray(textArray));
    }

    for (let i = 0; i < textArray.length; i++) {
      console.log("5.0 textArray[i]", textArray[i]);
      let text1 = textArray[i];
      let text2 = textArray[i] + " " + textArray[i+1];
       console.log("5.1 text2", text2);
      let text3 = textArray[i] + " " + textArray[i+1] + " " + textArray[i+2];
      
      let testWord1 = this.checkWordLists(text1.toLowerCase(), locale);
      let testWord2 = this.checkWordLists(text2.toLowerCase(), locale);
      let testWord3 = this.checkWordLists(text3.toLowerCase(), locale);
      console.log("6. testWords", testWord1, testWord2, testWord3);

      if (testWord1 === "" && testWord2 === "" && testWord3 === "") {
        postTranslateArray.push(text1);
        console.log("8.1 nottranslating word ", text1);
      
      // }else if (testWord1 !== "" && testWord2 !== "" && testWord3 === "") {
      //   postTranslateArray.push(text2);
      //   console.log("8.2 nottranslating word ", text2);
      // } else if () {
      // postTranslateArray.push(text3);
      // console.log("8.3 nottranslating word ", text3);
      
      } else {
        if (testWord3 !== ""){
        console.log("9.1 testWord3 ", testWord3);
        postTranslateArray.push(testWord3);
        i = i+2;
        }else if (testWord2 !== ""){
        console.log("9.2 testWord2 ", testWord2);
        postTranslateArray.push(testWord2);
        i = i+1;
        }else if (testWord1 !== ""){
        console.log("9.3 testWord1 ", testWord1);
        postTranslateArray.push(testWord1);
        }
      }
    }

    console.log("10. postTranslateArray ", postTranslateArray);

    if (lastChar === "." || lastChar === "?") {
     let replacement = postTranslateArray[postTranslateArray.length - 1] + lastChar;
      postTranslateArray[postTranslateArray.length - 1] = replacement;
      return postTranslateArray.join(" ");
    } else {
      return postTranslateArray.join(" ");
    }
  }


      

  checkWordLists(text, locale) {
    let wordList = "";
    let wordListKeys = false;
    let wordResult = "";

    const getKeyByValue = (obj, val) =>
      Object.keys(obj).find((key) => obj[key] === val);

    console.log("---------------------------1. text ", text);

    if (locale === "american-to-british") {
      wordList = americanOnly;
    } else if (locale === "british-to-american") {
      wordList = britishOnly;
    }

    wordListKeys = Object.keys(wordList).includes(text);
    // console.log("000000000000000. car boot sale test ", Object.keys(wordList).includes(text))

    if (wordListKeys === true) {
      console.log("0. wordlisttext ", wordList[text]);

      wordResult = wordList[text];
    }

    if (wordListKeys === false) {
      wordList = americanToBritishSpelling;

      wordListKeys = Object.keys(wordList).includes(text);

      if (wordListKeys === false) {
        wordListKeys = Object.values(wordList).includes(text);
        console.log("1. onA2BwordList ", wordListKeys);
    
          if (wordListKeys === true && locale === "american-to-british") {
            wordResult = wordList[text];
            console.log("2. wordList[text]0000 ", wordResult);
          } else if (wordListKeys === true && locale === "british-to-american") {
            wordResult = getKeyByValue(wordList, text);
            console.log("3. A2BSpellkeyResult ", wordResult);
          } else if (wordListKeys === false){
            
            wordList = americanToBritishTitles;
            wordListKeys = Object.keys(wordList).includes(text);
            console.log("********. Title (Key(Amer)) test ", Object.keys(wordList).includes(text))
          

              if (wordListKeys === false) {
                wordListKeys = Object.values(wordList).includes(text)
                  console.log("********. Title (Value(Brit) test ", Object.values(wordList).includes(text));
              
        
                    if (wordListKeys === true && locale === "american-to-british") {
                      console.log("4. wordList[text]1224", wordList[text]);
                      wordResult = wordList[text];
                    } else if (wordListKeys === true && locale === "british-to-american") {
                      wordResult = getKeyByValue(wordList, text);
                    }
                }
             }
          }
        }
      return wordResult;
    }
  
}
module.exports = Translator;