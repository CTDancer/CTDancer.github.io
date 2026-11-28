# Publishing notes

1. Copy .github/NOTE_TEMPLATE.md to .github/note_sources/<subject>/<descriptive-slug>.md. Keep stable URLs; choose a category in _data/note_topics.yml.
2. Fill in title, category, date (YYYY-MM-DD), tags and summary. Add a language field only if useful; Chinese and English text are both supported.
3. Use level-2 and level-3 headings for the automatically generated table of contents. Write inline math as $...$ and display math as standalone $ blocks. Generate the deployable note with `python3 .github/scripts/prepare_note.py .github/note_sources/<subject>/<slug>.md _notes/<subject>/<slug>.md`. Do not submit raw TeX delimiters in the generated note: Markdown table detection can interpret vertical bars in Dirac notation as table separators.
4. Use relative_url for local images if using Liquid, and place images in images/notes/. Link to other notes by their published URL.
5. The Notes landing page and search index are generated from the collection on build. No manual HTML or search-index edits are required. Commit both the canonical source and its generated note.
6. Open a pull request and run the Jekyll build check. Inspect the resulting pages, formula rendering and search in a browser before merging.
7. Everything committed to the public repository is public, even if not listed in navigation. Keep unpublished experiments and private notes elsewhere.

The CV is maintained as a public-facing HTML summary with browser PDF export. Publications are maintained in _data/publication_list.yml. Only add publication links and acceptance claims that are supported by the author's records or verified sources.

For explanatory figures, use the reusable Scientific Figure component in [SCIENTIFIC_FIGURE_GUIDE.md](SCIENTIFIC_FIGURE_GUIDE.md). It provides real LaTeX outlines, SVG fallback, and shared interaction controls. Generate static files before committing; do not use manually composed Unicode math labels.
