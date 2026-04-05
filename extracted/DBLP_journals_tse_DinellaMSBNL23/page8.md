After localizing the resolution regions, we have a set of merge instances of the form (A, B, O, R). We can use our R definition from Section 2 to label a merge tuple (A, B, O, R).

### 4.2 Filtering Trivial Resolutions

Upon examining our dataset, we found a large set of merges in which A was taken as the resolution and B was entirely ignored (or vice versa). These trivial samples, in large, were the product of running git merge with “ours” or “theirs” command-line options. Using these merge options indicates that the developer did not resolve the conflict after careful consideration of both branches, but instead relied on the git interface to completely drop one set of changes. The aforementioned command-line merge options are typically used when the commit is the first of many fix-up commits to perform the full resolution.

We appeal to the notion of a “valid merge” that tries to incorporate both the syntactic and semantic changes from both A and B. Thus, these samples are not valid as they disregard the changes from B (resp. A) entirely. Furthermore, these trivial samples comprised 70% of our “pre-filtering” dataset. Previous work confirmed our observation that a majority of merge resolutions in GitHub Java projects (75% in Table 13 [11]) correspond to taking just A or B. To avoid polluting our dataset, we filter such merges (A, B, O, R) where R ∈ {A, B, O} (line 9 in Algorithm 1). Our motivation to filter the dataset of trivial labels is based on both dataset bias and the notion of a valid merge.

### 4.3 Final Dataset

We crawled repositories in GitHub containing primarily JavaScript files, looking at merge commits. To avoid noise and bias, we select projects that were active in the past one year (at the time of writing), and received at least 100 stars (positive sentiment). We also verified that the dataset did not contain duplicate merges. We ignore minified JavaScript files that compress an entire JavaScript file to a few long lines.

![Table showing Top-1 and Top-3 accuracy for DEEPMERGE and baselines](page8_img_1.png)

Table 1: Evaluation of DEEPMERGE and baselines: resolution synthesis accuracy (%).

few long lines. Finally, note that Algorithm 1 filters away any resolution that consists of new segments (lines) outside of A and B as our technique targets resolutions that do not involve writing any new code. After applying filters, we obtained 8,719 merge tuples. We divided these into a 80/10/10 percent training/validation/test split. Our dataset contains the following distribution in terms of total number of lines in A and B: 45.08% ([0,5]), 20.57% ([6,10]), 26.42% ([11,50]), 4.22% ([51,100]) and 3.70% (100+).

## 5 EVALUATION

In this section, we empirically evaluate DEEPMERGE to answer the following questions:

- RQ1 How effective is DEEPMERGE at synthesizing resolutions?
- RQ2 How effective is DEEPMERGE at suppressing incorrect resolutions?
- RQ3 On which samples is DEEPMERGE most effective?
- RQ4 How do different choices of input representation impact the performance of DEEPMERGE?

### 5.1 RQ1: Effectiveness of Resolution Synthesis

In this section, we perform an evaluation to assess DEEPMERGE’s effectiveness of synthesizing resolutions. Our prediction, R̂, is considered correct if it is an exact (line-for-line, token-for-token) match with R.

Evaluation metrics. DEEPMERGE produces a ranked list of predictions; we define top-1 (resp. top-3) accuracy if the R is present in first (resp. top 3) predictions. This is a lower bound, as multiple resolutions may be “correct” with respect to the semantics of the changes being merged (e.g., in some cases, switching two declarations or unrelated statements has no impact on semantics).

Quantitative Results. Table 1 shows the performance of DEEPMERGE on a held out test set. DEEPMERGE has an overall top-1 accuracy of 36.5%, correctly generating more than one in three resolutions as its first ranked choice. When we consider the top-3 ranked resolutions, DEEPMERGE achieves a slightly improved accuracy of 43.23%.

Baselines. Table 1 also includes a comparison of DEEPMERGE to three baselines. We compare to a heuristic based approach (SCANMERGE), an off-the-shelf sequence-to-sequence model (SEQ2SEQ), and a structured AST based approach (JSFSTMERGE).

Our first baseline SCANMERGE is a heuristic based approach designed by manually observing patterns in our dataset. SCANMERGE randomly samples from the space of sub-sequences over lines from A and B that are: (i) syntactically valid and parse, (ii) include each line from