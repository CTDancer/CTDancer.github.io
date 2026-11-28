#!/usr/bin/env python3
"""Protect TeX before Jekyll/Kramdown parses Markdown tables and inline markup."""
import argparse
import re
from html.parser import HTMLParser
from pathlib import Path

# Standard Markdown math: $...$ and standalone $$ blocks. Code stays literal.
TOKEN = re.compile(
    r"(?m)^ {0,3}(?P<fence>\x60{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}(?P=fence)[ \t]*(?=\n|$)"
    r"|(?P<ticks>\x60+)(?!\x60)[^\n]*?(?P=ticks)(?!\x60)"
    r"|^\$\$[ \t]*\n(?P<display>[\s\S]*?)\n\$\$[ \t]*(?=\n|$)"
    r"|(?<![\\$])\$(?P<inline>[^$\n]+)\$(?!\$)"
)

def encoded(tex):
    # Encode punctuation before Markdown or Liquid can interpret it.
    return "".join(c if c.isascii() and (c.isalnum() or c == " ")
                   else f"&#{ord(c)};" for c in tex)

def prepare(source):
    equations = []
    header_match = re.match(r"^---\n[\s\S]*?\n---\n", source)
    header = header_match.group(0) if header_match else ""
    body = source[len(header):]

    def replace(m):
        display = m.group("display")
        inline = m.group("inline")
        if display is None and inline is None:
            return m.group(0)
        is_display = display is not None
        tex = display if is_display else inline
        equations.append((is_display, tex))
        tag = "div" if is_display else "span"
        kind = "display" if is_display else "inline"
        value = encoded(tex)
        return f'<{tag} class="note-math-{kind}" data-tex="{value}">{value}</{tag}>'

    return header + TOKEN.sub(replace, body), equations

class ArticleCheck(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.active = False
        self.math = []
        self.tables = 0
        self.headings = 0
        self.table_rows = 0
        self.in_table = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        classes = a.get("class", "").split()
        if tag == "article" and "note-content" in classes:
            self.active = True
        if not self.active:
            return
        if "note-math-inline" in classes or "note-math-display" in classes:
            self.math.append(("note-math-display" in classes, a.get("data-tex")))
        if tag == "table":
            self.tables += 1
            self.in_table = True
        elif tag == "tr" and self.in_table:
            self.table_rows += 1
        elif tag == "h2":
            self.headings += 1

    def handle_endtag(self, tag):
        if self.active and tag == "table":
            self.in_table = False
        if tag == "article":
            self.active = False

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("source", type=Path)
    p.add_argument("destination", type=Path)
    p.add_argument("--check", action="store_true", help="Check that generated Markdown is current")
    p.add_argument("--rendered", type=Path, help="Validate actual Jekyll HTML against source equations")
    p.add_argument("--tables", type=int)
    p.add_argument("--rows", type=int)
    p.add_argument("--headings", type=int)
    args = p.parse_args()
    result, equations = prepare(args.source.read_text(encoding="utf-8"))
    if args.check:
        assert args.destination.read_text(encoding="utf-8") == result, "Generated note is stale"
    else:
        args.destination.parent.mkdir(parents=True, exist_ok=True)
        args.destination.write_text(result, encoding="utf-8")
    if args.rendered:
        check = ArticleCheck()
        check.feed(args.rendered.read_text(encoding="utf-8"))
        assert check.math == equations, f"Formula integrity mismatch: expected {len(equations)}, got {len(check.math)}"
        if args.tables is not None:
            assert check.tables == args.tables, f"Unexpected table count: {check.tables}"
        if args.rows is not None:
            assert check.table_rows == args.rows, f"Unexpected table rows: {check.table_rows}"
        if args.headings is not None:
            assert check.headings == args.headings, f"Unexpected headings: {check.headings}"
    print(f"Verified {sum(not d for d, _ in equations)} inline and {sum(d for d, _ in equations)} display equations")

if __name__ == "__main__":
    main()
