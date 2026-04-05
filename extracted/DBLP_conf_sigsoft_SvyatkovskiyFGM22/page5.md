![Example edit sequence](page5_img_1.png)

Figure 3: An example edit sequence extracted between a pair of token sequences. Top row is o|b, bottom is b|o, and middle is ∆bo. Padding symbols [PAD] are introduced for alignment. In this case, the target token sequence is obtained by swapping a token and inserting two tokens.

Independence of token-level conflicts is a simplifying assumption. However, we observe that in our data set only 5% of merge conflicts result in more than 1 token-level conflict per line-level conflict.

### 5.1 Context Encoding

For a merge tuple (a, b, o, m) MergeBERT calculates two pair-wise alignments between the sequences of tokens of conflicting regions a (respectively b) with respect to that of the original program o: a|o, o|a, b|o, and o|b. For each pair of aligned token sequences we compute an edit sequence. These edit sequences — ∆ao and ∆bo — are comprised of the following editing actions (kinds of edits): = represents equivalent tokens, + represents insertions, - represents deletions, ↔ represents a replacement, and ∅ is used as a padding token. Overall, this produces four token sequences and two edit sequences: (a|o, o|a, and ∆ao) and (b|o, o|b, and ∆bo). Fig. 3 provides an example of an edit sequence. Each token sequence covers the corresponding conflicting region and, potentially, surrounding code tokens. We make use of Byte-Pair Encoding (BPE) unsupervised tokenization to avoid a blowup in the vocabulary size given the sparse nature of code identifiers [27]. To help the model learn to recognize editing steps we introduce an edit type embedding. We combine it with the standard token and position embeddings utilized in BERT model architecture via addition.

### 5.2 Merge Tuple Aggregation

We utilize transformer encoder model E to independently encode each of the four token sequences of token-level conflicting regions a|o, o|a, b|o, and o|b, passing corresponding edit sequences ∆ao and ∆bo as type embeddings. Finally, MergeBERT aggregates the resulting encodings into a single hidden summarization state h:

h = ∑_{x ∈ (a|o, o|a, b|o, o|b)} θ_x · E(x, ∆x)  (3)

where E(x, ∆x) are the encoded tensors for each of the sequences x ∈ (a|o, o|a, b|o, o|b), and θ_x are learnable weights. After aggregation a linear classification layer with softmax is applied:

p(m_j | a_j, b_j, o_j) = softmax(W · h + b)  (4)

The resulting line-level resolution region is obtained by concatenating the prefix, predicted token-level resolution m_j, and the suffix. Finally, in the case of a one-to-many correspondence between the original line-level and the token-level conflicts (see Appendix for more details and a pseudocode), MergeBERT uses a standard beam-search to decode the most promising predictions.

### 5.3 Implementation Details

We utilize a pretrained CodeBERT1 model with 6 encoder layers, 12 attention heads, and a hidden state size of 768. The vocabulary is constructed using byte-pair encoding [39] and the vocabulary size is 50,000. We transfer the weights of the pretrained transformer encoder into the MergeBERT multi-input neural network, and attach a randomly initialized linear layer with softmax. We then finetune the resulting neural network in a supervised setting for the sequence classification task. Input sequences for finetuning training cover conflicting regions and surrounding code (i.e., fragments of prefix and suffix of a conflicting region) up to a maximum length of 512 BPE tokens. The backbone of our implementation is HuggingFace’s2 RobertaModel and RobertaForSequenceClassification classes in PyTorch, which are modified to turn the model into a multi-input architecture shown in Fig. 2. We finetune MergeBERT with Adam stochastic optimizer with weight decay fix using a learning rate of 5e-5, 512 batch size and 8 backward passes per allreduce. The finetuning training was performed on 4 NVIDIA Tesla V100 GPUs with 16GB memory for 6 hours.

In the inference phase, the model prediction for each line-level conflict consists of one or more token-level predictions. Given the token-level predictions and the contents of the merged file, MergeBERT generates the code corresponding to the resolution region. The contents of the merged file include the conflict in question and its surrounding regions. Afterward, MergeBERT checks the syntax of the generated code with a tree-sitter3 parser and outputs it as the candidate merge conflict resolution only if it is syntactically correct.

## 6 RESEARCH QUESTIONS

We pose the following research questions to evaluate the effectiveness of utility of MergeBERT.

- RQ1: How effective is MergeBERT in producing merge conflict resolutions? We evaluate MergeBERT’s performance of producing resolutions in terms of precision and accuracy of matching the actual user resolution extracted from real-world merge resolutions. We also provide a comparison MergeBERT to baseline approaches (at both the line and token level) and state of the art merge resolution approaches.

- RQ2: How well does MergeBERT perform across different languages? One of our primary goals is to be able to work on multiple languages with minimal effort. The core approach of MergeBERT is fundamentally language agnostic (though a parser and tokenizer is required for each additional language). We evaluate performance of MergeBERT across four languages and also compare the results of using four language-specific models (each trained on just one language) to using one multi-lingual model trained on the data from all four languages.

1 https://huggingface.co/huggingface/CodeBERTa-small-v1
2 https://github.com/huggingface/transformers
3 https://tree-sitter.github.io/tree-sitter