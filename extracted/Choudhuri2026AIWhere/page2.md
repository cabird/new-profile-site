a monolith; it is calibrated to the nature of the task. Yet it stops short of probing the psychological rationales that shape delegability. For example, why does coding count as “ideal” time, while infrastructure work or rote refactoring does not?

Our study addresses this gap by shifting from solely a capability/fit perspective to a meaning-based account: developers ask not only “Can AI do this?” but also “Should it?” and “To what extent?” We examine how developers cognitively appraise various aspects of their SE work and use that to explain where, why, and how they seek or limit AI (see §5.2). This perspective shows where human oversight and control remain essential even when AI is used.

Additionally, to our knowledge, this is the first study to examine developers’ task-conditioned priorities for Responsible AI (RAI) principles in AI-powered SE tools (see §5). We investigate how they want these tools designed—specifically, which RAI features they prioritize for responsible support across SE tasks. Finally, we show priorities vary by SE/AI experience and individual AI dispositions to guide adaptive, task- and user-sensitive design.

## 3 Appraisal Foundations & Hypotheses

Individuals are meaning-makers; we actively seek significance and value in our experiences [58]. At work, we implicitly evaluate tasks by asking: Is this important to me? Does this align with what I want to do? Am I responsible if it fails? Can I handle its demands? Cognitive appraisal theory [54, 72] formalizes these judgments across dimensions of relevance/importance, congruence with one’s motivations or identity, accountability, and cognitive demands. These appraisals shape coping strategies [16] and predict downstream outcomes such as engagement, persistence, and discretionary effort [64]. Complementing this, decades of work-design research [43, 58] show that job characteristics cluster into motivational (value, enjoyment), social (responsibility), and contextual (workload) factors, explaining substantial variance in work satisfaction and productivity [43].

At this intersection, we focus on four appraisal drivers: Value, Identity, Accountability, and Demands. Value and Identity capture motivational aspects that make tasks meaningful [58]; Accountability reflects the social stakes of responsibility [85]; and Demands index the contextual difficulty and cognitive effort involved [6]. These drivers shape how individuals perceive ownership, risk, and burden [5, 6, 49], thereby influencing whether, when, and to what extent they seek support [59, 68, 77]. In SE, we hypothesize that developers’ openness to and use of AI are shaped by these drivers:

Value is the perceived importance of a task, i.e., its significance to project success, stakeholders, or personal goals [39]. It contributes to a belief system that one’s work matters [3, 57]. Accordingly, high-value tasks heighten attention, focus, and satisfaction, but also raise anxiety about failure [5]. Historically, such tasks attract tooling support, provided reliability is high [68]. In SE, this tension could mean that developers welcome AI assistance to increase efficiency, yet hesitate to cede too much control in core aspects.

H1. Higher task value increases developers’ openness to AI support and usage. We expect that developers seek AI support as a means to complement meaningful tasks, rather than replacing them outright.

Identity alignment is the degree to which a task reflects one’s interests, expertise, or professional self-concept [39, 75]. Such tasks are intrinsically motivating and foster a sense of authenticity, purpose, and ownership [46, 49], which can heighten reluctance to delegate them to AI [59]. Yet, identity can also increase engagement with tools that help enact or amplify one’s craft [77]. Developers may therefore resist ceding identity-defining work, while strategically using AI to explore or extend their capabilities.

H2. Higher task identity reduces developers’ openness to AI support, but can increase usage when AI serves to complement expertise.

Accountability refers to the degree of perceived responsibility and potential blame an individual feels for a task’s outcome [56, 85]. High-accountability tasks are those where errors carry serious reputational or organizational consequences (e.g., customer-facing failures). Accountability Theory [85] suggests that when individuals anticipate evaluation or social recognition, they become more deliberate and information-seeking, often turning to external aids as safeguards against errors [59] and decisions [41, 56]. This could mean, rather than avoiding AI, developers strategically use it to substantiate contributions in high-stakes tasks.

H3. Higher task accountability increases developers’ openness to AI support and usage. At the same time, accountability lowers tolerance for automation bias [67, 68]. Since mistakes ultimately fall on them, developers are likely to adopt a cautious stance, insisting on oversight and decision control.

Demands capture the cognitive effort and load a task imposes [6]. High-demand work strains coping resources, increasing receptivity to aids that reduce mental load [54, 82]. Developers may turn to AI to lower the cognitive cost of experimentation, delegate effort-intensive components, and sustain momentum in demanding work.

H4. Higher task demands increase developers’ openness to AI support and usage.

Controls and Groups: We control for developers’ SE and AI experience, as both can shape baseline attitudes toward AI [7, 25]. Beyond expertise, individual dispositions can condition how task appraisals translate into AI use. Here, we emphasize risk tolerance and technophilia [14]—traits linked to stronger AI-adoption tendencies [19]. Risk-tolerant developers may delegate demanding work and feel less deterred by accountability pressures, while technophiles (intrinsically eager to experiment with tools) actively seek opportunities to integrate AI [19]. Accordingly, we expect these factors to moderate the hypothesized relationships.

## 4 Method

To address our RQs, we surveyed software developers at Microsoft. Microsoft employs over 60,000 developers worldwide, spanning diverse domains, team structures, processes, and stakeholder contexts. This scale, combined with exposure to both mature and emerging AI tooling, makes it a rich and diverse setting for our study.

### 4.1 Study Design

The goal of our study was to:
- (1) characterize how developers appraise SE tasks;
- (2) assess how these appraisals shape their openness to and use of AI;
- (3) identify opportunities and gaps where AI can better support developer workflows; and
- (4) understand which Responsible AI (RAI) design principles developers prioritize in AI tools to credibly support different aspects of SE work.

The study was reviewed and approved by Microsoft’s IRB.

Synthesizing a taxonomy of SE tasks: To study task appraisals (RQ1), we first constructed a representative, grounded taxonomy of SE tasks (Table 1), integrating multiple empirical sources [19, 47, 50, 63]. We first drew on recent work-week studies of developer activities [50, 63], that provided detailed task inventories and their higher-level groupings. We then enriched this set with job-distribution insights from large-scale developer surveys on AI trust and adoption [19, 47], ensuring our taxonomy reflected SE responsibilities distributed across roles, geographies, and contexts. Finally, we triangulated coverage through pilot sessions with developers and SE researchers outside our team, identifying any missing tasks and