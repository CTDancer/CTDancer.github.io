/* Support both MathJax delimiters and kramdown's legacy math/tex scripts. */
window.MathJax = {
  tex: {
    inlineMath: [['\\(', '\\)'], ['$', '$']],
    displayMath: [['\\[', '\\]'], ['$$', '$$']],
    processEscapes: true
  },
  startup: {
    pageReady: function () {
      // Recover the complete TeX only after Markdown parsing is finished.
      document.querySelectorAll('[data-tex].note-math-inline, [data-tex].note-math-display').forEach(function (node) {
        const display = node.classList.contains('note-math-display');
        node.textContent = (display ? '\\[' : '\\(') + node.getAttribute('data-tex') + (display ? '\\]' : '\\)');
      });
      document.querySelectorAll('script[type^="math/tex"]').forEach(function (node) {
        const display = /mode\s*=\s*display/.test(node.type);
        const left = display ? '\\[' : '\\(';
        const right = display ? '\\]' : '\\)';
        node.replaceWith(document.createTextNode(left + node.textContent + right));
      });
      return window.MathJax.startup.defaultPageReady();
    }
  }
};
