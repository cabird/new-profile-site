## 5 Discussion

### 5.1 Implications for practice

#### 5.1.1 Bounded Delegation: Protecting the Parts Worth Doing.  
Reflect on your own daily work for a moment: Which parts would you want an AI to do for you? Which would you insist on doing yourself, even if the AI could do them independently?

We call this split “bounded delegation”: developers in our study expected AI to support work that was tedious, time-consuming, and context-heavy, but not to subsume their craft or judgment. There are two parts to this boundary, and only one is likely to move.

The first reflects current tool limitations. Developers described existing tools as unreliable enough to warrant caution in delegation: “AI is very bad at understanding the context and throwing wrong answers with utmost confidence” (P223). As models improve, this part may shift.

The second reflects agency. “AI should not settle the final decision ever. Because this is the part that people should be accountable for” (P774). The architecture studio is meant to generate alternatives but not decide; compliance tools to surface gaps but not sign off; code review assistants to identify issues but not approve changes. These are intentional boundaries on what developers choose to retain, regardless of model capability.

Hackman and Oldham’s work-design theory offers an explanation [24]: task identity and agency are among the core drivers of meaningful work. When AI absorbs craft, it risks eroding a developer’s sense of owning a coherent piece of work. Bounded delegation may thus be a developer’s way of preserving that sense, shaping AI’s role to protect what makes the work worth doing.

## (continued from previous page)

the actual repositories, docs, ADRs, setup scripts, and examples the learner would use. It would generate a codebase map, curated reading path, and hands-on exercises with source-linked explanations, adapting as work was completed and flagging explicit human touchpoints for mentoring and team integration. As one participant noted, “AI can help a lot in onboarding new people into a team, and help in speeding up the time for them to start contributing to the project” (P781).

The constraint respondents drew consistently was that the system must not replace human mentorship or team integration: “Onboarding requires human involvement to feel welcomed and a part of the team” (P281). AI could structure the logistics of onboarding, but culture and relationship-building remain with the humans.

4.5.3 Stakeholder communication drafting workbench. 12.7% wanted help with the overhead of tailoring technical updates for different audiences. “I would like AI to help with tailoring stakeholder communications to different stakeholders. Right now, so much team meta-effort goes into preparing tailored communications” (P40). Participants wanted AI-assisted drafting to begin with explicit audience configuration, including intent, technical fluency, language, and formality expectations, after which the system would extract facts, deltas, open risks, and requirements from selected artifacts and generate drafts calibrated to that context, preserving technical nuance. For multilingual communication, participants wanted targeted language coaching that preserved their own intent.

Accountability was the most frequently cited boundary: “AI should not write communications to the customer, or anyone else—its writing style is so obvious, and it makes us look lazy” (P457). No message should be sent automatically; every output must remain a draft until approved, and sensitive or relationship-critical communications (those requiring empathy, trust-building, or nuanced trade-off discussion) must stay with the human.

4.5.4 Interactive exploration board for tech discovery. 11.7% described a gap in the earliest phase of technical decision-making—the fuzzier research phase—where someone has a problem, an instinct, and maybe one favored approach, but no structured way to research the trade-offs between alternatives. Available tools arrive too late, after the option space has already narrowed, and hand back polished answers that reinforce the first instinct rather than stress-testing it. As P457 put it, “Too often we just have one idea—hey, I want people’s opinions, I’ll send out a meeting request, but that ends up being a big ordeal.”

11.7% wanted a system that operated in this earlier phase: starting from a research question with explicit constraints and evaluation criteria, generating materially different option cards with local precedent and explicit assumptions attached, and letting the engineer re-weight criteria, add candidates, or challenge the current set before any commitment was made.

The constraint was preserving the integrity of early thinking. The system has to be pull-based: never injecting unsolicited options into an active exploration, and making explicit that its outputs were a starting point, not a conclusion. As P18 put it, “AI can be OK as a sounding board for research, as long as there is human validation of what it says and the user remembers that the AI can be wrong.”

> Takeaway. The target of these four systems is the orientation cost before work can begin, assembling signals that are spread across too many sources. Each system addresses a different signal type, but the shared design is the same: collate, prioritize, and surface. Final accountability stays with the human.

> Key implication: AI systems should be designed around bounded delegation: maximize support for assembly while preserving human craft and agency. Treating this boundary as a design requirement, i.e., an enduring feature of how humans and AI systems share work, enables complementarity [46] that sustains both productivity and the satisfaction that makes it durable.

#### 5.1.2 The Right-Shift Problem.  
When a service goes down at 3 AM, the on-call engineer has to fix it. Historically, you could wake up the original author, check the commit history, or rely on team knowledge to understand the logic. Today, engineers are increasingly asked to fix code that no one on the team fully understands.

This reflects a right-shift problem in the software lifecycle. As code generation becomes easier, verification can become the constraint. Reviewers often need to reconstruct intent, assess correctness, and identify risks across larger volumes of machine-generated code with limited provenance or design context.

The consequences can be cumulative. Faster generation does not necessarily lead to better systems; instead, effort shifts downstream [2]. The resulting flow of AI-generated output is already