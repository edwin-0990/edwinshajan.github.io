# Edwin Shajan — Portfolio

Two design variants of a personal portfolio for an offensive-security professional.
Same content, two vibes — pick one to ship.

```
profile/
├── index.html        ← landing page to compare both (open this first)
├── modern/           ← Variant 01: Modern + terminal accents (recommended)
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── terminal/         ← Variant 02: Pure interactive terminal / hacker CLI
    ├── index.html
    ├── styles.css
    └── script.js
```

## Preview locally

Just double-click `index.html` (or any variant's `index.html`) — it's pure static
HTML/CSS/JS, no build step. Everything works straight from `file://`.

## Deploy free on GitHub Pages

1. Create a free account at https://github.com if you don't have one.
2. Create a new **public** repository named **`<your-username>.github.io`**
   (e.g. `edwinshajan.github.io`). This special name gives you the URL
   `https://<your-username>.github.io` with no extra config.
3. Upload the files. Two options:

   **A. Web upload (easiest):** On the repo page → *Add file* → *Upload files* →
   drag in the contents of this folder → *Commit changes*.

   **B. Git (command line):**
   ```bash
   cd "profile"
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
4. Repo → **Settings** → **Pages** → Source: *Deploy from a branch* →
   Branch: `main` / `/ (root)` → **Save**.
5. Wait ~1 minute, then visit `https://<your-username>.github.io`.

### Shipping ONE variant as the main site

While deciding, the root `index.html` is the chooser linking to both variants.
Once you pick a favorite, tell me and I'll promote that variant's files to the
root so your main URL opens it directly (the other can stay at `/modern` or
`/terminal` or be removed).

### Custom domain (optional, also free aside from domain cost)

In **Settings → Pages → Custom domain**, add e.g. `edwinshajan.com`, then add the
DNS records GitHub shows at your domain registrar. HTTPS is automatic.

## Notes

- No analytics, trackers, or external calls except Google Fonts.
- Phone number and home address are intentionally **not** included for privacy.
- Content is sourced from the résumé; edit the HTML to update any text.
```
