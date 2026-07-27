# Web Fundamentals — Pop Quiz

A short, timed multiple-choice quiz on HTML, CSS, and JavaScript basics, styled to look like a graded exam paper — complete with a letterhead, lettered answer bubbles, red-pen check/cross marks, and a stamped grade at the end.

---

## Preview

A single-page quiz: 10 questions, 15 seconds each, scored out of 10 with a letter grade and a running high score.

### Features

- 10 multiple-choice questions covering HTML, CSS, and JavaScript fundamentals
- 15-second countdown per question, shown as a stopwatch-style ring around the timer
- Answers rendered as lettered bubbles (A–D), filled in when selected
- Red-pen ✓ / ✗ marks reveal the correct answer after each question
- Final score shown as a rotated stamp with a percentage and letter grade (A+ down to F)
- High score persisted locally across sessions
- Fully responsive, single-file styling, no build step

---

## Built With

- HTML5
- CSS3 (custom properties, SVG for the timer ring and grade stamp)
- JavaScript (vanilla, no dependencies)
- `localStorage` for the high score

---

## File Structure

```
├── index.html    # markup and question/score containers
├── style.css     # exam-paper theme: letterhead, bubbles, stamps
└── script.js     # quiz logic, timer, scoring, grading
```

---

## Running It

No build tools required — it's static HTML/CSS/JS.

1. Download or clone the project folder.
2. Open `index.html` in a browser, or serve the folder with any static server (e.g. the VS Code Live Server extension, or `python3 -m http.server`).

---

## Customizing

- **Questions:** edit the `questions` array at the top of `script.js` — each entry needs a `question`, an `options` array, and an `answer` matching one of the options exactly.
- **Timer length:** change `TIME_LIMIT` in `script.js`.
- **Colors/fonts:** all theme values are CSS custom properties at the top of `style.css` (`--paper`, `--ink`, `--red`, and the three font variables).

---

## Current Status

Frontend-complete with a fixed local question bank. Score and high score are tracked client-side only.

---

## Future Improvements

- Pull questions from a JSON file or backend instead of a hard-coded array
- Category / difficulty selection before starting
- Per-question review screen after the final score
- Shareable results
- Sound effects for correct/incorrect answers
- Accessibility pass for screen-reader announcements during timed transitions
