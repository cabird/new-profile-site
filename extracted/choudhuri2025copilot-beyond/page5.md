reviewed every proposed theme against its cited responses before codebook approval, removing weakly substantiated ones. Further, during systematic coding, models produced rationale before assigning codes, letting researchers trace and verify each decision. Finally, verbatim quotes throughout the paper allow readers to assess whether themes are grounded in participants’ responses.

Internal validity. This is a cross-sectional study capturing developers’ stated needs at a single point in time. The systems described are those developers wanted but did not have. If some such systems now exist, our findings provide criteria for evaluating how well they address developer needs. Self-selection remains a potential confound: respondents may hold stronger views about AI support than the broader population.

External validity. We studied Microsoft developers across global sites, diverse teams and roles, multiple domains, and varied processes. The systems and constraints we identify reflect recurring challenges that developers face in daily work, though their salience may differ in smaller organizations, open-source settings, or regulated industries. We therefore present an in-depth account of a large organizational context rather than a claim to represent all software engineers. Single case studies have advanced scientific discovery [21] and produced foundational insights in software engineering [30,47]. Replication in other contexts remains necessary.

## 4 22 Systems Developers Want Built

We organize the 22 systems by task category. Each category contains a summary table, followed by descriptions of what developers intended each system to do, what makes it difficult to build, and the constraints they imposed on its behavior. Those constraints recur consistently enough across respondents that we treat them as design requirements; they reflect deliberate boundaries around where developers locate professional responsibility.

### 4.1 Development (N=353)

353 of the 816 developers who completed the development block wrote substantive open-ended responses. The majority of them wanted help with the backlog of technical debt that accumulates in every mature codebase. What was striking was how consistently demand and caution coexisted: even developers who most wanted AI to take on this work attached explicit scope boundaries, review gates, and requirements that the system stop and surface its limits rather than invent past them.

#### 4.1.1 Scoped-PR builder for tech debt removal.

The most prevalent want in this category, at 50.1%, was help with the removal of tech debt. Mature codebases accumulate maintenance work that everyone knows needs doing (e.g., framework migrations, API renames, dependency chain management), but that is hard to do carefully at scale without deep codebase understanding. “Refactoring would be the biggest help. It’s almost always tedious and well-defined, but it needs more than just find-replace. Almost always, it spans large file and multi-file workflows” (P27).

Generating code that is contextualized was hard for available tools. Respondents wanted AI that follows the team’s actual conventions, error-handling, and testing styles, then packages these changes as a sequence of diffs, each small enough for the human to review with confidence, stopping at the authorized boundary even

when it identifies adjacent code worth cleaning up. Conciseness was a key requirement. “I want small PR’s with incremental steps” (P816). The worry was overreach: “I don’t want AI to make substantial refactoring changes without interaction/consultation first... next thing I know there are new classes and new files” (P40). When a change requires domain knowledge or touches core business logic, the system must recognize the boundary and stop: “If the code change requires specialized domain or tribal knowledge not found within the repository, I’d rather handle it myself” (P211).

#### 4.1.2 Embedded quality gate for code and tests.

27.8% of respondents wanted a quality gate embedded during authorship time: pre-commit bug-spotting, standards enforcement, vulnerability detection, and missing test identification. However, available tools provided feedback that was generic, shallow, and often unanchored to the current diff: “Stop giving bad advice. So many of the PR automated comments are just plain wrong” (P609). Generic linter-like recommendations erode trust; what developers need is a quality pass anchored to the current diff, combining deterministic analyzers with targeted model reasoning to surface only what is genuinely worth attention. Done well, this shifts defect detection upstream: “you can avoid many on-call fixes if you leverage AI upstream and catch bugs during development or early test environment, before they affect any users” (P120).

The constraints were strict that the systems should not bypass human accountability: no automatic modifications, no auto-submitted or auto-approved artifacts. For test generation especially, respondents wanted the system to ask before writing: “AI should ask for a lot of input before writing unit tests... especially if we are writing a new feature from scratch” (P680).

#### 4.1.3 Trace-to-diff root cause workbench.

19.5% described wanting help “assembling the case file” for live production incidents. The bottleneck is evidence collection: an engineer has to find the right logs, identify which recent code change introduced the failure, and reconstruct enough runtime context to have something worth verifying before any debugging begins: “... there are lots of logistics that need to be done... if those are [done] by AI, it would be a great win” (P156).

Respondents described wanting a workbench that starts from a bug report, stack trace, or incident alert and assembles a debug case file: correlated logs and traces, the most likely regression window, similar historical failures, and competing root-cause hypotheses. If a hypothesis survives verification, the system needs to propose a narrow patch and a regression test. The goal of these tools is to shift engineer effort from evidence gathering to expert judgment: “focus on ‘do we agree with the Agent’s assessment... and proposed fix?’ and we could collectively churn through our bugs much faster” (P120). Confidence calibration is what makes this hard. A wrong hypothesis stated confidently can send the team down the wrong path; “AI is very bad at understanding the context and throwing wrong answers with utmost confidence, makes us waste time instead of helping” (P223). Developers were unanimous that no code changes must be applied without explicit human review, and proposed fixes must be precisely scoped to the identified fault.

#### 4.1.4 Repository context graph for cross-file changes.

18.4% of respondents reported that available AI assistants lost the thread