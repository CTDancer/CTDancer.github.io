# Publishing notes

1. Copy .github/NOTE_TEMPLATE.md to _notes/<subject>/<descriptive-slug>.md. Keep stable URLs; choose a category in _data/note_topics.yml.
2. Fill in title, category, date (YYYY-MM-DD), tags and summary. Add a language field only if useful; Chinese and English text are both supported.
3. Use level-2 and level-3 headings for the automatically generated table of contents. Use double dollar delimiters for Kramdown inline and block mathematics; see the example.
4. Use relative_url for local images if using Liquid, and place images in images/notes/. Link to other notes by their published URL.
5. The Notes landing page and search index are generated from the collection on build. No HTML or manual index edits are required.
6. Open a pull request and run the Jekyll build check. Inspect the resulting pages, formula rendering and search in a browser before merging.
7. Everything committed to the public repository is public, even if not listed in navigation. Keep unpublished experiments and private notes elsewhere.

The CV is maintained as a public-facing HTML summary with browser PDF export. Publications are maintained in _data/publication_list.yml. Only add publication links and acceptance claims that are supported by the author's records or verified sources.
