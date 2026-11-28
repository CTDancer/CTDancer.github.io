"""Exercise actual article HTML using a locally installed MathJax SVG bundle."""
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path("_site")
html = (root / "notes/physics/quantum-mechanics-of-molecules/index.html").read_text()
assert "mathjax@3.2.1/es5/tex-svg.js" in html
assert "/assets/js/scientific-figure.js" in html
# Inline the deployed assets, avoiding external network variability in tests.
html = re.sub(r'<script\b[^>]*src=[^>]*>\s*</script>', '', html)
html = re.sub(r'<link\b[^>]*rel="stylesheet"[^>]*>', '', html)
html = html.replace("</head>", "<style>" + (root / "assets/css/notes.css").read_text() + "</style></head>")
sources = [
    root / "assets/js/mathjax-config.js",
    Path(".github/figure-tools/node_modules/mathjax-full/es5/tex-svg.js"),
    root / "assets/js/scientific-figure.js",
    root / "assets/js/qm-visualizations.js",
]
js = "\n".join(p.read_text().replace("</script", "<\\/script") for p in sources)
html = html.replace("</body>", "<script>" + js + "</script></body>")
with sync_playwright() as p:
    browser = p.chromium.launch(args=["--no-sandbox"])
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.set_content(html, wait_until="domcontentloaded")
    page.wait_for_function('document.querySelectorAll(".qm-controls:not([hidden])").length === 4', timeout=30000)
    assert page.locator("#note-content .note-math-inline mjx-container").count() == 156
    assert page.locator("#note-content .note-math-display mjx-container").count() == 45
    emphasized = page.locator("#note-content .note-math-emphasis")
    assert emphasized.count() == 8
    assert emphasized.locator("mjx-container").count() == 8
    for label in emphasized.all():
        assert label.locator("mjx-container svg").evaluate("(e)=>getComputedStyle(e).color") == "rgb(48, 108, 83)"
        assert "\\boxed" not in label.get_attribute("data-tex")
        assert label.locator('[data-mml-node="menclose"]').count() == 0
    for key, val in [("born-oppenheimer", 3.5), ("orbital-interference", 180), ("density-marginalization", 1.4), ("density-matrix-coherence", 180)]:
        fig = page.locator(f'figure[data-qm-kind="{key}"]')
        slider = fig.locator("input")
        slider.evaluate('(e,v)=>{e.value=v;e.dispatchEvent(new Event("input",{bubbles:true}))}', str(val))
        assert float(slider.input_value()) == val
        assert fig.locator(".sf-math").count() > 1
        assert fig.locator('[data-mml-node="merror"]').count() == 0
        fig.locator("[data-qm-reset]").click()
    fig = page.locator('figure[data-qm-kind="density-matrix-coherence"]')
    fig.locator("[data-qm-play]").click()
    page.wait_for_function('Number(document.querySelector("#qm-density-matrix-coherence").value)>0')
    fig.locator("[data-qm-play]").click()
    stopped = fig.locator("input").input_value()
    page.wait_for_timeout(300)
    assert fig.locator("input").input_value() == stopped
    fig.locator("[data-qm-reset]").click()
    assert fig.locator("input").input_value() == "0"
    assert page.locator('[data-mml-node="merror"]').count() == 0
    assert not errors, errors
    page.set_viewport_size({"width": 390, "height": 844})
    assert fig.locator(".qm-graphic").evaluate("(e)=>e.clientWidth<e.scrollWidth")
    browser.close()
print("Browser: all 201 article equations, four sliders, playback/reset, and mobile figure overflow verified.")
