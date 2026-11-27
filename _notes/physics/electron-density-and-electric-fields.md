---
title: "Electron Density and Electric Fields"
category: Physics
date: 2026-11-27
tags: [Electrostatics, Quantum Mechanics, Electronic Structure]
summary: "How an electric field perturbs the electronic Hamiltonian, redistributes electron density, and changes molecular energetics."
---

## What is electron density?

The electron number density $$n(\mathbf r)$$ describes the expected number of electrons per unit volume. For a normalized many-electron wavefunction (with spin summed over),

$$
n(\mathbf r) = N \sum_{\sigma_1,\ldots,\sigma_N}\int |\Psi(\mathbf r,\sigma_1,\mathbf r_2,\sigma_2,\ldots,\mathbf r_N,\sigma_N)|^2\,d\mathbf r_2\cdots d\mathbf r_N.
$$

Its integral is the electron number $$N$$. The corresponding electronic charge density is $$\rho_e(\mathbf r)=-en(\mathbf r)$$, where $$e>0$$ is the elementary charge.

## Electrostatic potential and field

The electric field is the negative gradient of the electrostatic potential:

$$
\mathbf E(\mathbf r)=-\nabla\phi(\mathbf r).
$$

In vacuum, the total charge density and potential satisfy Poisson's equation,

$$
\nabla^2\phi(\mathbf r)=-\frac{\rho_{\mathrm{total}}(\mathbf r)}{\varepsilon_0}.
$$

Here the total charge density includes nuclei, electrons, and any other explicit charges. Boundary conditions matter: the charge distribution alone does not specify the potential without them.

## How an external field changes electron density

For electrons of charge $$-e$$ in a prescribed external potential, the electronic Hamiltonian changes by

$$
\Delta\hat H=-e\sum_{i=1}^{N}\phi_{\mathrm{ext}}(\mathbf r_i).
$$

For a uniform electric field, $$\phi_{\mathrm{ext}}(\mathbf r)=-\mathbf E\cdot\mathbf r+C$$. Up to a constant at fixed electron number,

$$
\Delta\hat H=e\mathbf E\cdot\sum_i\mathbf r_i.
$$

The field therefore changes the potential energy of electrons at different spatial positions. The ground state of the perturbed Hamiltonian generally differs from the original ground state; its electron density changes as a consequence.

### First-order response

For a nondegenerate ground state and a sufficiently weak static perturbation, ordinary time-independent perturbation theory gives

$$
|\delta 0\rangle = \sum_{m\ne 0}|m\rangle
\frac{\langle m|\Delta\hat H|0\rangle}{E_0-E_m}.
$$

Writing the electron number-density operator as $$\hat n(\mathbf r)=\sum_i\delta(\mathbf r-\mathbf r_i)$$,

$$
\delta n(\mathbf r)=2\operatorname{Re}\langle 0|\hat n(\mathbf r)|\delta 0\rangle.
$$

A small energy gap or a large coupling matrix element can enhance response; neither alone guarantees that the response is localized where a chemical transformation needs it. Strong fields and near-degeneracies can invalidate first-order perturbation theory.

### Nonlocal response

The linear static density response to a perturbation in the one-electron potential energy is

$$
\delta n(\mathbf r)=\int \chi(\mathbf r,\mathbf r')\,\delta v_{\mathrm{ext}}(\mathbf r')\,d\mathbf r'.
$$

The susceptibility $$\chi$$ is a nonlocal response kernel. A perturbation in one region can redistribute density elsewhere. At fixed electron number, the integral of the density change is zero.

## Molecular energetics

For a molecule in a weak, approximately uniform field and a specified nuclear geometry, the energy expansion is

$$
U(\mathbf E)=U(0)-\boldsymbol\mu_0\cdot\mathbf E
-\frac{1}{2}\mathbf E^{\mathsf T}\boldsymbol\alpha\mathbf E+\cdots,
$$

where $$\boldsymbol\mu_0$$ is the permanent dipole and $$\boldsymbol\alpha$$ is the static polarizability tensor, with the appropriate convention for the molecular energy. For a reaction, the difference in field-induced stabilization between the transition state and reactant—not the stabilization of either alone—contributes to the barrier change.

## Why the distinction matters

An electric field is not an electron-density map. It is a vector field derived from a potential; the density is a quantum expectation value that responds to that potential and to the electronic structure of the molecule. In a molecular environment, electronic polarization, nuclear geometry, solvent, and the external charge distribution can be coupled. Predicting a reaction from an electric field alone is generally insufficient.

## References and further reading

- D. J. Griffiths, *Introduction to Electrodynamics* — electrostatic potential and Poisson's equation.
- J. J. Sakurai and J. Napolitano, *Modern Quantum Mechanics* — time-independent perturbation theory.
- R. M. Martin, *Electronic Structure: Basic Theory and Practical Methods* — electron density and electronic response.

*Personal study note, prepared with AI assistance; not a peer-reviewed research article.*
