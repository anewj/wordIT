let initialCharacters = "";
let levelReq = new XMLHttpRequest();
let level, gameInputDisplay, gameInputArea, totalScore, expertise, currentLevel = 1, initialTime = 0, timeAllowed = 0,
    totalTime = 0,
    bonusTime = 0, wordsRequired;
let gameTimeout = false;
let green = "#1bc308";
let yellow = "#d5d405";
let red = "#c00d29";
let stopwatchFlag = true;
let timeTaken = 0, gt, gcc;
let enteredWordList = [], correctWords = {}, detailReport = {};
var uniqueId = 0;

/**
 *
 */
levelReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) level = JSON.parse(this.responseText);
};

/**
 * Starts the game taking difficulty mode [easy, bring it on, god]
 *
 * @param diff
 */
function startGame(diff) {
    if (!level) {
        levelReq.open("GET", "data/level.json", true);
        levelReq.send();
    }

    expertise = diff;
    let once = false;

    let start = setInterval(function () {
        if (level) {
            let levelInfo = level[currentLevel];
            //Type
            //0 = character, starts with
            //1 = character, ends with
            //2 = character, contains
            //3 = change character
            var type = levelInfo["rule"].type;
            window.char = levelInfo["rule"].character;

            if (once === false) {
                once = true;
                initialCharacters = selectRandomAlphabet(char, type, expertise);
            }

            if (initialCharacters !== undefined && initialCharacters !== "" && initialCharacters.length > 0) {
                clearInterval(start);
                loadInstruction(levelInfo)
            }
        }
    }, 100);

}

/**
 * Loads level instruction before each level
 *
 * @param levelInfo
 */
function loadInstruction(levelInfo) {
    let type = levelInfo["rule"].type;
    timeAllowed = totalTime = levelInfo["difficulty"][expertise].time + bonusTime;
    initialTime = levelInfo["difficulty"][expertise].time;
    wordsRequired = levelInfo["difficulty"][expertise].requiredWord;
    let area = document.getElementById("instructions");
    gameInputDisplay = document.getElementById("gameInputDisplay");
    let dfs = document.getElementById("displayFinalScore");
    if (dfs) dfs.innerHTML = "";
    gameInputDisplay.innerHTML = "";

    area.appendChild(createCustomElement("div", "instructionLevelDisplay", "instructionDisp", "Level " + currentLevel));
    area.appendChild(createCustomElement("div", "rulesDisplay", "instructionDisp", undefined));

    let type_text, type_set, startOrEnd;
    type_set = initialCharacters;

    if (type === 0) {
        type_text = "Beginning Character : ";
        startOrEnd = " words which begins with ";
    }
    if (type === 1) {
        type_text = "Ending Character : ";
        startOrEnd = " words which ends with ";
    }
    if (type === 2) {
        type_text = "contain : ";
        startOrEnd = " words which contains ";
    }
    if (type === 3) {
        type_text = "Beginning Character : ";
        startOrEnd = " such words ";
    }
    let rule = document.getElementById("rulesDisplay");
    rule.appendChild(createCustomElement("SPAN", undefined, "putLeft", "Difficulty : "));
    rule.appendChild(createCustomElement("SPAN", undefined, "putRight", difficulty[expertise].level));
    rule.appendChild(createCustomElement("BR", undefined, undefined, undefined));
    rule.appendChild(createCustomElement("BR", undefined, undefined, undefined));
    rule.appendChild(createCustomElement("SPAN", undefined, "putLeft", "Time Allowed : "));
    rule.appendChild(createCustomElement("SPAN", undefined, "putRight", timeAllowed + " Second(s)"));
    rule.appendChild(createCustomElement("BR", undefined, undefined, undefined));
    rule.appendChild(createCustomElement("BR", undefined, undefined, undefined));
    rule.appendChild(createCustomElement("SPAN", undefined, "putLeft", "Required Words to level up: "));
    rule.appendChild(createCustomElement("SPAN", undefined, "putRight", wordsRequired));
    rule.appendChild(createCustomElement("BR", undefined, undefined, undefined));
    rule.appendChild(createCustomElement("BR", undefined, undefined, undefined));
    rule.appendChild(createCustomElement("SPAN", undefined, "putLeft", type_text));
    rule.appendChild(createCustomElement("SPAN", undefined, "putRight", type_set));
    rule.appendChild(createCustomElement("BR", undefined, undefined, undefined));
    rule.appendChild(createCustomElement("BR", undefined, undefined, undefined));
    rule.appendChild(createCustomElement("DIV", "explainRuleDiv", undefined, undefined));
    let explainRuleDiv = document.getElementById("explainRuleDiv");

    if (type === 0 || type === 1 || type === 2) {
        explainRuleDiv.appendChild(createCustomElement("span", undefined, undefined, "In Order to complete this level, you must enter "));
        explainRuleDiv.appendChild(createCustomElement("span", "explainRuleDivWord", undefined, wordsRequired));
        explainRuleDiv.appendChild(createCustomElement("span", undefined, undefined, startOrEnd));
        explainRuleDiv.appendChild(createCustomElement("span", "explainRuleDivAlpha", undefined, type_set));
        explainRuleDiv.appendChild(createCustomElement("span", undefined, undefined, " within "));
        explainRuleDiv.appendChild(createCustomElement("span", "explainRuleDivTime", undefined, timeAllowed));
        explainRuleDiv.appendChild(createCustomElement("span", undefined, undefined, " Second(s)"));
    }
    if (type === 3) {
        explainRuleDiv.appendChild(createCustomElement("span", undefined, undefined, "In this level, you must start with " +
            "the given alphabet(s). After each correct word, the starting character changes. " +
            "The next starting character will be the last alphabet of the recent correct answer. Your starting letter is "));
        explainRuleDiv.appendChild(createCustomElement("span", "explainRuleDivAlpha", undefined, type_set));
        explainRuleDiv.appendChild(createCustomElement("span", undefined, undefined, ". You must enter "));
        explainRuleDiv.appendChild(createCustomElement("span", "explainRuleDivWord", undefined, wordsRequired));
        explainRuleDiv.appendChild(createCustomElement("span", undefined, undefined, startOrEnd));
        explainRuleDiv.appendChild(createCustomElement("span", undefined, undefined, " within "));
        explainRuleDiv.appendChild(createCustomElement("span", "explainRuleDivTime", undefined, timeAllowed));
        explainRuleDiv.appendChild(createCustomElement("span", undefined, undefined, " Second(s)"));
    }

    let button = document.createElement("BUTTON");

    button.innerText = "Lets Begin!";
    button.id = "lb";
    button.className = "menuItems";
    button.onclick = function () {
        gameConfig();
        displaySection("newgame", levelInfo);
        area.innerHTML = "";
        triggerTimers();
    };
    area.appendChild(button);
}

/**
 * Configures the level of the game.
 * time, word requirement and initial character is set by this function
 */
function gameConfig() {
    gameInputDisplay = document.getElementById("gameInputDisplay");
    gameInputDisplay.innerHTML = "";
    gameInputDisplay.appendChild(createCustomElement("DIV", "gameContainer", undefined, undefined));
    var containDIV = document.getElementById("gameContainer");
    containDIV.appendChild(createCustomElement("SPAN", "remainingWordDisp", undefined, "Remaining : "));
    containDIV.appendChild(createCustomElement("SPAN", "noOfWords", undefined, wordsRequired));
    containDIV.appendChild(createCustomElement("SPAN", "levelDisplaySpan", undefined, "Level : " + difficulty[expertise].level.toUpperCase() + " | " + currentLevel));
    containDIV.appendChild(createCustomElement("DIV", "flex-container", undefined, undefined));
    var flex = document.getElementById("flex-container");
    flex.appendChild(createCustomElement("DIV", "startGame", "flex-item", initialCharacters));
    flex.appendChild(createCustomElement("DIV", "timer", "flex-item", undefined));
    flex.appendChild(createCustomElement("DIV", "totalScore", "flex-item", undefined));
    document.getElementById("totalScore").style.cssFloat = "right";
    document.getElementById("noOfWords").style.color = "green";
    document.getElementById("levelDisplaySpan").style.cssFloat = "right";
    gameInputDisplay.appendChild(createCustomElement("DIV", "answerDisplay", undefined, undefined));

    gameInputArea = document.getElementById("gameInputArea");
    if (document.getElementById("gameTextContainer"))
        document.getElementById("gameTextContainer").remove();

    gameInputArea.appendChild(createCustomElement("DIV", "gameTextContainer", undefined, undefined));
    var containGameTextContainerDIV = document.getElementById("gameTextContainer");
    containGameTextContainerDIV.appendChild(createCustomElement("SPAN", "userInputSpan", undefined, undefined));
    containGameTextContainerDIV.appendChild(createCustomElement("BR", undefined, undefined, undefined));
    containGameTextContainerDIV.appendChild(createCustomElement("SPAN", "registerButton", undefined, undefined));
    var userInputSpan = document.createElement("input");
    userInputSpan.type = "text";
    userInputSpan.id = "gameInputText";
    document.getElementById("userInputSpan").appendChild(userInputSpan);
    var registerButton = document.createElement("button");
    registerButton.innerText = "GO";
    registerButton.id = "regWordButton";
    registerButton.onclick = function () {
        registerWord();
    };
    document.getElementById("registerButton").appendChild(registerButton);

    let input = document.getElementById("gameInputText");
    input.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            event.preventDefault();
            registerWord();
        }
    });

}

/**
 *
 * @param type
 * @param word
 * @param score
 */
function addWordLine(type, word, score) {
    uniqueId++;
    let cssClass = "";
    switch (type) {
        case "invalid":
            cssClass = "invalidWord";
            break;
        case "incorrect":
            cssClass = "incorrectWord";
            break;
        case "correct":
            cssClass = "validWord";
            break;
        default:
            cssClass = "infoWord";
            break;
    }
    var dispAnswer = document.getElementById("answerDisplay");
    dispAnswer.style.width = "100%";

    dispAnswer.appendChild(createCustomElement("DIV", "divOfLine" + uniqueId, cssClass, undefined));
    var divOfLine = document.getElementById("divOfLine" + uniqueId);
    divOfLine.appendChild(createCustomElement("span", undefined, undefined, word));
    if(score) divOfLine.appendChild(createCustomElement("span", undefined, "answerScore", score));
}

/**
 *
 * @param word
 * @returns {number}
 */
function checkWord(word) {
    return enteredWordList.indexOf(word);
}

/**
 * checks whether the entered word is valid or not.
 * calculates score if the word is valid
 */
function registerWord() {
    let word = document.getElementById("gameInputText");
    let input = word.value.toUpperCase();
    let levelInfo = level[currentLevel];
    let type = levelInfo["rule"].type;
    let noOfChar = levelInfo["rule"].character;


    if (input) {
        if (type === 0) wordValidator(initialCharacters, undefined, undefined);
        if (type === 1) wordValidator(undefined, undefined, initialCharacters);
        if (type === 2) wordValidator(undefined, initialCharacters, undefined);
        if (type === 3) {
            if (wordValidator(initialCharacters, undefined, undefined)) {
                initialCharacters = stringSlicer(input, char, true);
                var search = wordCount(initialCharacters, undefined, undefined);
                if (search.length < 50) {
                    addWordLine(undefined, "Not enough words starting from "+initialCharacters+". Selecting new letters : ", 0);
                    initialCharacters = selectRandomAlphabet(noOfChar, type, expertise);

                    addWordLine("correct center", initialCharacters, 0);
                }
                let ini = document.getElementById("startGame");
                ini.innerText = initialCharacters;
            }
        }

        word.value = "";
        totalScore = document.getElementById("totalScore");
        totalScore.innerText = "";
        totalScore.appendChild(createCustomElement("SPAN", undefined, undefined, total))
    }

    /**
     *
     * @param startsWith
     * @param contains
     * @param endsWith
     * @returns {boolean}
     */
    function wordValidator(startsWith, contains, endsWith) {
        if (searchWord(input, startsWith, contains, endsWith)) {
            if (checkWord(input) === -1) {
                enteredWordList.push(input);
                let inputScore = calculateInputScore(initialCharacters, input);
                recordInputScore(inputScore);
                addWordLine("correct", word.value, inputScore);
                return true;
            }
            else addWordLine("invalid", word.value, 0);
        } else {
            addWordLine("incorrect", word.value, 0);
        }
        return false;
    }

    /**
     *
     * @param inputScore
     */
    function recordInputScore(inputScore) {
        if (!correctWords[currentLevel]) {
            correctWords[currentLevel] = [];
            detailReport[currentLevel] = {};
            detailReport[currentLevel]["wordlist"] = [];
            detailReport[currentLevel]["totalScore"] = 0;
            detailReport[currentLevel]["timeAllowed"] = totalTime;
            detailReport[currentLevel]["levelTime"] = initialTime;
        }
        correctWords[currentLevel].push(input);

        let enteredWordJson = {};
        enteredWordJson["name"] = input;
        enteredWordJson["score"] = inputScore;

        detailReport[currentLevel]["wordlist"].push(enteredWordJson);
        detailReport[currentLevel]["totalScore"] = detailReport[currentLevel]["totalScore"] + inputScore;

        wordsRequired--;

        var wReq = document.getElementById("noOfWords");
        wReq.innerHTML = "";
        wReq.appendChild(createCustomElement("SPAN", "noOfWords", undefined, wordsRequired));
    }
}

/**
 *
 */
function triggerTimers() {
    stopwatchFlag = true;
    gt = setInterval(gameTimer, 1000);
    gcc = setInterval(gameCompleteCondition, 100);
}

/**
 * Maintains level timer and color codes the countdown
 */
function gameTimer() {
    var percent = (timeAllowed / totalTime) * 100;

    if (timeAllowed >= 0 && document.getElementById("timer") && stopwatchFlag) {
        var color;
        if (percent > 50) {
            color = green;
        } else if (percent <= 50 && percent > 10) {
            color = yellow;
        } else {
            color = red;
        }

        var timerElement = document.getElementById("timer");
        if (timeAllowed <= 0) {
            clearInterval(gt);

            timerElement.innerText = "Game Over";
            gameTimeout = !gameTimeout;
        } else
            timerElement.innerText = timeAllowed;
        timerElement.style.color = color;

        timeTaken = totalTime - timeAllowed;
        if (wordsRequired !== 0) timeAllowed--;
    }
}

/**
 * Checks whether the timer has run out
 * Checks whether there is next level after the level completes
 */
function gameCompleteCondition() {
    if (gameTimeout || wordsRequired === 0) {
        clearInterval(gcc);
        var git = document.getElementById("gameInputText");
        git.disabled = "disabled";
        git.hidden = true;
        var rwb = document.getElementById("regWordButton");
        rwb.disabled = "disabled";
        rwb.hidden = true;
        var rwd = document.getElementById("remainingWordDisp");
        rwd.disabled = "disabled";
        rwd.hidden = true;
        var now = document.getElementById("noOfWords");
        now.disabled = "disabled";
        now.hidden = true;
        var ig = document.getElementById("startGame");
        ig.innerText = "";
        var ts = document.getElementById("totalScore");
        ts.innerText = "";
        var ad = document.getElementById("answerDisplay");
        ad.innerText = "";
        var area = document.getElementById("instructions");
        area.innerHTML = "";
        var diff = document.getElementById("levelDisplaySpan");
        diff.innerHTML = "";

        bonusTime = totalTime - timeTaken;
        detailReport[currentLevel]["bonusTime"] = bonusTime;

        var ng = document.getElementById("newGame");
        ng.appendChild(createCustomElement("DIV", "displayFinalScore", undefined, undefined));

        var ds = document.getElementById("displayFinalScore");
        ds.style.textAlign = "center";
        ds.appendChild(createCustomElement("SPAN", undefined, undefined, "Total Score: " + total));

        if (detailReport[currentLevel]) {
            detailReport[currentLevel]["timeUsed"] = timeTaken;

        }

        if (!gameTimeout) {
            currentLevel++;
            if (!level[currentLevel]) {
                showFinalResult();
            } else {
                // console.log("next Level : " + currentLevel);
                initialCharacters = "";
                displaySection("instructions", expertise);
            }
        } else showFinalResult();

    }
    if (wordsRequired === 0) {
        stopwatchFlag = !stopwatchFlag;
        clearInterval(gt);
        var timerElement = document.getElementById("timer");
        if (!level[currentLevel]) timerElement.innerText = "Game Cleared";
        else timerElement.innerText = "Level Cleared";

        timerElement.style.color = green;

        if (detailReport[currentLevel])
            detailReport[currentLevel]["timeUsed"] = timeTaken;
    }
}