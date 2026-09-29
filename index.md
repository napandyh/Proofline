---
layout: default
title: Proofline
description: The test-and-trust layer for AI robot brains — built in Cincinnati.
---

<!--
HOW TO PUBLISH ON GITHUB PAGES (about 5 minutes)
1. Create a public repo, e.g. github.com/[your-handle]/proofline
2. Add this file as index.md in the repo root.
3. Add a file named _config.yml in the repo root containing these two lines:
     theme: jekyll-theme-cayman
     title: Proofline
4. (Optional) Put a dashboard screenshot at assets/demo.png and a recorded demo at assets/demo.mp4
5. Repo → Settings → Pages → "Deploy from a branch" → branch: main, folder: / (root) → Save.
   Your site appears at https://[your-handle].github.io/proofline/ within a minute or two.
Replace every [BRACKETED] placeholder before sharing. Only list things under "What we've built" that are true.
-->

# Know if a robot's AI is ready for your line — before it's on your line.

**Proofline** tests AI-driven robots with statistical confidence, catches failures *before* they happen at runtime, and gives plants a readiness report they can actually file.

[Watch the demo](#demo) · [How it works](#how-it-works) · [Talk to us](#contact)

---

## The problem

Robots are getting **foundation-model "brains"** — vision-language-action models like Hugging Face SmolVLA, Physical Intelligence π0, and NVIDIA GR00T that can be told what to do in plain language. They're impressive in demos. They're hard to trust on a factory floor.

| What the people building them report | Source |
|---|---|
| After 70 test runs of a policy at 90% success, the 95% confidence interval still spans **15.4 points** (80.5%–95.9%) | [NVIDIA](https://developer.nvidia.com/blog/how-to-evaluate-general-purpose-robot-policies-for-real-world-deployment/) |
| Real-world robot testing is "**expensive, slow, and difficult to reproduce**" | [NVIDIA](https://developer.nvidia.com/blog/how-to-evaluate-general-purpose-robot-policies-for-real-world-deployment/) |
| Physical Intelligence's team acknowledges that standardized robotics benchmarks "**don't really exist**" | [TechCrunch](https://techcrunch.com/2026/04/16/physical-intelligence-a-hot-robotics-startup-says-its-new-robot-brain-can-figure-out-tasks-it-was-never-taught/) |
| A frontier model went from **5% to 95%** success on the same task after 30 minutes of rewording the instruction | [TechCrunch](https://techcrunch.com/2026/04/16/physical-intelligence-a-hot-robotics-startup-says-its-new-robot-brain-can-figure-out-tasks-it-was-never-taught/) |
| Google's newest robot reasoning model is **57.4%** accurate at judging how far along a task is | [MarkTechPost on Gemini Robotics-ER 2](https://www.marktechpost.com/2026/07/30/google-deepmind-gemini-robotics-2-whole-body-control-dexterity-multi-robot-collaboration/) |
| The updated ISO 10218:2025 robot-safety standard doesn't yet address learned AI policies, per a 2026 analysis | [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2590123026015203) |

If the model makers can't agree on how to measure readiness, a plant engineer being asked to sign off on an AI-driven robot cell has nothing to go on.

---

## How it works

### 1. Test — before deployment
Proofline stress-tests any robot AI policy across the conditions that break it in real life: lighting, object position, clutter, and reworded instructions. You get a **success rate with a confidence interval**, not a cherry-picked video, plus clustered failure types (missed grasp, drop, timeout, collision).

### 2. Guard — at runtime
A **failure alarm** watches the policy's own internal signals and action consistency, calibrated to fire *before* a visible failure. Around it sits a hard **safety envelope** — workspace limits, speed caps, and human-separation rules — that can slow the robot, stop it, or hand control back to a person.

### 3. Prove — for sign-off
One click produces a **Deployment Readiness Report**: what was tested, how it performed with confidence bounds, where it fails, and what the runtime guard will do. It's evidence for your risk assessment, not a certification. We don't claim to replace certified safety hardware — we cover the *learned behavior* that hardware can't see.

**Model-agnostic:** SmolVLA, π0 / π0.5, GR00T, and whatever comes next.
**Hardware path:** SO-101 arm + NVIDIA Jetson today → industrial cobots with a certified safety partner next.
**Neutral and plant-side:** the model maker shouldn't grade its own homework.

---

## Demo

<!-- Replace with your real screenshot / video. -->
![Proofline dashboard](assets/demo.png)

In the prototype, an open AI policy controls a simulated SO-101 robot arm:

1. You type a task, and the policy attempts it.
2. Proofline runs 70+ perturbed trials and plots success **with a confidence band**.
3. The failure alarm fires before the drop or collision happens.
4. The safety envelope stops an unguarded failure, shown side by side.
5. You export the Deployment Readiness Report.

**Built with:** [LeRobot](https://github.com/huggingface/lerobot) · [SmolVLA](https://huggingface.co/blog/smolvla) · [MuJoCo](https://mujoco.org/) · [LIBERO](https://libero-project.github.io/) · [Rerun](https://rerun.io/) · [Streamlit](https://streamlit.io/) — plus building blocks from [awesome-robotics-libraries](https://github.com/jslee02/awesome-robotics-libraries).

[Code on GitHub](https://github.com/[your-handle]/proofline) <!-- update or remove -->

---

## Who it's for

- **Robot startups, integrators, and robots-as-a-service providers** who ship AI policies and have to prove to a customer that their robot is ready.
- **Plant engineers and safety leads** at Midwest manufacturers — consumer goods, auto suppliers, high-mix job shops — who have to approve AI-driven cells.
- **Robotics labs** that want reproducible, statistically honest evaluation of their policies.

---

## Why Cincinnati

Capital and model labs cluster in the Bay Area and Pittsburgh. **Deployment risk lands in the Midwest.** Ohio has 687,000+ manufacturing jobs and ranks third in the U.S. ([Ohio Manufacturers' Association](https://www.ohiomfg.com/our-communities/2025-in-review-manufacturing-leads-ohios-economy/)). Local companies are scaling automation, and some have been burned by it: Kroger took about $2.6B in charges when it closed three robotic fulfillment centers ([Chain Store Age](https://chainstoreage.com/kroger-pay-350-million-automation-partner-it-scales-back-robotic-warehouses)).

We don't think the Midwest needs to build the next robot brain. It needs to be able to **check one before trusting it on the line.**

---

## What we've built so far

<!-- Keep this list honest. Update it as you go. -->
- [x] Reviewed the robot-policy evaluation and runtime-safety research, and the open-model stack
- [ ] Prototype: evaluation harness with confidence intervals, failure alarm, and safety envelope on a simulated SO-101
- [ ] Customer-discovery conversations: [number] so far, with [labs / integrators / plants]
- [ ] Real SO-101 arm and Jetson running SmolVLA behind Proofline

## Roadmap

| When | Milestone |
|---|---|
| Oct 2026 | Working simulation prototype · StartupCincy Week student pitch |
| Next 90 days | Real hardware (SO-101 + Jetson) · first design partner · open benchmark results |
| 2027 | Industrial cobot integration with a certified safety partner · pilots with Midwest plants |
| Later | "Scan your cell" testing in a digital twin / world model of the customer's own workspace |

---

## FAQ

**Are you building a robot foundation model?**
No. Training frontier robot models takes hundreds of millions of dollars. We build on open models and make them testable and guardable — a layer that gets more valuable as the models get better and more common.

**Doesn't NVIDIA already do evaluation?**
NVIDIA's Isaac Lab-Arena / RoboLab gives developers free, simulation-first evaluation, and we use tools like it. Proofline is neutral, runs next to the real robot at runtime, and produces evidence the buyer controls.

**Is Proofline a safety certification?**
No. Learned monitors can't be certified today. Proofline supplies evidence for a plant's risk assessment and sits alongside certified safety hardware, not in place of it.

---

## Team

**[Your Name]** — [Major, year], University of Cincinnati. [One line on relevant skills and projects.]
<!-- **[Teammate]** — [role] -->

## Contact

We're looking for robot teams, integrators, and Midwest plants who want to test AI-driven robots before they commit to them.

📧 [your-email] · 💼 [LinkedIn URL] · 🐙 [github.com/your-handle]

<sub>Proofline is a student project in development. Statistics above are cited from public sources and link to them directly.</sub>
