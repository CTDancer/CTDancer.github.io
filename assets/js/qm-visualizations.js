/* Original analytical figures for Quantum Mechanics for Chemical Reactions and Enzyme Design, Part I.
   Run node assets/js/qm-visualizations.js --write to regenerate every SVG fallback.
   All plots use the explicit models in makeQMVisuals; no external data or libraries. */
function makeQMVisuals() {
  const C={blue:"#4477aa",rose:"#cc6677",green:"#228833",ochre:"#aa7722",purple:"#8855aa",ink:"#333b43",muted:"#65717b",light:"#c9d1d6",paper:"#ffffff"};
  const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const f=x=>Math.abs(x)<0.0005?"0.00":x.toFixed(2);
  const fmt=x=>Math.abs(x)<1e-8?"0":Number(x.toFixed(2)).toString();
  const nums=(a,b,n)=>Array.from({length:n},(_,i)=>a+(b-a)*i/(n-1));
  const txt=(x,y,s,o={})=>`<text x="${x}" y="${y}" fill="${o.color||C.ink}" font-size="${o.size||15}" font-weight="${o.bold?600:400}" text-anchor="${o.anchor||"start"}"${o.italic?' font-style="italic"':""}>${esc(s)}</text>`;
  const line=(x1,y1,x2,y2,col=C.light,w=1,dash="")=>`<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${col}" stroke-width="${w}"${dash?` stroke-dasharray="${dash}"`:""}/>`;
  const circ=(x,y,r=4,col=C.ink,fill=col)=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r}" stroke="${col}" stroke-width="1.7" fill="${fill}"/>`;
  const rect=(x,y,w,h,fill,stroke="none")=>`<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" fill="${fill}" stroke="${stroke}"/>`;
  const poly=(points,color,w=2,dash="")=>`<path d="${points.map(([x,y],i)=>`${i?"L":"M"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ")}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"${dash?` stroke-dasharray="${dash}"`:""}/>`;
  const arrow=(x1,y1,x2,y2,c=C.ink,w=1.6)=>{const a=Math.atan2(y2-y1,x2-x1),l=8;return line(x1,y1,x2,y2,c,w)+`<path d="M${x2},${y2} L${x2-l*Math.cos(a-.45)},${y2-l*Math.sin(a-.45)} L${x2-l*Math.cos(a+.45)},${y2-l*Math.sin(a+.45)} Z" fill="${c}"/>`};
  const svg=(h,label,b)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 ${h}" width="760" height="${h}" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title><rect width="760" height="${h}" fill="#fff"/><g font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">${b}</g></svg>\n`;
  const axes=(x,y,w,h,xmin,xmax,ymin,ymax,xt,yt,xlabel="",ylabel="")=>{
    const X=v=>x+w*(v-xmin)/(xmax-xmin),Y=v=>y+h*(ymax-v)/(ymax-ymin);
    let s=line(x,y+h,x+w,y+h,C.muted)+line(x,y,x,y+h,C.muted);
    if(ymin<0&&ymax>0)s+=line(x,Y(0),x+w,Y(0),C.light,1,"3 4");
    for(const v of xt){s+=line(X(v),y+h,X(v),y+h+4,C.muted)+txt(X(v),y+h+19,fmt(v),{size:12,anchor:"middle",color:C.muted})}
    for(const v of yt){s+=line(x-4,Y(v),x,Y(v),C.muted)+txt(x-7,Y(v)+4,fmt(v),{size:12,anchor:"end",color:C.muted})}
    if(xlabel)s+=txt(x+w,y+h+35,xlabel,{size:12,anchor:"end",color:C.muted});
    if(ylabel)s+=txt(x,y-9,ylabel,{size:12,color:C.muted});
    return {X,Y,s,curve:(fn,a=xmin,b=xmax)=>nums(a,b,181).map(v=>[X(v),Y(fn(v))]),area:(fn,a=xmin,b=xmax)=>{const pts=nums(a,b,181).map(v=>[X(v),Y(fn(v))]);return `M${X(a)},${Y(0)} `+pts.map(([a,b])=>`L${a.toFixed(2)},${b.toFixed(2)}`).join(" ")+` L${X(b)},${Y(0)} Z`}};
  };
  const rgb=h=>h.match(/[\da-f]{2}/gi).map(s=>parseInt(s,16));
  const mix=(a,b,t)=>{const aa=rgb(a),bb=rgb(b);return "#"+aa.map((x,i)=>Math.round(x+(bb[i]-x)*t).toString(16).padStart(2,"0")).join("")};
  const color=(v,max,signed=false)=>mix("#ffffff",v<0?C.rose:signed?C.blue:C.green,Math.min(1,Math.abs(v)/max));
  // Bin analytically evaluated samples into compact SVG paths; the palette and axes never rescale during interaction.
  function heat(x,y,w,h,xlo,xhi,ylo,yhi,fn,max,signed=false,nx=82,ny=58){
    let buckets=new Map();
    for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){
      const u=xlo+(i+.5)/nx*(xhi-xlo),v=yhi-(j+.5)/ny*(yhi-ylo);
      const raw=fn(u,v),step=Math.round(Math.max(signed?-1:0,Math.min(1,raw/max))*36);
      if(!step)continue;
      const col=color(step/36,1,signed);
      const dx=w/nx,dy=h/ny,xx=x+i*dx,yy=y+j*dy;
      const d=`M${xx.toFixed(2)},${yy.toFixed(2)}h${(dx+.08).toFixed(2)}v${(dy+.08).toFixed(2)}h-${(dx+.08).toFixed(2)}Z`;
      buckets.set(col,(buckets.get(col)||"")+d);
    }
    return rect(x,y,w,h,"#fff")+Array.from(buckets,([col,d])=>`<path fill="${col}" d="${d}"/>`).join("")+rect(x,y,w,h,"none",C.light);
  }
  const bar=(x,y,w,max,signed=false,unit="")=>{let s="";for(let i=0;i<48;i++)s+=rect(x+i*w/48,y,w/48+.1,9,color(signed?(2*i/47-1)*max:i/47*max,max,signed));return s+txt(x,y+24,signed?fmt(-max):"0",{size:11,color:C.muted})+(signed?txt(x+w/2,y+24,"0",{size:11,color:C.muted,anchor:"middle"}):"")+txt(x+w,y+24,fmt(max)+(unit?" "+unit:""),{size:11,color:C.muted,anchor:"end"})};
  const legend=(x,y,label,col,dash="")=>line(x,y-4,x+22,y-4,col,2,dash)+txt(x+28,y,label,{size:13,color:C.muted});
  const envelope=x=>Math.pow(Math.PI,-.25)*Math.exp(-x*x/2);
  const u0=envelope,u1=x=>Math.SQRT2*x*u0(x);
  const slater=(x,y)=>(y-x)*u0(x)*u0(y);
  const joint=(x,y)=>slater(x,y)**2;
  const density=x=>u0(x)**2+u1(x)**2;
  const overlap=R=>Math.exp(-R)*(1+R+R*R/3);
  const atom=(x,z,center)=>Math.exp(-Math.hypot(x-center,z))/Math.sqrt(Math.PI);
  const rho=(x,z,R,theta)=>{const a=atom(x,z,-R/2),b=atom(x,z,R/2),c=Math.cos(theta);return (a*a+b*b+2*a*b*c)/(2*(1+overlap(R)*c))};
  const energies=R=>{const S=overlap(R),J=-1/R+Math.exp(-2*R)*(1+1/R),K=Math.exp(-R)*(1+R),ee=(-.5+J-.5*S-K)/(1+S);return {ee,nn:1/R,total:ee+1/R}};
  const phaseText=d=>d===0?"0":d===90?"π/2":d===180?"π":d===270?"3π/2":d===360?"2π":`${d}°`;
  function phaseInfo(){
    let s=txt(380,23,"Two distinct complex wavefunctions",{anchor:"middle",bold:true,size:17});
    [1.6,3.4].forEach((k,i)=>{
      const x=i?416:58,p=axes(x,70,290,114,-4,4,-.8,.8,[-4,0,4],[-.75,0,.75],"x","amplitude");
      s+=txt(x+145,49,i?"ψ₂(x) = A(x)eⁱᵏ²ˣ":"ψ₁(x) = A(x)eⁱᵏ¹ˣ",{anchor:"middle",size:17,color:C.blue});
      s+=p.s+poly(p.curve(envelope),C.light,1.3,"4 4")+poly(p.curve(x=>-envelope(x)),C.light,1.3,"4 4");
      s+=poly(p.curve(x=>envelope(x)*Math.cos(k*x)),C.blue,2)+poly(p.curve(x=>envelope(x)*Math.sin(k*x)),C.purple,1.6,"5 3");
      s+=txt(x+145,222,`k${i?"₂":"₁"} = ${k.toFixed(1)}`,{anchor:"middle",size:12,color:C.muted});
    });
    s+=legend(50,250,"real part",C.blue)+legend(190,250,"imaginary part",C.purple,"5 3")+legend(390,250,"shared envelope ±A(x)",C.light,"4 4");
    s+=arrow(208,264,306,291,C.muted)+arrow(560,264,462,291,C.muted)+txt(384,281,"modulus squared",{anchor:"middle",size:13,color:C.muted});
    const p=axes(225,322,310,85,-4,4,0,.6,[-4,0,4],[0,.3,.6],"x","probability density");
    s+=txt(380,308,"|ψ₁|² = |ψ₂|² = A²",{anchor:"middle",color:C.green,bold:true,size:17});
    s+=p.s+`<path d="${p.area(x=>envelope(x)**2)}" fill="${C.green}" opacity=".12"/>`+poly(p.curve(x=>envelope(x)**2),C.green,2.4);
    return svg(453,"Two normalized one-dimensional Gaussian wave packets have different real and imaginary parts but the same probability density.",s);
  }
  function projection(){
    let s=txt(184,25,"Before the operator",{anchor:"middle",bold:true,size:17})+txt(558,25,"After projecting onto A",{anchor:"middle",bold:true,size:17});
    function basis(cx,cy){
      return arrow(cx-104,cy,cx+110,cy,C.muted,1.2)+arrow(cx,cy+107,cx,cy-112,C.muted,1.2)+txt(cx+112,cy+20,"|A⟩",{size:13})+txt(cx+8,cy-112,"|B⟩",{size:13})+circ(cx,cy,2.5,C.muted);
    }
    const a=82,b=178;
    s+=basis(b,166)+arrow(b,166,b+a,166-a,C.blue,2.8)+arrow(b,166,b+a,166+a,C.purple,2.8)+txt(b+a+8,166-a-5,"|+⟩",{color:C.blue,bold:true,size:17})+txt(b+a+8,166+a+7,"|−⟩",{color:C.purple,bold:true,size:17});
    s+=`<path d="M${b+15},151 l15,15 l-15,15" stroke="${C.muted}" fill="none" stroke-width="1.3"/>`;
    s+=txt(180,305,"⟨+|−⟩ = 0",{anchor:"middle",size:17,bold:true});
    const cx=550;
    s+=basis(cx,166)+arrow(cx,166,cx+a,166-a,C.blue,2.8)+arrow(cx,166,cx+a,166+a,C.light,2)+line(cx+a,166+a,cx+a,166,C.purple,1.4,"5 4")+arrow(cx,166,cx+a,166,C.green,3);
    s+=txt(cx+a+8,166-a-5,"|+⟩",{color:C.blue,bold:true,size:17})+txt(cx+a+8,166-9,"n̂ₐ|−⟩",{color:C.green,bold:true,size:16})+txt(cx+a+8,166+a+5,"|−⟩",{color:C.muted,size:13});
    s+=txt(cx+42,189,"1/√2",{anchor:"middle",size:13,color:C.green})+txt(550,305,"⟨+|n̂ₐ|−⟩ = 1/2",{anchor:"middle",size:17,bold:true,color:C.green});
    s+=arrow(345,166,413,166,C.purple,2)+txt(378,149,"n̂ₐ",{anchor:"middle",size:18,color:C.purple});
    return svg(327,"Orthogonal two-site states before and after applying the site A projection. Their overlap is zero, but the operator matrix element is one half.",s);
  }
  function bo(R=2.5){
    let s=txt(170,25,"Fixed nuclear geometry",{anchor:"middle",bold:true,size:17})+txt(548,25,"Electronic and total energy",{anchor:"middle",bold:true,size:17});
    const hx=22,hy=62,hw=300,hh=166,xlo=-5,xhi=5,zlo=-2.75,zhi=2.75,X=x=>hx+hw*(x-xlo)/(xhi-xlo),Y=z=>hy+hh*(zhi-z)/(zhi-zlo);
    s+=heat(hx,hy,hw,hh,xlo,xhi,zlo,zhi,(x,z)=>rho(x,z,R,0),.35);
    s+=circ(X(-R/2),Y(0),4,C.ink,"#fff")+circ(X(R/2),Y(0),4,C.ink,"#fff")+txt(X(-R/2),Y(0)-11,"A",{anchor:"middle",size:13})+txt(X(R/2),Y(0)-11,"B",{anchor:"middle",size:13});
    s+=line(X(-R/2),hy+hh+12,X(R/2),hy+hh+12,C.ink)+line(X(-R/2),hy+hh+6,X(-R/2),hy+hh+18,C.ink)+line(X(R/2),hy+hh+6,X(R/2),hy+hh+18,C.ink)+txt(172,hy+hh+33,`R = ${R.toFixed(2)} bohr`,{anchor:"middle",size:15,bold:true});
    s+=bar(66,282,212,.35,false,"bohr⁻³");
    const p=axes(405,60,329,206,.8,6,-1.8,.15,[1,2,3,4,5,6],[-1.5,-1,-.5,0],"R (bohr)","energy (hartree)");
    s+=p.s+poly(p.curve(r=>energies(r).ee),C.blue,2)+poly(p.curve(r=>energies(r).total),C.ochre,2.5);
    const E=energies(R),xx=p.X(R),ye=p.Y(E.ee),yu=p.Y(E.total);
    s+=line(xx,p.Y(-1.8),xx,p.Y(.15),C.light,1,"4 4")+line(xx,ye,xx,yu,C.purple,3)+circ(xx,ye,4,C.blue,"#fff")+circ(xx,yu,4,C.ochre,"#fff");
    s+=legend(405,320,"electronic Eₑ",C.blue)+legend(577,320,"total U₊",C.ochre);
    s+=txt(570,346,`Eₑ = ${f(E.ee)}    +    1/R = ${f(E.nn)}    →    U₊ = ${f(E.total)}`,{anchor:"middle",size:13,color:C.ink});
    return svg(369,"Minimal-basis hydrogen molecular ion at a fixed internuclear separation. Electronic energy plus nuclear repulsion gives the Born–Oppenheimer energy.",s);
  }
  function bonding(deg=0){
    const R=2.5,theta=deg*Math.PI/180;
    let s=txt(24,25,"Density in a plane through the bond",{bold:true,size:16})+txt(404,25,"Density along the bond axis",{bold:true,size:16});
    const x=22,y=56,w=342,h=194,xlo=-4.5,xhi=4.5,zlo=-2.55,zhi=2.55,X=q=>x+w*(q-xlo)/(xhi-xlo),Y=q=>y+h*(zhi-q)/(zhi-zlo);
    s+=heat(x,y,w,h,xlo,xhi,zlo,zhi,(x,z)=>rho(x,z,R,theta),.35);
    s+=line(X(0),y,X(0),y+h,C.muted,1,"4 4")+circ(X(-R/2),Y(0),4,C.ink,"#fff")+circ(X(R/2),Y(0),4,C.ink,"#fff")+txt(X(-R/2),Y(0)+21,"A",{anchor:"middle",size:13})+txt(X(R/2),Y(0)+21,"B",{anchor:"middle",size:13});
    s+=txt(x,y+h+19,"−4.5",{size:11,color:C.muted})+txt(x+w,y+h+19,"4.5 bohr",{size:11,anchor:"end",color:C.muted})+bar(89,281,215,.35,false,"bohr⁻³");
    const p=axes(435,56,292,194,-4.5,4.5,0,.35,[-4,-2,0,2,4],[0,.1,.2,.3],"x (bohr)","density (bohr⁻³)");
    const fn=x=>rho(x,0,R,theta),ref=x=>rho(x,0,R,Math.PI/2);
    s+=p.s+poly(p.curve(ref),C.light,1.8,"5 4")+poly(p.curve(fn),C.green,2.5)+line(p.X(0),p.Y(0),p.X(0),p.Y(.35),C.muted,1,"4 4")+circ(p.X(0),p.Y(fn(0)),4,C.green,"#fff");
    s+=legend(424,307,"θ = π/2 reference",C.light,"5 4")+legend(588,307,"current density",C.green);
    s+=txt(380,341,`θ = ${phaseText(deg)}  ·  midpoint density = ${fn(0).toFixed(4)} bohr⁻³`,{anchor:"middle",bold:true,size:15,color:C.green});
    return svg(360,"Normalized two-center hydrogen 1s superposition. A relative phase sweep changes interference and midpoint density while nuclear positions remain fixed.",s);
  }
  function twoAxis(x,y,w,h){
    let s="";
    for(const k of [-2,0,2]){
      s+=txt(x+(k+3)/6*w,y+h+19,String(k),{size:11,anchor:"middle",color:C.muted});
      s+=txt(x-8,y+(3-k)/6*h+4,String(k),{size:11,anchor:"end",color:C.muted});
    }
    return s+txt(x+w,y+h+34,"x₁",{size:13,anchor:"end",color:C.muted})+txt(x-8,y-8,"x₂",{size:13,anchor:"end",color:C.muted});
  }
  function antisym(){
    const x=53,y=53,w=235,h=235,xr=454;
    let s=txt(x+w/2,26,"Signed amplitude Ψ(x₁,x₂)",{anchor:"middle",bold:true,size:16})+txt(xr+w/2,26,"Probability |Ψ(x₁,x₂)|²",{anchor:"middle",bold:true,size:16});
    s+=heat(x,y,w,h,-3,3,-3,3,slater,.5,true,74,74)+heat(xr,y,w,h,-3,3,-3,3,joint,.25,false,74,74)+twoAxis(x,y,w,h)+twoAxis(xr,y,w,h);
    for(const xx of [x,xr])s+=line(xx,y+h,xx+w,y,C.muted,1.2,"5 4");
    const px=v=>x+(v+3)*w/6,py=v=>y+(3-v)*h/6;
    const q1=[px(-1),py(1)],q2=[px(1),py(-1)];
    s+=circ(...q1,5,C.blue,"#fff")+circ(...q2,5,C.rose,"#fff")+txt(q1[0]-8,q1[1]-12,"+Ψ",{anchor:"end",color:C.blue,bold:true})+txt(q2[0]+8,q2[1]+18,"−Ψ",{color:C.rose,bold:true});
    s+=arrow(q1[0]+12,q1[1]+12,q2[0]-12,q2[1]-12,C.muted,1.2);
    s+=arrow(318,165,424,165,C.muted,1.4)+txt(371,148,"| · |²",{anchor:"middle",size:20});
    s+=bar(x+18,334,w-36,.5,true)+bar(xr+18,334,w-36,.25);
    s+=txt(380,384,"Exchange reverses amplitude sign; the probability remains symmetric.",{anchor:"middle",size:14,color:C.muted});
    return svg(402,"Two same-spin fermions in one-dimensional oscillator orbitals. Swapping coordinates reverses the wavefunction sign and leaves probability unchanged. The diagonal is zero.",s);
  }
  function marginal(q=-1){
    const x=42,y=57,w=207,h=207,xx=x+(q+3)*w/6;
    let s=txt(x+w/2,26,"Joint probability",{anchor:"middle",bold:true,size:15})+txt(382,26,"Integrate a slice",{anchor:"middle",bold:true,size:15})+txt(623,26,"One-electron density",{anchor:"middle",bold:true,size:15});
    s+=heat(x,y,w,h,-3,3,-3,3,joint,.25,false,68,68)+twoAxis(x,y,w,h)+line(xx,y,xx,y+h,C.purple,2.2)+txt(xx,y-7,`x₁ = ${fmt(q)}`,{anchor:"middle",size:12,color:C.purple,bold:true});
    const p=axes(291,57,178,207,-3,3,0,.55,[-2,0,2],[0,.25,.5],"x₂","2 |Ψ(q,x₂)|²");
    const slice=x=>2*joint(q,x);
    s+=p.s+`<path d="${p.area(slice)}" fill="${C.green}" opacity=".18"/>`+poly(p.curve(slice),C.green,2.1);
    const m=axes(529,57,197,207,-3,3,0,1,[-2,0,2],[0,.5,1],"x₁","n(x₁)");
    s+=m.s+poly(m.curve(density),C.green,2.5)+line(m.X(q),m.Y(0),m.X(q),m.Y(density(q)),C.purple,1.5,"4 3")+circ(m.X(q),m.Y(density(q)),4,C.green,"#fff");
    s+=arrow(251,154,283,154,C.muted,1.2)+arrow(471,154,521,154,C.muted,1.2);
    s+=bar(x+15,310,w-30,.25)+txt(382,328,`slice area = ${density(q).toFixed(3)}`,{anchor:"middle",size:14,color:C.green,bold:true})+txt(627,328,`n(${fmt(q)}) = ${density(q).toFixed(3)}`,{anchor:"middle",size:14,color:C.green,bold:true});
    return svg(353,"Marginalization of a two-electron probability distribution. Moving x1 selects a slice whose integral, multiplied by two, equals the density at that position.",s);
  }
  const matrix=deg=>{const a=deg*Math.PI/180;return {re:[[.5,.5*Math.cos(a)],[.5*Math.cos(a),.5]],im:[[0,-.5*Math.sin(a)],[.5*Math.sin(a),0]],energy:-Math.cos(a)}};
  function rdm(deg=0){
    const m=matrix(deg),cell=64,x1=48,x2=248,y=64;
    let s=txt(380,25,"State: ( |A⟩ + eⁱᶿ |B⟩ ) / √2",{anchor:"middle",size:18,color:C.blue,bold:true});
    const mat=(x,arr,label)=>{
      let out=txt(x+cell,y-22,label,{anchor:"middle",size:16,bold:true});
      ["A","B"].forEach((v,i)=>{out+=txt(x+(i+.5)*cell,y-6,v,{size:12,anchor:"middle",color:C.muted})+txt(x-8,y+(i+.5)*cell+4,v,{size:12,anchor:"end",color:C.muted})});
      arr.forEach((row,i)=>row.forEach((v,j)=>{out+=rect(x+j*cell,y+i*cell,cell,cell,color(v,.5,true),"#dce2e5")+txt(x+(j+.5)*cell,y+(i+.5)*cell+5,f(v),{anchor:"middle",size:16,bold:true,color:Math.abs(v)>.36?"#fff":C.ink});if(i===j)out+=`<rect x="${x+j*cell+2}" y="${y+i*cell+2}" width="${cell-4}" height="${cell-4}" fill="none" stroke="${C.green}" stroke-width="2"/>`}));
      return out;
    };
    s+=mat(x1,m.re,"Re γ")+mat(x2,m.im,"Im γ")+bar(104,214,215,.5,true)+txt(212,259,"green outlines: diagonal entries",{anchor:"middle",size:12,color:C.green});
    s+=txt(47,286,"Site occupations",{size:14,bold:true});
    for(const [i,l] of ["A","B"].entries()){const x=176+i*104;s+=txt(x-12,286,l,{anchor:"end",size:13})+rect(x,274,75,14,"#e8eee9")+rect(x,274,37.5,14,C.green)+txt(x+38,269,"0.5",{anchor:"middle",size:12,color:C.green});}
    const p=axes(459,64,266,192,0,360,-1,1,[0,90,180,270,360],[-1,0,1],"θ (degrees)","energy / t");
    s+=p.s+poly(p.curve(d=>-Math.cos(d*Math.PI/180)),C.ochre,2.5)+line(p.X(deg),p.Y(-1),p.X(deg),p.Y(1),C.light,1,"3 4")+circ(p.X(deg),p.Y(m.energy),4.7,C.ochre,"#fff");
    s+=txt(594,307,`⟨H⟩ / t = ${f(m.energy)}`,{anchor:"middle",size:16,bold:true,color:C.ochre})+txt(380,345,`θ = ${phaseText(deg)}   ·   Tr γ = 1   ·   occupations unchanged`,{anchor:"middle",size:15,bold:true});
    return svg(365,"The one-particle density matrix in an orthonormal two-site basis retains phase information in its off-diagonals. Site occupations stay one half, while energy in units of coupling t equals minus cosine of phase.",s);
  }
  function pairs(){
    const y=52,w=244,h=244,x=58,xr=454,max=.5;
    let s=txt(x+w/2,25,"Actual ordered pair density",{anchor:"middle",bold:true,size:16})+txt(xr+w/2,25,"Independent reference",{anchor:"middle",bold:true,size:16});
    s+=heat(x,y,w,h,-3,3,-3,3,(a,b)=>2*joint(a,b),max,false,76,76)+heat(xr,y,w,h,-3,3,-3,3,(a,b)=>density(a)*density(b)/2,max,false,76,76)+twoAxis(x,y,w,h)+twoAxis(xr,y,w,h);
    s+=line(x,y+h,x+w,y,C.muted,1.2,"5 4")+line(xr,y+h,xr+w,y,C.muted,1.2,"5 4")+txt(x+w/2,346,"n₂(x₁,x₂) = 2|Ψ|²",{anchor:"middle",size:16,color:C.green})+txt(xr+w/2,346,"n(x₁)n(x₂)/2",{anchor:"middle",size:16,color:C.green});
    s+=bar(251,371,258,max)+txt(380,417,"Both integrate to 2; only the actual pair density has an exchange node.",{anchor:"middle",size:14,color:C.muted});
    return svg(435,"The actual same-spin two-fermion pair density vanishes on the diagonal, whereas an independent product of the same marginals does not. Both integrate to two ordered pairs.",s);
  }
  const specs={
    "phase-information":{render:phaseInfo},
    "operator-projection":{render:projection},
    "born-oppenheimer":{render:bo,initial:2.5,min:.8,max:6,step:.05,label:"Internuclear separation R (bohr)",format:v=>v.toFixed(2)+" bohr"},
    "orbital-interference":{render:bonding,initial:0,min:0,max:180,step:1,label:"Relative phase θ",format:v=>v+"°"},
    "fermion-exchange":{render:antisym},
    "density-marginalization":{render:marginal,initial:-1,min:-2.8,max:2.8,step:.05,label:"Selected coordinate x₁",format:v=>v.toFixed(2)},
    "density-matrix-coherence":{render:rdm,initial:0,min:0,max:360,step:1,label:"Relative phase θ",format:v=>v+"°"},
    "pair-density":{render:pairs}
  };
  function selfTest(){
    const ok=(condition,message)=>{if(!condition)throw Error(message)};
    const integrate=(fn,a,b,n)=>{let sum=0,h=(b-a)/n;for(let i=0;i<=n;i++)sum+=(i===0||i===n?.5:1)*fn(a+i*h);return sum*h};
    ok(Math.abs(integrate(x=>u0(x)**2,-8,8,2000)-1)<1e-8,"u0 not normalized");
    ok(Math.abs(integrate(x=>u1(x)**2,-8,8,2000)-1)<1e-8,"u1 not normalized");
    ok(Math.abs(integrate(x=>u0(x)*u1(x),-8,8,2000))<1e-8,"orbitals not orthogonal");
    ok(Math.abs(integrate(density,-8,8,2000)-2)<1e-8,"incorrect electron count");
    for(const q of [-2,-1,0,.4,1,2]){ok(Math.abs(integrate(x=>2*joint(q,x),-8,8,2000)-density(q))<1e-8,"marginal mismatch");ok(Math.abs(slater(q,q))<1e-12,"exchange node");ok(Math.abs(slater(q,1.25)+slater(1.25,q))<1e-12,"exchange sign")}
    for(const R of [.8,1,2.5,6]){ok(overlap(R)>0&&overlap(R)<1,"invalid overlap");ok(Math.abs(rho(0,0,R,Math.PI))<1e-12,"antibonding midpoint");const e=energies(R);ok(Math.abs(e.total-e.ee-e.nn)<1e-10,"energy decomposition")}
    for(const d of [0,45,90,180,270,360]){const m=matrix(d);ok(Math.abs(m.re[0][0]+m.re[1][1]-1)<1e-10,"trace");ok(m.re[0][1]===m.re[1][0]&&m.im[0][1]===-m.im[1][0],"Hermiticity");ok(Math.abs(m.re[0][1]**2+m.im[0][1]**2-.25)<1e-10,"pure state coherence");ok(Math.abs(m.energy+2*m.re[0][1])<1e-10,"energy from matrix")}
    for(const [id,s] of Object.entries(specs)){for(const v of s.initial===undefined?[undefined]:[s.min,s.initial,s.max]){const out=s.render(v);ok(out.startsWith("<svg")&&!/NaN|Infinity|undefined/.test(out),`Invalid SVG ${id}`)}}
    return true;
  }
  return {specs,selfTest};
}

const QMVisuals = makeQMVisuals();
if (typeof module !== "undefined" && module.exports) {
  module.exports = QMVisuals;
  if (require.main === module) {
    QMVisuals.selfTest();
    const fs = require("node:fs"), path = require("node:path");
    const root = path.resolve(__dirname, "../../images/notes/quantum-mechanics");
    const write = process.argv.includes("--write");
    if (write) fs.mkdirSync(root, { recursive: true });
    for (const [id, spec] of Object.entries(QMVisuals.specs)) {
      const file = path.join(root, id + ".svg"), expected = spec.render(spec.initial);
      if (write) fs.writeFileSync(file, expected);
      else if (fs.readFileSync(file, "utf8") !== expected) throw Error("Stale SVG: " + id);
    }
    console.log("All eight SVGs and analytical model invariants verified.");
  }
}
if (typeof document !== "undefined") {
  document.querySelectorAll("figure[data-qm-kind]").forEach((figure) => {
    const spec = QMVisuals.specs[figure.dataset.qmKind];
    if (!spec || spec.initial === undefined) return;
    const graph = figure.querySelector(".qm-graphic"), controls = figure.querySelector(".qm-controls");
    if (!graph || !controls) return;
    const input = controls.querySelector("input"), output = controls.querySelector("output"), play = controls.querySelector("[data-qm-play]"), reset = controls.querySelector("[data-qm-reset]");
    if (!input || !output || !play || !reset) return;
    input.min = spec.min; input.max = spec.max; input.step = spec.step; input.value = spec.initial;
    let value = spec.initial, animation = 0, last = 0, direction = 1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function render() {
      graph.innerHTML = spec.render(value);
      output.textContent = spec.format(value);
      input.setAttribute("aria-valuetext", spec.format(value));
    }
    function stop() {
      if (animation) window.cancelAnimationFrame(animation);
      animation = 0; play.textContent = "Play sweep"; play.setAttribute("aria-pressed", "false");
    }
    function frame(now) {
      // A deliberately slow parameter sweep, not simulated physical time.
      if (!last || now-last >= 85) {
        last=now; value += direction*(spec.max-spec.min)/72;
        if (value >= spec.max) {value=spec.max;direction=-1}
        if (value <= spec.min) {value=spec.min;direction=1}
        input.value = value;
        render();
      }
      animation=window.requestAnimationFrame(frame);
    }
    input.addEventListener("input",()=>{stop();value=Number(input.value);render()});
    play.addEventListener("click",()=>{if(animation){stop();return} last=0;play.textContent="Pause";play.setAttribute("aria-pressed","true");animation=window.requestAnimationFrame(frame)});
    reset.addEventListener("click",()=>{stop();value=spec.initial;input.value=value;direction=1;render()});
    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change",e=>{if(e.matches)stop()});
    document.addEventListener("visibilitychange",()=>{if(document.hidden)stop()});
    // Never auto-play; the static image remains a full fallback without JS.
    try { render(); controls.hidden=false } catch (err) { console.warn("Figure remains static",err) }
  });
}
