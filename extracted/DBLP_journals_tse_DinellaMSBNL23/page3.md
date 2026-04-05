1) is the first to define merge conflict resolution as a machine learning problem and identify a set of challenges for encoding it as a sequence-to-sequence supervised learning problem (§2).  
2) presents a data-driven merge tool DEEPMERGE that uses edit-aware embedding to represent merge inputs and a variation of pointer networks to construct the resolved program (§3).  
3) derives a real-world merge dataset for supervised learning by proposing an algorithm for localizing resolution regions (§4).  
4) performs an extensive evaluation of DEEPMERGE on merge conflicts in real-world JavaScript programs. And, demonstrates that it can correctly resolve a significant fraction of unstructured merge conflicts with high precision and 9x higher accuracy than a structured approach.

## 2 DATA-DRIVEN MERGE

We formulate program merging as a sequence-to-sequence supervised learning problem and discuss the challenges we must address in solving the resulting formulation.

### 2.1 Problem Formulation

A merge consists of a 4-tuple of programs (A, B, O, M) where A and B are both derived from a common O, and M is the developer resolved program.

A merge may consist of one or more regions. We define a merge tuple ((A, B, O), R) such that A, B, O are (sub)programs that correspond to regions in A, B, and O, respectively, and R denotes the result of merging those regions. Although we refer to (A, B, O, R) as a merge tuple, we assume that the tuples also implicitly contain the programs that they came from as additional contexts (namely A, B, O, M).

**Definition 1 (Data-driven Merge).** Given a dataset of M merge tuples,

D = {(Ai, Bi, Oi, Ri)}_{i=1}^M

a data-driven merge algorithm merge is a function that maximizes:

sum_{i=1}^M merge(Ai, Bi, Oi) = Ri

treating Boolean outcomes of the equality comparison as integer constants 1 (for true) and 0 (for false).

In other words, merge aims to maximize the number of merges from D. Rather than constraining merge to exactly satisfy all merge tuples in D, we relax the objective to maximization. A perfectly satisfying merge function may not exist in the presence of a real-world noisy dataset D. For instance, there may be (Ai, Bi, Oi, Ri) ∈ D and (Aj, Bj, Oj, Rj) ∈ D for i ≠ j, Ai = Aj, Bi = Bj, Oi = Oj but Ri ≠ Rj. In other words, two merge tuples consist of the same edits but different resolutions.

Example 1. Figure 3(a) shows a merge instance that we will use as our running example throughout. This instance is formulated in our setting as the merge tuple (A, B, O, R) depicted in Figure 3(b). R contains only lines occurring in the input. The two lines in R correspond to the first line of B and the third line of A. For this example, the R also incorporates the intents from both A and B intuitively, assuming b does not appear in the rest of the programs. □

![merge instance and corresponding merge tuple](page3_img_1.png)

(a) A merge instance. (b) Corresponding merge tuple.

Figure 3: Formulation of a merge instance in our setting.

One possible way to learn a merge algorithm is by modeling the conditional probability

p(R | A, B, O) (1)

In other words, a model that generates the output program R given the three input programs.

Because programs are sequences, we further decompose Eq (1) by applying the chain rule [29]:

p(R | A, B, O) = ∏_{j=1}^N p(R_j | R_{<j}, A, B, O)

This models the probability of generating the j-th element of the program, given the elements generated so far. There are many possible ways to model a three-way merge. However, the above formulation suggests one obvious approach is to use a maximum likelihood estimate of a sequence-to-sequence model.

### 2.2 Challenges

Applying a sequence-to-sequence (Seq2seq) model to merge conflict resolution poses unique challenges. We discuss three key challenges, concerning input representation, output construction, and dataset extraction.

#### 2.2.1 Representing the Merge Inputs as a Sequence.

In a traditional sequence-to-sequence task such as machine translation, there is a single input sequence that maps to a single output sequence. However, in our case, we have three input sequences of varying sizes, corresponding to the three versions of a program involved in a merge conflict. It is not immediately evident how to determine a suitable token granularity and encode these sequences in a manner that is amenable to learning. One obvious solution is to concatenate the tokens of the three sequences to obtain a single sequence. However, the order of concatenation is unclear. Furthermore, as we show in Section 3.2, such a naive representation not only suffers from information loss and truncation, but also poor precision by being unaware of A and B’s edits over common base O. In summary, we have: