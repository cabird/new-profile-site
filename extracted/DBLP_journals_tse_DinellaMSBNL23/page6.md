![Merge2Matrix diagram](page6_img_1.png)

Figure 5: Merge2Matrix: implemented with the Aligned Linearized input representation used in DEEPMERGE.

differs from the original LTRE setting as we assume three input sequences and a three-way diff. In the following summarization methods, we assume that A, B, O are tokenized, but not embedded before invoking Merge2Matrix.

Aligned naïve. Given ∆AO and ∆BO, we embed each to produce ∆AO and ∆BO, respectively. Then we combine these embeddings through concatenation and thus concat2(∆AO, ∆BO) is fed to the encoder.

Aligned linearized. This summarization method is depicted in Figure 5, invoking linearize to construct an input representation over edit sequences. First, we apply alignment to create ∆AO and ∆BO. This is portrayed through the ⊕ operator. Following construction of the ∆s, we apply embedding and subsequently apply our edit-aware linearize ⊗ operation. Thus, we summarize embeddings with linearize(∆AO, ∆BO) and feed its output to the encoder. As we demonstrate in Section 5, this edit-aware input representation significantly increases the model’s accuracy.

LTRE. Finally, for completeness, we also include the original LTRE representation. We modify this to our setting by creating two 2-way diffs. The original LTRE has a second key difference from our summarization methods. LTRE includes all tokens from the input sequences in addition to the edit sequences. That is, LTRE summarizes A, A0, AO, ∆AO, B, B0, BO, and ∆BO. Let A, A0 and ∆AO (resp. B, B0, BO, and ∆BO) be the embedding of a two-way diff. Then, the following summarization combines all embeddings: concat(∆AO, A, A0, ∆BO, B, B0, BO, ∆BO).

### 3.3 The Encoder

The prior sections described Merge2Matrix which embeds a merge into a continuous space which is then summarized by an encoder. DEEPMERGE uses a bi-directional gated recurrent unit (GRU) to summarize the embedded input sequence. We empirically found that a bi-directional GRU was more effective than a uni-directional GRU.

### 3.4 Synthesizing Merge Resolutions

This section summarizes DEEPMERGE’s approach to solving CH2. Given a sequence of hidden vectors Z_N produced by an encoder, a decoder generates output sequence Y_M. We introduce an extension of a traditional decoder to copy lines of code from those input programs.

Denote the number of lines in A and B as Li_A and Li_B, respectively. Suppose that L = 1..(Li_A + Li_B); then, a value i ∈ L corresponds to the i-th line from A if i ≤ Li_A, and the (i − Li_A)-th line from B, otherwise.

Given merge inputs (A, B, O), DEEPMERGE’s decoder computes a sequence of hidden states H_M, and models the conditional probability of lines copied from the input programs A, B, and O by predicting a value y_m ∈ Y_M:

p(y_m | y_1, ..., y_{m−1}, A, B, O) = softmax(h_m)

where h_m ∈ H_M is the decoder hidden state at the m-th element of the output sequence and the argmax(y_m) yields an index into L.

In practice, we add an additional <STOP> token to L. The <STOP> token signifies that the decoder has completed the sequence. The <STOP> token is necessary as the decoder may output a variable number of lines conditioned on the inputs.

This formulation is inspired by pointer networks, an encoder-decoder architecture that outputs an index that explicitly points to an input token. Such networks are designed to solve combinatorial problems like sorting. Because the size of the output varies as a function of the input, a pointer network requires a novel attention mechanism that applies attention weights directly to the input sequence. This differs from traditional attention networks which are applied to the outputs of the encoder Z_N. In contrast, DEEPMERGE requires no change to attention. Our architecture outputs an index that points to the abstract concept of a line, rather than an explicit token in the input. Thus, attention applied to Z_N, a summarization of the input, is sufficient.