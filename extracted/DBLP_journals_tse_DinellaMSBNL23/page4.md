> CH1: Encode programs A, B, and O as the input to a Seq2Seq model.

### 2.2.2 Constructing the Output Resolution
Our key insight that a majority of resolutions do not introduce new lines leads us to construct the output resolution directly from lines in the conflicting region. This naturally suggests the use of pointer networks [34], an encoder-decoder architecture capable of producing outputs explicitly pointing to tokens in the input sequence. However, a pointer network formulation suggests an equivalent input and output granularity. In Section 3.2, we show that the input is best represented at a granularity far smaller than lines.

Thus, the challenge is:
> CH2: Output R at the line granularity given a non-line granularity input.

### 2.2.3 Extracting Ground Truth from Raw Merge Data
Finally, to learn a data-driven merge algorithm, we need real-world data that serves as ground truth. Creating this dataset poses non-trivial challenges. First, we need to localize the resolution region and corresponding conflicting region. In some cases, developers performing a manual merge resolution made changes unrelated to the merge. Localizing resolution regions unambiguously from input programs is challenging due to the presence of these unrelated changes. Second, we need to be able to recognize and subsequently filter merge resolutions that do not incorporate both the changes. In summary, we have:
> CH3: Identify merge tuples {(A_i, B_i, O_i, R_i)}_{i=1}^M given (A, B, O, M).

## 3 THE DEEPMERGE ARCHITECTURE
Section 2 suggested one way to learn a three-way merge is through a maximum likelihood estimate of a sequence-to-sequence model. In this section we describe DEEPMERGE, the first data-driven merge framework, and discuss how it addresses challenges CH1 and CH2. We motivate the design of DEEPMERGE by comparing it to a standard sequence-to-sequence model, the encoder-decoder architecture.

### 3.1 Encoder Decoder Architectures
Sequence-to-sequence models aim to map a fixed-length input ((X_N)_{N∈N}), to a fixed-length output, ((Y_M)_{M∈N}). The standard sequence-to-sequence model consists of three components: an input embedding, an encoder, and a decoder.

Input embedding: An embedding maps a discrete input from an input vocabulary V (x_n ∈ |V|), to a continuous D dimensional vector space representation (x_n ∈ R^D). Such a mapping is obtained by multiplication over an embedding matrix E ∈ R^{D×|V|}. Applying this for each element of X_N gives X^N.

Encoder: An encoder, encode, processes each x_n and produces a hidden state, z_n, which summarizes the sequence up to the n-th element. At each iteration, the encoder takes as input the current sequence element x_n, and the previous hidden state z_{n−1}. After processing the entire input sequence, the final hidden state, z_N, is passed to the decoder.

Note: 2. Note that M is not necessarily equal to N.

Decoder: A decoder, decode, produces the output sequence Y^M from an encoder hidden state Z_n. Similar to encoders, decoders work in an iterative fashion. At each iteration, the decoder produces a single output token y_m along with a hidden summarization state h_m. The current hidden state and the previous predicted token y_m are then used in the following iteration to produce y_{m+1} and h_{m+1}. Each y_m the model predicts is selected through a softmax over the hidden state:
p(y_m | y_1, ..., y_{m−1}, X) = softmax(h_m)

DEEPMERGE is based on this encoder-decoder architecture with two significant differences.

First, rather than a standard embedding followed by encoder, we introduce a novel embedding method called Merge2Matrix. Merge2Matrix addresses CH1 by summarizing input programs (A, B, O) into a single embedding fed to the encoder. We discuss our Merge2Matrix solution as well as less effective alternatives in Section 3.2.

Second, rather than using a standard decoder to generate output tokens in some output token vocabulary, we augment the decoder to function as a variant of pointer networks. The decoder outputs line tuples (i, W) where W ∈ {A, B} and i is the i-th line in W. We discuss this in detail in Section 3.4.

Example 2. Figure 4 illustrates the flow of DEEPMERGE as it processes the inputs of a merge tuple. First, the raw text of A, B, and O is fed to Merge2Matrix. As the name suggests, Merge2Matrix summarizes the tokenized inputs as a matrix. That matrix is then fed to an encoder which computes the encoder hidden state z_N. Along with the start token for the decoder hidden state, the decoder takes z_N and iteratively (denoted by the ···) generates as output the lines to copy from A and B. The final resolution is shown in the green box.

### 3.2 Merge2Matrix
An encoder takes a single sequence as input. As discussed in Section 2.2, a merge tuple consists of three sequences. This section introduces Merge2Matrix, an input representation that expresses the tuple as a single sequence. It consists of embedding, transformations to summarize embeddings, and finally, edit-aware alignment.

#### 3.2.1 Tokenization and Embedding
This section discusses our relatively straightforward application of both tokenization and embedding.

Tokenization. Working with textual data requires tokenization whereby we split a sequence of text into smaller units referred to as tokens. Tokens can be defined at varying granularities such as characters, words, or sub-words. These units form a vocabulary which maps input tokens to integer indices. Thus, a vocabulary is a mapping from a sequence of text to a sequence of integers. This paper uses byte-pair encoding (BPE) as it has been shown to work well with source code, where tokens can be formed by combining different words via casing conventions (e.g. snake_case or