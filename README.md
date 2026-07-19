# The Paradox Archive

![The Paradox Archive](outputs/paradox-archive-hero.png)

A mysterious browser-based journey where mathematics, paradoxes, and the browser itself become the puzzle.

## Live project

- **Demo:** https://paradox-archive.pages.dev
- **Repository:** https://github.com/Timon-Hoefer/paradox-archive

## What it does

Players restore a corrupted mathematical archive by solving visual riddles involving space, graph theory, binary systems, browser history, observation, and hidden information. The experience supports desktop and mobile devices, English and German, anonymous progress, and a server-backed Hall of Fame.

## Built with

- Vanilla HTML, CSS, and JavaScript
- Canvas, Pointer, Visibility, History, and Drag-and-Drop Web APIs
- Cloudflare Pages and Pages Functions
- Cloudflare D1
- GitHub

## How Codex and GPT-5.6 were used

**Codex and GPT-5.6 were central collaborative tools throughout the project.** They were used to turn puzzle concepts into working browser mechanics, iterate on the narrative and terminal-style interface, and adapt every chapter for both mouse and touch interaction.

Their contributions included:

- Prototyping and refining the individual puzzle mechanics
- Implementing responsive HTML, CSS, JavaScript, and Canvas interactions
- Debugging mobile viewport, pointer, drag-and-drop, and performance problems
- Designing the Cloudflare Pages, Functions, and D1 architecture
- Moving final-answer validation and Hall of Fame logic to the server
- Reviewing input validation, sessions, rate limits, CSP hashes, and security headers
- Creating automated syntax, navigation, and defensive security checks
- Producing the 3:2 project key visual and assisting with project documentation

The human role remained essential: defining the mathematical ideas, selecting the puzzle rules, testing difficulty, judging fairness, and repeatedly directing the creative and technical iterations. Codex acted as an engineering and design collaborator rather than an autonomous one-shot generator.

## Local development

The static application is in `outputs/`, while server endpoints are in `functions/`.

```bash
npm install
npx wrangler pages dev outputs
```

## Deployment

The repository is connected to Cloudflare Pages. The static output directory is `outputs`, and Pages Functions provide the API routes used for answer validation, sessions, and the Hall of Fame.

## Privacy

The game does not require an account. Hall of Fame names and comments are public, editable, and removable by their anonymous session owner. Entries expire after 100 days or after 100 newer entries have been added.

