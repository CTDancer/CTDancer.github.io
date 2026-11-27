---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% assign latest_resume = site.static_files | where: "path", "/files/Tong_Chen_Resume.pdf" | first %}
{% if latest_resume %}
<script>window.location.replace({{ latest_resume.path | relative_url | jsonify }});</script>
<p><a href="{{ latest_resume.path | relative_url }}">Open resume (PDF)</a></p>
{% else %}
<div class="cv-print"><button type="button" id="print-cv">Print / Save as PDF</button></div>
<script defer src="{{ '/assets/js/notes.js' | relative_url }}"></script>

## Education

- **University of Pennsylvania**, Ph.D. in Computer and Information Science — September 2025–present.
- **Fudan University**, B.S. in Computer Science — September 2021–June 2025.

## Research interests

Generative modeling; multi-objective optimization; AI for biomolecular design.

## Research experience

**Chatterjee Lab, University of Pennsylvania** — Ph.D. student, advised by Prof. Pranam Chatterjee (September 2025–present).

- pCoMole: Pareto-constrained variable-length biomolecular editing with discrete flows.
- PIGEON: Pocket-inferred geometric ensemble flexible protein–ligand docking.
- PeptiVerse: Peptide property prediction, including half-life and permeability.
- AReUReDi: Multi-objective sampling with rectified discrete flows.
- LaPep: Language-guided versus predictor-constrained peptide design.

**Chatterjee Lab, Duke University** — Research intern, advised by Prof. Pranam Chatterjee (June 2024–August 2025).

- moPPIt: Motif-specific peptide binder design and binding-site prediction.
- MOG-DFM: Multi-objective-guided discrete flow matching.
- PTM-Mamba: Evaluation of PTM-aware protein language model representations.

**Qing Yuan Research Institute** — Research intern, advised by Prof. Dequan Wang and Prof. Zhijie Deng (November 2022–June 2024).

- Computational protein design, efficient in-context learning, and medical image dataset distillation.

## Publications

See the [Publications page](/publications/) for the current list of publications and workshop papers.

## Selected awards

- Spotlight, ICML 2025 GenBio Workshop (MOG-DFM), 2025.
- Honorable Mention Prize, Interdisciplinary Contest in Modeling, 2023.
- Second Prize, Academic Excellence Scholarship, Fudan University, 2022–2023.

## Technical skills

- **Programming:** Python, C/C++, Java, R, SQL, Bash, Linux, Git, LaTeX.
- **Machine learning:** PyTorch, PyTorch Lightning, Hugging Face, ESM-2, XGBoost, Optuna, Weights & Biases, Docker.
- **Web and deployment:** Gradio, Django, Vue, HTML, JavaScript, TypeScript.

*Updated November 2026.*

{% endif %}
