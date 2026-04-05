### RQ1: To what extent does cloned code contribute to bugs?

Next, we examine the converse question. Considering the code implicated in defect repair (“buggy code”), are clones unduly over-represented in this code? If buggy code contains many clones, then this suggests that we would do well to refactor out clones, or at least inspect all the clone code.

### RQ2: Do clones occur more often in buggy code than elsewhere?

Next, we’d like to know whether clones with many copies (“prolific clones”) are worse than clones with fewer copies (“non-prolific clones”). One can easily imagine that as copies proliferate, it is likely that the chance of accidentally introducing errors will increase.

### RQ3: Are prolific clone groups more buggy than non-prolific clone groups?

Next, we try to assess the impact of scattered cloning—clones that span multiple files/directories—on defect proneness. One would expect that scattered clones are more likely to span incompatible contexts, which could increase their error proneness. Moreover, such clones could be more likely to escape a possible bug-fixing change propagation.

### RQ4: Are scattered clones more buggy than collocated clones?

Finally, we try to answer whether fixing bugs with higher clone content requires more effort. One would expect that clone-related bugs would require propagation of fixes in multiple copies. This could require more effort to fix clone-related bugs, resulting in larger bug-fixing changes (as measured in number of lines changed). Alternatively, it is possible that cloned code is mostly good, and, if copied incorrectly, will require relatively smaller fixes to resolve naming issues, etc. These questions are considered in the final research question.

### RQ5: Do bugs with higher clone content require more effort to fix?

We try to answer our questions empirically by analyzing four major open source projects, namely: Apache, Evolution, Gimp and Nautilus. Our study casts doubt on the widespread belief that cloning leads to lower software quality. In all projects, we found that most bugs have nothing to do with cloned code (RQ1). Furthermore, we found buggy code is less likely to have cloned code when compared to the project overall (RQ2). We also found no evidence to support the claim that prolific clones have more buggy code than the non-prolific ones (RQ3). Moreover, our study does not support the claim that scattered clones may be more defect prone than collocated clones (RQ4). Finally, we find no evidence that bugs with higher clone content require larger bug-fixing changes (RQ5).

Our results might encourage researchers to put more effort on automatic clone maintenance (such as simultaneous editing or tools to track clones and their evolution, including inconsistent change flagging) than refactoring and eliminating them.