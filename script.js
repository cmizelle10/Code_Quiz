var quizContainerEl = document.getElementById("js-quiz");
var startQuizBtn = document.getElementById("js-start-quiz");
var quizScoreEl = document.getElementById("js-quiz-score");
var quizTimerEl = document.getElementById("js-timer");
var questionTextEl = document.getElementById("js-question-text");
var answerListEl = document.getElementById("js-answer-list");

var quizScore = 0;
var quizTimer = 0;
var currentQuestionIndex = 0;

var currentAnswer = "";


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
    for (const answerKey in choicesObject) {
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
    questionTextEl.textContent = questionObject.questionText 
    renderChoiceButtons(questionObject.questionChoices)
}



function startQuiz() {
    displayQuestion(questions[currentQuestionIndex])
}

startQuizBtn.addEventListener("click", startQuiz);

function checkAnswer(userAnswer) {
    
}

// event delegation, how to grab attributes

console.log(questions);
console.log(currentAnswer);