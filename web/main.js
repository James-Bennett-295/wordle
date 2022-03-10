let tableElements = Array(6).fill(`
    <tr>
        <th>&#160;&#160;&#160;</th>
        <th>&#160;&#160;&#160;</th>
        <th>&#160;&#160;&#160;</th>
        <th>&#160;&#160;&#160;</th>
        <th>&#160;&#160;&#160;</th>
    </tr>
`);
let wordNum = 0;

let correctWord;
fetch("/words.txt")
    .then((response) => {
        return response.text();
    })
    .then((text) => {
        let words = text.split('\n');
        let wordNum = Math.floor(Math.random() * (words.length + 1));
        correctWord = words[wordNum];
    });

function tryWord() {

    let word = document.getElementById("guessFrm").elements[0].value.toUpperCase();

    if (word.length !== 5) return window.alert("The length of the word you entered was not 5 characters!");
    for (let c in word) {
        if (65 > word.charCodeAt(c) || word.charCodeAt(c) > 90) {
            return window.alert("The word you input must only contain a-z/A-Z characters!");
        };
    };

    document.getElementById("wordInputField").value = "";

    let charClasses = [];
    for (c in word) {
        if (correctWord.includes(word[c])) {
            if (correctWord[c] === word[c]) {
                charClasses.push("correctC");
            } else {
                charClasses.push("includesC");
            };
        } else {
            charClasses.push("");
        };
    };
    let tableElement = `
        <tr>
            <th class="` + charClasses[0] + `">` + word[0] + `</th>
            <th class="` + charClasses[1] + `">` + word[1] + `</th>
            <th class="` + charClasses[2] + `">` + word[2] + `</th>
            <th class="` + charClasses[3] + `">` + word[3] + `</th>
            <th class="` + charClasses[4] + `">` + word[4] + `</th>
        </tr>
    `;

    tableElements[wordNum++] = tableElement;

    let table = "<table>\n" + tableElements.join('\n') + "\n<table>";

    document.getElementById("wordleTable").innerHTML = table;

    if (
        charClasses.every(function (className) {
            return className === "correctC";
        })
    ) {
        window.alert("You got the word!");
        document.body.innerHTML = "<button onClick=\"window.location.reload();\">Play Again</button>";
        return;
    };

    if (wordNum === 6) {
        window.alert("Game over! The word was \"" + correctWord[0] + correctWord.slice(1).toLowerCase() + "\"");
        document.body.innerHTML = "<button onClick=\"window.location.reload();\">Play Again</button>";
    };

};
