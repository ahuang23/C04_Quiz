// Variables matching DOM IDs

var timeLeft = document.querySelector("#timeLeft");
var questionsDiv = document.querySelector("#questionsDiv");
var initialsDiv = document.querySelector("#initialsDiv");
var startTimer = document.querySelector("#startTimer");


// Array containing all the questions & answers
var questions = [
    {
        title: "What does CSS stand for?",
        choices: ["Colorful Style Sheets","Creative Style Sheets","Cascading Style Sheets", "Computer Style Sheets"],
        answer: "Cascading Style Sheets",
    },
    {
        title: "Where in an HTML document is the correct place to refer to an external style sheet?",
        choices:["In the <head> section","In the <body> section","At the end of the document","In the <css> section"],
        answer: "In the <head> section",
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices:["<script>","<javascript>","<scripting>","<js>"],
        answer: "<script>",
    },
    {
        title: "What is a variable?",
        choices:["Store values so we can use them later and change them from the code","Store values so we can use them but cannot change them","Store values so we can use them once","Store values in containers so we can't use them later"],
        answer: "Store values so we can use them later and change them from the code",
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices:["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
]

// Start score at 0
var score = 0;
// Start at first question
var questionsArr = 0;


// Time Variables
var initialTime = 0;
//+1 second due to delay in timing
var secondsLeft = 76;
//-10 seconds for each incorrect answer
var deduction = 10;

// Timer 
function countdownTimer() {
    if (initialTime === 0) {
        initialTime = setInterval(function() {
            secondsLeft--;
            timeLeft.textContent = `Time Left: ${secondsLeft}`;

    if (secondsLeft <= 0) {
        clearInterval(initialTime);
        timeLeft.textContent = "Time's Up!";
        endQuiz();
    } 
        }, 1000);
    }
    
}

// Start Timer
startTimer.addEventListener("click", function() {
    countdownTimer();
    render(questionsArr);
});

var createQuestions = document.createElement("ul");

// Renders questions & choices to page
function render(questionsArr) {
    questionsDiv.innerHTML = "";
    createQuestions.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var questionsInput = questions[questionsArr].title;
        var choicesInput = questions[questionsArr].choices;
        questionsDiv.textContent = questionsInput;
    }

    choicesInput.forEach (function (choiceX) {
        var choicesList = document.createElement("li");
        choicesList.textContent = choiceX;
        questionsDiv.appendChild(createQuestions);
        createQuestions.appendChild(choicesList);
        choicesList.addEventListener("click", compare);
    })
};

// Compares selected against answer key / increments to next question
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        if (element.textContent == questions[questionsArr].answer) {
            score++;

        } else {
            secondsLeft = secondsLeft - deduction;
        }

    }
    
questionsArr++;

    if (questionsArr >= questions.length) {
        endQuiz();
    } else {
        render(questionsArr);
}
     
};

function endQuiz() {
        secondsLeft = 0;
        questionsDiv.innerHTML = "";

        var finalScore = document.createElement("p");
        finalScore.setAttribute("id", "createP");
        finalScore.textContent = `Score: ${score}/5`;

        questionsDiv.appendChild(finalScore);

// Create Label
    var newLabel = document.createElement("label");
    newLabel.setAttribute("id", "newLabel");
    newLabel.textContent = " Enter your initials: ";

    questionsDiv.appendChild(newLabel);

// Enter Initials
    var entInitials = document.createElement("input");
    entInitials.setAttribute("type", "text");
    entInitials.setAttribute("id", "initials");
    entInitials.textContent = "";

    questionsDiv.appendChild(entInitials);

// Submit Button
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "Submit");
    submitBtn.setAttribute("style","color:white; background-color: black; border: none; padding: 4px; cursor: pointer;")
    submitBtn.textContent = " Submit";

    questionsDiv.appendChild(submitBtn);


submitBtn.addEventListener("click", function() {
    var captureInitials = entInitials.value;
    console.log(captureInitials);

    if (!captureInitials) {
        alert("Enter a value")
        return;
    } else {
        // Collect user info into a single variable
        var userInfo = {
            initials: captureInitials,
            finalScore: score
        };

        // Retrieve all high scores from memory
        var highScores = localStorage.getItem("highScores");
        if (highScores === null) {
        // Creates an empty array if currently no high scores
            highScores = [];
        } else {
            highScores = JSON.parse(highScores);
        }
        // Add user info into highScores array
        highScores.push(userInfo);

        // Add updated array back into local storage
        var newScores = JSON.stringify(highScores);
        localStorage.setItem("highScores", newScores);

        entInitials.value = "";

        alert("Score has been submitted")
        window.location.replace("./highscores.html");
        

    }

})    
}   

var resetButton = document.querySelector(".reset");

function resetQuiz() {
    if (secondsLeft === 0) {
    initialTime = 0;
    score = 0;
    secondsLeft = 76;
    countdownTimer();
    questionsArr = 0;
    render(questionsArr);
    } 

    else {
        return;
    }
}

resetButton.addEventListener("click",resetQuiz);