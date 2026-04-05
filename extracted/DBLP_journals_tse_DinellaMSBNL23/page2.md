projects. In several large projects, merge conflicts account for up to 50% of merges (see [11] for details of prior studies).

Merge conflicts often arise due to the unstructured diff3 algorithm that simply checks if two changes occur in the same diff slot. For instance, the changes in Example (2), although textually conflicting, do not interfere semantically. This insight has inspired research to incorporate program structure and semantics while performing a merge. Structured merge approaches [3], [21], [32] and their variants treat merge inputs as abstract syntax trees (ASTs), and use tree-structured merge algorithms. However, such approaches still yield a conflict on merges such as Example (2) above, as they do not model program semantics and cannot safely reorder statements that have side effects. To make matters worse, the gains from structured approaches hardly transfer to dynamic languages, namely JavaScript [32], due to the absence of static types. Semantics-based approaches [37], [28] can, in theory, employ program analysis and verifiers to detect and synthesize the resolutions. However, there are no semantics-based tools for synthesizing merges for any real-world programming language, reflecting the intractable nature of the problem. Current automatic approaches fall short, suggesting that merge conflict resolution is a non-trivial problem.

This paper takes a fresh data-driven approach to the problem of resolving unstructured merge conflicts. Inspired by the abundance of data in open-source projects, the paper demonstrates how to collect a dataset of merge conflicts and resolutions.

This dataset drives the paper’s key insight: a vast majority (80%) of resolutions do not introduce new lines. Instead, they consist of (potentially rearranged) lines from the conflicting region. This observation is confirmed by a prior independent large-scale study of Java projects from GitHub [13], in which 87% of resolutions are comprised exclusively from lines in the input. In other words, a typical resolution consists of re-arranging conflicting lines without writing any new code. Our observation naturally begs the question: Are there latent patterns of rearrangement? Can these patterns be learned?

This paper investigates the potential for learning latent patterns of rearrangement. Effectively, this boils down to the question:

Can we learn to synthesize merge conflict resolutions?

Specifically, the paper frames merging as a sequence-to-sequence task akin to machine translation.

To formulate program merging as a sequence-to-sequence problem, the paper considers the text of programs A, B, and O as the input sequence, and the text of the resolved program M as the output sequence. However, this seemingly simple formulation does not come without challenges. Section 5 demonstrates an out-of-the-box sequence-to-sequence model trained on merge conflicts yields very low accuracy. In order to effectively learn a merge algorithm, one must:

1. represent merge inputs in a concise yet sufficiently expressive sequence;
2. create a mechanism to output tokens at the line granularity; and

1. We ran jdime [21] in structured mode on this example after translating the code snippet to Java.

![diff3 conflict format example](page2_img_1.png)

unchanged lines (suffix)

(a) Format of a conflict. (b) Instance of a conflict.

Figure 2: Conflict format and an instance reported by diff3 on Example (2) from Figure 1.

3. localize the merge conflicts and the resolutions in a given file.

To represent the input in a concise yet expressive embedding, the paper shows how to construct an edit-aware sequence to be consumed by DEEPMERGE. These edits are provided in the format of diff3, which is depicted in Figure 2(a) in the portion between markers "<<<<<<<" and ">>>>>>>". The input embedding is extracted from parsing the conflicting markers and represents A’s and B’s edits over the common base O.

To represent the output at the line granularity, DEEPMERGE’s design is a form of a pointer network [34]. As such, DEEPMERGE constructs resolutions by copying input lines, rather than learning to generate them token by token. Guided by our key insight that a large majority of resolutions are entirely comprised of lines from the input, such an output vocabulary is sufficiently expressive.

Lastly, the paper shows how to localize merge conflicts and the corresponding user resolutions in a given file. This is necessary as our approach exclusively aims to resolve locations in which diff3 has declared a conflict. As such, our algorithm only needs to generate the conflict resolution and not the entire merged file. Thus, to extract ground truth, we must localize the resolution for a given conflict in a resolved file. Localizing such a resolution region unambiguously is a non-trivial task. The presence of extraneous changes unrelated to conflict resolution makes resolution localization challenging. The paper presents the first algorithm to localize the resolution region for a conflict. This ground truth is essential for training such a deep learning model.

The paper demonstrates an instance of DEEPMERGE trained to resolve unstructured merge conflicts in JavaScript programs. Besides its popularity, JavaScript is notorious for its rich dynamic features, and lacks tooling support. Existing structured approaches struggle with JavaScript [32], providing a strong motivation for a technique suitable for dynamic languages. The paper contributes a real-world dataset of 8,719 merge tuples that require non-trivial resolutions from nearly twenty thousand repositories in GitHub. Our evaluation shows that, on a held-out test set, DEEPMERGE can predict correct resolutions for 37% of non-trivial merges. DEEPMERGE’s accuracy is a 9x improvement over a recent semi-structured approach [32], evaluated on the same dataset. Furthermore, on the subset of merges with up to 3 lines (comprising 24% of the total dataset), DEEPMERGE can predict correct resolutions with 78% accuracy.

Contributions. In summary, this paper: