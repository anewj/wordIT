/**
 *
 *
 * @param section
 * @param difficulty
 *
 */
function displaySection(section,difficulty) {
    switch (section) {
        case 'newgame':
            document.getElementById("mainMenu").style.visibility = "hidden";
            document.getElementById("newGame").style.visibility = "visible";
            document.getElementById("instructions").style.visibility = "hidden";

            document.getElementById("newGame").style.position = "absolute";
            document.getElementById("mainMenu").style.position = "absolute";
            document.getElementById("instructions").style.position = "absolute";
            break;
        case 'instructions':
            document.getElementById("mainMenu").style.visibility = "hidden";
            document.getElementById("newGame").style.visibility = "hidden";
            document.getElementById("instructions").style.visibility = "visible";

            document.getElementById("newGame").style.position = "absolute";
            document.getElementById("mainMenu").style.position = "absolute";
            document.getElementById("instructions").style.position = "relative";
            startGame(difficulty);
            break;
        default:
            location.reload();
            document.getElementById("mainMenu").style.visibility = "visible";
            document.getElementById("newGame").style.visibility = "hidden";
            document.getElementById("instructions").style.visibility = "hidden";

            document.getElementById("mainMenu").style.position = "relative";
            document.getElementById("newGame").style.position = "absolute";
            document.getElementById("instructions").style.position = "absolute";
            main();
            break;
    }
}

/**
 *
 */
window.main = function () {
    var main = document.getElementById("mainMenu");
    if(document.getElementById("innerdiv"))
        document.getElementById("innerdiv").remove();
    var innerDIV = document.createElement("DIV");
    innerDIV.id = "innerdiv";
    main.appendChild(innerDIV);
    innerDIV = document.getElementById("innerdiv");

    //new game button
    var divButton = document.createElement("DIV");
    divButton.id = "ngButtonDiv";
    innerDIV.appendChild(divButton);
    divButton = document.getElementById("ngButtonDiv");
    var button = document.createElement("BUTTON");
    button.innerText = "New Game";
    button.id = "ng";
    button.className = "menuItems";
    button.onclick = function () {
        selectDifficulty();
    };

    // divButton.appendChild(appendGameName());
    divButton.appendChild(button);

    var divMainMenu = document.getElementById("game-name");
    divMainMenu.appendChild(createCustomElement("span","mMainMenu","","Word IT"));
    var gDisplay = document.getElementById("mMainMenu");
    gDisplay.onclick = function () {
        if(window.confirm("start a new Game?"))
            displaySection();
    }
};

/**
 *
 */
function selectDifficulty() {
    var main = document.getElementById("mainMenu");
    document.getElementById("innerdiv").remove();

    var innerDIV = document.createElement("DIV");
    innerDIV.id = "innerdiv";
    innerDIV.style.textAlign = "center";
    // innerDIV.appendChild(appendGameName());

    main.appendChild(innerDIV);
    innerDIV = document.getElementById("innerdiv");


    for(k in difficulty){
        var divButton = document.createElement("DIV");
        divButton.id = "diffDIV"+k;
        innerDIV.appendChild(divButton);
        divButton = document.getElementById("diffDIV"+k);

        var diffButton = document.createElement("BUTTON");

        diffButton.innerText = difficulty[k].level;
        diffButton.id = difficulty[k].id;
        diffButton.className = "menuItems";
        diffButton.value = k;

        divButton.appendChild(diffButton);
    }
    var divButton = document.createElement("DIV");
    divButton.id = "backButtonDiv";
    innerDIV.appendChild(divButton);
    divButton = document.getElementById("backButtonDiv");

    var backButton = document.createElement("BUTTON");
    backButton.innerText = "Back";
    backButton.id = "backFromDiffButton";
    backButton.className = "menuItems";
    backButton.onclick = function () {
        displaySection("","");
    };

    divButton.appendChild(backButton);

    //need to optimise
    document.getElementById("diffDIV1").onclick = function () {
        displaySection("instructions",1)
    };
    document.getElementById("diffDIV2").onclick = function () {
        displaySection("instructions",2)
    };
    document.getElementById("diffDIV3").onclick = function () {
        displaySection("instructions",3)
    }
}





