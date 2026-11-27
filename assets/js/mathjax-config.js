/* Support both MathJax delimiters and kramdown's legacy math/tex scripts. */
window.MathJax = {
  tex: {
    inlineMath: [['\\(', '\\)'], ['$', '$']],
    displayMath: [['\\[', '\\]'], ['$$', '$$']],
    processEscapes: true
  },
  startup: {
    pageReady: function () {
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
