const americanOnly = require("./american-only.js");
const britishOnly = require("./british-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
let locale = require("../routes/api.js");

class Translator {
  translateFunc(text, locale) {
    let textArray = [];

    if (text == "") {
      return { error: 'No text to translate' };
    };

    if (!text) {
      return { error: 'Required field(s) missing' };
    };

    if (!locale) {
      return { error: 'Required field(s) missing' };
    };

    if (locale !== "american-to-british") {
      if (locale !== "british-to-american") {
        return { error: 'Invalid value for locale field' }
      }
    };

    let lastChar = text.slice(-1);
    let postTranslateArray = [];

    if (lastChar === "." || lastChar === "?") {
      let deperiodedTextStr = text.slice(0, -1);
      textArray = deperiodedTextStr.split(" ");
    } else {
      textArray = text.split(" ");
    }

    for (let i = 0; i < textArray.length; i++) {

      function isLowerCase(str) {
        return str === str.toLowerCase() && str !== str.toUpperCase();
      }

      let firstLetterLowCase = isLowerCase(textArray[i]);

      let text1 = textArray[i];
      let text2 = textArray[i] + " " + textArray[i + 1];
      let text3 = textArray[i] + " " + textArray[i + 1] + " " + textArray[i + 2];

      let testWord1 = this.checkWordLists(text1.toLowerCase(), locale);
      let testWord2 = this.checkWordLists(text2.toLowerCase(), locale);
      let testWord3 = this.checkWordLists(text3.toLowerCase(), locale);

      if (testWord1 === "" && testWord2 === "" && testWord3 === "") {

        let myRegexUS = /:[0-9][0-9]/
        let resultUS = myRegexUS.test(text1);
        if (resultUS === true && locale === "american-to-british") {
          text1 = text1.replace(":", ".");
          text1 = `<span class="highlight">` + text1 + `</span>`;
        }

        let myRegexBR = /\.[0-9][0-9]/
        let resultBR = myRegexBR.test(text1);
        if (resultBR === true && locale === "british-to-american") {
          text1 = text1.replace(".", ":");
          text1 = `<span class="highlight">` + text1 + `</span>`;
        }

        postTranslateArray.push(text1);

      } else {
        if (testWord3 !== "") {
          if (firstLetterLowCase === true) {
            let a = testWord3;
            let oldChar = a[0];
            let newChar = testWord3[0].toLowerCase();
            let replaced = a.replace(oldChar, newChar);
            postTranslateArray.push(`<span class="highlight">` + replaced + `</span>`);
          } else {
            let a = testWord3;
            let oldChar = a[0];
            let newChar = testWord3[0].toUpperCase();
            let replaced = a.replace(oldChar, newChar);
            postTranslateArray.push(`<span class="highlight">` + replaced + `</span>`);
          }
          i = i + 2;
        } else if (testWord2 !== "") {
          if (firstLetterLowCase === true) {
            let a = testWord2;
            let oldChar = a[0];
            let newChar = testWord2[0].toLowerCase();
            let replaced = a.replace(oldChar, newChar);
            postTranslateArray.push(`<span class="highlight">` + replaced + `</span>`);
          } else {
            let a = testWord2;
            let oldChar = a[0];
            let newChar = testWord2[0].toUpperCase();
            let replaced = a.replace(oldChar, newChar);
            postTranslateArray.push(`<span class="highlight">` + replaced + `</span>`);
          }
          i = i + 1;
        } else if (testWord1 !== "") {
          if (firstLetterLowCase === true) {
            let a = testWord1;
            let oldChar = a[0];
            let newChar = testWord1[0].toLowerCase();
            let replaced = a.replace(oldChar, newChar);
            postTranslateArray.push(`<span class="highlight">` + replaced + `</span>`);
          } else {
            let a = testWord1;
            let oldChar = a[0];
            let newChar = testWord1[0].toUpperCase();
            let replaced = a.replace(oldChar, newChar);
            postTranslateArray.push(`<span class="highlight">` + replaced + `</span>`);
          }
        }
      }
    }
    if (lastChar === "." || lastChar === "?") {
      let tailReplacement =
        postTranslateArray[postTranslateArray.length - 1] + lastChar;
      postTranslateArray[postTranslateArray.length - 1] = tailReplacement;
    }
    let myString = postTranslateArray.join(" ");
    let testMatchString = myString.replace(`<span class="highlight">`, "").replace(`</span>`, "");
    if (text === testMatchString) {
      myString = "Everything looks good to me!"
    };

    let returnObj = { text: text, translation: myString };
    console.log(returnObj);
    return returnObj;
  }


  checkWordLists(text, locale) {
    let wordList = "";
    let wordListKeys = false;
    let wordResult = "";

    const getKeyByValue = (obj, val) =>
      Object.keys(obj).find((key) => obj[key] === val);
    if (locale === "american-to-british") {
      wordList = americanOnly;
    } else if (locale === "british-to-american") {
      wordList = britishOnly;
    }

    wordListKeys = Object.keys(wordList).includes(text);

    if (wordListKeys === true) {
      wordResult = wordList[text];
    }

    if (wordListKeys === false) {
      wordList = americanToBritishSpelling;
      wordListKeys = Object.keys(wordList).includes(text);
      if (wordListKeys === false) {
        wordListKeys = Object.values(wordList).includes(text);
      }

      if (wordListKeys === true && locale === "american-to-british") {
        if (wordList[text] !== undefined) {
          wordResult = wordList[text];
        } else {
          wordResult = text;
        }
      } else if (wordListKeys === true && locale === "british-to-american") {
        if (getKeyByValue(wordList, text) !== undefined) {
          wordResult = getKeyByValue(wordList, text);
        } else {
          wordResult = text;
        }
      }

      if (wordListKeys === false) {
        wordList = americanToBritishTitles;
        wordListKeys = Object.keys(wordList).includes(text);
        if (wordListKeys === false) {
          wordListKeys = Object.values(wordList).includes(text);
        }

        if (wordListKeys === true && locale === "american-to-british") {
          if (wordList[text] !== undefined) {
            wordResult = wordList[text];
          } else {
            wordResult = text;
          }
        } else if (wordListKeys === true && locale === "british-to-american") {
          if (getKeyByValue(wordList, text) !== undefined) {
            wordResult = getKeyByValue(wordList, text);
          } else {
            wordResult = text;
          }
        }
      }
    }
    return wordResult;
  }
}
module.exports = Translator;
