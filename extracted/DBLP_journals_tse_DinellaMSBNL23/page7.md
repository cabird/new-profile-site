### 3.5 Training and Inference with DEEPMERGE

The prior sections discussed the overall model architecture of DEEPMERGE. This section describes hyperparameters that control model size and how we trained the model. We use an embedding dimension D = 1024 and 1024 hidden units in the single-layer GRU encoder. Assume the model parameters are contained in θ; training seeks to find the values of θ that maximize the log-likelihood

arg max_θ log p_θ(R | A, B, O)

over all merge tuples ((A, B, O), R) in its training dataset. We use standard cross-entropy loss with the Adam optimizer. Training takes roughly 18 hours on a NVIDIA P100 GPU and we pick the model with the highest validation accuracy, which occurred after 29 epochs.

Finally, during inference time, we augment DEEPMERGE to use standard beam search methods during decoding to produce the most likely k top merge resolutions. DEEPMERGE predicts merge resolutions up to C lines. We set C = 30 to tackle implementation constraints and because most resolutions are less than 30 lines long. However, we evaluate DEEPMERGE on a full test dataset including samples where the number of lines in M is ≥ C.

## 4 REAL-WORLD LABELED DATASET

This section describes our solution to CH3: localizing merge instances (A, B, O, R)_i from (A, B, O, M). Since a program may have several merge conflicts, we decompose the overall merge problem into merging individual instances. As shown in Figure 3, A, B, and O regions can be easily extracted given the diff3 conflict markers. However, reliably localizing a resolution R involves two sub-challenges:

1) How do we localize individual regions R unambiguously?  
2) How do we deal with trivial resolutions?

In this section, we elaborate on each of these sub-challenges and discuss our solutions. We conclude with a discussion of our final dataset and its characteristics.

Algorithm 1 denotes a method to localize merge tuples from a corpus of merge conflict and resolution files. The top-level procedure EXTRACTMERGETUPLES takes C, the diff3 conflict file with markers, along with M, the resolved file. From those inputs, it extracts merge tuples into MT. The algorithm loops over each of the conflicted regions in C, and identifies the input (A, B, O) and output (R) of the tuple using GETCONFLICTCOMPONENTS and LOCALIZERESREGION respectively. Finally, it applies a filter on the extracted tuple (lines 5–14). We explain each of these components in the next few subsections.

### 4.1 Localization of Resolution Regions

Creating a real-world merge conflict labeled dataset requires identifying the "exact" code region that constitutes a resolution. However, doing so can be challenging; Figure 6 demonstrates an example. The developer chooses to perform a resolution baz(); that does not correspond to anything from the A or B edits, and the surrounding context also undergoes changes (e.g., changing var with let which restricts the scope in the prefix). To the best of our knowledge, there is no known algorithm to localize R for such cases.

### Algorithm 1 Localizing Merge Tuples from Files for Dataset

![Algorithm 1 pseudocode](page7_img_algo_1.png)

![Merge instance code (left)](page7_img_code_a.png)

(a) A merge instance.

![Resolution code (right)](page7_img_code_b.png)

(b) Resolution.

Figure 6: Challenging example for localizing resolution.

LOCALIZERESREGION is our method that tries to localize the i-th resolution region R, or returns nil when unsuccessful. Intuitively, we find a prefix and suffix in a merge instance and use this prefix and suffix to bookend a resolution. If we cannot uniquely find those bookends, we say the resolution is ambiguous.

The method first obtains the prefix prfx (resp. suffix sffx) of the i-th conflict region in C in line 22 (resp. line 23). We add the start of file (BOF) and end of file (EOF) tokens to