// Roadmap steps data
const roadmapSteps = [
    {
        title: "Introduction to HTML",
        video: "https://www.youtube.com/embed/UB1O30fR3HI",
        quiz: {
            question: "What does HTML stand for?",
            options: [
                "Hyper Trainer Marking Language",
                "Hyper Text Markup Language",
                "Hyper Text Marketing Language",
                "Hyper Text Markup Leveler"
            ],
            answer: 1
        }
    },
    {
        title: "CSS Basics",
        video: "https://www.youtube.com/embed/yfoY53QXEnI",
        quiz: {
            question: "Which property is used to change the text color in CSS?",
            options: [
                "font-color",
                "text-color",
                "color",
                "background-color"
            ],
            answer: 2
        }
    },
    {
        title: "JavaScript Fundamentals",
        video: "https://www.youtube.com/embed/hdI2bqOjy3c",
        quiz: {
            question: "Which keyword is used to declare a variable in JavaScript?",
            options: [
                "var",
                "int",
                "string",
                "float"
            ],
            answer: 0
        }
    }
];

let currentStep = 0;
let completedSteps = 0;

function renderRoadmap() {
    const roadmap = document.getElementById('roadmap');
    roadmap.innerHTML = '';
    roadmapSteps.forEach((step, idx) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'roadmap-step' + (idx < completedSteps ? ' completed' : '');
        stepDiv.innerHTML = `
            <h2>${step.title}</h2>
            <iframe class="video" src="${step.video}" frameborder="0" allowfullscreen></iframe>
            <div class="quiz">
                <p><strong>Quiz:</strong> ${step.quiz.question}</p>
                ${step.quiz.options.map((opt, i) => `
                    <label><input type="radio" name="quiz${idx}" value="${i}" ${idx !== currentStep ? 'disabled' : ''}> ${opt}</label>
                `).join('')}
                <button class="btn" id="btn${idx}" ${idx !== currentStep ? 'disabled' : ''}>Submit Answer</button>
                <div class="result" id="result${idx}"></div>
            </div>
        `;
        roadmap.appendChild(stepDiv);
    });
}

function updateProgress() {
    const progress = document.getElementById('progress');
    const percent = Math.round((completedSteps / roadmapSteps.length) * 100);
    progress.style.width = percent + '%';
}

function handleQuiz(idx) {
    const radios = document.getElementsByName('quiz' + idx);
    let selected = -1;
    radios.forEach(r => { if (r.checked) selected = parseInt(r.value); });
    const resultDiv = document.getElementById('result' + idx);
    if (selected === roadmapSteps[idx].quiz.answer) {
        resultDiv.textContent = 'Correct!';
        completedSteps = Math.max(completedSteps, idx + 1);
        currentStep = completedSteps;
        renderRoadmap();
        updateProgress();
    } else {
        resultDiv.textContent = 'Incorrect. Try again.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderRoadmap();
    updateProgress();
    roadmapSteps.forEach((_, idx) => {
        document.addEventListener('click', function(e) {
            if (e.target && e.target.id === 'btn' + idx) {
                handleQuiz(idx);
            }
        });
    });
});
