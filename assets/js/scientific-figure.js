/* Reusable scientific figure API. LaTeX -> self-contained SVG outlines.
 * Node: MathJax 3.2.1 (mathjax-full); browser: same version, SVG output.
 * Coordinates and sizes are in the figure's viewBox units. y is the baseline.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ScientificFigure = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const palette = Object.freeze({blue:'#4477aa',rose:'#cc6677',green:'#228833',ochre:'#aa7722',purple:'#8855aa',ink:'#333b43',muted:'#65717b',light:'#c9d1d6',paper:'#ffffff'});
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  function create({typeset, cacheSize=384, width=760, color=palette.ink} = {}) {
    if (typeof typeset !== 'function') throw Error('A TeX-to-SVG renderer is required');
    const cache = new Map();
    function glyph(tex) {
      if (cache.has(tex)) { const g=cache.get(tex);cache.delete(tex);cache.set(tex,g);return g; }
      const g=typeset(tex);
      if (!g || !Array.isArray(g.box) || g.box.length!==4 || !g.box.every(Number.isFinite) || g.box[2]<=0 || !g.body || /data-mml-node=["']merror["']|data-mjx-error|data-mjx-unknown|<use\b|<text\b/.test(g.body)) throw Error('Non-portable or invalid LaTeX: '+tex);
      cache.set(tex,g);
      if(cache.size>cacheSize)cache.delete(cache.keys().next().value);
      return g;
    }
    function math(x,y,tex,o={}) {
      const g=glyph(String(tex)),[vx,vy,w,h]=g.box;
      const k=Math.min((o.size||15)/1000,o.maxWidth?o.maxWidth/w:Infinity,o.maxHeight?o.maxHeight/h:Infinity);
      const anchor=o.anchor||'start',dx=anchor==='middle'?w/2:anchor==='end'?w:0;
      const tx=x-(vx+dx)*k,ty=o.valign==='middle'?y-(vy+h/2)*k:y;
      const c=o.color||color;
      return `<g class="sf-math" data-latex="${esc(tex)}" role="img" aria-label="${esc(o.alt||tex)}" color="${esc(c)}" fill="${esc(c)}" transform="translate(${tx.toFixed(4)} ${ty.toFixed(4)}) scale(${k.toFixed(7)})"><title>${esc(o.alt||tex)}</title>${g.body}</g>`;
    }
    function text(x,y,s,o={}) {
      return `<text x="${x}" y="${y}" fill="${esc(o.color||color)}" font-size="${o.size||15}" font-weight="${o.bold?600:400}" text-anchor="${o.anchor||'start'}"${o.italic?' font-style="italic"':''}>${esc(s)}</text>`;
    }
    function svg(h,label,body) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${h}" width="${width}" height="${h}" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title><rect width="${width}" height="${h}" fill="#fff"/><g font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">${body}</g></svg>\n`;
    }
    return {math,text,svg,palette};
  }
  function nodeTypesetter() {
    const {mathjax}=require('mathjax-full/js/mathjax.js');
    const {TeX}=require('mathjax-full/js/input/tex.js');
    const {SVG}=require('mathjax-full/js/output/svg.js');
    const {liteAdaptor}=require('mathjax-full/js/adaptors/liteAdaptor.js');
    const {RegisterHTMLHandler}=require('mathjax-full/js/handlers/html.js');
    const {AllPackages}=require('mathjax-full/js/input/tex/AllPackages.js');
    const adaptor=liteAdaptor();RegisterHTMLHandler(adaptor);
    const doc=mathjax.document('',{InputJax:new TeX({packages:AllPackages.filter(p=>!['autoload','require','html','newcommand','tagformat','configmacros'].includes(p)),formatError:(_jax,error)=>{throw error}}),OutputJax:new SVG({fontCache:'none'})});
    return tex=>{
      const container=doc.convert(tex,{display:false,em:16,ex:8,containerWidth:1000});
      const svg=adaptor.firstChild(container);
      return {box:adaptor.getAttribute(svg,'viewBox').split(/\s+/).map(Number),body:adaptor.innerHTML(svg)};
    };
  }
  async function browserRenderer() {
    const mj=window.MathJax;
    if(!mj||!mj.startup||!mj.startup.promise)throw Error('MathJax is unavailable');
    await mj.startup.promise;
    if(typeof mj.tex2svg!=='function')throw Error('MathJax SVG output unavailable');
    return create({typeset:tex=>{
      const svg=mj.tex2svg(tex,{display:false,em:16,ex:8,containerWidth:1000}).querySelector('svg');
      if(!svg)throw Error('Missing SVG for '+tex);
      return {box:svg.getAttribute('viewBox').split(/\s+/).map(Number),body:svg.innerHTML};
    }});
  }
  function mount(figure,spec) {
    const graph=figure.querySelector('.sf-graphic, .qm-graphic');
    if(!graph || !spec || typeof spec.render!=='function')return;
    const controls=figure.querySelector('.sf-controls, .qm-controls');
    if(spec.initial===undefined || !controls)return; // Static SVG is already fully typeset.
    const input=controls.querySelector('input[type=range]'),output=controls.querySelector('output'),play=controls.querySelector('[data-sf-play], [data-qm-play]'),reset=controls.querySelector('[data-sf-reset], [data-qm-reset]');
    if(!input||!output||!play||!reset)return;
    const format=spec.format||String;
    input.min=spec.min;input.max=spec.max;input.step=spec.step;input.value=spec.initial;
    let value=Number(input.value),position=value,frameId=0,last=0,direction=1;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    function render(){const markup=spec.render(value);graph.innerHTML=markup;output.textContent=format(value);input.setAttribute('aria-valuetext',format(value));}
    function stop(){if(frameId)cancelAnimationFrame(frameId);frameId=0;play.textContent='Play sweep';play.setAttribute('aria-pressed','false');}
    function safeRender(){try{render();return true}catch(error){stop();console.warn('Scientific figure update failed',error);return false;}}
    function frame(now){if(!last||now-last>=100){last=now;position+=direction*(spec.max-spec.min)/72;if(position>=spec.max){position=spec.max;direction=-1}if(position<=spec.min){position=spec.min;direction=1}input.value=Number((spec.min+Math.round((position-spec.min)/spec.step)*spec.step).toFixed(6));const next=Number(input.value);if(next!==value){value=next;if(!safeRender())return;}}frameId=requestAnimationFrame(frame);}
    input.addEventListener('input',()=>{stop();value=Number(input.value);position=value;safeRender()});
    play.addEventListener('click',()=>{if(frameId){stop();return}last=0;position=value;play.textContent='Pause';play.setAttribute('aria-pressed','true');frameId=requestAnimationFrame(frame)});
    reset.addEventListener('click',()=>{stop();input.value=spec.initial;value=Number(input.value);position=value;direction=1;safeRender()});
    if(reduced.addEventListener)reduced.addEventListener('change',e=>{if(e.matches)stop()});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
    if(safeRender())controls.hidden=false;
  }
  function mountAll(registry,scope=document){scope.querySelectorAll('figure[data-sf-kind],figure[data-qm-kind]').forEach(figure=>{const id=figure.dataset.sfKind||figure.dataset.qmKind;if(registry[id])mount(figure,registry[id]);});}
  return {palette,create,nodeTypesetter,browserRenderer,mount,mountAll};
});
