### 4.3.4 Compliance evidence compiler and interpreter. 14.2%
described compliance work as draining without requiring much
engineering expertise: “A security review today requires a hundred-
question survey, much of which is querying and fetching data through
a time-consuming process.” (P210). The core activity was translation:
decode policy language into developer steps, determine which poli-
cies applied to this system, collect artifacts across dependency/supply-
chain scanners and repositories, and restate the findings in auditor-
readable form. P476 expressed: “security and compliance is still a
gigantic cluster [expletive], mostly because security folks think their
vocab means a damn thing to us developers, and never leaving clear
actionable steps to complying” (P476).

Participants wanted AI to translate a selected policy set into
an applicability matrix, fetch required artifacts from engineering
systems, and draft policy questionnaire answers with references,
timestamps, and explicit gaps already marked.

The constraint was firm: developers wanted a workflow engine
for evidence collection only. They did not want it to declare a
service compliant, auto-apply a remediation change, or handle raw
customer data during evidence collection: “AI should not be allowed
to handle user or customer’s data as it could lead to a breach of
confidential/privacy data” (P292).

### 4.3.5 Change risk radar for proactive regression warning.
11.6% of respondents wanted AI to use telemetry and change history
to flag high-risk changes before shipping: “Should be able to detect
high-risk changes and de-risk them” (P47). The problem was that re-
gression risks appeared as weak signals spread across rollout events,
telemetry drift, and prior incident patterns, and looked harmless
individually. Participants wanted AI to score recent deployments
and config changes against service-specific baselines and historical
failure patterns, then issue risk briefs explaining why a change
looked risky, which signals were drifting, and what impact radius
was most plausible. The difficulty is in identifying which signals
are actually predictive, how to keep false-positive rates low enough
that teams trust the alerts, and how to present risk scores in a way
that supports judgment.

Developers also wanted such systems to be explainable to be
useful: “I do not think AI can be used to evaluate risk because hu-
mans cannot make sense of what the AI is doing ’underneath the
hood’ to produce its output” (P236). They did not want it to make
risk-acceptance decisions or escalate incidents or trigger crisis com-
munication autonomously: “I don’t want it making autonomous
decisions about incident escalation or crisis communication without
human approval” (P740).

> Takeaway. The shared need is left-shifted quality assurance:
> catch defects, coverage gaps, and risk at authorship time, where
> the cost to fix is lowest. In every case, the system detects and
> recommends; it does not approve, attest, or escalate.

## 4.4 Infrastructure and Operations (N=101)
101 of 283 block completers answered the open-ended questions sub-
stantively. The described infra-work was toil-heavy (e.g., grunt alert
triaging, pipeline maintenance, support screening). They wanted AI
to absorb that toil while keeping production write access firmly be-
hind human gates. That boundary was non-negotiable. As P476 put

> it, “AI is not a system administrator. It does not get any permissions
> to do anything but read and alert.”

### 4.4.1 Telemetry correlation assistant for alert tuning and
incident triage. 40.6% of respondents wanted help with the ori-
entation phase of incident response: identifying which services
were affected, which deployments or configuration changes were
plausible contributors, and how the situation compared to similar
past incidents. They wanted a system that assembles a compact
evidence bundle—correlated logs, neighboring component signals,
recent change events, similar fault history—and surfaces it as a
structured brief to the engineer. Beyond triage, they also wanted
the system to improve alert quality over time: learning service-
specific baselines from historical data to propose threshold and
deduplication changes, reducing noise without increasing missed
detections. The want was to shift an engineer’s effort from evidence
gathering to judgment. As P83 put it, “Automating queries in logs,
making alarms smarter, reducing manual intervention by getting to
root cause faster.”

Respondents did not want production-affecting remediation or
recovery actions without explicit oversight: “Executing operations
against production resources to try and resolve incidents without
human oversight... I would not expect an AI agent to have enough
background/historical context to make the correct decision” (P639).
Autonomous rollbacks and security policy changes were also out
of scope, as “these actions carr[ied] high risk and require human
judgment to weigh context, trade-offs, and potential impact” (P706).

### 4.4.2 CI/CD and infrastructure-as-code blueprint builder.
33.7% described CI/CD pipeline configuration as a source of dispro-
portionate friction: repetitive enough to template, brittle enough
that a wrong assumption could take down a deployment, and
organization-specific enough that public examples often taught the
wrong patterns. “AI could be useful in helping set up [product-name]
CI/CD pipelines, since the system is notoriously poorly documented
and hard to figure out. Training an AI system on it could significantly
reduce developer frustration” (P214).

Two needs emerged: (1) authoring CI/CD pipeline and infrastruc-
ture definitions from repository context while respecting organization-
specific policy, and (2) diagnosing build and deployment failures
by tracing through layers of configuration that few engineers fully
understood. Respondents wanted a system to read the repository’s
build targets and workflow files, explain what the current pipeline
actually does, generate a baseline configuration for new services,
and diagnose failure logs with concrete diagnostic notes.

The constraint was tight around execution: no production write
permissions, no automatic deployment or approval without a hu-
man intermediary. “it’s important that a human familiar with the
relevant services ensures that changes proposed by AI won’t introduce
issues” (P125). Generated artifacts had to be fully reproducible and
inspectable.

### 4.4.3 Maintenance backlog prioritizer. 16.8% wanted support
for service maintenance overhead: “Handling of [service compliance]
alerts with AI would be absolutely huge. That would significantly
reduce the engineering demand of service ownership and increase the
throughput for teams” (P500). Currently, deprecation warnings, se-
curity findings, runtime drift, platform notices, and cost anomalies