var quizContainerEl = document.getElementById("js-quiz");
var startQuizBtn = document.getElementById("js-start-quiz");
var quizScoreEl = document.getElementById("js-quiz-score");
var quizTimerEl = document.getElementById("js-timer");
var questionTextEl = document.getElementById("js-question-text");
var answerListEl = document.getElementById("js-answer-list");

var quizScore = 0;
var quizTimer = 0;
var currentQuestionIndex = 0;


var questions = [{
    questionText: "Question1",
    questionChoices: {
        a: "answer1",
        b: "answer2",
        c: "answer3",
        d: "answer4"
    },
    questionAnswer: 'c'
},
{
    questionText: "Question2",
    questionChoices: {
        a: "answer1",
        b: "answer2",
        c: "answer3",
        d: "answer4"
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


// event delegation, how to grab attributes