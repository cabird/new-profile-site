pose problems, generate alternatives, capture rationale, and pivot across artifacts (code, tests, docs, issues, designs), while preserving oversight, craft, and agency. Concretely:
- Provenance and transparency: show sources, explanations, confidence, and transformations; keep decision paths inspectable; maintain traceable links among artifacts.
- Decision control: default to suggest-only flows with reversible changes, batched diffs with rationales, and explicit approval checkpoints.
- Craft-preserving design: reveal intermediate reasoning and trade-offs so developers learn, avoiding skill erosion from over-automation.

Where work depends on connection, negotiation, and recognition, developers de-prioritize AI. The right stance is peripheral support: assist with preparation (briefings, what-if scripts), reflection (summaries, action extraction), and equity (bias checks, inclusivity), while leaving human contact and credit intact. This “complement, don’t crowd out” principle mitigates AI intrusion into social labor.

Automation often shifts toil rather than eliminating it [2, 17]. Time saved can reappear in setup, oversight, or remediation. Highest returns pair automation with reliability, transparency, and alignment: strong grounding; guardrails for hallucinations or unsafe edits; test-first or co-generated tests; and integration-aware suggestions that respect CI, policy, and compliance. Human oversight remains essential as software work is inherently socio-technical and consequential.

RAI priorities vary by task-context and developer disposition; so there is no one-size “copilot”. Traits should adapt to the work:
- Task-aware personas: exploration (diversity over precision), implementation (precision, diff-awareness), review (risk-sensitivity, policy awareness), operations (traceability, rollbacks).
- User-calibrated agency: adjustable autonomy with clear affordances to ratchet delegation up or down; defaults keyed to task risk.
- Context diet and guardrails: minimal-necessary context; privacy tiers; least-privilege access; bias and security checks on by default.

In practice, ship for augmentation (human-gated control) in Core Work, treat Ops & Coordination as a reliability/traceability problem first, and keep People & AI-Building human-led with AI in a peripheral, assistive role.

Teams can use the map to shift time from low-signal toil to higher-order knowledge and people work, creating room for learning and designing ceremonies that preserve recognition (e.g., crediting rationales and reviews). Leaders should track experience outcomes (flow, satisfaction, confidence) alongside throughput and invest in intentional “moments that matter” to maintain cohesion in an era of AI-accelerated solo work. AI may free time for complex, creative problem-solving and human-facing coordination, but this shift is not automatic; it requires intentional job crafting (redesigning roles, rituals, recognition) so higher-order work is visible/rewarded; and support for horizontal skill expansion (product sense, data/AI literacy, operations). Open questions remain: Does AI truly create time for meaningful human work, or mainly boost throughput? Which job-crafting moves best preserve meaningful work? Under what conditions?

## 6.2 Implications for research

As assistants grow more agentic, three priorities emerge:
1. Transparency & observability. What forms of evidence (e.g., decision logs, artifact lineage, rationales) improve oversight without inducing overreliance [13]? Needed: validated measures of “useful transparency” and experiments on trust calibration/error detection.
2. Goal maintenance. How should evolving goals and constraints be represented so agents detect and prevent drift across artifacts/sessions? Needed: shared human- & AI-legible goal schemas; drift benchmarks; causal tests of guardrails (pre-commit checks, test-first prompts) on quality, latency, and friction.
3. Steerability & developer agency. Which interrupt/redirect mechanisms and delegation policies best balance control under varying risk? Needed: task-typed autonomy ladders/taxonomies (interrupt, revise, rollback); evaluations tying agency to outcome quality.

Because tasks and tools will keep evolving, we present our approach (cognitive appraisal + mixed methods + clustering) as a living instrument. Periodic re-runs (every 6–12 months) can relocate tasks, recalibrate RAI priorities, and test whether improvements in transparency, goal maintenance, and steerability measurably shift developer experience and outcomes.

## 6.3 Limitations

Construct validity. We measured constructs using self-reported items grounded in established theory. Still, surveys can introduce bias or misunderstanding. We mitigated risk by involving practitioners, sandboxing and piloting, randomizing blocks, adding attention checks, and screening patterned responses. To limit burden, we used one item per construct, consistent with evidence that single-item measures remain valid for well-scoped behavioral constructs [61].

Internal validity. As a cross-sectional study [79], we report associations, not causation. Self-selection bias is possible, since those with stronger views may be more likely to respond. We strengthened validity by triangulating quantitative results with coded qualitative data, reaching team consensus, aligning with theory, and using member checking. As with all survey-based work, results reflect self-reported perceptions. For RAI prioritization, we combined quantitative and qualitative evidence to assess how principles were valued across contexts and groups. Interpret these results with care, since a normative “ought” does not follow from an empirical “is” [66]. That is, a principle is not more or less important simply because respondents (de)prioritized it. Our goal is to inform context-sensitive RAI choices in SE tooling and to offer critical reflections, not to prescribe one course of action. Following prior recommendations [29], we do not report frequencies or percentages for qualitative findings.

External validity. We studied Microsoft developers across global sites, diverse teams and roles, many domains, varied processes, and stakeholder contexts. This scope supports industry relevance but may not generalize to smaller organizations or open source communities. We do not claim to represent all software engineers. Instead, we provide an in-depth account of a large and influential organizational context. Single case studies have advanced scientific discovery [33] and produced insights in social science and software engineering [51, 81]. Our findings contribute in this tradition, and future work should test transferability in other contexts.

## 7 Conclusion

Our study shows AI in software engineering should augment, not replace, developers. Demand is highest for tools that cut toil and improve core work, with clear limits around strategic and interpersonal tasks. Developers favor responsible support: reliable and safe, privacy-preserving, transparent, and steerable, so they stay in control and learn. Build goal-aware, observable, interruptible systems, and invest where need outpaces use; putting AI where it matters.

Data availability. Supplementary materials are available at [1]; an interactive dashboard is at https://aka.ms/AI-Where-It-Matters.