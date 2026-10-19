# Thomas E. Tuoti: AI Portfolio

A portfolio of AI tools, analysis, and content standards, published as a single-file TiddlyWiki.

**Live site: [well-noted.github.io/well-noted-portfolio](https://well-noted.github.io/well-noted-portfolio/)**

The site is itself an example of a knowledge base. It is one HTML file in which each section is a view of the same wiki, so navigation switches views without reloading the page.

## What the portfolio covers

The work is presented in three registers, matched to the audience for each piece.

| Section | Register | What it shows |
| --- | --- | --- |
| **Systems** | Technical | WikiSage, an open-source plugin that connects OpenAI, Anthropic, Gemini, and local models to a TiddlyWiki, and Logos, a desktop environment for agent-based modeling. |
| **Institutional** | Academic | An analysis and presentation package built for the directors of ASU's College of Global Futures from a recorded AI panel, including how provisional results were labeled and how claims and attributions were checked. Also PuppetStudio, the open-source tool that produced the animated clips. No panel content is reproduced on the site. |
| **Media** | Playful, same quality gates | Two music videos made with AI tools, and the workflow and standards behind them. |
| **Governance** | Editorial standards | The review rubric used to decide whether AI-generated work is good enough to share: factual and contextual rigor, structural integrity, institutional tone, and fixing problems upstream in the system. |
| **About** | | What the portfolio is, how it was made, and how navigation works. |

## Related repositories

- [WikiSage](https://github.com/well-noted/WikiSage): AI companion plugin for TiddlyWiki
- [Logos](https://github.com/well-noted/Logos): agent-based modeling environment compatible with NetLogo
- [PuppetStudio](https://github.com/well-noted/PuppetStudio): captioned, animated clips from recorded conversations
- [MASTOC-LLM](https://github.com/well-noted/MASTOC-LLM): LLM agents in an agent-based commons model

Videos are on [YouTube @well-noted](https://www.youtube.com/@well-noted).

## PDF version

Open the site's "Print or PDF" link (or add `#print` to the address) and print to PDF from a browser. The print layout is five Letter pages, one section per page.

## How it is built

The site is a TiddlyWiki 5.3.8 edition with a custom page template, stylesheet, and a small startup module that keeps the address bar in step with the current view. Content is plain wikitext in `site/tiddlers/`, and the built file is `docs/index.html`, which GitHub Pages serves from the `/docs` folder.

To build it locally you need Node.js:

    npm install
    npm run dev      # live preview at http://localhost:8080
    npm run build    # writes docs/index.html

## License and credits

Copyright 2026 Thomas E. Tuoti. Built with [TiddlyWiki](https://tiddlywiki.com), which is open source under its own license.
