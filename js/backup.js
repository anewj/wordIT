function registerWordORIGINAL() {
    let word = document.getElementById("gameInputText");
    let input = word.value.toUpperCase();
    if (input) {

        if (input.startsWith(initialCharacters)) {
            if (checkWord(input) === -1) {
                enteredWordList.push(input);
                if (bagOfWords[input] === undefined) {
                    addWordLine("incorrect", word, 0);
                } else {
                    var inputScore = calculateInputScore(initialCharacters, input);
                    if (!correctWords[currentLevel]) {
                        correctWords[currentLevel] = [];
                        detailReport[currentLevel] = {};
                        detailReport[currentLevel]["wordlist"] = [];
                        detailReport[currentLevel]["totalScore"] = 0;
                        detailReport[currentLevel]["timeAllowed"] = totalTime;
                        detailReport[currentLevel]["bonusTime"] = bonusTime;
                    }

                    correctWords[currentLevel].push(input);

                    var enteredWordJson = {};
                    enteredWordJson["name"] = input;
                    enteredWordJson["score"] = inputScore;

                    detailReport[currentLevel]["wordlist"].push(enteredWordJson);
                    detailReport[currentLevel]["totalScore"] = detailReport[currentLevel]["totalScore"] + inputScore;


                    addWordLine("correct", word, inputScore);
                    wordsRequired--;
                    var wReq = document.getElementById("noOfWords");
                    wReq.innerHTML = "";
                    wReq.appendChild(createCustomElement("SPAN", "noOfWords", undefined, wordsRequired));

                }
            } else {
                addWordLine("invalid", word, 0);
            }
        } else {
            console.log("hit");
            addWordLine("incorrect", word, 0);
        }
        word.value = "";
        totalScore = document.getElementById("totalScore");
        totalScore.innerText = "";
        totalScore.appendChild(createCustomElement("SPAN", undefined, undefined, total))
    }
}
