Table 4: Systems developers want built: Quality & Risk (N=155).

| System | Problem it addresses | Example capability steps | Constraints & guardrails |
|---|---|---|---|
| Change-aware test generation and quality gates | Test suites lag behind code, leaving coverage gaps as behavior changes outpace test authoring | Ingest diffs to build an impact map of changed artifacts; recover expected behavior from requirements and tests, requesting input when intent cannot be inferred; generate repository-style tests using existing helpers; publish a quality report highlighting untested changes | Must not self-certify the correctness or completeness of its own tests and output; must not automatically commit generated tests or code; must provide auditable evidence for all activities; must ask and not infer missing context. |
| Context-aware pull request review assistant | Large pull requests (PRs) are hard to review: intent is unclear, risk boundaries are implicit, and mechanical churn obscures meaningful changes. Generic automated comments add noise while missing repo-specific concerns. | Ingest PRs to build a layered summary of intent, affected modules and dependencies, and their downstream impact; analyze changes for performance and maintainability using repo norms and historical review patterns; attach findings to exact files or lines with severity and rationale; publish inline annotations and a summary that lists checked categories and analysis boundaries | Must not replace human review or act as the final authority or pass/fail gate for PRs; must not automatically change code without explicit human review; must make uncertainty explicit and abort rather than inferring intent. |
| Pre-merge security advisor with patch suggestions | Current tools flag issues, but vulnerability findings arrive late, lack context and actionable fixes, requiring significant effort in validation of these issues and their remediation. | Triage at the diff level with remediation options tied to the relevant security-sensitive surfaces in the changed code; run static, taint-style, and dependency advisory checks correlated into findings tied to exact paths; generate remediation options with a conservative patch; stop and surface uncertainty when confidence is low | Must never auto-merge or auto-commit security fixes; must not become the sole authority for security decisions; must provide verifiable evidence of what was analyzed; must not expose sensitive information in outputs; must surface uncertainty when confidence is low |
| Compliance evidence compiler & interpreter | Compliance work is dominated by evidence chase and translation: decode policy language, determine applicability, hunt down artifacts across supply-chain scanners and repos, then restate findings in auditor-expected formats. | Parse the selected policy set into required evidence types and applicability rules; collect a minimal set of scoping facts that determine which policies apply, and record the reasoning for each applicable or non-applicable judgment; harvest artifacts into an evidence ledger with provenance; stop and request human input when evidence is missing | Must not handle raw customer or user data during evidence collection; must not provide compliance/remediation attestations without explicit human approval; must not make changes to production systems |
| Change risk radar for proactive regression warning | Regression risks hide in signals that are fragmented across systems, rollout events, and prior incidents. On their own, they look harmless; problems surface when the relevant signals are combined, which is difficult for humans to do on their own. | Assign a canonical ID to each deployment or config event so telemetry ties back to a specific rollout; learn service-specific baselines and detect low-severity deviations; correlate deviations to recent changes using timing and historical incident similarity; generate a short risk analysis brief with explicit drivers | Must not make final ship/no-ship or risk-acceptance decisions; must not autonomously escalate incidents or trigger crisis communication; must remain read-only with respect to production environments; risk scores must be explainable and auditable. |

aspects of the change and the confidence of the review so that human
reviewers can look at other aspects” (P429).
Participants emphasized that such systems should not approve
PRs, automatically modify code, or act as a final authority: “I don’t
want AI to just act as a red-light/green-light. It should raise issues
after/while humans are reviewing and still require human review”
(P92). And when intent is ambiguous, it should abort rather than
guess: “If there is something that it isn’t capable of doing, abort with
that information, rather than making some assumptions” (P350).

### 4.3.3 Pre-merge security advisor with patch suggestions.
21.9% of respondents wanted security triage at the diff level with re-
mediation tied to the actual code path. “I wish it could ACCURATELY
make assessments about security issues and functional correctness

of code” (P55). Existing tools already found the point-problems.
The delay came after the detection: developers had to determine
whether the finding was real in their code context, whether the
vulnerable change was reachable, and what a safe local fix looked
like in their specific repository. “I wish it could ACCURATELY make
assessments about security issues and functional correctness of code”
(P55). A useful system had to tie findings to concrete artifacts—code,
dependencies, configurations—and draft a plausible remediation
the developer could review and accept or reject.

Accountability was the governing constraint. Developers wanted
to retain responsibility for validating every finding: “I do not want
AI to be solely responsible for quality and security; a developer needs
to validate the results without leaning on it entirely” (P42).