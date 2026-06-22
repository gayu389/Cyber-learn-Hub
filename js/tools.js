// ===========================
// CyberLearn Hub — tools.js
// ===========================

/* ---- PASSWORD STRENGTH CHECKER ---- */

function checkPassword(pw) {
  let score = 0;
  const tips = [];

  if (pw.length >= 8)  score++; else tips.push('Use at least 8 characters');
  if (pw.length >= 12) score++; else if (pw.length >= 8) tips.push('12+ characters makes it significantly stronger');
  if (/[A-Z]/.test(pw)) score++; else tips.push('Add at least one uppercase letter (A–Z)');
  if (/[a-z]/.test(pw)) score++; else tips.push('Add at least one lowercase letter (a–z)');
  if (/[0-9]/.test(pw)) score++; else tips.push('Add at least one number (0–9)');
  if (/[^A-Za-z0-9]/.test(pw)) score++; else tips.push('Add symbols like !@#$% for a big boost');

  const COLORS = ['#ccc','#E24B4A','#E24B4A','#EF9F27','#EF9F27','#1D9E75','#1D9E75'];
  const LABELS = ['Enter a password above','Very weak','Weak','Fair','Good','Strong','Very strong'];

  for (let i = 1; i <= 5; i++) {
    document.getElementById('sb' + i).style.background = i <= score ? COLORS[Math.min(score, 6)] : '#eee';
  }

  const labelEl = document.getElementById('slabel');
  const tipsEl  = document.getElementById('pw-tips');

  if (pw.length === 0) {
    labelEl.textContent = 'Enter a password above';
    labelEl.style.color = '#999';
    tipsEl.style.display = 'none';
    return;
  }

  labelEl.textContent = LABELS[Math.min(score, 6)];
  labelEl.style.color = COLORS[Math.min(score, 6)];

  tipsEl.style.display = '';
  tipsEl.innerHTML = tips.length > 0
    ? '<strong>Suggestions:</strong><br>' + tips.map(t => '• ' + t).join('<br>')
    : '<span style="color:#1D9E75">✓ This is a strong password! Great job.</span>';
}

/* ---- PASSWORD GENERATOR ---- */

const CHARSET = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  num:   '0123456789',
  sym:   '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

function generatePassword() {
  const len      = parseInt(document.getElementById('pw-len').value, 10);
  const useUpper = document.getElementById('inc-upper').checked;
  const useLower = document.getElementById('inc-lower').checked;
  const useNum   = document.getElementById('inc-num').checked;
  const useSym   = document.getElementById('inc-sym').checked;

  let pool = '';
  const required = [];
  if (useUpper) { pool += CHARSET.upper; required.push(randomChar(CHARSET.upper)); }
  if (useLower) { pool += CHARSET.lower; required.push(randomChar(CHARSET.lower)); }
  if (useNum)   { pool += CHARSET.num;   required.push(randomChar(CHARSET.num)); }
  if (useSym)   { pool += CHARSET.sym;   required.push(randomChar(CHARSET.sym)); }
  if (!pool)    { pool  = CHARSET.lower; required.push(randomChar(CHARSET.lower)); }

  const bytes = new Uint32Array(len);
  crypto.getRandomValues(bytes);

  const arr = Array.from({ length: len }, (_, i) => pool[bytes[i] % pool.length]);
  required.forEach(ch => {
    const pos = Math.floor(Math.random() * len);
    arr[pos] = ch;
  });

  document.getElementById('gen-pw').textContent    = arr.join('');
  document.getElementById('gen-result').style.display = 'flex';
  document.getElementById('copy-msg').style.display   = 'none';
}

function randomChar(str) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return str[arr[0] % str.length];
}

function copyPassword() {
  const pw = document.getElementById('gen-pw').textContent;
  if (!pw) return;
  navigator.clipboard.writeText(pw).then(() => {
    const msg = document.getElementById('copy-msg');
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 2500);
  });
}

/* ---- PHISHING URL DETECTION ---- */

const PHISHING_CHECKS = [
  { test: url => /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url),
    label: 'IP address used instead of a domain name', risk: 2 },
  { test: url => /https?:\/\/[^/]*@/.test(url),
    label: '@ symbol found — possible embedded credentials', risk: 2 },
  { test: url => (url.match(/\./g) || []).length > 4,
    label: 'Unusually high number of subdomains', risk: 1 },
  { test: url => /\.(tk|ml|ga|cf|gq|xyz|top|click|download|win|loan|buzz)/.test(url),
    label: 'Suspicious or low-reputation top-level domain', risk: 1 },
  { test: url => {
      const hasBrand = /(paypal|google|amazon|apple|microsoft|bank|secure|login|verify|account)/i.test(url);
      const isTrusted = /^https:\/\/(www\.)?(paypal|google|amazon|apple|microsoft)\.com(\/|$)/.test(url);
      return hasBrand && !isTrusted;
    }, label: 'Trusted brand name embedded in a suspicious URL', risk: 3 },
  { test: url => /(-{2,})/.test(url),
    label: 'Repeated hyphens — common obfuscation technique', risk: 1 },
  { test: url => !/^https:/.test(url),
    label: 'Not using HTTPS — connection is unencrypted', risk: 1 },
  { test: url => url.length > 80,
    label: 'Unusually long URL — may hide the true destination', risk: 1 },
  { test: url => /bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly|rb\.gy/.test(url),
    label: 'URL shortener detected — real destination is hidden', risk: 1 },
  { test: url => /%[0-9A-Fa-f]{2}/.test(url),
    label: 'URL-encoded characters — possible obfuscation', risk: 1 }
];

function checkURL() {
  const input = document.getElementById('url-input').value.trim();
  const resultEl = document.getElementById('url-result');

  if (!input) { alert('Please enter a URL to analyze.'); return; }

  const flags = [];
  let totalRisk = 0;
  PHISHING_CHECKS.forEach(check => {
    if (check.test(input)) { flags.push(check.label); totalRisk += check.risk; }
  });

  let cssClass, icon, title, desc;
  if (totalRisk === 0) {
    cssClass = 'url-safe'; icon = 'ti-shield-check';
    title = 'Looks safe';
    desc  = 'No phishing indicators detected. Always be cautious before entering credentials.';
  } else if (totalRisk <= 2) {
    cssClass = 'url-warn'; icon = 'ti-alert-triangle';
    title = 'Suspicious — proceed with caution';
    desc  = 'Some warning signs detected. Avoid entering passwords or personal info on this site.';
  } else {
    cssClass = 'url-danger'; icon = 'ti-shield-x';
    title = 'High risk — likely phishing';
    desc  = 'Multiple phishing indicators found. Do not visit or enter any information on this URL.';
  }

  const flagsHtml = flags.length > 0
    ? `<div class="flags"><strong>Flags (${flags.length}):</strong><ul>${flags.map(f => `<li>${f}</li>`).join('')}</ul></div>`
    : '';

  resultEl.innerHTML = `
    <div class="url-result-box ${cssClass}">
      <i class="ti ${icon}"></i>
      <div>
        <strong>${title}</strong>
        <span>${desc}</span>
        ${flagsHtml}
      </div>
    </div>`;
  resultEl.style.display = '';
}