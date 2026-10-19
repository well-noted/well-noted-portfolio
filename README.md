# well-noted-portfolio

A portfolio built as a single-file TiddlyWiki. The finished site is `docs/index.html`.

## Publish on GitHub Pages

Commit `docs/index.html`, then in the repository go to Settings, Pages, choose "Deploy from a branch", branch `main`, folder `/docs`.

## Edit and rebuild

    npm install
    npm run dev      # live preview at http://localhost:8080 while you edit
    npm run build    # writes docs/index.html

Content lives in `site/tiddlers/`:

| File | What it is |
| --- | --- |
| `view-home.tid`, `view-systems.tid`, `view-institutional.tid`, `view-media.tid`, `view-governance.tid`, `view-about.tid` | One file per view. Edit the text here. |
| `view-print.tid` | The hidden `#print` view that stacks every section for printing. |
| `PageTemplate.tid` | The shell: header, navigation, the transclusion that shows the current view, previous/next links, footer. |
| `config-views.tid` | The order of the views. To add a view, create `View/yourname` with a `nav-label` field and add `yourname` to this list. |
| `stylesheet.tid` | All styling, including the print layout at the bottom. Colors and type sizes are variables at the top. |
| `nav.js` | Keeps the address bar in step with the current view, runs the video cards, and opens details blocks for printing. |
| `logos/` | Logo slots (see below). |

## PDF version

Open the site at `#print` (for example `https://your-site/#print`, or use the "Print or PDF" link in the footer), choose Print in the browser, set the destination to "Save as PDF", and turn on "Background graphics". The print layout is light, drops the navigation, shows every section in order, opens the README lists, and prints each video as a card with its URL. Links stay clickable in the PDF. Do this from a browser with internet access so the Logos and PuppetStudio screenshots load.

## Replacing logos

Logos are tiddlers named `Logo/WikiSage`, `Logo/Logos`, `Logo/PuppetStudio`, and `Logo/Site` (the header mark). WikiSage uses the real logo. The other three are placeholder SVGs. To replace one, for example Logos:

1. Delete `Logo-Logos.svg` and `Logo-Logos.svg.meta` from `site/tiddlers/logos/`.
2. Add your image as `Logo-Logos.png` in the same folder.
3. Add `Logo-Logos.png.meta` containing:

        title: Logo/Logos
        type: image/png

Square images work best for the project tiles.

## Notes

- The Logos and PuppetStudio screenshots load from your GitHub repositories at view time (raw.githubusercontent.com). If you rename or move those files, update the `src` in `view-systems.tid` and `view-institutional.tid`.
- Videos start as a play card. On a site served over https (GitHub Pages, or `npm run dev`), clicking the card loads the YouTube player in place. When `index.html` is opened straight from disk, YouTube refuses to play embedded videos (Error 153), so the card opens the video on YouTube instead.
- Deep links: `#systems`, `#systems/logos`, `#systems/wikisage`, `#institutional/puppetstudio`, `#print`, and so on.
- In `view-systems.tid`, the Logos "Response" text has an HTML comment holding the sentence about AI-driven logic. Restore it once those features are in the public repository.

## Update: print and register labels

- Print or PDF (footer link, or `#print`) now produces five Letter pages: Overview, Systems, Institutional, Media, Governance. About is left out.
- Each page carries a register label (Technical, Academic, Playful) matching its audience. Pipeline details and some rows are screen-only (`.screen-only`) so each section fits its page.
