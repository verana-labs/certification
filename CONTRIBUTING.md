# Contributing

## Who

Members of the Showcase and Certification Working Group of the Verana Foundation, and anyone who opens a pull request. Content decisions are taken in a working group session and recorded in its minutes.

## What goes where

- Open material (texts, diagrams, labs, reading lists): here.
- Questions, answers, rationales, grading rubrics, lab solutions: the private repository. Opening a pull request here with any of those is a breach of the Certification Policy.

## Writing rules

- Audience words: participants, accreditations, participant tree. "Permission" only when quoting a protocol message name.
- Process words: onboarding process, applicant, validator. Never "validation process".
- The wordmark is Verana with a capital V. No em-dashes in rendered copy.
- One concept per section. Every module ends with key takeaways, self-check questions (not the exam bank) and a reading list that points at docs.verana.io and the specifications.
- Facts about the protocol cite the specification section they come from. Facts about tools cite the version they were verified on.

## Module front matter

```
---
code: C1
title: Verifiable Trust fundamentals
hours: 4
assessment: exam
version: 1.0
status: published
summary: One sentence shown in the catalogue.
---
```

`status` is `outline` until the material is complete and reviewed, then `published`. `version` bumps on every change that affects the assessment.

## Checks

`node scripts/validate.mjs` must pass. It checks that every module in `program.json` has a folder with matching front matter, that every track only references known modules, and that the certificators file is well formed.
