---
title: "Descriptive title"
category: Physics
date: YYYY-MM-DD
tags: [Tag One, Tag Two]
summary: "One or two sentences describing the note."
---

## Motivation

Explain the question and why it matters.

## Foundations

Define symbols and assumptions. Use standard Markdown math: inline $E=mc^2$, or a separate display block. The prepare_note.py publishing step protects the TeX before Jekyll parses the document:

$$
\mathbf E=-\nabla\phi.
$$

Emphasize important formulas with color only, e.g.:

$
\textcolor{#306c53}{\mathbf E=-\nabla\phi.}
$

Do not use \boxed for emphasis. The publishing preprocessor automatically
converts boxed mathematics in supplied articles to this color-only style.

## Derivation

Show intermediate steps. Distinguish exact identities, approximations, and hypotheses.

## Physical intuition and limitations

Explain what the equations mean, when they apply, and common misconceptions.

## References and further reading

Cite verified sources. Do not publish private research, unpublished data, or identifying personal information.
