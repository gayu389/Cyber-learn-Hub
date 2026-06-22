# 🛡️ CyberLearn Hub

> An interactive cybersecurity learning platform built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, just open `index.html` and go.

![CyberLearn Hub](https://img.shields.io/badge/CyberLearn-Hub-1D9E75?style=for-the-badge&logo=shield&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📸 Preview

| Dashboard | Learning Modules | Security Tools |
|-----------|-----------------|----------------|
| Welcome banner, stats, module cards, daily challenge | 40 lessons across 4 modules with progress tracking | Password checker, generator, and phishing URL detector |

---

## ✨ Features

### 📚 4 Learning Modules (10 lessons each)
| Module | Topics Covered |
|--------|----------------|
| 🛡️ **Security Awareness** | Social engineering, MFA, safe browsing, insider threats |
| 🎣 **Phishing Detection** | Email anatomy, lookalike domains, BEC, anti-phishing tools |
| 🐛 **Malware Analysis** | Ransomware, static/dynamic analysis, IOCs, sandboxing |
| 🌐 **Network Security** | Firewalls, VPNs, IDS/IPS, Zero Trust, DDoS mitigation |

### 🧠 Interactive Quizzes
- 5 questions per module (20 total)
- Instant correct/incorrect feedback with explanations
- Score tracking and results screen
- Retry or return to module options

### 🔧 Security Tools
| Tool | Description |
|------|-------------|
| 🔑 **Password Strength Checker** | Real-time scoring across 5 bars with actionable improvement tips |
| ⚙️ **Password Generator** | Cryptographically secure via `crypto.getRandomValues()`, configurable length (8–32) and character sets |
| 🔗 **Phishing URL Detector** | 10-point analysis engine — checks IP addresses, suspicious TLDs, brand impersonation, URL shorteners, HTTPS, and more |

### 📊 Progress & Analytics
- XP points and rank system (Bronze → Silver → Gold)
- Module progress bars
- Weekly activity bar charts
- Certificate gallery (locked/unlocked)
- Real-time activity feed

### 📱 Responsive Design
- Works on desktop, tablet, and mobile
- CSS Grid with `auto-fit` / `minmax` for fluid layouts
- Mobile-optimized navigation

---

## 🚀 Getting Started

### Option 1 — Just open it
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/cyberlearn-hub.git

# Navigate into it
cd cyberlearn-hub

# Open in browser (macOS)
open index.html

# Open in browser (Linux)
xdg-open index.html

# Open in browser (Windows)
start index.html
```

### Option 2 — Live server (recommended for development)
```bash
# Using VS Code Live Server extension — right-click index.html → Open with Live Server

# OR using Python
python -m http.server 8000
# Then visit http://localhost:8000

# OR using Node.js
npx serve .
# Then visit http://localhost:3000
```

> ✅ No npm install. No build step. No config files. Zero dependencies.

---

## 📁 Project Structure

```
cyberlearn-hub/
│
├── index.html          # Main HTML — all 4 page sections
│
├── css/
│   └── style.css       # All styles, CSS variables, responsive breakpoints
│
└── js/
    ├── data.js         # All module lessons & quiz question data
    ├── quiz.js         # Quiz engine (render, answer, score, results)
    ├── tools.js        # Password checker, generator & URL detector logic
    └── app.js          # Navigation & page controller
```

### File responsibilities

| File | Responsibility |
|------|---------------|
| `index.html` | Page structure and static HTML for all 4 sections |
| `css/style.css` | CSS custom properties, component styles, responsive layout |
| `js/data.js` | `MODULES` and `QUIZZES` data objects — edit here to add content |
| `js/quiz.js` | `startQuiz()`, `renderQuestion()`, `answerQuestion()`, `showQuizResults()`, `openModule()` |
| `js/tools.js` | `checkPassword()`, `generatePassword()`, `copyPassword()`, `checkURL()` |
| `js/app.js` | `showPage()`, `activatePage()` — navigation controller |

---

## 🛠️ Customization Guide

### ➕ Add a new lesson
Open `js/data.js` and add an entry to any module's `lessons` array:
```javascript
{ title: 'Your lesson title', desc: 'Short description', diff: 'easy', done: false }
// diff options: 'easy' | 'med' | 'hard'
```

### ➕ Add a new quiz question
Open `js/data.js` and add an entry to any module's `QUIZZES` array:
```javascript
{
  q: 'Your question here?',
  opts: ['Option A', 'Option B', 'Option C', 'Option D'],
  a: 1,   // index of correct answer (0-based)
  exp: 'Explanation shown after answering.'
}
```

### 🎨 Change the color scheme
Open `css/style.css` and edit the `:root` variables:
```css
:root {
  --green:       #1D9E75;   /* primary brand color */
  --green-light: #E1F5EE;   /* light background tint */
  --green-dark:  #0F6E56;   /* darker hover/active state */
  /* ... */
}
```

### ➕ Add a new module
1. Add a key to `MODULES` in `js/data.js` with `title`, `icon`, `colorClass`, and `lessons`
2. Add a key to `QUIZZES` in `js/data.js` with question objects
3. Add a module card in `index.html` for both the Dashboard and Learn pages
4. Add a color class in `css/style.css` under `.module-icon`

---

## 🔒 Security Tool Details

### Password Strength Checker — scoring criteria
| Check | Points |
|-------|--------|
| Length ≥ 8 characters | +1 |
| Length ≥ 12 characters | +1 |
| Contains uppercase (A–Z) | +1 |
| Contains lowercase (a–z) | +1 |
| Contains numbers (0–9) | +1 |
| Contains symbols (!@#...) | +1 |

**Ratings:** Very Weak (1) → Weak (2) → Fair (3) → Good (4) → Strong (5) → Very Strong (6)

### Phishing URL Detector — checks performed
| Check | Risk Weight |
|-------|-------------|
| IP address instead of domain | High (+2) |
| @ symbol in URL (credential embedding) | High (+2) |
| Brand name in suspicious URL | Critical (+3) |
| Suspicious TLD (.tk, .ml, .xyz, etc.) | Medium (+1) |
| Excessive subdomains (> 4 dots) | Medium (+1) |
| URL shortener detected | Medium (+1) |
| Not using HTTPS | Medium (+1) |
| URL length > 80 characters | Low (+1) |
| Repeated hyphens (obfuscation) | Low (+1) |
| URL-encoded characters | Low (+1) |

**Risk levels:** 0 = Safe · 1–2 = Suspicious · 3+ = High Risk / Likely Phishing

---

## 🧩 Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic page structure |
| **CSS3** | Custom properties, Grid, Flexbox, transitions |
| **Vanilla JavaScript (ES6+)** | All interactivity, DOM manipulation, logic |
| **Web Crypto API** | `crypto.getRandomValues()` for secure password generation |
| **Tabler Icons** | Icon font via CDN (`cdn.jsdelivr.net`) |

No frameworks. No bundlers. No dependencies to install.

---

## 📖 Pages Overview

| Page | ID | Description |
|------|----|-------------|
| Dashboard | `page-dashboard` | Stats overview, module cards, daily challenge |
| Learn | `page-learn` | Module list → lesson viewer → quiz engine |
| Tools | `page-tools` | Password checker, generator, URL detector |
| Progress | `page-analytics` | Charts, certificates, activity feed |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "Add: your feature description"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

### Ideas for contributions
- [ ] Dark mode toggle
- [ ] LocalStorage-based progress persistence
- [ ] Timer for quiz questions
- [ ] More modules (Cloud Security, OSINT, CTF Challenges)
- [ ] Printable/downloadable certificate generator
- [ ] Leaderboard / streak system

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License — free to use, modify, and distribute with attribution.
```

---

## 👤 Author

Built with ❤️ for cybersecurity education.

> ⭐ If you found this useful, please consider giving it a star on GitHub!

---

## 📬 Acknowledgements

- [Tabler Icons](https://tabler-icons.io/) — beautiful open-source icons
- Cybersecurity content inspired by industry frameworks: NIST, MITRE ATT&CK, OWASP
