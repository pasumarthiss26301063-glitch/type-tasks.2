# Daymark — TypeTasks Part 2

A responsive, plain HTML/CSS/TypeScript task tracker. The interface is driven by the typed model from Part 1.

## Features
- Add tasks with unique generated IDs
- Advance tasks through `todo` → `in-progress` → `done`
- Filter by all four views
- Strict TypeScript types; no `any` and no framework/bundler
- Responsive layout for desktop and mobile

## Run locally
```bash
npm install
npx tsc
```
Then open `index.html` in a local static server (for example, VS Code Live Server). The generated `app.js` and `model.js` are loaded as native browser modules.

## Deploy with GitHub Pages
1. Push this project to the same public GitHub repository used for Part 1.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`, then Save.
5. Wait for Pages to publish. The URL is shown in Settings → Pages and usually looks like `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

## Part 2 pull request
Create a new branch such as `part-2-ui-ship`, commit the source files and generated JavaScript, then open a PR into `main`. Include both the public repository URL and deployed live URL in the PR description.

The live URL and pull request cannot be created automatically by this ZIP; they require access to your GitHub account and hosting settings.
