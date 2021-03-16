const optionElements = document.querySelectorAll('.option');
const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestions = document.getElementById('number-of-all-questions');

const answersTracker = document.getElementById('answers-tracker');

const btnNext = document.getElementById('btn-next');

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

let indexOfQuestion,
    indexOfPage = 0;
let score = 0;

const questions = [
    {
        question: 'Что должен иметь при себе водитель легкового, транспортного стредства, садясь за руль?',
        options: [
            'Права',
            'Страховку',
            'Регистрационный документ',
            'Все выше перечисленное',
        ],
        rightAnsver: 3
    },

    {
        question: 'Можно ли ездить на машине без подсветки заднего номера?',
        options: [
            'Можно',
            'Только днем',
            'Нельзя',
            'Можно, до первого штрафа',
        ],
        rightAnsver: 2
    },

    {
        question: 'Что должен сделать водитель, увидев перед собой стоящего, горного козла, посреди автобана?',
        options: [
            'Тормозить',
            'Пытаться объехать животное',
            'Продолжать движение не смотря ни на что!',
            'Остановить машину и подождать когда тот сам уйдет',
        ],
        rightAnsver: 2
    },

    {
        question: 'Какие меры должен предпринять водитель выезжая на равнозначный перекресток?',
        options: [
            'Ориентироваться на помеху справа',
            'Кто первый - тот и едет',
            'Включить аварейку',
            'Показать другой сигнальный жест',
        ],
        rightAnsver: 0
    },
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; 

    optionElements.forEach((item, index) => {
        item.innerHTML = questions[indexOfQuestion].options[index];
    })

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
}

let completedAnswers = []; 

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDublicate = false;

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDublicate = true;
                }
            });
            if (hitDublicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnsver) {
        el.target.classList.add('correct');
        score++;
        updateAnswerTracker('correct');
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnsver) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('correct', 'wrong', 'disabled');
    })
}

const answersTrackerFunction = () => {
    optionElements.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage -1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert ('Вам нужно выбрать один из вариантов ответа!');
    } else {
        randomQuestion();
        enableOptions();
    }
}

for (const option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e))
}

btnNext.addEventListener('click', () => validate());
btnTryAgain.addEventListener('click', () => tryAgain());

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => window.location.reload();

window.addEventListener('load', () => {
    randomQuestion();
    answersTrackerFunction();
});

