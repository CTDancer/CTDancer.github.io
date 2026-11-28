---
title: "What Is a Molecule, Quantum Mechanically?"
category: Physics
date: 2026-11-27
tags: [Quantum Mechanics, Quantum Chemistry, Electronic Structure, Density Matrices]
summary: "From wavefunctions to Hamiltonians, orbitals, and reduced density matrices"
redirect_from:
  - /notes/physics/electron-density-and-electric-fields/
---

*Quantum Mechanics for Chemical Reactions and Enzyme Design · Part I*

A molecule is often represented as a graph: atoms are nodes, and chemical bonds are edges. This representation is extraordinarily useful, but it hides a fundamental question. What, physically, makes two atoms bonded? There is no explicit bond variable in the fundamental molecular Hamiltonian. There are electrons, atomic nuclei, and interactions between them. Bonds emerge from their quantum-mechanical behavior.

To understand how a chemical reaction occurs, or how an enzyme changes its course, we therefore need a representation that goes beyond molecular connectivity. We need to describe electronic states, identify the physical laws that govern them, and understand how measurable molecular properties arise from those states.

This article develops that language. Starting with the wavefunction, we will arrive at the molecular Hamiltonian, orbitals, electron density, and the one-particle reduced density matrix (1-RDM). Each is a different mathematical object, and the distinctions between them matter. Throughout, I will use three progressively richer systems: the hydrogen atom, the hydrogen molecular ion <span class="note-math-inline" data-tex="&#92;mathrm&#123;H&#125;&#95;2&#94;&#43;">&#92;mathrm&#123;H&#125;&#95;2&#94;&#43;</span>, and the hydrogen molecule <span class="note-math-inline" data-tex="&#92;mathrm&#123;H&#125;&#95;2">&#92;mathrm&#123;H&#125;&#95;2</span>. Familiarity with linear algebra, calculus, and elementary probability is assumed; prior knowledge of quantum chemistry is not.

## 1. A quantum state is more than a probability distribution

In classical mechanics, the instantaneous state of a particle can be specified by its position <span class="note-math-inline" data-tex="&#92;mathbf r">&#92;mathbf r</span> and momentum <span class="note-math-inline" data-tex="&#92;mathbf p">&#92;mathbf p</span>. Quantum mechanics instead describes a pure state by a vector in a complex Hilbert space, denoted <span class="note-math-inline" data-tex="&#124;&#92;Psi&#92;rangle">&#124;&#92;Psi&#92;rangle</span>. A Hilbert space is an inner-product space with a completeness property that allows convergent sequences of states to have well-defined limits. For a single particle, its position-space wavefunction is a complex-valued function <span class="note-math-inline" data-tex="&#92;Psi&#40;&#92;mathbf r&#41;">&#92;Psi&#40;&#92;mathbf r&#41;</span>.

The wavefunction is not a probability density. According to the Born rule, the probability of finding the particle within a spatial region <span class="note-math-inline" data-tex="&#92;Omega">&#92;Omega</span> is

<div class="note-math-display" data-tex="P&#40;&#92;mathbf r&#92;in&#92;Omega&#41;&#61;&#92;int&#95;&#123;&#92;Omega&#125;&#124;&#92;Psi&#40;&#92;mathbf r&#41;&#124;&#94;2&#92;&#44;d&#94;3&#92;mathbf r&#46;">P&#40;&#92;mathbf r&#92;in&#92;Omega&#41;&#61;&#92;int&#95;&#123;&#92;Omega&#125;&#124;&#92;Psi&#40;&#92;mathbf r&#41;&#124;&#94;2&#92;&#44;d&#94;3&#92;mathbf r&#46;</div>

Here <span class="note-math-inline" data-tex="d&#94;3&#92;mathbf r">d&#94;3&#92;mathbf r</span> is the three-dimensional volume element, and <span class="note-math-inline" data-tex="&#124;&#92;Psi&#124;&#94;2&#61;&#92;Psi&#94;&#42;&#92;Psi">&#124;&#92;Psi&#124;&#94;2&#61;&#92;Psi&#94;&#42;&#92;Psi</span>, where the asterisk denotes complex conjugation. A normalized wavefunction satisfies

<div class="note-math-display" data-tex="&#92;int&#95;&#123;&#92;mathbb R&#94;3&#125;&#124;&#92;Psi&#40;&#92;mathbf r&#41;&#124;&#94;2&#92;&#44;d&#94;3&#92;mathbf r&#61;1&#46;">&#92;int&#95;&#123;&#92;mathbb R&#94;3&#125;&#124;&#92;Psi&#40;&#92;mathbf r&#41;&#124;&#94;2&#92;&#44;d&#94;3&#92;mathbf r&#61;1&#46;</div>

Why retain the complex amplitude instead of working directly with its probability density? The reason is interference. If two normalized states have wavefunctions <span class="note-math-inline" data-tex="&#92;psi&#95;A">&#92;psi&#95;A</span> and <span class="note-math-inline" data-tex="&#92;psi&#95;B">&#92;psi&#95;B</span>, a superposition proportional to <span class="note-math-inline" data-tex="&#92;psi&#95;A&#43;e&#94;&#123;i&#92;theta&#125;&#92;psi&#95;B">&#92;psi&#95;A&#43;e&#94;&#123;i&#92;theta&#125;&#92;psi&#95;B</span> has an unnormalized squared amplitude

<div class="note-math-display" data-tex="&#124;&#92;psi&#95;A&#43;e&#94;&#123;i&#92;theta&#125;&#92;psi&#95;B&#124;&#94;2&#10;&#61;&#124;&#92;psi&#95;A&#124;&#94;2&#43;&#124;&#92;psi&#95;B&#124;&#94;2&#10;&#43;2&#92;operatorname&#123;Re&#125;&#92;&#33;&#92;left&#91;e&#94;&#123;i&#92;theta&#125;&#92;psi&#95;A&#94;&#42;&#92;psi&#95;B&#92;right&#93;&#46;">&#124;&#92;psi&#95;A&#43;e&#94;&#123;i&#92;theta&#125;&#92;psi&#95;B&#124;&#94;2&#10;&#61;&#124;&#92;psi&#95;A&#124;&#94;2&#43;&#124;&#92;psi&#95;B&#124;&#94;2&#10;&#43;2&#92;operatorname&#123;Re&#125;&#92;&#33;&#92;left&#91;e&#94;&#123;i&#92;theta&#125;&#92;psi&#95;A&#94;&#42;&#92;psi&#95;B&#92;right&#93;&#46;</div>

The last term is the interference term. It depends on the relative phase <span class="note-math-inline" data-tex="&#92;theta">&#92;theta</span>, which is absent from the individual probability densities. Depending on this phase, amplitudes can reinforce or cancel each other. Multiplying an entire state by a common phase <span class="note-math-inline" data-tex="e&#94;&#123;i&#92;theta&#125;">e&#94;&#123;i&#92;theta&#125;</span>, however, does not change its physical predictions. It is relative phase that matters.

Consider a simplified system with one electron and two orthonormal localized states, <span class="note-math-inline" data-tex="&#124;A&#92;rangle">&#124;A&#92;rangle</span> and <span class="note-math-inline" data-tex="&#124;B&#92;rangle">&#124;B&#92;rangle</span>. The states

<div class="note-math-display" data-tex="&#124;&#43;&#92;rangle&#61;&#92;frac&#123;&#124;A&#92;rangle&#43;&#124;B&#92;rangle&#125;&#123;&#92;sqrt2&#125;&#44;&#92;qquad&#10;&#124;&#45;&#92;rangle&#61;&#92;frac&#123;&#124;A&#92;rangle&#45;&#124;B&#92;rangle&#125;&#123;&#92;sqrt2&#125;">&#124;&#43;&#92;rangle&#61;&#92;frac&#123;&#124;A&#92;rangle&#43;&#124;B&#92;rangle&#125;&#123;&#92;sqrt2&#125;&#44;&#92;qquad&#10;&#124;&#45;&#92;rangle&#61;&#92;frac&#123;&#124;A&#92;rangle&#45;&#124;B&#92;rangle&#125;&#123;&#92;sqrt2&#125;</div>

both assign probability <span class="note-math-inline" data-tex="1&#47;2">1&#47;2</span> to an occupancy measurement at either site. Nevertheless, they are orthogonal quantum states. An observation sensitive to their relative phase can distinguish them. Later, we will see that they can also have different energies. This simple example is already a reason not to equate a quantum state with its density.

## 2. The linear algebra of quantum mechanics

The notation <span class="note-math-inline" data-tex="&#124;&#92;Psi&#92;rangle">&#124;&#92;Psi&#92;rangle</span> is called a *ket*. In a finite-dimensional orthonormal basis, it is represented by a column vector. Its adjoint, called a *bra*, is denoted <span class="note-math-inline" data-tex="&#92;langle&#92;Psi&#124;">&#92;langle&#92;Psi&#124;</span>. If the coefficients of a state in a two-dimensional basis are <span class="note-math-inline" data-tex="a">a</span> and <span class="note-math-inline" data-tex="b">b</span>, then

<div class="note-math-display" data-tex="&#124;&#92;Psi&#92;rangle&#61;&#92;begin&#123;pmatrix&#125;a&#92;&#92;b&#92;end&#123;pmatrix&#125;&#44;&#92;qquad&#10;&#92;langle&#92;Psi&#124;&#61;&#92;begin&#123;pmatrix&#125;a&#94;&#42;&#38;b&#94;&#42;&#92;end&#123;pmatrix&#125;&#46;">&#124;&#92;Psi&#92;rangle&#61;&#92;begin&#123;pmatrix&#125;a&#92;&#92;b&#92;end&#123;pmatrix&#125;&#44;&#92;qquad&#10;&#92;langle&#92;Psi&#124;&#61;&#92;begin&#123;pmatrix&#125;a&#94;&#42;&#38;b&#94;&#42;&#92;end&#123;pmatrix&#125;&#46;</div>

The inner product <span class="note-math-inline" data-tex="&#92;langle&#92;Phi&#124;&#92;Psi&#92;rangle">&#92;langle&#92;Phi&#124;&#92;Psi&#92;rangle</span> measures the overlap of two states. In position space, it becomes an integral:

<div class="note-math-display" data-tex="&#92;langle&#92;Phi&#124;&#92;Psi&#92;rangle&#10;&#61;&#92;int&#92;Phi&#94;&#42;&#40;&#92;mathbf r&#41;&#92;Psi&#40;&#92;mathbf r&#41;&#92;&#44;d&#94;3&#92;mathbf r&#46;">&#92;langle&#92;Phi&#124;&#92;Psi&#92;rangle&#10;&#61;&#92;int&#92;Phi&#94;&#42;&#40;&#92;mathbf r&#41;&#92;Psi&#40;&#92;mathbf r&#41;&#92;&#44;d&#94;3&#92;mathbf r&#46;</div>

Normalization is simply <span class="note-math-inline" data-tex="&#92;langle&#92;Psi&#124;&#92;Psi&#92;rangle&#61;1">&#92;langle&#92;Psi&#124;&#92;Psi&#92;rangle&#61;1</span>. For normalized states, the squared magnitude of their inner product is the probability of finding one state when projecting onto the other. Orthogonal states have zero inner product.

A complete orthonormal basis <span class="note-math-inline" data-tex="&#92;&#123;&#124;k&#92;rangle&#92;&#125;">&#92;&#123;&#124;k&#92;rangle&#92;&#125;</span> satisfies <span class="note-math-inline" data-tex="&#92;langle j&#124;k&#92;rangle&#61;&#92;delta&#95;&#123;jk&#125;">&#92;langle j&#124;k&#92;rangle&#61;&#92;delta&#95;&#123;jk&#125;</span>, where the Kronecker delta is one if <span class="note-math-inline" data-tex="j&#61;k">j&#61;k</span> and zero otherwise. Completeness means that the identity operator can be resolved as

<div class="note-math-display" data-tex="I&#61;&#92;sum&#95;k&#124;k&#92;rangle&#92;langle k&#124;&#46;">I&#61;&#92;sum&#95;k&#124;k&#92;rangle&#92;langle k&#124;&#46;</div>

Applying this identity to a state gives <span class="note-math-inline" data-tex="&#124;&#92;Psi&#92;rangle&#61;&#92;sum&#95;k&#124;k&#92;rangle&#92;langle k&#124;&#92;Psi&#92;rangle">&#124;&#92;Psi&#92;rangle&#61;&#92;sum&#95;k&#124;k&#92;rangle&#92;langle k&#124;&#92;Psi&#92;rangle</span>. Thus, the coefficients of a ket are obtained by projecting it onto the basis vectors. The position representation follows the same idea, with a continuous, generalized position basis <span class="note-math-inline" data-tex="&#124;&#92;mathbf r&#92;rangle">&#124;&#92;mathbf r&#92;rangle</span>:

<div class="note-math-display" data-tex="&#92;Psi&#40;&#92;mathbf r&#41;&#61;&#92;langle&#92;mathbf r&#124;&#92;Psi&#92;rangle&#46;">&#92;Psi&#40;&#92;mathbf r&#41;&#61;&#92;langle&#92;mathbf r&#124;&#92;Psi&#92;rangle&#46;</div>

A ket and a wavefunction are therefore not two separate physical objects. The ket is the abstract state; the wavefunction is its representation in a particular basis.

The order of a bra and a ket matters. The inner product <span class="note-math-inline" data-tex="&#92;langle&#92;Phi&#124;&#92;Psi&#92;rangle">&#92;langle&#92;Phi&#124;&#92;Psi&#92;rangle</span> is a scalar, whereas the outer product <span class="note-math-inline" data-tex="&#124;&#92;Psi&#92;rangle&#92;langle&#92;Phi&#124;">&#124;&#92;Psi&#92;rangle&#92;langle&#92;Phi&#124;</span> is an operator. When <span class="note-math-inline" data-tex="&#124;&#92;Psi&#92;rangle">&#124;&#92;Psi&#92;rangle</span> is normalized, <span class="note-math-inline" data-tex="&#124;&#92;Psi&#92;rangle&#92;langle&#92;Psi&#124;">&#124;&#92;Psi&#92;rangle&#92;langle&#92;Psi&#124;</span> projects onto that state. This outer-product structure will return when we construct density matrices.

### Extracting physical information from a state

A quantum state encodes physical information, but to extract a particular quantity we need an *operator*. An operator <span class="note-math-inline" data-tex="&#92;hat A">&#92;hat A</span> is a linear map acting on states. Physical observables such as energy and momentum are represented by self-adjoint operators (Hermitian matrices in finite dimensions).

If a state <span class="note-math-inline" data-tex="&#124;a&#95;k&#92;rangle">&#124;a&#95;k&#92;rangle</span> satisfies

<div class="note-math-display" data-tex="&#92;hat A&#124;a&#95;k&#92;rangle&#61;a&#95;k&#124;a&#95;k&#92;rangle&#44;">&#92;hat A&#124;a&#95;k&#92;rangle&#61;a&#95;k&#124;a&#95;k&#92;rangle&#44;</div>

it is an eigenstate of <span class="note-math-inline" data-tex="&#92;hat A">&#92;hat A</span>, and <span class="note-math-inline" data-tex="a&#95;k">a&#95;k</span> is the corresponding eigenvalue. Measuring the observable in this state gives <span class="note-math-inline" data-tex="a&#95;k">a&#95;k</span> with certainty. For a general normalized state, its expectation value is

<div class="note-math-display" data-tex="&#92;langle A&#92;rangle&#61;&#92;langle&#92;Psi&#124;&#92;hat A&#124;&#92;Psi&#92;rangle&#46;">&#92;langle A&#92;rangle&#61;&#92;langle&#92;Psi&#124;&#92;hat A&#124;&#92;Psi&#92;rangle&#46;</div>

An expectation value is the average over repeated measurements on identically prepared states, not necessarily an outcome of an individual measurement.

More generally, a matrix element <span class="note-math-inline" data-tex="&#92;langle&#92;Phi&#124;&#92;hat A&#124;&#92;Psi&#92;rangle">&#92;langle&#92;Phi&#124;&#92;hat A&#124;&#92;Psi&#92;rangle</span> measures how strongly the action of <span class="note-math-inline" data-tex="&#92;hat A">&#92;hat A</span> on <span class="note-math-inline" data-tex="&#124;&#92;Psi&#92;rangle">&#124;&#92;Psi&#92;rangle</span> projects onto <span class="note-math-inline" data-tex="&#124;&#92;Phi&#92;rangle">&#124;&#92;Phi&#92;rangle</span>. This is a different object from the overlap <span class="note-math-inline" data-tex="&#92;langle&#92;Phi&#124;&#92;Psi&#92;rangle">&#92;langle&#92;Phi&#124;&#92;Psi&#92;rangle</span>: two orthogonal states can have a nonzero operator matrix element.

For example, the site-<span class="note-math-inline" data-tex="A">A</span> occupation operator in our two-site model is <span class="note-math-inline" data-tex="&#92;hat n&#95;A&#61;&#124;A&#92;rangle&#92;langle A&#124;">&#92;hat n&#95;A&#61;&#124;A&#92;rangle&#92;langle A&#124;</span>. Its matrix element between the two orthogonal superpositions introduced above is

<div class="note-math-display" data-tex="&#92;langle&#43;&#124;&#92;hat n&#95;A&#124;&#45;&#92;rangle&#61;&#92;frac12&#44;&#10;&#92;qquad &#92;langle&#43;&#124;&#45;&#92;rangle&#61;0&#46;">&#92;langle&#43;&#124;&#92;hat n&#95;A&#124;&#45;&#92;rangle&#61;&#92;frac12&#44;&#10;&#92;qquad &#92;langle&#43;&#124;&#45;&#92;rangle&#61;0&#46;</div>

This distinction is central to perturbation theory. Orthogonality alone does not prevent an external perturbation from coupling two quantum states.

## 3. The Hamiltonian: what determines a molecular state?

Among all quantum operators, the Hamiltonian <span class="note-math-inline" data-tex="&#92;hat H">&#92;hat H</span> occupies a special position. It represents energy and generates time evolution according to the time-dependent Schrödinger equation,

<div class="note-math-display" data-tex="i&#92;hbar&#92;frac&#123;&#92;partial&#125;&#123;&#92;partial t&#125;&#124;&#92;Psi&#40;t&#41;&#92;rangle&#61;&#92;hat H&#40;t&#41;&#124;&#92;Psi&#40;t&#41;&#92;rangle&#44;">i&#92;hbar&#92;frac&#123;&#92;partial&#125;&#123;&#92;partial t&#125;&#124;&#92;Psi&#40;t&#41;&#92;rangle&#61;&#92;hat H&#40;t&#41;&#124;&#92;Psi&#40;t&#41;&#92;rangle&#44;</div>

where <span class="note-math-inline" data-tex="i&#94;2&#61;&#45;1">i&#94;2&#61;&#45;1</span>, <span class="note-math-inline" data-tex="&#92;hbar">&#92;hbar</span> is the reduced Planck constant, and <span class="note-math-inline" data-tex="t">t</span> is time. For a time-independent Hamiltonian, its stationary states satisfy

<div class="note-math-display" data-tex="&#92;boxed&#123;&#92;hat H&#124;&#92;Psi&#95;m&#92;rangle&#61;E&#95;m&#124;&#92;Psi&#95;m&#92;rangle&#46;&#125;&#92;tag&#123;1&#125;">&#92;boxed&#123;&#92;hat H&#124;&#92;Psi&#95;m&#92;rangle&#61;E&#95;m&#124;&#92;Psi&#95;m&#92;rangle&#46;&#125;&#92;tag&#123;1&#125;</div>

This is the time-independent Schrödinger equation. The eigenvalues <span class="note-math-inline" data-tex="E&#95;m">E&#95;m</span> are the allowed energies, and the eigenstates <span class="note-math-inline" data-tex="&#124;&#92;Psi&#95;m&#92;rangle">&#124;&#92;Psi&#95;m&#92;rangle</span> describe the corresponding quantum states. The ground state has the lowest energy; states of higher energy are excited states. A stationary eigenstate evolves only by an overall phase <span class="note-math-inline" data-tex="e&#94;&#123;&#45;iE&#95;mt&#47;&#92;hbar&#125;">e&#94;&#123;&#45;iE&#95;mt&#47;&#92;hbar&#125;</span>, leaving its position probability density unchanged.

Equation (1) is an eigenvalue problem. Its mathematical form resembles a matrix eigendecomposition, but the molecular Hamiltonian acts on functions of many particle coordinates and generally cannot be solved exactly.

### The molecular Hamiltonian

Consider a nonrelativistic molecule with <span class="note-math-inline" data-tex="N">N</span> electrons and <span class="note-math-inline" data-tex="M">M</span> nuclei. Let <span class="note-math-inline" data-tex="&#92;mathbf r&#95;i">&#92;mathbf r&#95;i</span> be the coordinate of electron <span class="note-math-inline" data-tex="i">i</span>, <span class="note-math-inline" data-tex="&#92;mathbf R&#95;A">&#92;mathbf R&#95;A</span> the coordinate of nucleus <span class="note-math-inline" data-tex="A">A</span>, and <span class="note-math-inline" data-tex="Z&#95;A">Z&#95;A</span> the nuclear charge number. For the remainder of this article, I use atomic units, in which <span class="note-math-inline" data-tex="&#92;hbar&#61;m&#95;e&#61;e&#61;4&#92;pi&#92;varepsilon&#95;0&#61;1">&#92;hbar&#61;m&#95;e&#61;e&#61;4&#92;pi&#92;varepsilon&#95;0&#61;1</span>; energies are measured in hartrees and distances in bohr.

In the absence of an external field, the Coulomb Hamiltonian is

<div class="note-math-display" data-tex="&#92;boxed&#123;&#92;begin&#123;aligned&#125;&#10;&#92;hat H&#61;&#123;&#125;&#38;&#45;&#92;frac12&#92;sum&#95;&#123;i&#61;1&#125;&#94;&#123;N&#125;&#92;nabla&#95;i&#94;2&#10;&#45;&#92;sum&#95;&#123;A&#61;1&#125;&#94;&#123;M&#125;&#92;frac&#123;1&#125;&#123;2&#92;mathcal M&#95;A&#125;&#92;nabla&#95;A&#94;2&#92;&#92;&#10;&#38;&#45;&#92;sum&#95;&#123;i&#44;A&#125;&#92;frac&#123;Z&#95;A&#125;&#123;&#124;&#92;mathbf r&#95;i&#45;&#92;mathbf R&#95;A&#124;&#125;&#10;&#43;&#92;sum&#95;&#123;i&#60;j&#125;&#92;frac&#123;1&#125;&#123;&#124;&#92;mathbf r&#95;i&#45;&#92;mathbf r&#95;j&#124;&#125;&#92;&#92;&#10;&#38;&#43;&#92;sum&#95;&#123;A&#60;B&#125;&#92;frac&#123;Z&#95;AZ&#95;B&#125;&#123;&#124;&#92;mathbf R&#95;A&#45;&#92;mathbf R&#95;B&#124;&#125;&#46;&#10;&#92;end&#123;aligned&#125;&#125;&#92;tag&#123;2&#125;">&#92;boxed&#123;&#92;begin&#123;aligned&#125;&#10;&#92;hat H&#61;&#123;&#125;&#38;&#45;&#92;frac12&#92;sum&#95;&#123;i&#61;1&#125;&#94;&#123;N&#125;&#92;nabla&#95;i&#94;2&#10;&#45;&#92;sum&#95;&#123;A&#61;1&#125;&#94;&#123;M&#125;&#92;frac&#123;1&#125;&#123;2&#92;mathcal M&#95;A&#125;&#92;nabla&#95;A&#94;2&#92;&#92;&#10;&#38;&#45;&#92;sum&#95;&#123;i&#44;A&#125;&#92;frac&#123;Z&#95;A&#125;&#123;&#124;&#92;mathbf r&#95;i&#45;&#92;mathbf R&#95;A&#124;&#125;&#10;&#43;&#92;sum&#95;&#123;i&#60;j&#125;&#92;frac&#123;1&#125;&#123;&#124;&#92;mathbf r&#95;i&#45;&#92;mathbf r&#95;j&#124;&#125;&#92;&#92;&#10;&#38;&#43;&#92;sum&#95;&#123;A&#60;B&#125;&#92;frac&#123;Z&#95;AZ&#95;B&#125;&#123;&#124;&#92;mathbf R&#95;A&#45;&#92;mathbf R&#95;B&#124;&#125;&#46;&#10;&#92;end&#123;aligned&#125;&#125;&#92;tag&#123;2&#125;</div>

Here <span class="note-math-inline" data-tex="&#92;mathcal M&#95;A">&#92;mathcal M&#95;A</span> is the mass of nucleus <span class="note-math-inline" data-tex="A">A</span> in electron-mass units. The Laplacians <span class="note-math-inline" data-tex="&#92;nabla&#95;i&#94;2">&#92;nabla&#95;i&#94;2</span> and <span class="note-math-inline" data-tex="&#92;nabla&#95;A&#94;2">&#92;nabla&#95;A&#94;2</span> are sums of second derivatives with respect to the corresponding Cartesian coordinates. Reading Eq. (2) from left to right gives the electron and nuclear kinetic energies, electron–nucleus attraction, electron–electron repulsion, and nucleus–nucleus repulsion. The restrictions <span class="note-math-inline" data-tex="i&#60;j">i&#60;j</span> and <span class="note-math-inline" data-tex="A&#60;B">A&#60;B</span> prevent double counting particle pairs.

The kinetic-energy terms deserve attention. For a normalized one-electron wavefunction with appropriate boundary conditions, integration by parts gives

<div class="note-math-display" data-tex="&#92;left&#92;langle&#45;&#92;frac12&#92;nabla&#94;2&#92;right&#92;rangle&#10;&#61;&#92;frac12&#92;int&#124;&#92;nabla&#92;Psi&#40;&#92;mathbf r&#41;&#124;&#94;2&#92;&#44;d&#94;3&#92;mathbf r&#46;">&#92;left&#92;langle&#45;&#92;frac12&#92;nabla&#94;2&#92;right&#92;rangle&#10;&#61;&#92;frac12&#92;int&#124;&#92;nabla&#92;Psi&#40;&#92;mathbf r&#41;&#124;&#94;2&#92;&#44;d&#94;3&#92;mathbf r&#46;</div>

Rapid spatial variation of the wavefunction carries a kinetic-energy cost. Electronic structure consequently reflects a competition between spatial delocalization, attraction to nuclei, electron repulsion, and quantum constraints. None of the terms in Eq. (2) explicitly represents a chemical bond.

### Separating electronic and nuclear motion

Atomic nuclei are much heavier than electrons. The Born–Oppenheimer approximation exploits the resulting separation of electronic and nuclear motion by first solving the electronic problem at fixed nuclear coordinates <span class="note-math-inline" data-tex="&#92;mathbf R&#61;&#40;&#92;mathbf R&#95;1&#44;&#92;ldots&#44;&#92;mathbf R&#95;M&#41;">&#92;mathbf R&#61;&#40;&#92;mathbf R&#95;1&#44;&#92;ldots&#44;&#92;mathbf R&#95;M&#41;</span>.

The clamped-nuclei electronic Hamiltonian is

<div class="note-math-display" data-tex="&#92;hat H&#95;e&#40;&#92;mathbf R&#41;&#61;&#45;&#92;frac12&#92;sum&#95;i&#92;nabla&#95;i&#94;2&#10;&#45;&#92;sum&#95;&#123;i&#44;A&#125;&#92;frac&#123;Z&#95;A&#125;&#123;&#124;&#92;mathbf r&#95;i&#45;&#92;mathbf R&#95;A&#124;&#125;&#10;&#43;&#92;sum&#95;&#123;i&#60;j&#125;&#92;frac&#123;1&#125;&#123;&#124;&#92;mathbf r&#95;i&#45;&#92;mathbf r&#95;j&#124;&#125;&#46;">&#92;hat H&#95;e&#40;&#92;mathbf R&#41;&#61;&#45;&#92;frac12&#92;sum&#95;i&#92;nabla&#95;i&#94;2&#10;&#45;&#92;sum&#95;&#123;i&#44;A&#125;&#92;frac&#123;Z&#95;A&#125;&#123;&#124;&#92;mathbf r&#95;i&#45;&#92;mathbf R&#95;A&#124;&#125;&#10;&#43;&#92;sum&#95;&#123;i&#60;j&#125;&#92;frac&#123;1&#125;&#123;&#124;&#92;mathbf r&#95;i&#45;&#92;mathbf r&#95;j&#124;&#125;&#46;</div>

For each geometry, we solve

<div class="note-math-display" data-tex="&#92;hat H&#95;e&#40;&#92;mathbf R&#41;&#124;&#92;Psi&#95;m&#40;&#92;mathbf R&#41;&#92;rangle&#10;&#61;E&#95;&#123;e&#44;m&#125;&#40;&#92;mathbf R&#41;&#124;&#92;Psi&#95;m&#40;&#92;mathbf R&#41;&#92;rangle&#46;">&#92;hat H&#95;e&#40;&#92;mathbf R&#41;&#124;&#92;Psi&#95;m&#40;&#92;mathbf R&#41;&#92;rangle&#10;&#61;E&#95;&#123;e&#44;m&#125;&#40;&#92;mathbf R&#41;&#124;&#92;Psi&#95;m&#40;&#92;mathbf R&#41;&#92;rangle&#46;</div>

The ground-state Born–Oppenheimer potential energy surface is then

<div class="note-math-display" data-tex="U&#95;0&#40;&#92;mathbf R&#41;&#61;E&#95;&#123;e&#44;0&#125;&#40;&#92;mathbf R&#41;&#10;&#43;&#92;sum&#95;&#123;A&#60;B&#125;&#92;frac&#123;Z&#95;AZ&#95;B&#125;&#123;&#124;&#92;mathbf R&#95;A&#45;&#92;mathbf R&#95;B&#124;&#125;&#46;&#10;&#92;tag&#123;3&#125;">U&#95;0&#40;&#92;mathbf R&#41;&#61;E&#95;&#123;e&#44;0&#125;&#40;&#92;mathbf R&#41;&#10;&#43;&#92;sum&#95;&#123;A&#60;B&#125;&#92;frac&#123;Z&#95;AZ&#95;B&#125;&#123;&#124;&#92;mathbf R&#95;A&#45;&#92;mathbf R&#95;B&#124;&#125;&#46;&#10;&#92;tag&#123;3&#125;</div>

The nuclear repulsion is constant during an electronic calculation at a fixed geometry, but changes when the nuclei move, so it must be included in the potential energy surface.

Equation (3) explains why geometry and electronic structure are inseparable. Moving nuclei changes the electron–nucleus potential, producing a different electronic eigenvalue problem. A chemical transition state is a saddle point on a reaction energy landscape, not necessarily an electronic excited state: its electrons may still occupy the ground electronic state at that particular geometry. The Born–Oppenheimer separation can become unreliable near electronic degeneracies or when transitions between electronic surfaces matter.

An external electrostatic potential <span class="note-math-inline" data-tex="&#92;phi&#95;&#123;&#92;mathrm&#123;ext&#125;&#125;&#40;&#92;mathbf r&#41;">&#92;phi&#95;&#123;&#92;mathrm&#123;ext&#125;&#125;&#40;&#92;mathbf r&#41;</span> enters the electronic Hamiltonian as

<div class="note-math-display" data-tex="&#92;hat H&#39;&#95;e&#61;&#92;hat H&#95;e&#45;&#92;sum&#95;i&#92;phi&#95;&#123;&#92;mathrm&#123;ext&#125;&#125;&#40;&#92;mathbf r&#95;i&#41;&#44;">&#92;hat H&#39;&#95;e&#61;&#92;hat H&#95;e&#45;&#92;sum&#95;i&#92;phi&#95;&#123;&#92;mathrm&#123;ext&#125;&#125;&#40;&#92;mathbf r&#95;i&#41;&#44;</div>

in atomic units. The minus sign reflects the negative electron charge. The corresponding direct nuclear contribution to the total potential energy is <span class="note-math-inline" data-tex="&#92;sum&#95;A Z&#95;A&#92;phi&#95;&#123;&#92;mathrm&#123;ext&#125;&#125;&#40;&#92;mathbf R&#95;A&#41;">&#92;sum&#95;A Z&#95;A&#92;phi&#95;&#123;&#92;mathrm&#123;ext&#125;&#125;&#40;&#92;mathbf R&#95;A&#41;</span>. A spatially constant potential shifts energies but does not change the electronic eigenstates at fixed electron number. A spatially varying potential generally changes both energies and wavefunctions. This is the starting point for our later discussion of electrostatic catalysis.

## 4. Why orbitals enter the picture

For a hydrogen atom with its nucleus fixed at the origin, the electronic Hamiltonian reduces to

<div class="note-math-display" data-tex="&#92;hat H&#95;e&#61;&#45;&#92;frac12&#92;nabla&#94;2&#45;&#92;frac1r&#44;">&#92;hat H&#95;e&#61;&#45;&#92;frac12&#92;nabla&#94;2&#45;&#92;frac1r&#44;</div>

where <span class="note-math-inline" data-tex="r&#61;&#124;&#92;mathbf r&#124;">r&#61;&#124;&#92;mathbf r&#124;</span>. The normalized ground-state spatial wavefunction is <span class="note-math-inline" data-tex="&#92;psi&#95;&#123;1s&#125;&#40;&#92;mathbf r&#41;&#61;&#92;pi&#94;&#123;&#45;1&#47;2&#125;e&#94;&#123;&#45;r&#125;">&#92;psi&#95;&#123;1s&#125;&#40;&#92;mathbf r&#41;&#61;&#92;pi&#94;&#123;&#45;1&#47;2&#125;e&#94;&#123;&#45;r&#125;</span>, with energy <span class="note-math-inline" data-tex="&#45;1&#47;2">&#45;1&#47;2</span> hartree. This is the hydrogen <span class="note-math-inline" data-tex="1s">1s</span> orbital. Its squared amplitude is a spherically symmetric probability density. Other hydrogen orbitals, such as <span class="note-math-inline" data-tex="2p">2p</span>, have different angular structure, energies, and nodes, where the wavefunction vanishes.

In a one-electron system, a spatial orbital together with its spin state can describe the entire electronic state. In a many-electron molecule, however, an orbital is a one-electron function used to represent a much more complicated quantum state. The full electronic wavefunction depends on all electron coordinates simultaneously.

### Building molecular orbitals from atomic functions

The hydrogen molecular ion <span class="note-math-inline" data-tex="&#92;mathrm H&#95;2&#94;&#43;">&#92;mathrm H&#95;2&#94;&#43;</span> consists of two protons and one electron. Its electronic Hamiltonian contains attraction to both nuclei. A useful approximation starts with two real hydrogen <span class="note-math-inline" data-tex="1s">1s</span> functions, <span class="note-math-inline" data-tex="&#92;phi&#95;A&#40;&#92;mathbf r&#41;">&#92;phi&#95;A&#40;&#92;mathbf r&#41;</span> and <span class="note-math-inline" data-tex="&#92;phi&#95;B&#40;&#92;mathbf r&#41;">&#92;phi&#95;B&#40;&#92;mathbf r&#41;</span>, centered on the two protons. The molecular orbitals are approximated as linear combinations of these atomic functions.

Define the overlap <span class="note-math-inline" data-tex="S&#61;&#92;langle&#92;phi&#95;A&#124;&#92;phi&#95;B&#92;rangle">S&#61;&#92;langle&#92;phi&#95;A&#124;&#92;phi&#95;B&#92;rangle</span>. The normalized symmetric and antisymmetric combinations are

<div class="note-math-display" data-tex="&#92;psi&#95;&#92;pm&#40;&#92;mathbf r&#41;&#61;&#10;&#92;frac&#123;&#92;phi&#95;A&#40;&#92;mathbf r&#41;&#92;pm&#92;phi&#95;B&#40;&#92;mathbf r&#41;&#125;&#123;&#92;sqrt&#123;2&#40;1&#92;pm S&#41;&#125;&#125;&#46;">&#92;psi&#95;&#92;pm&#40;&#92;mathbf r&#41;&#61;&#10;&#92;frac&#123;&#92;phi&#95;A&#40;&#92;mathbf r&#41;&#92;pm&#92;phi&#95;B&#40;&#92;mathbf r&#41;&#125;&#123;&#92;sqrt&#123;2&#40;1&#92;pm S&#41;&#125;&#125;&#46;</div>

The corresponding densities are

<div class="note-math-display" data-tex="&#124;&#92;psi&#95;&#92;pm&#124;&#94;2&#61;&#10;&#92;frac&#123;&#124;&#92;phi&#95;A&#124;&#94;2&#43;&#124;&#92;phi&#95;B&#124;&#94;2&#92;pm2&#92;phi&#95;A&#92;phi&#95;B&#125;&#123;2&#40;1&#92;pm S&#41;&#125;&#46;">&#124;&#92;psi&#95;&#92;pm&#124;&#94;2&#61;&#10;&#92;frac&#123;&#124;&#92;phi&#95;A&#124;&#94;2&#43;&#124;&#92;phi&#95;B&#124;&#94;2&#92;pm2&#92;phi&#95;A&#92;phi&#95;B&#125;&#123;2&#40;1&#92;pm S&#41;&#125;&#46;</div>

This is the same interference phenomenon we encountered in Section 1. The symmetric combination increases electron density in the internuclear region relative to the antisymmetric combination, which has a node at the midpoint and a nodal plane between the protons. They are the familiar bonding and antibonding combinations. Their energy ordering must ultimately be established from the Hamiltonian, not merely from a picture of the density.

For a more general linear combination <span class="note-math-inline" data-tex="&#92;psi&#95;a&#61;&#92;sum&#95;&#123;&#92;mu&#125; C&#95;&#123;&#92;mu a&#125;&#92;phi&#95;&#92;mu">&#92;psi&#95;a&#61;&#92;sum&#95;&#123;&#92;mu&#125; C&#95;&#123;&#92;mu a&#125;&#92;phi&#95;&#92;mu</span> (where <span class="note-math-inline" data-tex="&#92;mu">&#92;mu</span> labels basis functions), the effective one-electron eigenvalue equation becomes

<div class="note-math-display" data-tex="&#92;mathbf h&#92;mathbf c&#95;a&#61;&#92;epsilon&#95;a&#92;mathbf S&#92;mathbf c&#95;a&#44;">&#92;mathbf h&#92;mathbf c&#95;a&#61;&#92;epsilon&#95;a&#92;mathbf S&#92;mathbf c&#95;a&#44;</div>

where <span class="note-math-inline" data-tex="h&#95;&#123;&#92;mu&#92;nu&#125;&#61;&#92;langle&#92;phi&#95;&#92;mu&#124;&#92;hat h&#124;&#92;phi&#95;&#92;nu&#92;rangle">h&#95;&#123;&#92;mu&#92;nu&#125;&#61;&#92;langle&#92;phi&#95;&#92;mu&#124;&#92;hat h&#124;&#92;phi&#95;&#92;nu&#92;rangle</span>, <span class="note-math-inline" data-tex="S&#95;&#123;&#92;mu&#92;nu&#125;&#61;&#92;langle&#92;phi&#95;&#92;mu&#124;&#92;phi&#95;&#92;nu&#92;rangle">S&#95;&#123;&#92;mu&#92;nu&#125;&#61;&#92;langle&#92;phi&#95;&#92;mu&#124;&#92;phi&#95;&#92;nu&#92;rangle</span>, and <span class="note-math-inline" data-tex="&#92;mathbf c&#95;a">&#92;mathbf c&#95;a</span> is the vector of orbital expansion coefficients. The overlap matrix <span class="note-math-inline" data-tex="&#92;mathbf S">&#92;mathbf S</span> is the identity only for an orthonormal basis. The operator <span class="note-math-inline" data-tex="&#92;hat h">&#92;hat h</span> is a one-electron Hamiltonian or an effective one-electron operator, depending on the method.

Orbital overlap and Hamiltonian coupling are related but not identical. Orthogonal localized orbitals may still have a nonzero off-diagonal Hamiltonian matrix element. Conversely, choosing the Hamiltonian's eigenbasis makes its matrix diagonal. Thus, an individual coupling matrix element depends on the chosen representation, whereas the eigenvalues do not.

### A two-orbital model of bonding

Return to our orthonormal localized states <span class="note-math-inline" data-tex="&#124;A&#92;rangle">&#124;A&#92;rangle</span> and <span class="note-math-inline" data-tex="&#124;B&#92;rangle">&#124;B&#92;rangle</span>. A minimal symmetric Hamiltonian is

<div class="note-math-display" data-tex="&#92;mathbf H&#61;&#92;begin&#123;pmatrix&#125;0&#38;&#45;t&#92;&#92;&#45;t&#38;0&#92;end&#123;pmatrix&#125;&#44;&#92;qquad t&#62;0&#44;">&#92;mathbf H&#61;&#92;begin&#123;pmatrix&#125;0&#38;&#45;t&#92;&#92;&#45;t&#38;0&#92;end&#123;pmatrix&#125;&#44;&#92;qquad t&#62;0&#44;</div>

where <span class="note-math-inline" data-tex="t">t</span> is a coupling energy and the zero of energy is chosen at the common site energy. Its eigenstates are <span class="note-math-inline" data-tex="&#124;&#43;&#92;rangle">&#124;&#43;&#92;rangle</span> and <span class="note-math-inline" data-tex="&#124;&#45;&#92;rangle">&#124;&#45;&#92;rangle</span>, with energies <span class="note-math-inline" data-tex="&#45;t">&#45;t</span> and <span class="note-math-inline" data-tex="&#43;t">&#43;t</span>, respectively. Both have the same site occupations, but their relative phases cause the off-diagonal Hamiltonian contribution to have opposite signs. Here stronger coupling increases the energy splitting <span class="note-math-inline" data-tex="2t">2t</span>.

This is an illustrative tight-binding model, not a quantitative Hamiltonian for <span class="note-math-inline" data-tex="&#92;mathrm H&#95;2&#94;&#43;">&#92;mathrm H&#95;2&#94;&#43;</span>. It captures a fundamental point: a chemical description based only on atomic occupations cannot generally distinguish bonding from antibonding states.

In realistic quantum chemistry, orbitals can arise in several ways. Hartree–Fock orbitals come from a self-consistent single-determinant approximation. Kohn–Sham orbitals belong to an auxiliary noninteracting system constructed to reproduce the ground-state density. Natural orbitals, which we will meet below, are eigenfunctions of the 1-RDM. These definitions are not interchangeable, and an orbital is not generally a classical trajectory or an identifiable individual electron.

## 5. Many electrons: the wavefunction becomes a collective object

Adding a second electron to <span class="note-math-inline" data-tex="&#92;mathrm H&#95;2&#94;&#43;">&#92;mathrm H&#95;2&#94;&#43;</span> gives <span class="note-math-inline" data-tex="&#92;mathrm H&#95;2">&#92;mathrm H&#95;2</span>. This introduces an interaction that no single-electron model contains: electron–electron repulsion.

Let <span class="note-math-inline" data-tex="x&#95;i&#61;&#40;&#92;mathbf r&#95;i&#44;s&#95;i&#41;">x&#95;i&#61;&#40;&#92;mathbf r&#95;i&#44;s&#95;i&#41;</span> denote the position and spin coordinate of electron <span class="note-math-inline" data-tex="i">i</span>. A normalized <span class="note-math-inline" data-tex="N">N</span>-electron wavefunction has the form

<div class="note-math-display" data-tex="&#92;Psi&#40;x&#95;1&#44;&#92;ldots&#44;x&#95;N&#41;&#44;&#92;qquad&#10;&#92;int&#124;&#92;Psi&#40;x&#95;1&#44;&#92;ldots&#44;x&#95;N&#41;&#124;&#94;2&#92;&#44;dx&#95;1&#92;cdots dx&#95;N&#61;1&#44;">&#92;Psi&#40;x&#95;1&#44;&#92;ldots&#44;x&#95;N&#41;&#44;&#92;qquad&#10;&#92;int&#124;&#92;Psi&#40;x&#95;1&#44;&#92;ldots&#44;x&#95;N&#41;&#124;&#94;2&#92;&#44;dx&#95;1&#92;cdots dx&#95;N&#61;1&#44;</div>

where integration over <span class="note-math-inline" data-tex="x&#95;i">x&#95;i</span> means spatial integration and summation over its spin coordinate. The spatial part lives in a <span class="note-math-inline" data-tex="3N">3N</span>-dimensional configuration space, not ordinary three-dimensional physical space.

Electrons are indistinguishable fermions. Exchanging any two electron coordinates, including their spins, changes the sign of the full wavefunction:

<div class="note-math-display" data-tex="&#92;Psi&#40;&#92;ldots&#44;x&#95;i&#44;&#92;ldots&#44;x&#95;j&#44;&#92;ldots&#41;&#10;&#61;&#45;&#92;Psi&#40;&#92;ldots&#44;x&#95;j&#44;&#92;ldots&#44;x&#95;i&#44;&#92;ldots&#41;&#46;">&#92;Psi&#40;&#92;ldots&#44;x&#95;i&#44;&#92;ldots&#44;x&#95;j&#44;&#92;ldots&#41;&#10;&#61;&#45;&#92;Psi&#40;&#92;ldots&#44;x&#95;j&#44;&#92;ldots&#44;x&#95;i&#44;&#92;ldots&#41;&#46;</div>

A product of independent one-electron functions does not generally have this property. Given two orthonormal spin orbitals <span class="note-math-inline" data-tex="u&#95;a&#40;x&#41;">u&#95;a&#40;x&#41;</span> and <span class="note-math-inline" data-tex="u&#95;b&#40;x&#41;">u&#95;b&#40;x&#41;</span>, antisymmetry is imposed by the Slater determinant

<div class="note-math-display" data-tex="&#92;Psi&#40;x&#95;1&#44;x&#95;2&#41;&#61;&#92;frac1&#123;&#92;sqrt2&#125;&#10;&#92;begin&#123;vmatrix&#125;&#10;u&#95;a&#40;x&#95;1&#41;&#38;u&#95;b&#40;x&#95;1&#41;&#92;&#92;&#10;u&#95;a&#40;x&#95;2&#41;&#38;u&#95;b&#40;x&#95;2&#41;&#10;&#92;end&#123;vmatrix&#125;&#46;">&#92;Psi&#40;x&#95;1&#44;x&#95;2&#41;&#61;&#92;frac1&#123;&#92;sqrt2&#125;&#10;&#92;begin&#123;vmatrix&#125;&#10;u&#95;a&#40;x&#95;1&#41;&#38;u&#95;b&#40;x&#95;1&#41;&#92;&#92;&#10;u&#95;a&#40;x&#95;2&#41;&#38;u&#95;b&#40;x&#95;2&#41;&#10;&#92;end&#123;vmatrix&#125;&#46;</div>

Expanding the determinant gives <span class="note-math-inline" data-tex="&#91;u&#95;a&#40;x&#95;1&#41;u&#95;b&#40;x&#95;2&#41;&#45;u&#95;b&#40;x&#95;1&#41;u&#95;a&#40;x&#95;2&#41;&#93;&#47;&#92;sqrt2">&#91;u&#95;a&#40;x&#95;1&#41;u&#95;b&#40;x&#95;2&#41;&#45;u&#95;b&#40;x&#95;1&#41;u&#95;a&#40;x&#95;2&#41;&#93;&#47;&#92;sqrt2</span>. Exchanging electron labels swaps its rows and reverses its sign. If both spin orbitals are identical, the determinant vanishes. This is the Pauli exclusion principle in this representation. Two electrons may still share a spatial orbital if their spin functions are different.

A single determinant is an important approximation, but a general interacting many-electron state is not a single determinant. In a finite orbital basis, it may be expanded as <span class="note-math-inline" data-tex="&#124;&#92;Psi&#92;rangle&#61;&#92;sum&#95;K c&#95;K&#124;D&#95;K&#92;rangle">&#124;&#92;Psi&#92;rangle&#61;&#92;sum&#95;K c&#95;K&#124;D&#95;K&#92;rangle</span>, where <span class="note-math-inline" data-tex="D&#95;K">D&#95;K</span> are determinants and <span class="note-math-inline" data-tex="c&#95;K">c&#95;K</span> are complex coefficients. Enlarging the basis and allowing more determinants increases representational flexibility at substantial computational cost.

For <span class="note-math-inline" data-tex="&#92;mathrm H&#95;2">&#92;mathrm H&#95;2</span>, the single-determinant picture works qualitatively near equilibrium but becomes inadequate as the bond is stretched toward dissociation. Correctly describing the two separating electrons requires additional configurations. This is one manifestation of electron correlation beyond a single Hartree–Fock determinant. Antisymmetry already produces exchange effects within a determinant; correlation in the conventional quantum-chemical sense goes beyond that mean-field description.

The difficulty is now clear. Even with a modest number of orbitals, the number of possible determinants grows combinatorially. We need more compact ways to represent the electronic structure.

## 6. Electron density: reducing configuration space to physical space

A many-electron wavefunction describes the joint quantum state of all electrons. Often, however, we only want to know how many electrons are expected in a region of space. The electron number density is the natural object for that question.

Because all electrons are indistinguishable, their one-electron marginal distributions are equivalent. Integrating out the remaining <span class="note-math-inline" data-tex="N&#45;1">N&#45;1</span> coordinates and summing the spin of the first electron gives

<div class="note-math-display" data-tex="&#92;boxed&#123;n&#40;&#92;mathbf r&#41;&#61;N&#92;sum&#95;s&#92;int&#10;&#124;&#92;Psi&#40;&#40;&#92;mathbf r&#44;s&#41;&#44;x&#95;2&#44;&#92;ldots&#44;x&#95;N&#41;&#124;&#94;2&#92;&#44;dx&#95;2&#92;cdots dx&#95;N&#46;&#125;&#92;tag&#123;4&#125;">&#92;boxed&#123;n&#40;&#92;mathbf r&#41;&#61;N&#92;sum&#95;s&#92;int&#10;&#124;&#92;Psi&#40;&#40;&#92;mathbf r&#44;s&#41;&#44;x&#95;2&#44;&#92;ldots&#44;x&#95;N&#41;&#124;&#94;2&#92;&#44;dx&#95;2&#92;cdots dx&#95;N&#46;&#125;&#92;tag&#123;4&#125;</div>

The factor <span class="note-math-inline" data-tex="N">N</span> converts the normalized one-electron marginal into the total electron number density. Consequently, <span class="note-math-inline" data-tex="n&#40;&#92;mathbf r&#41;&#92;ge0">n&#40;&#92;mathbf r&#41;&#92;ge0</span> and <span class="note-math-inline" data-tex="&#92;int n&#40;&#92;mathbf r&#41;&#92;&#44;d&#94;3&#92;mathbf r&#61;N">&#92;int n&#40;&#92;mathbf r&#41;&#92;&#44;d&#94;3&#92;mathbf r&#61;N</span>. Integrating over a region gives the expected number of electrons there, not generally a probability bounded by one. The electronic charge density is <span class="note-math-inline" data-tex="&#45;en&#40;&#92;mathbf r&#41;">&#45;en&#40;&#92;mathbf r&#41;</span> in SI units, or <span class="note-math-inline" data-tex="&#45;n&#40;&#92;mathbf r&#41;">&#45;n&#40;&#92;mathbf r&#41;</span> in atomic units.

There is an equivalent operator formulation. Introduce the three-dimensional Dirac delta distribution, characterized by

<div class="note-math-display" data-tex="&#92;int f&#40;&#92;mathbf r&#41;&#92;delta&#94;&#123;&#40;3&#41;&#125;&#40;&#92;mathbf r&#45;&#92;mathbf a&#41;&#92;&#44;d&#94;3&#92;mathbf r&#61;f&#40;&#92;mathbf a&#41;&#46;">&#92;int f&#40;&#92;mathbf r&#41;&#92;delta&#94;&#123;&#40;3&#41;&#125;&#40;&#92;mathbf r&#45;&#92;mathbf a&#41;&#92;&#44;d&#94;3&#92;mathbf r&#61;f&#40;&#92;mathbf a&#41;&#46;</div>

Its role is to select a specified position <span class="note-math-inline" data-tex="&#92;mathbf a">&#92;mathbf a</span> from a spatial integral. The electron density operator at observation point <span class="note-math-inline" data-tex="&#92;mathbf r">&#92;mathbf r</span> is

<div class="note-math-display" data-tex="&#92;hat n&#40;&#92;mathbf r&#41;&#61;&#92;sum&#95;i&#92;delta&#94;&#123;&#40;3&#41;&#125;&#40;&#92;mathbf r&#45;&#92;mathbf r&#95;i&#41;&#46;">&#92;hat n&#40;&#92;mathbf r&#41;&#61;&#92;sum&#95;i&#92;delta&#94;&#123;&#40;3&#41;&#125;&#40;&#92;mathbf r&#45;&#92;mathbf r&#95;i&#41;&#46;</div>

Here <span class="note-math-inline" data-tex="&#92;mathbf r">&#92;mathbf r</span> is an external observation coordinate, while the <span class="note-math-inline" data-tex="&#92;mathbf r&#95;i">&#92;mathbf r&#95;i</span> are variables of the many-electron wavefunction. Taking the expectation value recovers Eq. (4):

<div class="note-math-display" data-tex="&#92;boxed&#123;n&#40;&#92;mathbf r&#41;&#61;&#92;langle&#92;Psi&#124;&#92;hat n&#40;&#92;mathbf r&#41;&#124;&#92;Psi&#92;rangle&#46;&#125;&#92;tag&#123;5&#125;">&#92;boxed&#123;n&#40;&#92;mathbf r&#41;&#61;&#92;langle&#92;Psi&#124;&#92;hat n&#40;&#92;mathbf r&#41;&#124;&#92;Psi&#92;rangle&#46;&#125;&#92;tag&#123;5&#125;</div>

More rigorously, integrating <span class="note-math-inline" data-tex="&#92;hat n&#40;&#92;mathbf r&#41;">&#92;hat n&#40;&#92;mathbf r&#41;</span> over a region yields an operator that counts the electrons in that region. The local density is its continuous distributional form.

Equation (5) also explains why external potentials couple naturally to electron density. If <span class="note-math-inline" data-tex="v&#40;&#92;mathbf r&#41;">v&#40;&#92;mathbf r&#41;</span> is a scalar one-electron potential energy, the associated many-electron operator is <span class="note-math-inline" data-tex="&#92;hat V&#61;&#92;sum&#95;i v&#40;&#92;mathbf r&#95;i&#41;&#61;&#92;int v&#40;&#92;mathbf r&#41;&#92;hat n&#40;&#92;mathbf r&#41;&#92;&#44;d&#94;3&#92;mathbf r">&#92;hat V&#61;&#92;sum&#95;i v&#40;&#92;mathbf r&#95;i&#41;&#61;&#92;int v&#40;&#92;mathbf r&#41;&#92;hat n&#40;&#92;mathbf r&#41;&#92;&#44;d&#94;3&#92;mathbf r</span>. Its expectation is therefore

<div class="note-math-display" data-tex="&#92;langle V&#92;rangle&#61;&#92;int v&#40;&#92;mathbf r&#41;n&#40;&#92;mathbf r&#41;&#92;&#44;d&#94;3&#92;mathbf r&#46;">&#92;langle V&#92;rangle&#61;&#92;int v&#40;&#92;mathbf r&#41;n&#40;&#92;mathbf r&#41;&#92;&#44;d&#94;3&#92;mathbf r&#46;</div>

The full <span class="note-math-inline" data-tex="3N">3N</span>-dimensional probability distribution has been reduced to a three-dimensional field, yet that field is sufficient to compute the expectation of any local, spin-independent one-body potential. What it does not directly retain is the phase coherence between different spatial positions, or the joint behavior of two electrons. To recover more of that information, we need a density matrix.

## 7. The one-particle reduced density matrix

### From a state vector to an operator

A normalized pure state can be represented equivalently by its density operator,

<div class="note-math-display" data-tex="&#92;hat&#92;rho&#61;&#124;&#92;Psi&#92;rangle&#92;langle&#92;Psi&#124;&#46;">&#92;hat&#92;rho&#61;&#124;&#92;Psi&#92;rangle&#92;langle&#92;Psi&#124;&#46;</div>

It is a rank-one projector with <span class="note-math-inline" data-tex="&#92;operatorname&#123;Tr&#125;&#40;&#92;hat&#92;rho&#41;&#61;1">&#92;operatorname&#123;Tr&#125;&#40;&#92;hat&#92;rho&#41;&#61;1</span>, where the trace is the sum of diagonal elements in any orthonormal basis. In finite dimensions, the expectation value of any observable is <span class="note-math-inline" data-tex="&#92;langle A&#92;rangle&#61;&#92;operatorname&#123;Tr&#125;&#40;&#92;hat&#92;rho&#92;hat A&#41;">&#92;langle A&#92;rangle&#61;&#92;operatorname&#123;Tr&#125;&#40;&#92;hat&#92;rho&#92;hat A&#41;</span>. Unlike the electron density <span class="note-math-inline" data-tex="n&#40;&#92;mathbf r&#41;">n&#40;&#92;mathbf r&#41;</span>, this operator contains the entire pure-state information, apart from its physically irrelevant overall phase. It also generalizes naturally to statistical mixtures of quantum states.

For an <span class="note-math-inline" data-tex="N">N</span>-electron state, the kernel of <span class="note-math-inline" data-tex="&#92;hat&#92;rho">&#92;hat&#92;rho</span> involves two full configurations, <span class="note-math-inline" data-tex="&#92;Psi&#40;x&#95;1&#44;&#92;ldots&#44;x&#95;N&#41;&#92;Psi&#94;&#42;&#40;x&#39;&#95;1&#44;&#92;ldots&#44;x&#39;&#95;N&#41;">&#92;Psi&#40;x&#95;1&#44;&#92;ldots&#44;x&#95;N&#41;&#92;Psi&#94;&#42;&#40;x&#39;&#95;1&#44;&#92;ldots&#44;x&#39;&#95;N&#41;</span>. We can trace over all particles except one, thereby discarding their explicit coordinates while retaining the one-electron quantum information.

The resulting one-particle reduced density operator is defined, using the electron-number normalization convention, as <span class="note-math-inline" data-tex="&#92;hat&#92;gamma&#61;N&#92;operatorname&#123;Tr&#125;&#95;&#123;2&#44;&#92;ldots&#44;N&#125;&#40;&#92;hat&#92;rho&#41;">&#92;hat&#92;gamma&#61;N&#92;operatorname&#123;Tr&#125;&#95;&#123;2&#44;&#92;ldots&#44;N&#125;&#40;&#92;hat&#92;rho&#41;</span>. In position and spin coordinates its kernel is

<div class="note-math-display" data-tex="&#92;boxed&#123;&#92;gamma&#40;x&#44;x&#39;&#41;&#61;N&#92;int&#10;&#92;Psi&#40;x&#44;x&#95;2&#44;&#92;ldots&#44;x&#95;N&#41;&#10;&#92;Psi&#94;&#42;&#40;x&#39;&#44;x&#95;2&#44;&#92;ldots&#44;x&#95;N&#41;&#10;&#92;&#44;dx&#95;2&#92;cdots dx&#95;N&#46;&#125;&#92;tag&#123;6&#125;">&#92;boxed&#123;&#92;gamma&#40;x&#44;x&#39;&#41;&#61;N&#92;int&#10;&#92;Psi&#40;x&#44;x&#95;2&#44;&#92;ldots&#44;x&#95;N&#41;&#10;&#92;Psi&#94;&#42;&#40;x&#39;&#44;x&#95;2&#44;&#92;ldots&#44;x&#95;N&#41;&#10;&#92;&#44;dx&#95;2&#92;cdots dx&#95;N&#46;&#125;&#92;tag&#123;6&#125;</div>

This operation is called a *partial trace*. Notice what is integrated out: the same coordinates <span class="note-math-inline" data-tex="x&#95;2&#44;&#92;ldots&#44;x&#95;N">x&#95;2&#44;&#92;ldots&#44;x&#95;N</span> appear on both sides of the product, while <span class="note-math-inline" data-tex="x">x</span> and <span class="note-math-inline" data-tex="x&#39;">x&#39;</span> remain independent. They are two arguments of a one-particle operator, not the positions of two different electrons.

Setting the two arguments equal gives the diagonal part of the 1-RDM. Summing over spin recovers the electron density:

<div class="note-math-display" data-tex="&#92;boxed&#123;n&#40;&#92;mathbf r&#41;&#61;&#92;sum&#95;s&#92;gamma&#40;&#40;&#92;mathbf r&#44;s&#41;&#44;&#40;&#92;mathbf r&#44;s&#41;&#41;&#46;&#125;&#92;tag&#123;7&#125;">&#92;boxed&#123;n&#40;&#92;mathbf r&#41;&#61;&#92;sum&#95;s&#92;gamma&#40;&#40;&#92;mathbf r&#44;s&#41;&#44;&#40;&#92;mathbf r&#44;s&#41;&#41;&#46;&#125;&#92;tag&#123;7&#125;</div>

The ordinary density is therefore the spin-summed position-space diagonal of the 1-RDM. Its off-diagonal kernel retains information about spatial coherence that is not visible in that diagonal alone.

### What the off-diagonal elements tell us

For our one-electron, two-site model, <span class="note-math-inline" data-tex="&#92;hat&#92;gamma&#61;&#92;hat&#92;rho">&#92;hat&#92;gamma&#61;&#92;hat&#92;rho</span>, and the two states have density matrices

<div class="note-math-display" data-tex="&#92;gamma&#95;&#43;&#61;&#92;frac12&#92;begin&#123;pmatrix&#125;1&#38;1&#92;&#92;1&#38;1&#92;end&#123;pmatrix&#125;&#44;&#92;qquad&#10;&#92;gamma&#95;&#45;&#61;&#92;frac12&#92;begin&#123;pmatrix&#125;1&#38;&#45;1&#92;&#92;&#45;1&#38;1&#92;end&#123;pmatrix&#125;&#46;">&#92;gamma&#95;&#43;&#61;&#92;frac12&#92;begin&#123;pmatrix&#125;1&#38;1&#92;&#92;1&#38;1&#92;end&#123;pmatrix&#125;&#44;&#92;qquad&#10;&#92;gamma&#95;&#45;&#61;&#92;frac12&#92;begin&#123;pmatrix&#125;1&#38;&#45;1&#92;&#92;&#45;1&#38;1&#92;end&#123;pmatrix&#125;&#46;</div>

The two diagonals are identical: both states have site occupations <span class="note-math-inline" data-tex="&#40;1&#47;2&#44;1&#47;2&#41;">&#40;1&#47;2&#44;1&#47;2&#41;</span>. The off-diagonal entries distinguish the relative phase. Because <span class="note-math-inline" data-tex="H&#95;&#123;AB&#125;&#61;H&#95;&#123;BA&#125;&#61;&#45;t">H&#95;&#123;AB&#125;&#61;H&#95;&#123;BA&#125;&#61;&#45;t</span>, the energy is sensitive to exactly this information:

<div class="note-math-display" data-tex="&#92;begin&#123;aligned&#125;&#10;&#92;langle H&#92;rangle&#38;&#61;&#92;operatorname&#123;Tr&#125;&#40;&#92;gamma H&#41;&#92;&#92;&#10;&#38;&#61;&#45;t&#40;&#92;gamma&#95;&#123;AB&#125;&#43;&#92;gamma&#95;&#123;BA&#125;&#41;&#92;&#92;&#10;&#38;&#61;&#92;begin&#123;cases&#125;&#45;t&#44;&#38;&#92;gamma&#61;&#92;gamma&#95;&#43;&#44;&#92;&#92;&#43;t&#44;&#38;&#92;gamma&#61;&#92;gamma&#95;&#45; &#46;&#92;end&#123;cases&#125;&#10;&#92;end&#123;aligned&#125;">&#92;begin&#123;aligned&#125;&#10;&#92;langle H&#92;rangle&#38;&#61;&#92;operatorname&#123;Tr&#125;&#40;&#92;gamma H&#41;&#92;&#92;&#10;&#38;&#61;&#45;t&#40;&#92;gamma&#95;&#123;AB&#125;&#43;&#92;gamma&#95;&#123;BA&#125;&#41;&#92;&#92;&#10;&#38;&#61;&#92;begin&#123;cases&#125;&#45;t&#44;&#38;&#92;gamma&#61;&#92;gamma&#95;&#43;&#44;&#92;&#92;&#43;t&#44;&#38;&#92;gamma&#61;&#92;gamma&#95;&#45; &#46;&#92;end&#123;cases&#125;&#10;&#92;end&#123;aligned&#125;</div>

Here <span class="note-math-inline" data-tex="&#92;gamma&#95;&#123;AB&#125;&#61;&#92;langle A&#124;&#92;hat&#92;gamma&#124;B&#92;rangle">&#92;gamma&#95;&#123;AB&#125;&#61;&#92;langle A&#124;&#92;hat&#92;gamma&#124;B&#92;rangle</span>. The result shows how electronic coherence affects energy even when the site occupations are unchanged. These are diagonals in a localized orbital basis, not necessarily equal continuous position densities for actual overlapping atomic orbitals.

### Natural orbitals and occupations

The 1-RDM is Hermitian and positive semidefinite, with <span class="note-math-inline" data-tex="&#92;operatorname&#123;Tr&#125;&#40;&#92;hat&#92;gamma&#41;&#61;N">&#92;operatorname&#123;Tr&#125;&#40;&#92;hat&#92;gamma&#41;&#61;N</span>. It can consequently be diagonalized. Its normalized eigenfunctions <span class="note-math-inline" data-tex="&#92;varphi&#95;k&#40;x&#41;">&#92;varphi&#95;k&#40;x&#41;</span> are called *natural spin orbitals*, and its eigenvalues <span class="note-math-inline" data-tex="f&#95;k">f&#95;k</span> are *natural occupation numbers*:

<div class="note-math-display" data-tex="&#92;hat&#92;gamma&#124;&#92;varphi&#95;k&#92;rangle&#61;f&#95;k&#124;&#92;varphi&#95;k&#92;rangle&#44;&#10;&#92;qquad&#10;&#92;gamma&#40;x&#44;x&#39;&#41;&#61;&#92;sum&#95;k f&#95;k&#92;varphi&#95;k&#40;x&#41;&#92;varphi&#95;k&#94;&#42;&#40;x&#39;&#41;&#46;">&#92;hat&#92;gamma&#124;&#92;varphi&#95;k&#92;rangle&#61;f&#95;k&#124;&#92;varphi&#95;k&#92;rangle&#44;&#10;&#92;qquad&#10;&#92;gamma&#40;x&#44;x&#39;&#41;&#61;&#92;sum&#95;k f&#95;k&#92;varphi&#95;k&#40;x&#41;&#92;varphi&#95;k&#94;&#42;&#40;x&#39;&#41;&#46;</div>

For fermionic spin orbitals, <span class="note-math-inline" data-tex="0&#92;le f&#95;k&#92;le1">0&#92;le f&#95;k&#92;le1</span> and <span class="note-math-inline" data-tex="&#92;sum&#95;kf&#95;k&#61;N">&#92;sum&#95;kf&#95;k&#61;N</span>. For spin-summed spatial natural orbitals the corresponding upper bound is two. Natural orbitals need not diagonalize the Hamiltonian; they diagonalize the one-particle density operator of the particular many-electron state.

For a single Slater determinant, the occupied spin orbitals have occupation one and the unoccupied ones have occupation zero, so <span class="note-math-inline" data-tex="&#92;gamma&#94;2&#61;&#92;gamma">&#92;gamma&#94;2&#61;&#92;gamma</span>. A correlated pure state generally has fractional natural occupations. These occupations provide a compact indication of departures from a single-determinant description.

### Calculating one-electron observables

The importance of the 1-RDM goes beyond visualization. Consider an observable that is a sum of identical one-electron operators, <span class="note-math-inline" data-tex="&#92;hat A&#61;&#92;sum&#95;i&#92;hat a&#40;i&#41;">&#92;hat A&#61;&#92;sum&#95;i&#92;hat a&#40;i&#41;</span>, where <span class="note-math-inline" data-tex="&#92;hat a&#40;i&#41;">&#92;hat a&#40;i&#41;</span> acts on electron <span class="note-math-inline" data-tex="i">i</span>. Permutation symmetry makes each term's expectation equal, and tracing over the other electrons gives

<div class="note-math-display" data-tex="&#92;boxed&#123;&#92;langle&#92;hat A&#92;rangle&#61;&#92;operatorname&#123;Tr&#125;&#40;&#92;hat&#92;gamma&#92;hat a&#41;&#46;&#125;&#92;tag&#123;8&#125;">&#92;boxed&#123;&#92;langle&#92;hat A&#92;rangle&#61;&#92;operatorname&#123;Tr&#125;&#40;&#92;hat&#92;gamma&#92;hat a&#41;&#46;&#125;&#92;tag&#123;8&#125;</div>

This relation holds for local and nonlocal one-electron operators alike. In particular, the electron kinetic energy depends on derivatives of the 1-RDM near its diagonal:

<div class="note-math-display" data-tex="T&#95;e&#61;&#45;&#92;frac12&#92;sum&#95;s&#92;int&#10;&#92;left&#91;&#92;nabla&#95;&#123;&#92;mathbf r&#125;&#94;2&#92;gamma&#40;&#40;&#92;mathbf r&#44;s&#41;&#44;&#40;&#92;mathbf r&#39;&#44;s&#41;&#41;&#92;right&#93;&#95;&#123;&#92;mathbf r&#39;&#61;&#92;mathbf r&#125;&#10;&#92;&#44;d&#94;3&#92;mathbf r&#46;">T&#95;e&#61;&#45;&#92;frac12&#92;sum&#95;s&#92;int&#10;&#92;left&#91;&#92;nabla&#95;&#123;&#92;mathbf r&#125;&#94;2&#92;gamma&#40;&#40;&#92;mathbf r&#44;s&#41;&#44;&#40;&#92;mathbf r&#39;&#44;s&#41;&#41;&#92;right&#93;&#95;&#123;&#92;mathbf r&#39;&#61;&#92;mathbf r&#125;&#10;&#92;&#44;d&#94;3&#92;mathbf r&#46;</div>

The derivative acts on the first spatial argument before the two coordinates are set equal. The electron–nucleus attraction, by contrast, requires only the diagonal density:

<div class="note-math-display" data-tex="V&#95;&#123;en&#125;&#61;&#45;&#92;sum&#95;A Z&#95;A&#92;int&#92;frac&#123;n&#40;&#92;mathbf r&#41;&#125;&#123;&#124;&#92;mathbf r&#45;&#92;mathbf R&#95;A&#124;&#125;&#92;&#44;d&#94;3&#92;mathbf r&#46;">V&#95;&#123;en&#125;&#61;&#45;&#92;sum&#95;A Z&#95;A&#92;int&#92;frac&#123;n&#40;&#92;mathbf r&#41;&#125;&#123;&#124;&#92;mathbf r&#45;&#92;mathbf R&#95;A&#124;&#125;&#92;&#44;d&#94;3&#92;mathbf r&#46;</div>

Thus the 1-RDM is sufficient for all one-electron expectation values. It is not, in general, sufficient for arbitrary two-electron observables.

## 8. Beyond one electron: pair density and the 2-RDM

The 1-RDM answers questions about one-electron behavior. It does not generally tell us how the positions and spins of two electrons are jointly distributed. The two-particle reduced density matrix (2-RDM) retains that information and more.

Using a normalization that counts ordered electron pairs, its kernel is

<div class="note-math-display" data-tex="&#92;Gamma&#40;x&#95;1&#44;x&#95;2&#59;x&#39;&#95;1&#44;x&#39;&#95;2&#41;&#61;N&#40;N&#45;1&#41;&#92;int&#10;&#92;Psi&#40;x&#95;1&#44;x&#95;2&#44;X&#41;&#92;Psi&#94;&#42;&#40;x&#39;&#95;1&#44;x&#39;&#95;2&#44;X&#41;&#92;&#44;dX&#44;">&#92;Gamma&#40;x&#95;1&#44;x&#95;2&#59;x&#39;&#95;1&#44;x&#39;&#95;2&#41;&#61;N&#40;N&#45;1&#41;&#92;int&#10;&#92;Psi&#40;x&#95;1&#44;x&#95;2&#44;X&#41;&#92;Psi&#94;&#42;&#40;x&#39;&#95;1&#44;x&#39;&#95;2&#44;X&#41;&#92;&#44;dX&#44;</div>

where <span class="note-math-inline" data-tex="X&#61;&#40;x&#95;3&#44;&#92;ldots&#44;x&#95;N&#41;">X&#61;&#40;x&#95;3&#44;&#92;ldots&#44;x&#95;N&#41;</span> denotes the remaining electron coordinates. Its trace is <span class="note-math-inline" data-tex="N&#40;N&#45;1&#41;">N&#40;N&#45;1&#41;</span>. The spin-summed diagonal gives the pair density

<div class="note-math-display" data-tex="n&#95;2&#40;&#92;mathbf r&#44;&#92;mathbf r&#39;&#41;&#61;&#92;sum&#95;&#123;s&#44;s&#39;&#125;&#92;Gamma&#40;&#40;&#92;mathbf r&#44;s&#41;&#44;&#40;&#92;mathbf r&#39;&#44;s&#39;&#41;&#59;&#40;&#92;mathbf r&#44;s&#41;&#44;&#40;&#92;mathbf r&#39;&#44;s&#39;&#41;&#41;&#46;">n&#95;2&#40;&#92;mathbf r&#44;&#92;mathbf r&#39;&#41;&#61;&#92;sum&#95;&#123;s&#44;s&#39;&#125;&#92;Gamma&#40;&#40;&#92;mathbf r&#44;s&#41;&#44;&#40;&#92;mathbf r&#39;&#44;s&#39;&#41;&#59;&#40;&#92;mathbf r&#44;s&#41;&#44;&#40;&#92;mathbf r&#39;&#44;s&#39;&#41;&#41;&#46;</div>

Unlike the two arguments of <span class="note-math-inline" data-tex="&#92;gamma">&#92;gamma</span>, the two position arguments of <span class="note-math-inline" data-tex="n&#95;2">n&#95;2</span> refer to two distinct electrons. The pair density measures their joint spatial distribution and generally cannot be obtained simply by multiplying the one-electron densities. It reflects exchange and correlation as well as electrostatic repulsion.

In particular, the electron–electron interaction energy is

<div class="note-math-display" data-tex="V&#95;&#123;ee&#125;&#61;&#92;frac12&#92;iint&#92;frac&#123;n&#95;2&#40;&#92;mathbf r&#44;&#92;mathbf r&#39;&#41;&#125;&#123;&#124;&#92;mathbf r&#45;&#92;mathbf r&#39;&#124;&#125;&#10;&#92;&#44;d&#94;3&#92;mathbf r&#92;&#44;d&#94;3&#92;mathbf r&#39;&#46;">V&#95;&#123;ee&#125;&#61;&#92;frac12&#92;iint&#92;frac&#123;n&#95;2&#40;&#92;mathbf r&#44;&#92;mathbf r&#39;&#41;&#125;&#123;&#124;&#92;mathbf r&#45;&#92;mathbf r&#39;&#124;&#125;&#10;&#92;&#44;d&#94;3&#92;mathbf r&#92;&#44;d&#94;3&#92;mathbf r&#39;&#46;</div>

The factor <span class="note-math-inline" data-tex="1&#47;2">1&#47;2</span> converts the ordered-pair count into the unordered pairs in Eq. (2). In the nonrelativistic Coulomb model, at fixed nuclear geometry, this gives a useful exact decomposition of the potential energy:

<div class="note-math-display" data-tex="&#92;boxed&#123;U&#40;&#92;mathbf R&#41;&#61;T&#95;e&#91;&#92;gamma&#93;&#43;V&#95;&#123;en&#125;&#91;n&#59;&#92;mathbf R&#93;&#43;V&#95;&#123;ee&#125;&#91;n&#95;2&#93;&#43;V&#95;&#123;nn&#125;&#40;&#92;mathbf R&#41;&#46;&#125;&#92;tag&#123;9&#125;">&#92;boxed&#123;U&#40;&#92;mathbf R&#41;&#61;T&#95;e&#91;&#92;gamma&#93;&#43;V&#95;&#123;en&#125;&#91;n&#59;&#92;mathbf R&#93;&#43;V&#95;&#123;ee&#125;&#91;n&#95;2&#93;&#43;V&#95;&#123;nn&#125;&#40;&#92;mathbf R&#41;&#46;&#125;&#92;tag&#123;9&#125;</div>

This equation exposes the structure of the problem. The electronic kinetic energy is accessible from the 1-RDM, the electron–nucleus energy from the electron density, the electron–electron energy from the pair density, and the nuclear repulsion from the nuclear coordinates. We have not introduced a separate energy term for a chemical bond. Instead, bonding must emerge from the balance of these contributions.

There is an important subtlety. In general, reducing a quantum state to a density loses information. Yet the Hohenberg–Kohn theorem establishes that, under its ground-state assumptions, the exact electron density determines the external scalar potential up to a constant, and thus determines the nondegenerate ground state. The two claims are compatible because the theorem restricts the admissible states to a special class. It also does not supply an explicit, computationally tractable functional for every property. This distinction is central to density functional theory, which deserves a separate discussion.

## 9. A hierarchy of molecular representations

We can now organize the objects introduced in this article by their roles, rather than by their historical origins.

| Object | Mathematical form | What it describes |
|---|---|---|
| Hamiltonian | <span class="note-math-inline" data-tex="&#92;hat H">&#92;hat H</span> | Physical interactions and energy; generates time evolution |
| Many-electron state | <span class="note-math-inline" data-tex="&#92;Psi&#40;x&#95;1&#44;&#92;ldots&#44;x&#95;N&#41;">&#92;Psi&#40;x&#95;1&#44;&#92;ldots&#44;x&#95;N&#41;</span> | Joint quantum amplitudes of all electrons |
| Orbital | <span class="note-math-inline" data-tex="&#92;varphi&#40;x&#41;">&#92;varphi&#40;x&#41;</span> | A one-electron function used to represent electronic structure |
| Electron density | <span class="note-math-inline" data-tex="n&#40;&#92;mathbf r&#41;">n&#40;&#92;mathbf r&#41;</span> | Expected electron number per unit volume |
| 1-RDM | <span class="note-math-inline" data-tex="&#92;gamma&#40;x&#44;x&#39;&#41;">&#92;gamma&#40;x&#44;x&#39;&#41;</span> | All one-electron expectation values and coherence |
| 2-RDM | <span class="note-math-inline" data-tex="&#92;Gamma&#40;x&#95;1&#44;x&#95;2&#59;x&#39;&#95;1&#44;x&#39;&#95;2&#41;">&#92;Gamma&#40;x&#95;1&#44;x&#95;2&#59;x&#39;&#95;1&#44;x&#39;&#95;2&#41;</span> | All two-electron expectation values and correlations |

The Hamiltonian governs the state; the wavefunction describes it; orbitals provide a useful one-particle representation; reduced density matrices extract information needed to calculate observables without explicitly retaining all many-electron coordinates. Each representation has a purpose, and each reduction has limits.

The same hierarchy suggests a way to think about chemical reactivity. If an enzyme changes the electrostatic potential surrounding a substrate, it changes the substrate's electronic Hamiltonian. The electronic eigenstates and reduced densities may then change. These changes can alter the potential energy surface and the forces acting on nuclei, potentially favoring one reaction pathway over another.

The next step is to make that chain quantitative. How does a spatially varying potential perturb an electronic state? Which components of its electronic structure determine the response? And how does a change in electron density translate into a change in nuclear forces? Answering these questions will lead us to perturbation theory, the Lehmann representation of electronic response, and the Hellmann–Feynman theorem.

## Further reading

- D. J. Griffiths and D. F. Schroeter, *Introduction to Quantum Mechanics*, 3rd ed. Cambridge University Press, 2018. For states, operators, interference, and the Schrödinger equation.
- A. Szabo and N. S. Ostlund, *Modern Quantum Chemistry: Introduction to Advanced Electronic Structure Theory*. Dover, 1996. For molecular Hamiltonians, Slater determinants, orbital methods, and density matrices.
- [TU Delft, Introduction to Quantum Mechanics: Beyond hydrogen — the electronic structure of atoms, molecules, and solids](https://interactivetextbooks.tudelft.nl/introduction-to-quantum-mechanics/content/variationalprinciple.html). An accessible derivation of the molecular hydrogen ion and the LCAO approximation.
- [Physical Chemistry II: Quantum Chemistry and Spectroscopy — The Born–Oppenheimer approximation](https://www.physchem.no/physchem_book/chapters-17-born-oppenheimer.html). For the relationship between clamped-nuclei electronic energies and molecular potential energy surfaces.
- [Correlation energy from random phase approximations: A reduced density matrices perspective](https://doi.org/10.1002/qua.25462). Section 2 gives standard definitions of the electronic 1-RDM, 2-RDM, natural orbitals, and pair density.
- P. Hohenberg and W. Kohn, [Inhomogeneous Electron Gas](https://doi.org/10.1103/PhysRev.136.B864), *Physical Review* **136**, B864–B871 (1964). The foundational ground-state density-functional theorem.
