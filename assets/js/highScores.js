// Listen for user to click "Clear Highscores" button
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Retrieves local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}
// Listen for user to click "Go Back" button
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});  