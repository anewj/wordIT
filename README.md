Game Name: Word IT
_____________________________________________________________________________________________________________________________________________________________________________________

OVERVIEW and FEATURES:

This is a word building game in which an initial character will be given when the game starts.
There are different rule for each level and what to do with the initial character will be defined by the level.
That may be the starting letter, ending letter or the letter which must be in the word.
Player has to enter certain number of words within certain period of time which will be defined by the game level and difficulty level.
The Score is calculated from the length of the entered word minus the length of the initial characters.
There is only one way to earn score, which is by entering the word that is in the dictionary.
Player can't enter same word twice in a particular game session.
Valid word is displayed in green colour and the player gets score from the word.
If a valid word id entered again, the particular entry will be invalid and the word will be displayed in yellow colour. Player will not get any score.
If the word entered by player is not in the dictionary, the word will be incorrect, which is displayed in red colour. Player will not get any score.
Total Score along with the detail report of each level which includes entered valid words, score in each level and time taken will be displayed after the game is completed or the game is over.
Remaining time of the level is carried over to the next level.
Game over occurs when the player runs out of time and required word count is not met in any level.
_____________________________________________________________________________________________________________________________________________________________________________________

THIS GAME USES ENGLISH DICTIONARY. DICTIONARY WORDS HAS BEEN DIVIDED ACCORDING TO ALPHABET. THERE ARE 26 JSON FILES FOR 26 ALPHABETS
FILE NAME : D*{ALPHABET}*.json
LOCATION : Data

replace *{ALPHABET}* by alphabet in upper case.

_____________________________________________________________________________________________________________________________________________________________________________________

GAME CONFIGURATION:

Game configuration is done by modifying level.json which is located in Data
Levels can be added or removed

difficulty:
    1: easy
    2: medium
    3: hard

time: second(s) allowed for the level

requiredWord: Number of words required to level up

character: length of initial (random generated) letters

type:
    0: Start with given letters
    1: End with given letters
    2: Word must contain givel letters
    3: Start with given letters, change to the last
        letter of the recent entered word
_____________________________________________________________________________________________________________________________________________________________________________________

API:

main.js

1.
 	* @param section
 	* @param difficulty
	function displaySection(section,difficulty)
	
	Show/Hide elements according to the game process

2.
	window.main = function () 
	
	onload function which gets called when the application is started.
	creates main menu and navigation.

3.
	function selectDifficulty()
	
	Select the difficulty of game [easy, bring it on, god]


scoreCalculator.js

1.
	* @param initial
 	* @param entered
 	* @returns {number}

	function calculateInputScore(initial, entered)
	
	Calculates the score of the entered word

ui.js

1.
	 * @param element
 	* @param id
 	* @param cssClass
 	* @param text
 	* @returns {HTMLElement}
 
	window.createCustomElement = function (element, id, cssClass, text)

	Creates DOM element

2.
	window.showFinalResult = function () 

	Creates detail report of each level after the game is finished.


utils.js
1.
	 * @param word
 	* @param startWith
 	* @param contains
 	* @param endWith
 	* @returns {boolean}
 
	window.searchWord = function (word, startWith, contains, endWith) 
	
	search word in dictionary according to criteria

2.
	 * @param startsWithAlphabets
 	* @param containsAlphabets
 	* @param endsWithAlphabets
 	* @returns {Array}

	window.wordCount = function (startsWithAlphabets, containsAlphabets, endsWithAlphabets) 
	
	Counts the word in the dictionary matchine criteria

3.
 	* @param numberOfAlphabets
 	* @param type
 	* @param difficulty
 	* @returns {string}
 		
	window.selectRandomAlphabet = function(numberOfAlphabets, type , difficulty) {

	Selects random alphabet
	Checks for possible word if multiple alphabets are combined

game.js
1.
	 * @param diff
 
	function startGame(diff)

	Starts the game taking difficulty mode [easy, bring it on, god]

2.
	 * @param levelInfo

	function loadInstruction(levelInfo)

	Loads level instruction before each level

3.
	function gameConfig() 

	Configures the level of the game.
 	time, word requirement and initial character is set by this function

4.
	function registerWord() 

	checks whether the entered word is valid or not.
	calculates score if the word is valid

5.
	function gameCompleteCondition() 
	
	Checks whether the timer has run out
	Checks whether there is next level after the level completes

6.
	function gameTimer()
	
	Maintains level timer and color codes the countdown
  
  
  _____
  This is a game written completely in pure javascript, HTML and CSS. 
  
  To run the game, you need to host it with a local server. 
