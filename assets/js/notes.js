/* No third-party search dependency; the Jekyll index contains public notes only. */
(function () {
  'use strict';
  const input = document.getElementById('note-query');
  if (input) {
    const status = document.getElementById('note-search-status');
    const cards = Array.from(document.querySelectorAll('[data-note-url]'));
    const groups = Array.from(document.querySelectorAll('.notes-group'));
    const empty = document.getElementById('notes-no-results');
    let index = new Map();
    let complete = false;
    const norm = (value) => String(value || '').normalize('NFKC').toLocaleLowerCase();
    const render = () => {
      const terms = norm(input.value).trim().split(/\s+/).filter(Boolean);
      let count = 0;
      cards.forEach(card => {
        const haystack = index.get(card.dataset.noteUrl) || norm(card.textContent + ' ' + card.closest('.notes-group').querySelector('h2').textContent);
        const match = terms.every(term => haystack.includes(term));
        card.hidden = !match;
        if (match) count++;
      });
      groups.forEach(group => {
        group.hidden = terms.length > 0 && !group.querySelector('.note-card:not([hidden])');
      });
      empty.hidden = !terms.length || count > 0;
      status.textContent = (terms.length ? count + ' matching' : cards.length + ' available') + ' ' + (count === 1 ? 'note' : 'notes') + (complete ? ' · Full-text search' : ' · Title and tag search');
    };
    input.disabled = false;
    input.addEventListener('input', render);
    render();
    fetch(input.dataset.index).then(response => {
      if (!response.ok) throw new Error('Search index unavailable');
      return response.json();
    }).then(items => {
      index = new Map(items.map(item => [item.url, norm([item.title, item.category, (item.tags || []).join(' '), item.summary, item.content].join(' '))]));
      complete = true;
      render();
    }).catch(() => render());
  }

  const content = document.getElementById('note-content');
  const toc = document.getElementById('note-toc-list');
  if (content && toc) {
    const headings = Array.from(content.querySelectorAll('h2[id], h3[id]'));
    headings.forEach(heading => {
      const li = document.createElement('li');
      if (heading.tagName === 'H3') li.classList.add('note-toc-sub');
      const a = document.createElement('a');
      a.href = '#' + encodeURIComponent(heading.id);
      a.textContent = heading.textContent;
      li.appendChild(a);
      toc.appendChild(li);
    });
    if (headings.length) toc.parentElement.hidden = false;
  }

  const printButton = document.getElementById('print-cv');
  if (printButton) printButton.addEventListener('click', () => window.print());
})();
