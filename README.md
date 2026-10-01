# Proofline

The test-and-trust layer for AI robot brains. Proofline tests a robot's AI before it goes on the production line, and stops it the moment it starts to fail.

A student startup from the University of Cincinnati, built in Cincinnati for StartupCincy Week.

## What it does

- **Test** — stress-tests a robot policy across lighting, object position, clutter, and reworded instructions, and reports a success rate with a confidence interval.
- **Guard** — watches the policy at runtime and can slow the robot, stop it, or hand control back before a visible failure.
- **Prove** — exports a Deployment Readiness Report a plant can file with its risk assessment.

Proofline does not train robot foundation models, and it does not replace certified safety hardware. It covers the learned behavior that hardware cannot see.

## This repository

The landing page is plain HTML, CSS, and a small JavaScript file. There is no build step.

Open `index.html` in a browser, or publish with GitHub Pages: **Settings → Pages → Deploy from a branch → `main` → `/ (root)`**. The site is at [napandyh.github.io/Proofline](https://napandyh.github.io/Proofline/).

## Contact

Yogesh Napanda · Mechanical Engineering, University of Cincinnati

[napandyh@mail.uc.edu](mailto:napandyh@mail.uc.edu) · [LinkedIn](https://www.linkedin.com/in/napandayogesh/) · [GitHub](https://github.com/napandyh)
