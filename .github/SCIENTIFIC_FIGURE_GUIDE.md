# Scientific Figure component

Use scientific-figure.js for new blog visualizations. It shares the same MathJax
3.2.1 SVG mathematics renderer in the browser and in Node, and produces independent,
font-free vector mathematics in static exports. It does not use screenshot text,
Unicode approximations, foreignObject, positioned HTML overlays, or glyph references
to an external font. A saved SVG can be viewed even when JavaScript is unavailable.

## 1. Mathematical labels

Create a renderer once per figure module. In Node:

~~~js
const SF = require('./scientific-figure.js');
const draw = SF.create({typeset: SF.nodeTypesetter()});
const mathLabel = draw.math(380, 80,
  String.raw`\langle+\vert\hat n_A\vert-\rangle=\frac{1}{2}`,
  {size: 18, anchor: 'middle', color: SF.palette.green, maxWidth: 300});
const image = draw.svg(180, 'Operator matrix element', mathLabel);
~~~

(The JavaScript tagged template is String.raw followed by a backtick; use single
TeX backslashes inside it.)

Use draw.math for every mathematical label. Use draw.text for prose, numeric axis
ticks and legends without math. The x/y positions are in viewBox coordinates;
y is the math baseline unless valign: 'middle' is supplied. anchor accepts start,
middle, or end. maxWidth and maxHeight shrink long labels without changing their
aspect ratio. size is the em in viewBox units. Palette is shared across articles.
create also accepts width and color to customize the default figure.

Use normal LaTeX and AMS commands. Add new packages only after testing both the
Node and browser renderer. Invalid or font-dependent mathematical glyphs are
rejected rather than silently rendered as broken text.

## 2. Add a static figure to an article

Generate a self-contained SVG and put it in images/notes/<article>/.
Use the reusable Jekyll include in the canonical note source:

~~~liquid
{% include scientific-figure.html id="example" src="/images/notes/example.svg"
   title="Figure 1. Operator matrix element."
   alt="Geometry of the projection."
   caption="Exact two-state model; the green vector is the projection." %}
~~~

The publication preprocessor can leave this include intact; Jekyll resolves it.
Caption text should describe assumptions, scientific meaning and evidence level.
Use unique IDs per page.

## 3. Interactive parameter sweep

Write a module under assets/js/ that defines one registry entry per figure.
Each entry has render(value), initial, min, max, step, and format(value).
render returns an SVG string generated with the same drawing function as the
static fallback. Initial must match the committed fallback. For browser usage:

~~~js
ScientificFigure.browserRenderer().then(draw => {
  const specs = makeMyVisuals(draw); // return registry of spec objects
  ScientificFigure.mountAll(specs);
}).catch(error => console.warn('Static figures remain available.', error));
~~~

Register the module in note front matter:

~~~yaml
figure_scripts:
  - /assets/js/my-visualizations.js
~~~

Use the same include with interactive=true, kind matching the registry key,
label="Parameter name", and progression="Parameter sweep, not physical time".
It automatically adds the slider, play/pause, reset, accessible current value
and static fallback. The module initializes only figures matching its registry.
The default playback ping-pongs across the parameter range, never auto-plays,
and pauses on visibility changes or a newly enabled reduced-motion setting.
For physical time evolution or irreversible mechanisms, implement the correct
progression separately instead of using the generic sweep.

## 4. Regeneration and review

Install the pinned Node toolchain once:
npm install --prefix .github/figure-tools --ignore-scripts --no-audit --no-fund

For Part I:
NODE_PATH="$PWD/.github/figure-tools/node_modules" node assets/js/qm-visualizations.js --write

Omit --write to verify all generated images byte-for-byte and run model checks.
Commit the source, regenerated SVGs and canonical/generated article together.
CI validates the Jekyll output, math source integrity, model invariants, static
image reproducibility, and browser rendering and interaction for Part I.
Do not use a TeX renderer as a substitute for scientific and layout review:
check units, assumptions, overlaps, font sizes and meaningful motion for each
new figure. Browser static fallbacks do not need the CDN; live math generation
does, unless the MathJax bundle is served locally.


## 5. Equation emphasis

Follow the blog-wide editorial rule: emphasize key mathematical labels by
semantic color, not by a box or background. In a figure use draw.math with its
color option (for example SF.palette.green for a derived quantity). Do not
wrap formulas in \boxed for decorative emphasis. Preserve the meaning of
scientifically necessary geometric or structural boundaries.
