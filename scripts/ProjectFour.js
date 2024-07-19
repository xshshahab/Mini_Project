const questions = [
    {
        question : "Which is the largest animal in the world?",
        answers : [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question : "Which is the smallest continent in the world?",
        answers : [
            { text: "Asia", correct: false },
            { text: "Africa", correct: false },
            { text: "Arctic", correct: false },
            { text: "Australia", correct: true },
        ]
    },
    {
        question : "Which is the largest desert in the world?",
        answers : [
            { text: "Antarctica", correct: true },
            { text: "Sahara", correct: false },
            { text: "Gobi", correct: false },
            { text: "Kalahari", correct: false },
        ]
    },
    {
        question : "Which is the smallest country in the world?",
        answers : [
            { text: "Nepal", correct: false },
            { text: "Bhutan", correct: false },
            { text: "Vatican City", correct: true },
            { text: "Sri Lanka", correct: false },
        ]
    },
    {
        question : "Which is the longest river in the world?",
        answers : [
            { text: "Amazon River", correct: false },
            { text: "Nile River", correct: true },
            { text: "Yangtze River", correct: false },
            { text: "Mississippi River", correct: false },
        ]
    },
    {
        question : "Which planet is known as the Red Planet?",
        answers : [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question : "Which is the largest ocean in the world?",
        answers : [
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Atlantic Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
        ]
    },
    {
        question : "Which is the tallest mountain in the world?",
        answers : [
            { text: "K2", correct: false },
            { text: "Kangchenjunga", correct: false },
            { text: "Mount Everest", correct: true },
            { text: "Lhotse", correct: false },
        ]
    },
    {
        question : "Which is the fastest land animal?",
        answers : [
            { text: "Lion", correct: false },
            { text: "Cheetah", correct: true },
            { text: "Tiger", correct: false },
            { text: "Leopard", correct: false },
        ]
    },
    {
        question : "Which country has the largest population in the world?",
        answers : [
            { text: "India", correct: false },
            { text: "United States", correct: false },
            { text: "China", correct: true },
            { text: "Indonesia", correct: false },
        ]
    }
];


const quesElement = document.getElementById("question");
const ansBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currQuesIdx = 0;
let score = 0;

function startQuiz() {
    currQuesIdx = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function resetState() {
    nextBtn.style.display = "none";
    while(ansBtn.firstChild) {
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAnser(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansBtn.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}


function showQuestion() {
    resetState();
    let currQues = questions[currQuesIdx];
    let quesNo = currQuesIdx + 1;

    quesElement.innerHTML = quesNo + ". " + currQues.question;

    currQues.answers.forEach(ans => {
        const button = document.createElement("button");
        button.innerHTML = ans.text;

        button.classList.add("btn");
        ansBtn.appendChild(button);

        if(ans.correct) {
            button.dataset.correct = ans.correct;
        }
        button.addEventListener("click", selectAnser);
    });
}

function showScore() {
    resetState();
    quesElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currQuesIdx++;
    if (currQuesIdx < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextBtn.addEventListener("click", () => {
    if (currQuesIdx < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
})

startQuiz();