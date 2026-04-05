### 2.1 Natural Language Programming Paradigms

We use natural language programming to denote approaches where developers use everyday language to specify, modify, or orchestrate software, drawing on HCI work on “natural programming” that examines how people express computational intent before learning formal syntax [36].

The ambition to program with natural language dates to early computing. Business-oriented languages such as COBOL adopted English-like syntax to broaden access [7]. The fourth-generation language (4GL) movement pushed toward declarative, task-level specification promising “programming without programmers” via high-level abstractions for data and business logic [22]. Pure natural language, however, proved insufficient without grounding, connecting language to executable semantics within well-defined domains. Classic AI systems grounded language in narrow, executable domains such as SHRDLU in a blocks world that turned commands into actions and explanations [57], and LUNAR by translating Apollo geology questions into structured database queries with checkable results [58].

Two complementary strategies emerged to manage ambiguity. Controlled natural languages (e.g., Attempto Controlled English) restrict grammar and vocabulary so sentences map deterministically to logic [15, 16]. In parallel, programming by demonstration (PBD) and by example (PBE) infer intent from concrete artifacts [11], later formalized by program synthesis methods like FlashFill [21] that solve for programs from I/O pairs or partial specifications [53]. Collectively, these show that natural language works best when paired with examples, types, tests, or partial programs.

Machine learning shifted the field from rule-based translation to learned, data-driven mappings. Early statistical semantic parsers mapped utterances to logical forms with probabilistic models [63, 64]. Deep learning then enabled sequence-to-sequence NL→code trained on parallel corpora, performing best where executable oracles provide objective verification. For example, text-to-SQL on Spider [61], Python snippets in CoNaLa [60], and model evaluations like Codex on HumanEval [6]. Pairing neural flexibility with deterministic checks proved crucial.

Large language models trained on code broadened scope and interaction. Systems like Codex moved beyond domain-specific mappings to general-purpose languages [6], enabling conversational programming where developers iteratively describe goals, request modifications, and refine implementations in natural language [47]. This elevates language from a translation interface to a primary programming surface, but without systematic specification or testing, iterations can drift and compound errors.

We organize natural language programming along three design axes:

- Interaction mode: one-shot translation vs. conversational refinement.
- Grounding strategy: pure NL vs. NL augmented with artifacts (I/O examples, tests, types, schemas, partial programs).
- Verification: ad-hoc inspection vs. systematic oracles (unit/property tests, expected outputs, formal specs).

These axes clarify trade-offs between fluid interaction and precise specification, naturalness and semantic grounding, and creative exploration and correctness guarantees.

Different paradigms occupy distinct regions of this space (Table 1). NL→code systems often use one-shot interaction with limited grounding and rely on manual verification [6]. NL→DSL [29, 61] and PBE [21] trade expressiveness for reliability via schema/DSL constraints or executable oracles. Conversational environments emphasize high-interaction dialogue [47], progressively building grounding via context [2], though verification often remains informal [54].

Vibe coding occupies the high-interaction, low-grounding corner: developers iterate in dialogue with minimal formal scaffolding, relying on improvisational verification and run–refine loops. This aligns with exploratory programming where goals evolve through programming [24]. Sections 4.2–4.5 examine how practitioners navigate these trade-offs, what this affords for rapid progress, and where it strains reliability.

Manuscript submitted to ACM