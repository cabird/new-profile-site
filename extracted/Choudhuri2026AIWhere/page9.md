Table 5: Logistic Generalized Linear Mixed-effects Models (GLMMs) predicting baseline odds and odds ratios (ORs) of Responsible AI design priorities by task category, developer experience, and AI dispositions. Experience and disposition predictors are mean-centered. The constant (baseline) reflects the odds of a developer performing development-heavy tasks with average SE experience, AI experience, risk tolerance, and technophilic motivations. Odds ratios are relative to the baseline odds; priorities differ from baseline only if statistically significant.

![Logistic GLMMs table showing odds ratios by factor and dependent variable](page9_img_1.png)

Rm2/Rc2 0.06/0.32  0.03/0.31  0.05/0.29  0.07/0.31  0.04/0.37  0.04/0.43  0.07/0.44  0.03/0.43

Note: p-values are adjusted for False Discovery Rate (FDR), using Benjamini-Hochberg [86]. Blank cells indicate odds equal to the baseline. * p < .05; ** p < .01; *** p < .001.

and stakeholder communications: "If AI updates documentation, it must ensure inclusiveness and fairness so content works for all customers" (P120); "It is key that AI is bias/prejudice free to maintain stakeholder relationships" (P195).

Other priorities were consistent with the baseline (e.g., Transparency for learning/research, Privacy for sensitive communications, Steerability, and AI Accountability for system design). In design/planning, however, participants downweighted Reliability when AI served as an ideation scaffold (OR = 0.49), and prioritized Goal Maintenance (OR = 1.45). When AI scaffolds creativity, adaptability can outweigh strict determinism: "Creativity of AI is important; I’m willing to tolerate errors" (P180). Participants valued AI’s ability to surface options that spark innovation (even if imperfect), provided it stayed aligned with (evolving) objectives: "During planning, goals frequently change, so AI needs to keep up with that evolution. I’d also expect AI to bring in much more outside perspectives to synthesize a range of feedback" (P459).

> Takeaway: In systems-facing work, Reliability and Privacy are central; next come Transparency, Goal Maintenance, Steerability, and AI Accountability. In design and human-facing tasks, Fairness and Inclusiveness are elevated. Developers relax Reliability for creative scaffolding and emphasize Goal Maintenance as needs evolve. Net: Get safety/security right; keep AI explainable, aligned, steerable, and accountable, & make outputs fair and inclusive.

### 5.3.2 How do priorities vary by experience/AI dispositions?

Across individual differences, Steerability rose in priority with higher SE experience (OR = 1.21), AI experience (OR = 1.11), risk tolerance (OR = 1.13), and technophilia (OR = 1.28). Viewed through Self-Determination Theory [28, 75], this pattern reflects protection of autonomy and competence: experienced developers favored control that keeps AI actions interruptible and easy to correct, citing course-correction overheads—"Sometimes it spirals off... backtracking is harder than starting over" (P657). Risk-tolerant individuals treated steerability as a safeguard for rapid intervention. Participants also resisted modes (e.g., bulked edits) that could erode competence over time: "Multi-file edit modes feel to take away steerability... Yes, the developer gets the final say, but I’ve noticed it harms the engineer’s skills over the long term more than it helps" (P754).

Experienced SEs prioritized Reliability & Safety (OR = 1.15), consistent with a sharper sense of downstream "automation surprises" [67]. Those with more AI experience prioritized Transparency (OR = 1.30), as familiarity with AI’s quirks heightened demands for visible reasoning and provenance to "debug and justify outputs even when they looked plausible" (P367).

Technophilic individuals prioritized Goal Maintenance (OR = 1.16). As recent work notes [20], their intrinsic drive to explore AI tooling collides with current frictions (prompt churn, drift, and limited affordances), raising the cognitive cost of exploration. Consistent with this pattern, psychological research shows that systems which preserve user intent and minimize orchestration overheads sustain intrinsic engagement [28, 89].

> Takeaway: Individual traits shape RAI priorities: SE experience heightens demands for Reliability & Safety, AI experience for Transparency, and technophilia for Goal Maintenance. SE/AI experience, risk tolerance, and technophilia all amplify emphasis on Steerability, reflecting a strong need for agency.

## 6 Discussion

Our results capture a snapshot of a historic inflection point. Findings may shift as tools evolve, yet both current patterns and their theoretical grounding remain informative. Task forms and positions on our map will change as capabilities grow, but deeper structures from appraisal theory (e.g., enduring needs in quality, coding, documentation, coordination, and people work) are likely to persist. Our mixed-method, clustering-based lens is designed for reuse as the landscape evolves, enabling teams to relocate tasks rather than freeze them in time. Current frictions in reliability, security, and transparency highlight where to invest next, especially in the "outer loop" (e.g., testing, review/release, governance).

### 6.1 Implications for practice

A key implication is to favor augmentation over blunt automation. Developers prefer AI that amplifies creativity and complexity, not just removes toil, consistent with evidence linking meaningful work to growth and contribution rather than extrinsic rewards [57]. The "human / AI / human+AI" framing [65] applies: some activities remain human-led, some AI-led, and many are best as human+AI. Our map shows where each mode fits today and where to invest to enhance meaning rather than hollow it out.

Developers want AI as a cognitive collaborator; helping decom-