![Precision, Recall, and F1 score plot](page10_img_fig1.png)

Figure 8: Top-1 precision and recall by confidence threshold.

![Table 3: Accuracy and distribution of classes](page10_img_table3.png)

Table 3: Accuracy and Distribution of classes.

use, as prior work has shown that tools with a high false positive rate are unlikely to be used by developers [17]. Figure 8 depicts the precision, recall, and F1 score values for various confidence thresholds (with 95% confidence intervals). We aim to find a threshold that achieves high precision without sacrificing too much recall. In Figure 8, the highest F1-Score of 0.46 is achieved at 0.4 and 0.5. At a threshold of 0.5, DEEPMERGE’s top-1 precision is 0.72 with a recall of 0.34. Thus, while DEEPMERGE only produces a resolution one third of the time, that resolution is correct three out of four times. Compared to DEEPMERGE with no thresholding, at a threshold of .5 DEEPMERGE achieves a 2x improvement in precision while only sacrificing a 10% drop in recall. Thresholds of 0.4 and 0.5 were identified as best performing on a held-out validation set. We then confirmed that these thresholds were optimal on the held-out test set reported in Figure 8.

### 5.3 RQ3: Categorical Analysis of Effectiveness

We now provide an analysis of DEEPMERGE’s performance. To understand which samples DEEPMERGE is most effective at resolving, we classify the dataset into two classes: CONCAT and OTHER. The classes are defined as follows:

1. CONCAT - resolutions of the form AB or BA. Specifically:
   - R contains all lines in A and all lines in B.
   - There is no interleaving between A’s lines and B’s lines.
   - The order of lines within A and B is preserved.

2. OTHER - resolutions not classified as CONCAT. OTHER samples can be any interleaving of any subset of lines.

Table 3 shows the performance of DEEPMERGE on each class. DEEPMERGE performs comparably well on each category, suggesting that DEEPMERGE is effective at resolving conflicts beyond concatenation.

![Table 4: Accuracy of different input representation choices](page10_img_table4_right.png)

Table 4: Accuracy of different input representation choices.

### 5.4 RQ4: Impact of Input Representation

We now evaluate the use of Merge2Matrix and show the benefit of the Aligned Linearized implementation used in DEEPMERGE.

We evaluate DEEPMERGE on each combination of summarization and edit-aware alignment described in Section 3.2: Naïve, Linearized, LTRE, Aligned naïve, and Aligned Linearized. Table 4 shows the performance of each input representation on detection and synthesis. The edit-aware input formats: LTRE, Aligned Naïve, and Aligned Linearized attain an improvement over the edit-unaware formats. Our Aligned representations are more succinct and contribute to a large increase in accuracy over the edit-unaware formats. Aligned Naïve increases accuracy over our best edit-unaware format by 12.16% for top-1 and 12.27% for top-3. We believe this is due to the verbosity of including the underlying tokens as well as the Δ edit sequence. The combination of our edit-aware and summarization insights (Aligned Linearized) yields the highest accuracy.

### 5.5 Summary of Results

Our evaluation and baselines indicate that the problem of synthesizing resolutions is a non-trivial task, even when restricted to resolutions that rearrange lines from the conflict. DEEPMERGE not only can synthesize resolutions for more than a third of times, but can also use its internal confidence to achieve high precision (72%). DEEPMERGE can synthesize resolutions significantly more accurately than heuristic-based, neural, and structured approaches. We also illustrate the need for edit-aware aligned encoding of merge inputs to help deep learning be more effective synthesizing non-trivial resolutions.

## 6 RELATED WORK

Our technique is related to several existing works in both program merging and deep learning for code.

### 6.1 Source Code Merging

The most widely used method for merging changes is diff3, the default for most version control systems. One reason for its popularity is that diff3 is purely text based and therefore language agnostic. However, its behavior has been formalized and Khanna et al. showed that the trust developers have in it may be misplaced [20], including the examples in Figure 1.

There have been many attempts to improve merge algorithms by taking language specific analyses into account (see the work of Mens for a broad survey [23]). Westfechtel et al. use the structure of the source code to reduce merge