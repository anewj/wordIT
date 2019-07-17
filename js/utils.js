window.alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

window.difficulty = {
    "1": {
        "level": "Easy",
        "id": "easyLevel"
    },
    "2": {
        "level": "Bring It On",
        "id": "midLevel"
    },
    "3": {
        "level": "God",
        "id": "highLevel"
    }
};

/**
 *
 * @returns {string}
 */
function randomChar() {
    return alphabets[Math.floor(Math.random() * alphabets.length)];
}

var int = 0;
window.DICTIONARY = {};
var combinedDictionary = new XMLHttpRequest();

loadDict(int);

/**
 *
 */
combinedDictionary.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var completeDictOfAlphabet = this.responseText;
        completeDictOfAlphabet = JSON.parse(completeDictOfAlphabet);
        DICTIONARY[alphabets[int]] = completeDictOfAlphabet;
        int++;
        if (int < 26) loadDict(int);
    }
};

/**
 *
 * @param val
 */
function loadDict(val) {
    let jsonFile = "data/D" + alphabets[val] + ".json";
    combinedDictionary.open("GET", jsonFile, true);
    combinedDictionary.send(null);
}

/**
 * search word in dictionary according to criteria
 *
 * @param word
 * @param startWith
 * @param contains
 * @param endWith
 * @returns {boolean}
 */
window.searchWord = function (word, startWith, contains, endWith) {
    var startWithFlag = true;
    var containsFlag = true;
    var endWithFlag = true;
    var validWOrd;
    var sentWord = word.toUpperCase();
    var init = sentWord[0];
    var charDict = DICTIONARY[init];

    validWOrd = !!charDict[sentWord];

    if (startWith) startWithFlag = word.startsWith(startWith);
    if (contains) startWithFlag = word.includes(contains);
    if (endWith) endWithFlag = word.endsWith(endWith);

    return startWithFlag && containsFlag && endWithFlag && validWOrd;
};

/**
 * Counts the word in the dictionary matchine criteria
 *
 * @param startsWithAlphabets
 * @param containsAlphabets
 * @param endsWithAlphabets
 * @returns {Array}
 */
window.wordCount = function (startsWithAlphabets, containsAlphabets, endsWithAlphabets) {
    if (startsWithAlphabets) startsWithAlphabets = startsWithAlphabets.toUpperCase();
    if (containsAlphabets) containsAlphabets = containsAlphabets.toUpperCase();
    if (endsWithAlphabets) endsWithAlphabets = endsWithAlphabets.toUpperCase();

    let wordList = [];

    Object.keys(DICTIONARY).forEach(function (alphabetKey) {
            Object.keys(DICTIONARY[alphabetKey]).forEach(function (wordName) {
                let startsWithFlag = true;
                let containsFlag = true;
                let endsWithFlag = true;

                if (startsWithAlphabets) startsWithFlag = wordName.startsWith(startsWithAlphabets);
                if (containsAlphabets) containsFlag = wordName.includes(containsAlphabets);
                if (endsWithAlphabets) endsWithFlag = wordName.endsWith(endsWithAlphabets);

                if (startsWithFlag && containsFlag && endsWithFlag) wordList.push(wordName);
            })
        }
    );
    return wordList;
};

/**
 * Selects random alphabet
 * Checks for possible word if multiple alphabets are combined
 *
 * @param numberOfAlphabets
 * @param type
 * @param difficulty
 * @returns {string}
 */
window.selectRandomAlphabet = function(numberOfAlphabets, type , difficulty) {
    var tempHolder = "";
    var list;
    var minWords = 0;

    for (let i = 0; i < numberOfAlphabets; i++) {
        tempHolder = tempHolder + randomChar();
    }
    if (type === 0) list = wordCount(tempHolder, undefined, undefined);
    if (type === 1) list = wordCount(undefined, undefined, tempHolder);
    if (type === 2) list = wordCount(undefined, tempHolder, undefined);
    if (type === 3) list = wordCount(tempHolder, undefined, undefined);

    if (difficulty === 1 || difficulty === 2) {
        if (numberOfAlphabets <= 2) minWords = 1000;
        else minWords = 100;
    }
    else {
        if (numberOfAlphabets <= 2) minWords = 500;
        else minWords = 50;
    }

    if (list.length < minWords) return selectRandomAlphabet(numberOfAlphabets,type, difficulty);
    return tempHolder;
};

/**
 *
 * @param word
 * @param number
 * @param reverse
 * @returns {*|string}
 */
window.stringSlicer = function (word, number, reverse) {
    var retained = "";
    if (reverse)
        retained = word.slice(word.length - number, word.length);
    else
        retained = word.slice(0,number);
    return retained;
};