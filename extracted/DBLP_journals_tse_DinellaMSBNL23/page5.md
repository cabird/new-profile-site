![DEEPMERGE framework diagram](page5_img_1.png)

Figure 4: Overall DEEPMERGE framework. The dotted box represents repetition of decode until m = M i.e. the {STOP} token is predicted. In this example, we have omitted m = 2 in which the call to decode outputs y2 = {3, A}.

Embedding. Given an input sequence X_N, and a hyperparameter (embedding dimension) D, an embedding transformation creates X_N. As described in Section 3.1, the output of this embedding is then fed to an encoder. Because a merge tuple consists of three inputs (A, B, and O), the following sections introduce novel transformations that summarize these three inputs into a format suitable for the encoder.

### 3.2.2 Merge Tuple Summarization

In this section, we describe summarization techniques that are employed after embedding. Before we delve into details, we first introduce two functions used in summarization.

Suppose a function that concatenates embedded representations:

concat_s : (R^{D×N} × ··· × R^{D×N}) → R^{D×sN}

that takes s similarly shaped tensors as arguments and concatenates them along their last dimension. Concatenating these s embeddings increases the size of the encoder’s input by a factor of s.

Suppose a function linearize that linearly combines s embedded representations. We parameterize this function with learnable parameters θ ∈ R^{s+1}. As input, linearize takes an embedding x_i ∈ R^D for i ∈ 1..S. Thus, we define

linearize(x_1, ..., x_s) = θ_1 · x_1 + ··· + θ_s · x_s + θ_{s+1}

where all operations on the inputs x_1, ..., x_s are pointwise. linearize reduces the size of the embeddings fed to the encoder by a factor of s.

Now that we have defined two helper functions, we describe two summarization methods.

Naïve. Given a merge tuple’s inputs (A, B, O), a naïve implementation of Merge2Matrix is to simply concatenate the embedded representations (i.e., concat_3(A, B, O)). Traditional sequence-to-sequence models often suffer from information forgetting; as the input grows longer, it becomes harder for encoder to capture long-range correlations in that input. A solution that addresses CH1 must be concise while retaining the information in the input programs.

Linearized. As an attempt at a more concise representation, we introduce a summarization we call linearized. This method linearly combines each of the embeddings through our helper function: linearize_θ(A, B, O). In Section 5 we empirically demonstrate better model accuracy when we summarize with linearize_θ rather than concat_s.

### 3.2.3 Edit-Aware Alignment

In addition to input length, CH1 also alludes that an effective input representation needs to be “edit aware”. The aforementioned representations do not provide any indication that A and B are edits from O.

Prior work, Learning to Represent Edits (LTRE) [38] introduces a representation to succinctly encode two-way diffs. The method uses a standard deterministic diffing algorithm and represents the resulting pair-wise alignment as an auto-encoded fixed-dimension vector.

A two-way alignment produces an “edit sequence”. This series of edits, if applied to the second sequence, would produce the first. An edit sequence, Δ_AO, is comprised of the following editing actions: = representing equivalent tokens, + representing insertions, − representing deletions, ↔ representing a replacement. Two special tokens ∅ and | are used as a padding token and a newline marker, respectively. Note that these Δs only capture information about the kinds of edits and ignore the tokens that make up the edit itself (with the exception of the newline token). Prior to the creation of Δ, a preprocessing step adds padding tokens such that equivalent tokens in A (resp. B) and O are in the same position. These sequences, shown in Figure 5 are denoted as A′ and AO′ (resp. B′ and BO′).

Example 3. Consider B’s edit to O in Figure 5 via its preprocessed sequences B′, BO′, and its edit sequence Δ_BO. One intuitive view of Δ_BO is that it is a set of instructions that describe how to turn B′ into BO′ with the aforementioned semantics. Note the padding token ∅ introduced into Δ_BO represents padding out to the length of the longer edit sequence Δ_AO.

We now describe two edit-aware summarization methods based on this edit-aware representation. However, our setting...