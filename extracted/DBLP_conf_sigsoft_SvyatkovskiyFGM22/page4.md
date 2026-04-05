![MergeBERT architecture diagram](page4_img_1.png)

Figure 2: An overview of the MergeBERT architecture. From left to right: given conflicting programs A, B and O token-level differencing is performed first, next, programs are tokenized and the corresponding sequences are aligned (a|o and o|a, b|o, and o|b). We extract edit steps for each pair of token sequences (Δ_ao and Δ_bo). Four aligned token sequences are fed to the multi-input encoder neural network, while edit sequences are consumed as edit type embeddings. Finally, encoded token sequences are aggregated into a hidden state which serves as input to classification layer.

Token-level diff3 applied to a 4-tuple of programs (A, B, O, M), would usually result in a set of localized merge tuples ⟨a_j, b_j, o_j, m_j⟩. We empirically observe that 74% of such resolutions m_j are comprised of (i) exactly the tokens in a_j or (ii) exactly the tokens in b_j. Another 0.4% of the resolutions are (iii) just the tokens in o_j. In addition, 23% of the resolutions are the result of concatenating (iv) a_j and b_j or (v) b_j and a_j. Finally, 1.8% comprise another four variants, obtained by taking i, ii, iv and v above and removing the tokens that also occur in the base, o_j. In total, this provides nine primitive merge resolution patterns (see online Appendix [18] for more details about the primitive merge patterns).

We, therefore, treat the problem of constructing merge conflict resolutions m_j as a classification task to predict between these possibilities. It is important to note that although we are predicting simple resolution strategies at the token-level, they may translate to complex resolutions at the line-level. In addition, not all conflicts are resolved by breaking that conflict into tokens and applying these patterns—some resolutions such as those introducing new tokens or reordering tokens are not expressible as a choice at the token-level.

## 5 MERGEBERT: NEURAL PROGRAM MERGE FRAMEWORK

MergeBERT is a textual program merge model based on the bidirectional transformer encoder (BERT) model [14]. We refer the reader to CodeBERT [17] for a discussion on applying transformers to code. A transformer, like a recurrent neural network, maps a sequence of text into a high dimensional representation, which can later be decoded to solve downstream tasks. While not originally designed for code, transformers have found many applications in software engineering [11, 26, 47].

MergeBERT approaches merge conflict resolution as a sequence classification task given conflicting regions extracted with token-level differencing and surrounding code as context. The key technical innovation in MergeBERT lies in how it breaks program text into an input representation amenable to learning with a transformer encoder and how it aggregates various input encodings for classification.

In the standard sequence learning setting there is a single input and single output sequence. In the merge conflict resolution task, there are multiple conflicting input programs and one resolution. To facilitate learning in this setting, we construct MergeBERT as a multi-input encoder neural network, which first encodes token sequences of conflicting programs, then aggregates them into a single hidden summarization state.

An overview of the MergeBERT model architecture is shown in Fig. 2. Given conflicting programs A, B and O we first perform tokenization and then repeat the three-way differencing at token granularity. If a conflict still exists in this token-level three-way differencing, we collect the token sequences corresponding to conflicting regions a, b, and o, and compute pair-wise alignments of a and b with respect to the base o. Finally, for each pair of aligned token sequences we extract an "edit sequence" that represents how to turn the second sequence into the first. The resulting aligned token sequences are fed to the multi-input encoder neural network, while the corresponding edit sequences are consumed as type embeddings. Finally, the encoded token sequences are summarized into a hidden state which serves as input to the classification layer.

Given a 4-tuple of programs (A, B, O, M) which contains token-level merge tuples (a_j, b_j, o_j, m_j), j = 0...N, MergeBERT models the following conditional probability distribution:

p(m_j | a_j, b_j, o_j), (1)

and consequently, for entire programs:

p(M | A, B, O) = ∏_{j=1}^N p(m_j | a_j, b_j, o_j) (2)