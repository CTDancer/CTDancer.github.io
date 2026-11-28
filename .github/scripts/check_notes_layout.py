"""Verify four note categories, responsive reading width and persistent navigation."""
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path("_site")
article = "notes/physics/quantum-mechanics-of-molecules/index.html"
pages = [
    ("index.html", "Home", "page"),
    ("publications/index.html", "Publications", "page"),
    ("notes/index.html", "Notes", "page"),
    (article, "Notes", "location"),
    ("cv/index.html", "CV", "page"),
]
styles = (root / "assets/css/notes.css").read_text()
main_css = root / "assets/css/main.css"
if main_css.exists():
    styles = main_css.read_text() + "\n" + styles

def load(page, path):
    html = (root / path).read_text()
    # Inspect generated HTML and styles without external CDN or navigation scripts.
    html = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", "", html, flags=re.I)
    html = re.sub(r"<link\b[^>]*rel=[\"']stylesheet[\"'][^>]*>", "", html, flags=re.I)
    html = html.replace("</head>", "<style>" + styles + "</style></head>")
    page.set_content(html, wait_until="domcontentloaded")

with sync_playwright() as p:
    browser = p.chromium.launch(args=["--no-sandbox"])
    page = browser.new_page(viewport={"width": 1600, "height": 950})
    page.route("**/*", lambda route: route.abort())
    for path, label, state in pages:
        load(page, path)
        active = page.locator("#site-nav a[aria-current]")
        assert active.count() == 1, (path, active.count())
        assert active.inner_text().strip() == label, path
        assert active.get_attribute("aria-current") == state, path
        assert active.evaluate("(e)=>getComputedStyle(e).color") == "rgb(48, 108, 83)", path
        active.evaluate("(e)=>e.style.setProperty('transition', 'none')")
        page.wait_for_function("getComputedStyle(document.querySelector('#site-nav a[aria-current]'), '::before').transform === 'matrix(1, 0, 0, 1, 0, 0)'")

    load(page, "notes/index.html")
    cards = page.locator(".notes-topics > .notes-topic")
    assert cards.all_inner_texts() == ["Mathematics", "Physics", "Biology & Chemistry", "Artificial Intelligence"]
    assert cards.locator("span,small").count() == 0
    assert page.locator(".notes-group").count() == 4
    assert page.locator(".notes-topics").evaluate("(e)=>getComputedStyle(e).gridTemplateColumns.split(' ').length") == 4
    assert cards.nth(0).bounding_box()["y"] == cards.nth(3).bounding_box()["y"]

    page.set_viewport_size({"width": 390, "height": 844})
    assert page.locator(".notes-topics").evaluate("(e)=>getComputedStyle(e).gridTemplateColumns.split(' ').length") == 2

    page.set_viewport_size({"width": 1600, "height": 950})
    load(page, article)
    page.locator(".note-toc").evaluate("(e)=>e.hidden=false")
    article_box = page.locator(".note-content").bounding_box()
    root_px = page.locator("html").evaluate("(e)=>parseFloat(getComputedStyle(e).fontSize)")
    assert article_box["width"] > 49 * root_px, article_box
    assert abs(page.locator(".note-content").evaluate("(e)=>parseFloat(getComputedStyle(e).fontSize)") - 1.12 * root_px) < .1
    assert abs(page.locator(".note-toc").evaluate("(e)=>parseFloat(getComputedStyle(e).fontSize)") - .90 * root_px) < .1
    assert page.locator(".note-content").evaluate("(e)=>getComputedStyle(e).maxWidth") == f"{68 * root_px:g}px"
    page.set_viewport_size({"width": 390, "height": 844})
    assert page.locator(".note-columns").evaluate("(e)=>getComputedStyle(e).gridTemplateColumns.split(' ').length") == 1
    assert page.locator(".note-content").bounding_box()["width"] <= 390
    browser.close()
print("Four title-only categories, active navigation, wide reader and responsive layout verified.")
