// ===========================
// CyberLearn Hub — quiz.js
// ===========================

let currentQuiz = { questions: [], current: 0, score: 0, moduleKey: '' };

function startQuiz(moduleKey) {
  const questions = QUIZZES[moduleKey] || QUIZZES['phishing'];
  currentQuiz = { questions, current: 0, score: 0, moduleKey };
  activatePage('learn');
  document.getElementById('learn-index').style.display  = 'none';
  document.getElementById('learn-detail').style.display = 'none';
  document.getElementById('learn-quiz').style.display   = '';
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById('learn-quiz');
  const q = currentQuiz.questions[currentQuiz.current];
  const total = currentQuiz.questions.length;
  const pct = Math.round((currentQuiz.current / total) * 100);

  container.innerHTML = `
    <button class="back-btn" onclick="backToLearn()">
      <i class="ti ti-arrow-left"></i> Exit quiz
    </button>
    <div class="quiz-container">
      <div class="quiz-card">
        <div class="quiz-meta">
          <span class="q-counter">Question ${currentQuiz.current + 1} of ${total}</span>
          <div class="quiz-progress">
            <div class="quiz-progress-fill" style="width:${pct}%"></div>
          </div>
          <span class="q-counter">${currentQuiz.score} correct</span>
        </div>
        <div class="quiz-question">${q.q}</div>
        <div class="quiz-options">
          ${q.opts.map((opt, i) => `
            <button class="q-opt" onclick="answerQuestion(${i})">${opt}</button>
          `).join('')}
        </div>
      </div>
    </div>`;
}

function answerQuestion(selectedIndex) {
  const q = currentQuiz.questions[currentQuiz.current];
  const correct = selectedIndex === q.a;
  if (correct) currentQuiz.score++;

  document.querySelectorAll('.q-opt').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.a) btn.classList.add('correct');
    if (i === selectedIndex && !correct) btn.classList.add('wrong');
  });

  const feedback = document.createElement('div');
  feedback.className = 'quiz-feedback ' + (correct ? 'fb-correct' : 'fb-wrong');
  feedback.innerHTML = `<strong>${correct ? '✓ Correct!' : '✗ Incorrect.'}</strong> ${q.exp}`;
  document.querySelector('.quiz-options').after(feedback);

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary';
  const isLast = currentQuiz.current + 1 >= currentQuiz.questions.length;
  nextBtn.textContent = isLast ? 'See results' : 'Next question →';
  nextBtn.onclick = () => {
    currentQuiz.current++;
    if (currentQuiz.current < currentQuiz.questions.length) renderQuestion();
    else showQuizResults();
  };
  feedback.after(nextBtn);
}

function showQuizResults() {
  const container = document.getElementById('learn-quiz');
  const total = currentQuiz.questions.length;
  const pct = Math.round((currentQuiz.score / total) * 100);
  const message = pct >= 80 ? 'Excellent work! 🎉' : pct >= 60 ? 'Good effort! 💪' : 'Keep practicing! 📚';

  container.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-card">
        <div class="score-card">
          <div class="score-circle">
            <div class="score-num">${currentQuiz.score}</div>
            <div class="score-denom">of ${total}</div>
          </div>
          <h2>${message}</h2>
          <p>You scored <strong>${pct}%</strong> on this quiz</p>
          <div class="score-actions">
            <button class="btn" onclick="startQuiz('${currentQuiz.moduleKey}')">Retry quiz</button>
            <button class="btn btn-primary" onclick="openModule('${currentQuiz.moduleKey}')">Back to module</button>
          </div>
        </div>
      </div>
    </div>`;
}

function openModule(key) {
  const m = MODULES[key];
  const done = m.lessons.filter(l => l.done).length;

  activatePage('learn');
  document.getElementById('learn-index').style.display  = 'none';
  document.getElementById('learn-quiz').style.display   = 'none';
  document.getElementById('learn-detail').style.display = '';

  document.getElementById('learn-detail').innerHTML = `
    <button class="back-btn" onclick="backToLearn()">
      <i class="ti ti-arrow-left"></i> All modules
    </button>
    <div class="module-header">
      <div class="mh-icon module-icon ${m.colorClass}">
        <i class="ti ${m.icon}"></i>
      </div>
      <div class="mh-info">
        <h2>${m.title}</h2>
        <p>${done} of ${m.lessons.length} lessons complete</p>
      </div>
      <button class="btn btn-primary" onclick="startQuiz('${key}')">Take quiz</button>
    </div>
    <div class="lessons-list">
      ${m.lessons.map((lesson, i) => `
        <div class="lesson-item ${lesson.done ? 'done' : ''}">
          <div class="lesson-num ${lesson.done ? 'done' : 'pending'}">
            ${lesson.done ? '<i class="ti ti-check"></i>' : i + 1}
          </div>
          <div class="lesson-info">
            <h4>${lesson.title}</h4>
            <p>${lesson.desc}</p>
          </div>
          <span class="badge badge-${lesson.diff === 'easy' ? 'easy' : lesson.diff === 'med' ? 'med' : 'hard'}">
            ${lesson.diff === 'easy' ? 'Easy' : lesson.diff === 'med' ? 'Medium' : 'Hard'}
          </span>
        </div>`).join('')}
    </div>`;
}

function backToLearn() {
  document.getElementById('learn-index').style.display  = '';
  document.getElementById('learn-detail').style.display = 'none';
  document.getElementById('learn-quiz').style.display   = 'none';
}