# DeepMerge: Learning to Merge Programs

Elizabeth Dinella, Member, IEEE; Todd Mytkowicz, Member, IEEE; Alexey Svyatkovskiy, Member, IEEE; Christian Bird, Distinguished Scientist, IEEE; Mayur Naik, Member, IEEE; Shuvendu Lahiri, Member, IEEE

Abstract—In collaborative software development, program merging is the mechanism to integrate changes from multiple programmers. Merge algorithms in modern version control systems report a conflict when changes interfere textually. Merge conflicts require manual intervention and frequently stall modern continuous integration pipelines. Prior work found that, although costly, a large majority of resolutions involve re-arranging text without writing any new code. Inspired by this observation we propose the first data-driven approach to resolve merge conflicts with a machine learning model. We realize our approach in a tool, DeepMerge, that uses a novel combination of (i) an edit-aware embedding of merge inputs and (ii) a variation of pointer networks, to construct resolutions from input segments. We also propose an algorithm to localize manual resolutions in a resolved file and employ it to curate a ground-truth dataset comprising 8,719 non-trivial resolutions in JavaScript programs. Our evaluation shows that, on a held-out test set, DeepMerge can predict correct resolutions for 37% of non-trivial merges, compared to only 4% by a state-of-the-art semistructured merge technique. Furthermore, on the subset of merges with up to 3 lines (comprising 24% of the total dataset), DeepMerge can predict correct resolutions with 78% accuracy.

## 1 INTRODUCTION

In collaborative software development settings, version control systems such as “git” are commonplace. Such version control systems allow developers to simultaneously edit code through features called branches. Branches are a growing trend in version control as they allow developers to work in their own isolated workspace, making changes independently, and only integrating their work into the main line of development when it is complete. Integrating these changes frequently involves merging multiple copies of the source code. In fact, according to a large-scale empirical study of Java projects on GitHub [11], nearly 12% of all commits are related to a merge.

To integrate changes by multiple developers across branches, version control systems utilize merge algorithms. Textual three-way file merge (e.g., present in “git merge”) is

![Two examples of unstructured merges (table)](page1_img_1.png)

Figure 1: Two examples of unstructured merges.

the prevailing merge algorithm. As the name suggests, three-way merge takes three files as input: the common base file O, and its corresponding modified files, A and B. The algorithm either:

1. declares a “conflict” if the two changes interfere with each other, or  
2. provides a merged file M that incorporates changes made in A and B.

Under the hood, three-way merge typically employs the diff3 algorithm, which performs an unstructured (line-based) merge [27]. Intuitively, the algorithm aligns the two-way diffs of A (resp. B) over the common base O into a sequence of diff slots. At each slot, a change from either A or B is incorporated. If both programs change a common slot, a merge conflict is produced, and requires manual resolution of the conflicting modifications.

Figure 1 shows two simple code snippets to illustrate examples of three-way merge inputs and outputs. The figure shows the base program file O along with the two variants A and B. Example (1) shows a case where diff3 successfully provides a merged file M incorporating changes made in both A and B. On the other hand, Example (2) shows a case where diff3 declares a conflict because two independent changes (updates to x and z) occur in the same diff slot.

When diff3 declares a conflict, a developer must intervene. Consequently, merge conflicts are consistently ranked as one of the most taxing issues in collaborative, open-source software development, “especially for seemingly less experienced developers” [13]. Merge conflicts impact developer productivity, resulting in costly broken builds that stall the continuous integration (CI) pipelines for several hours to days. The fraction of merge conflicts as a percentage of merges range from 10% — 20% for most collaborative

- Elizabeth Dinella is with the University of Pennsylvania, Philadelphia, Pennsylvania, USA. E-mail: edinlla@seas.upenn.edu. Elizabeth Dinella performed this work while employed at Microsoft Research.  
- Todd Mytkowicz is with Microsoft Research, Redmond, Washington, USA. E-mail: toddm@microsoft.com  
- Alexey Svyatkovskiy is with Microsoft, Redmond, Washington, USA. E-mail: alsvyatk@microsoft  
- Christian Bird is with Microsoft Research, Redmond, Washington, USA. E-mail: cbird@microsoft.com  
- Mayur Naik is with the University of Pennsylvania, Philadelphia, Pennsylvania, USA. E-mail: mhnaik@cis.upenn.edu  
- Shuvendu Lahiri is with Microsoft Research, Redmond, Washington, USA. E-mail: shuvendu@microsoft.com