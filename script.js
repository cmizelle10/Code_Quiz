var quizChallenge = document.getElementById("js-quiz-challenge");
var quizChallengeDescription = document.getElementById("js-quiz-challenge-description");
var quizContainerEl = document.getElementById("js-quiz");
var dispalyItem1 = document.getElementById("display-bar-item1");
var startQuizBtn = document.getElementById("js-start-quiz");
var quizTimerEl = document.getElementById("js-timer");
var quizScoreEl = document.getElementById("js-score");
var questionTextEl = document.getElementById("js-question-text");
var answerListEl = document.getElementById("js-answer-list");
var evaluationTextEl = document.getElementById("js-evaluation-text");

var timeLeft = 30;
var quizScore = 0;
var currentQuestionIndex = 0;
var numCorrect = 0;

quizContainerEl.style.display = "none";
quizTimerEl.textContent = timeLeft;
quizScoreEl.textContent = quizScore;
var questions = [{
    questionText: "____ is a widely used scripting language that adds functionality and interactiviy to a webpage",
    questionChoices: {
        a: "HTML",
        b: "CSS",
        c: "JavaScript",
        d: "Java"
    },
    questionAnswer: 'c'
},
{
    questionText: "The ____ element is used to embed executable code or data. It is typically used to embed or refer to JavaScript code",
    questionChoices: {
        a: "script",
        b: "HTML",
        c: "head",
        d: "style"
    },
    questionAnswer: 'a'
},
{
    questionText: "The ____ statement declares a function-scoped or globally-scoped variable, optionally initializing it to a value",
    questionChoices: {
        a: "break",
        b: "var",
        c: "if...else",
        d: "function"
    },
    questionAnswer: 'b'
},
{
    questionText: "The ____ operator returns true if the operands are equal and of the same type",
    questionChoices: {
        a: ">=",
        b: "!=",
        c: "==",
        d: "==="
    },
    questionAnswer: 'd'
}]

function renderChoiceButtons(choicesObject) {
    for (var answerKey in choicesObject) {
        var choiceText = choicesObject[answerKey]
        var newButton = document.createElement('button')
        newButton.textContent = choiceText
        newButton.classList.add('js-choice-button')
        newButton.setAttribute('data-answer-key', answerKey)
        var listItem = document.createElement('li')
        listItem.appendChild(newButton)
        answerListEl.appendChild(listItem)
    }
}

function displayQuestion(questionObject) {
    if(questionObject) {
    questionTextEl.textContent = questionObject.questionText; 
    renderChoiceButtons(questionObject.questionChoices);
    }
}

function startQuiz() {
    displayQuestion(questions[currentQuestionIndex])
}

startTimer = () => {
    timerId = setInterval(startTimer, 1000);

function startTimer() {
    timeLeft = timeLeft;
        timeLeft--;
        quizTimerEl.textContent = timeLeft;
        if (timeLeft == 0) {
            clearInterval(timerId);
            endGame();
        }
}
}



answerListEl.addEventListener('click', (e) => {
        var currentQuestion = questions[currentQuestionIndex];
        var correctAnswer = currentQuestion.questionAnswer;   
        var selectedChoice = e.target;
        var currentAnswer = selectedChoice.getAttribute("data-answer-key");
        if(currentAnswer === correctAnswer) {
            evaluationTextEl.textContent = "Correct!"
            addCorrect();
            currentQuestionIndex = currentQuestionIndex + 1;
            removeAnswers();
            displayQuestion(questions[currentQuestionIndex]);
        } else {
            evaluationTextEl.textContent = "Incorrect";
            timeLeft = timeLeft - 5;
            addIncorrect();
            currentQuestionIndex = currentQuestionIndex + 1;
            removeAnswers();
            displayQuestion(questions[currentQuestionIndex]);
        }
});

function removeAnswers() {
    while (answerListEl.firstChild) {
        answerListEl.removeChild(answerListEl.firstChild);
    }
}

function addCorrect() {
    numCorrect = numCorrect + 1;
    score = numCorrect / (currentQuestionIndex + 1) * 100;
    score = Math.round(score);
    quizScoreEl.textContent = score;
}

function addIncorrect() {
    score = numCorrect / (currentQuestionIndex + 1) * 100;
    score = Math.round(score);
    quizScoreEl.textContent = score;
}

startQuizBtn.addEventListener("click", startQuiz);

startQuizBtn.addEventListener("click", startTimer);

startQuizBtn.addEventListener("click", function() {
    quizChallenge.style.display = 'none';
    quizChallengeDescription.style.display = 'none';
    startQuizBtn.style.display = 'none';
    quizContainerEl.style.display = "block";
}) 






