# Mathematical visualizations for Part I

The plots are generated from analytical models by assets/js/qm-visualizations.js. The same render functions run in the browser and produce SVG files for static/JavaScript-free reading.

Regenerate with: node assets/js/qm-visualizations.js --write
Verify model invariants and reproduce all eight SVGs byte for byte with: node assets/js/qm-visualizations.js

Models:
- Phase: normalized one-dimensional Gaussian wave packets with wave numbers 1.6 and 3.4.
- Projection: orthonormal two-site basis and rank-one site-A projector.
- Born–Oppenheimer: H2+ fixed-exponent minimal basis of normalized hydrogenic 1s functions. S = exp(-R)(1 + R + R^2/3); J = -1/R + exp(-2R)(1+1/R); K = exp(-R)(1+R); H_AA = -1/2 + J; H_AB = -S/2 - K; E_plus = (H_AA + H_AB)/(1+S); U_plus = E_plus + 1/R. R in bohr, E in hartree.
- Orbital interference: same basis at R=2.5 bohr, normalized complex superposition, fixed linear density color scale, plane and axial cut.
- Exchange, marginalization and pair density: two same-spin fermions in dimensionless 1D harmonic oscillator orbitals u0=pi^(-1/4)exp(-x^2/2), u1=sqrt(2)x u0, normalized determinant. n=u0^2+u1^2; n2=2|Psi|^2; independent mathematical reference=n(x)n(y)/2.
- RDM: exact two-site phase superposition; diagonal 1/2, off-diagonal exp(-i theta)/2; energy divided by positive hopping t is -cos(theta).

Signed amplitudes and matrix entries use a zero-centered blue/rose palette; nonnegative densities use a sequential green palette; energies use ochre. All interactive sweeps vary a model parameter, not physical time. No autoplay. Static SVGs and captions are provided for accessibility.

The article's original formulas are preserved by the existing prepare_note.py preprocessing script. All figures are original analytical illustrations, not experimental data or realistic quantum-chemistry simulations.
