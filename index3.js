let quizzes = [];
let users = [];
let currentUser = null;

// Sample quiz data for initial testing
quizzes = [
    {
        title: "Basic Science Quiz",
        questions: [
            {
                question: "What is the boiling point of water?",
                options: ["90°C", "100°C", "120°C", "150°C"],
                correctAnswer: 2
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Earth", "Mars", "Jupiter", "Venus"],
                correctAnswer: 2
            },
            {
                question: "What is the chemical symbol for water?",
                options: ["O", "H2", "H2O", "OH"],
                correctAnswer: 3
            }
        ]
    },
    {
        title: "Math Basics",
        questions: [
            {
                question: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 2
            },
            {
                question: "What is the square root of 16?",
                options: ["2", "4", "8", "16"],
                correctAnswer: 2
            },
            {
                question: "What is 10 divided by 2?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 3
            }
        ]
    }
];

let timer;
let timeLeft = 300; // 5 minutes timer for each quiz

// Initialize on window load
window.onload = () => {
    showQuizSelection();
    document.getElementById('quizArea').classList.add('fade-in');
    setInterval(updateTimer, 1000);
};

// Function to display the Home section
function showHome() {
    showSection('home');
    document.getElementById('home').classList.add('slide-in-left');
}

// Function to show a specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => section.classList.add('hidden', 'fade-out'));
    document.getElementById(sectionId).classList.remove('hidden', 'fade-out');
    document.getElementById(sectionId).classList.add('fade-in');
}

// Function to display available quizzes with smooth transition
function showQuizSelection() {
    hideAllSections();
    const quizSelection = document.getElementById('quizSelection');
    quizSelection.innerHTML = quizzes.map((quiz, index) => `
        <div class="quiz-item">
            <h3 class="quiz-title">${quiz.title}</h3>
            <button class="take-quiz-btn" onclick="startQuiz(${index})">Take Quiz</button>
        </div>
    `).join('');
    quizSelection.classList.remove('hidden');
    quizSelection.classList.add('slide-in-bottom');
}

// Function to start a selected quiz with timer
function startQuiz(quizIndex) {
    hideAllSections();
    const quiz = quizzes[quizIndex];
    document.getElementById('currentQuizTitle').textContent = quiz.title;
    startTimer();

    const quizQuestions = document.getElementById('quizQuestions');
    quizQuestions.innerHTML = quiz.questions.map((question, index) => `
        <div class="question">
            <p class="question-text">${question.question}</p>
            ${question.options.map((option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i + 1}" class="quiz-option"/>
                    ${option}
                </label>
            `).join('')}
        </div>
    `).join('');
    document.getElementById('quizArea').classList.remove('hidden');
    document.getElementById('quizArea').classList.add('fade-in');
}

// Timer functionality
function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (timeLeft > 0) {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    } else {
        clearInterval(timer);
        submitQuiz(); // Automatically submit quiz when time's up
    }
}

// Function to submit quiz answers and calculate score with animations
function submitQuiz() {
    clearInterval(timer);
    const questions = document.querySelectorAll('#quizQuestions div');
    let score = 0;
    const correctAnswers = [];
    const quizTitle = document.getElementById('currentQuizTitle').textContent;
    const quiz = quizzes.find(q => q.title === quizTitle);

    questions.forEach((question, index) => {
        const selectedOption = question.querySelector(`input[name="question${index}"]:checked`);
        const correctOption = quiz.questions[index].correctAnswer;
        if (selectedOption && Number(selectedOption.value) === correctOption) {
            score++;
            correctAnswers.push(`Question ${index + 1}: Correct`);
        } else {
            correctAnswers.push(`Question ${index + 1}: Incorrect`);
        }
    });

    displayScore(score, questions.length, correctAnswers);
}

// Display score with animation
function displayScore(score, total, correctAnswers) {
    const scoreElement = document.getElementById('score');
    const correctAnswersElement = document.getElementById('correctAnswers');
    scoreElement.textContent = `Your Score: ${score}/${total}`;
    correctAnswersElement.innerHTML = correctAnswers.join('<br>');
    scoreElement.classList.add('bounce-in');
    correctAnswersElement.classList.add('fade-in');
    showSection('quizResults');
}

// Function to show the Create Quiz section with animation
function showCreateQuiz() {
    showSection('createQuiz');
    document.getElementById('createQuiz').classList.add('slide-in-right');
}

// Function to add a new question in Create Quiz section
function addQuestion() {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    
    // Create the structure for the question and options
    questionDiv.innerHTML = `
        <input type="text" placeholder="Enter your question" required />
        <div class="options-container">
            <div class="option">
                <input type="text" placeholder="Option 1" required />
                <input type="radio" name="correctAnswer${questionsContainer.children.length}" value="1" required />
            </div>
            <div class="option">
                <input type="text" placeholder="Option 2" required />
                <input type="radio" name="correctAnswer${questionsContainer.children.length}" value="2" required />
            </div>
            <div class="option">
                <input type="text" placeholder="Option 3" required />
                <input type="radio" name="correctAnswer${questionsContainer.children.length}" value="3" required />
            </div>
            <div class="option">
                <input type="text" placeholder="Option 4" required />
                <input type="radio" name="correctAnswer${questionsContainer.children.length}" value="4" required />
            </div>
        </div>
    `;
    
    // Append the questionDiv to the container
    questionsContainer.appendChild(questionDiv);
    questionDiv.classList.add('fade-in');
}

// Function to save a newly created quiz with animation
document.getElementById('quizForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('quizTitle').value;
    const questions = Array.from(document.querySelectorAll('#questionsContainer .question')).map((qDiv) => {
        const inputs = Array.from(qDiv.querySelectorAll('input'));
        const questionText = inputs[0].value;

        // Extract options and correct answer
        const options = [];
        for (let i = 1; i <= 4; i++) {
            options.push(inputs[i * 2 - 1].value); // The input for the option text is every second element
        }

        // Find the correct answer by checking the selected radio button
        const correctAnswer = options.findIndex((_, i) => inputs[i * 2 + 1].checked) + 1; // Add 1 for correct answer index (1-4)
        
        return {
            question: questionText,
            options,
            correctAnswer,
        };
    });

    // Assuming `quizzes` is an array where you store the quiz data
    quizzes.push({ title, questions });

    alert('Quiz saved!');
    showQuizSelection(); // Assuming this function shows the list of saved quizzes
});

// Function to handle the About section with fade effect
function showAbout() {
    showSection('about');
    document.getElementById('about').classList.add('fade-in');
}

// Function to display Login section with fade effect
function showLogin() {
    showSection('login');
    document.getElementById('login').classList.add('slide-in-left');
}

// Function to display Register section with slide effect
function showRegister() {
    showSection('register');
    document.getElementById('register').classList.add('slide-in-left');
}

// Form submission handler for Login
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Login functionality is not implemented yet.');
    showHome();
});

// Form submission handler for Register
document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Registration functionality is not implemented yet.');
    showHome();
});

// Helper function to hide all sections
function hideAllSections() {
    document.querySelectorAll('.content').forEach(content => content.classList.add('hidden'));
}

// Add custom animations to elements when they appear or disappear
document.querySelectorAll('.fade-in').forEach((el) => {
    el.classList.add('fade-in-effect');
});

document.querySelectorAll('.slide-in-left').forEach((el) => {
    el.classList.add('slide-in-left-effect');
});

document.querySelectorAll('.slide-in-right').forEach((el) => {
    el.classList.add('slide-in-right-effect');
});

document.querySelectorAll('.bounce-in').forEach((el) => {
    el.classList.add('bounce-in-effect');
});
