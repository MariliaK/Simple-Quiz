const questions = [
  {
    question: "Which one is the largest animal in the world?",
    answers: [
      {text: "Shark", correct: false},
      {text: "Blue Whale", correct: true},
      {text: "Elephant", correct: false},
      {text: "Giraffe", correct: false}
      
    ]
  },
  {
    question: "Which one is the smallest continent in the world?",
    answers: [
      {text: "Asia", correct: false},
      {text: "Australia", correct: true},
      {text: "Arctic", correct: false},
      {text: "Africa", correct: false}
      
    ]
  },
  {
    question: "Which one is the largest desert in the world?",
    answers: [
      {text: "Kalahari", correct: false},
      {text: "Gobi", correct: false},
      {text: "Sahara", correct: false},
      {text: "Antarctica", correct: true}
      
    ]
  },
  {
    question: "Which of the above is the smallest country in the world?",
    answers: [
      {text: "Vatican City", correct: true},
      {text: "Bhutan", correct: false},
      {text: "Nepal", correct: false},
      {text: "Shri Lanka", correct: false}
      
    ]
  },
  {
    question: "What animal is known to laugh and has been proven to have a sense of humor?",
    answers: [
      {text: "Cats", correct: false},
      {text: "Dogs", correct: false},
      {text: "Rats", correct: true},
      {text: "Dolphins", correct: false}
      
    ]
  },
  {
    question: "Bill Gates is the founder of which company?",
    answers: [
      {text: "Apple", correct: false},
      {text: "Amazon", correct: false},
      {text: "Tesla", correct: false},
      {text: "Microsoft", correct: true}
      
    ]
  },
  {
    question: "Which watch company has a pointed crown as its logo?",
    answers: [
      {text: "Catier", correct: false},
      {text: "Rolex", correct: true},
      {text: "Patek Philippe", correct: false},
      {text: "Swatch", correct: false}
      
    ]
  },
  {
    question: "What is the capital of Australia?",
    answers: [
      {text: "Melbourne", correct: false},
      {text: "Canberra", correct: true},
      {text: "Sidney", correct: false},
      {text: "Perth", correct: false}
      
    ]
  },
  {
    question: "Which country are you visiting if you are in the Taj Mahal?",
    answers: [
      {text: "Thailand", correct: false},
      {text: "Bali", correct: false},
      {text: "India", correct: true},
      {text: "China", correct: false}
      
    ]
  },
  {
    question: "Which two colors make up the flag of Denmark?",
    answers: [
      {text: "Red and White", correct: true},
      {text: "Blue and White", correct: false},
      {text: "Red and Blue", correct: false},
      {text: "Green and White", correct: false}
      
    ]
  }
  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  })
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";

}

function showScore(){
  resetState();
  questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();