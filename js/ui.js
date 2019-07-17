/**
 *
 * @param element
 * @param id
 * @param cssClass
 * @param text
 * @returns {HTMLElement}
 */
window.createCustomElement = function (element, id, cssClass, text) {
    let content;
    content = document.createElement(element);
    if(id)
        content.id = id;
    if(cssClass)
        content.className = cssClass;
    if(text)
        content.innerText = text;

    return content;
};

/**
 *
 * @param label
 * @param input
 * @param button
 * @returns {{label: string, input: string, button: string}}
 */
function labelledTextField(label, input, button) {
    return {
        label: "<label for=\"" + label + "\">" + label + "</label>",
        input: "<input type=\"text\" name=\"" + input + "\">",
        button: "<button type=\"button\">" + button + "</button>"
    }
}

/**
 *
 * @param text1
 * @param text2
 * @returns {HTMLElement}
 */
function createTRforResult(text1, text2) {
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    var thText = document.createTextNode(text1);
    var td = document.createElement("td");
    var tdText = document.createTextNode(text2);
    td.appendChild(tdText);
    th.appendChild(thText);
    tr.appendChild(th);
    tr.appendChild(td);
    return tr;
}

/**
 *
 */
window.showFinalResult = function () {
    var dispArea = document.getElementById("newGame");
    dispArea.appendChild(createCustomElement("DIV", "resultDisplayTable", undefined, undefined));
    var rdt = document.getElementById("resultDisplayTable");



    Object.keys(detailReport).forEach(function (key) {
        var span = createCustomElement("SPAN",undefined,"tableContainer",undefined);
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var tblHead = document.createElement("thead");

        Object.keys(detailReport[key].wordlist).forEach(function (wordname) {
            var row = document.createElement("tr");

            Object.keys(detailReport[key].wordlist[wordname]).forEach(function (k) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode(detailReport[key].wordlist[wordname][k]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            });
            tblBody.appendChild(row);
        });


        var trLegend = document.createElement("tr");
        var thName = document.createElement("th");
        var thScore = document.createElement("th");
        var trLevel = document.createElement("tr");
        var thLevel = document.createElement("th");
        var thLevelText = document.createTextNode("Level: " + key);
        thLevel.colSpan = 2;
        thLevel.className = "scoreTableLevelInfo";
        thLevel.appendChild(thLevelText);
        trLevel.appendChild(thLevel);

        tblBody.appendChild(createTRforResult("Total Score",detailReport[key].totalScore));
        tblBody.appendChild(createTRforResult("Allowed Time",detailReport[key].levelTime));
        tblBody.appendChild(createTRforResult("Total Time Allowed",detailReport[key].timeAllowed));
        tblBody.appendChild(createTRforResult("Total Time Used",detailReport[key].timeUsed));
        tblBody.appendChild(createTRforResult("Remaining Time",detailReport[key].bonusTime));


        thName.appendChild(document.createTextNode("Word"));
        trLegend.appendChild(thName);
        thScore.appendChild(document.createTextNode("Score"));
        trLegend.appendChild(thScore);

        tblHead.appendChild(trLevel);
        tblHead.appendChild(trLegend);
        tbl.appendChild(tblHead);

        tbl.appendChild(tblBody);
        span.appendChild(tbl);
        rdt.appendChild(span);
    });
};