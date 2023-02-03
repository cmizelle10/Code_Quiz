// Declare variables
var startButton = document.querySelector("#start-button");
var timer = document.querySelector("#timer");
var timeInterval = 0;
var secondsLeft = 60;
var penalty = 10;
var score = 0;
var questionsDiv = document.querySelector("#questions-div");
var questionIndex = 0;
var questionChoices = document.querySelector("#question-choices");
var highScore = document.querySelector("#highScore");

//Quiz questions
var questions = [
    {
        title: "___ is a widely used scripting language that adds functionality and interactivity to a webpage",
        choices: ["HTML", "CSS", "JavaScript", "Java"],
        answer: "JavaScript"
    },
    {
        title: "The ___ element is used to embed executable code or data. It is typically used to embed or refer to JavaScript code",
        choices: ["script", "HTML", "head", "style"],
        answer: "script"
    },
    {
        title: "The ___ statement declares a function-scoped or globally-scopred variable, optionally initializing it to a value",
        choices: ["break", "var", "if...else", "function"],
        answer: "var"
    },
    {
        title: "The ___ operator returns true if the operands are equal and of the same type",
        choices: [">=", "!=", "==", "==="],
        answer: "==="
    },
    {
        title: 'How do you write "Hello World" in an alert box?',
        choices: ['alert("Hello World")', 'msgBox("Hello World")', 'msg("Hello World")', 'alertBox("Hello World")'],
        answer: 'alert("Hello World")'
    }
]

// Listen for start button click

startButton.addEventListener("click", function () {

    // a timer starts
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            secondsLeft--;
            timer.textContent = "Time: " + secondsLeft + " seconds";

            if (secondsLeft <= 0) {
                clearInterval(timeInterval);
                finished();
                timer.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
})

// Render questions
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    questionChoices.innerHTML = "";
    // Loop through questions
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // Each question in loop will have different answer choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(questionChoices);
        questionChoices.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
    // Hide start button while user is going through questions, given that they have already started
    startButton.style.visibility = "hidden";
}

// Evaluate user's answer choice
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // if correct
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        // else if incorrect
        } else {
            // subtract 10 seconds of time
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Increment question index
    questionIndex++;
    if (questionIndex >= questions.length) {
        // When user has gone through all of the questions, announce end of quiz and show score.
        endQuiz();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

// Function to end quiz
function endQuiz() {
    questionsDiv.innerHTML = "";
    startButton.style.visibility = "hidden";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Done!"
    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    // 2 things can trigger ending: either all questions answered or time equals 0
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(timeInterval);
        createP.textContent = "Your final score is: " + (score/questions.length) * 100 + "%";
        questionsDiv.appendChild(createP2);
    }

    // Allow user to save initials and score
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

    
    createSubmit.addEventListener("click", function (event) {
        var initials = createInput.value;
        if (initials === null) {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            // store initials and score
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Go to high scores page
            window.location.href = "highScores.html"
        }
    });
}