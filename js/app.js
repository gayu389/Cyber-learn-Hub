// ===========================
// CyberLearn Hub — app.js
// ===========================

function showPage(pageId, tabEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');
  if (tabEl) tabEl.classList.add('active');

  if (pageId === 'learn') {
    document.getElementById('learn-index').style.display  = '';
    document.getElementById('learn-detail').style.display = 'none';
    document.getElementById('learn-quiz').style.display   = 'none';
  }
}

function activatePage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => {
    t.classList.remove('active');
    if (t.getAttribute('onclick') && t.getAttribute('onclick').includes("'" + pageId + "'")) {
      t.classList.add('active');
    }
  });
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('CyberLearn Hub initialized ✓');
});