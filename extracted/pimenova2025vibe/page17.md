### RQ4 — Pain Points

What are the challenges and risks associated with vibe coding? As shown in Figure 2, we identify 13 vibe coding pain points experienced by vibe coders. These pain points include challenges with accurately specifying intent, incomplete solutions from models, and dissatisfaction with the large amount of code review. We also identify several risks that may result from vibe coding. These risks can affect vibe-coded software, vibe-coding developers, or even society at large.

### RQ5 — Best Practice

What best practices are emerging to handle these challenges? Figure 2 overviews the large number of vibe coding best practices that are emerging. Many of these best practices help support the conditions necessary for flow.

### Implications and Future Directions

Is vibe coding a passing trend or the start of a significant paradigm shift? Our study cannot settle this definitively. At a minimum, it is a distinct practice with its own community, tools, challenges, and best practices calling for our attention to the potential important implications for education, practice, tooling, and research.

#### Education

If programming increasingly centers on specifying intent in natural language, then curricula should teach students effective GenAI collaboration alongside core CS fundamentals (algorithmic understanding, testing, theory). Educators should also address professional upskilling and guard against skill atrophy.

#### Practice

Participants used vibe coding effectively for personal work, prototyping, and custom tools, but were cautious for production or safety-critical code. Review load is substantial and risks to quality notable. Teams need processes for this and cannot outsource verification to the same models that generate code. Sustained flow can, however, bolster morale and motivation.

#### Tooling

Next-generation tools should address pain points (version-control and provenance integration, longer-horizon conversational memory, reproducible runs) while preserving conditions for flow (responsiveness, a sense of control, low-friction iteration). Design for trust calibration and for reviewability/handoffs must also be considered.

> "I think there's some new kind of IDE that's gonna come out that's not gonna look like VS Code at all. And, 1,000 people need to start these... one that really has the genie baked into the bones of it is gonna be amazing." (I7)

#### Research

Examples of next step studies include: (i) empirical tests of reported pain points and real world impact of best practices; (ii) longitudinal studies of skill and trust development with GenAI; (iii) evaluations in industrial settings with complex dependencies and teams; and (iv) systematic security/privacy assessments of vibe-coded artifacts.

#### Risks

While the societal risks in section 4.5.1 are fairly speculative, they are important for contextualizing future directions and research regarding vibe coding. We consider efforts into understanding and mitigating such risks as a promising direction for future work.

## 6 Related Work

While vibe coding emerged recently, several concurrent studies have begun investigating this paradigm. Studies contrast vibe coding with other AI-assisted approaches, propose formal framings of intent and collaboration, and report empirical observations in lab settings. Our work contributes the first comprehensive qualitative investigation of practitioner experiences and perceptions.

Closest to our work, Sarkar and Drosos analyzed think-aloud recordings of vibe coding sessions to investigate developers’ goals, workflows, prompting techniques, debugging approaches and challenges [50]. Their analysis found that vibe coding follows an iterative prompt-and-evaluate cycle: developers alternate between writing natural language prompts, rapidly scanning or testing generated code, and then making occasional manual edits, building trust through

Manuscript submitted to ACM