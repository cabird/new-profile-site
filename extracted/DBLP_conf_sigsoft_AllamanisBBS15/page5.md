The subtoken context model exploits the fact that identifier names are often formed by concatenating words in a phrase, such as getLocation or setContentLengthHeader. We call each of the smaller words in an identifier a subtoken. We split identifier names into subtokens based on camel case and underscores, resulting in a set of subtokens that we use to compose new identifiers. To do this, we exploit the summation trick we used in r̂_context. Recall that we constructed this vector as a sum of embedding vectors for particular features in the context. Here, we define the embedding of a target vector to be the sum of the embeddings of its subtokens.

Let t be the token that we are trying to predict from a context c. As in the context model, c can contain tokens before and after t, and tokens from the global context. In the subtoken model, we additionally suppose that t is split up into a sequence of M subtokens, that is, t = s1 s2 ... sM, where sM is always a special END subtoken that signifies the end of the subtoken sequence. That is, the context model now needs to predict a sequence of subtokens in order to predict a full identifier. We begin by breaking up the prediction one subtoken at a time, using the chain rule of probability: P(s1 s2 ... sM | c) = ∏_{m=1}^M P(sm | s1 ... s_{m-1}, c). Then, we model the probability P(sm | s1 ... s_{m-1}, c) of the next subtoken sm given all of the previous ones and the context. Since preliminary experiments with an n-gram version of a subtoken model showed that n-grams did not yield good results, we employ a log-bilinear model

P(sm | s1 ... s_{m-1}, c) = exp{s_θ(sm, s1 ... s_{m-1}, c)} / Σ_{s'} exp{s_θ(s', s1 ... s_{m-1}, c)}. (5)

As before, s_θ(sm, s1 ... s_{m-1}, c) can be interpreted as a score, which can be positive or negative and indicates how much the model “likes” to see the subtoken sm, given the previous subtokens and the context. The exponential functions and the denominator are a mathematical device to convert the score into a probability distribution.

We choose a bilinear form for s_θ, with the difference being that in addition to tokens having embedding vectors, subtokens have embeddings as well. Mathematically, we define the score as

s_θ(sm, s1 ... s_{m-1}, c) = r̂_{SUBC} q_sm + b_sm, (6)

where q_sm ∈ R^D is an embedding for the subtoken sm, and r̂_{SUBC} is a continuous vector that represents the previous subtokens and the context. To define a continuous representation r̂_{SUBC} of the context, we break this down further into a sum of other embedding features as

r̂_{SUBC} = r̂_{context} + r̂_{SUBC-TOK}. (7)

In other words, the continuous representation of the context breaks down into a sum of two vectors: the first term r̂_{context} represents the effect of the surrounding tokens c — both local and global — and is defined exactly as in the context model via (4).

The new aspect is how we model the effect of the previous subtokens s1 ... s_{m-1} in the second term r̂_{SUBC-TOK}. We handle this by assigning each subtoken s a second embedding vector r_s ∈ R^D that represents its influence when used as a previous subtoken; we call this a history embedding. We weight these vectors by a diagonal matrix C_{SUBC}, to allow the model to learn that subtokens have decaying influence the farther that they are from the token that is being predicted. Putting this all together, we define

r̂_{SUBC-TOK} = Σ_{i=1}^M C_{SUBC}^{-i} r_{s_{m-i}}. (8)

This completes the definition of the subtoken context model. To sum up, the parameters of the subtoken context model are (a) the target embeddings q_s for each subtoken s that occurs in the data, (b) the history embeddings r_s for each subtoken s, (c) the diagonal weight matrices C_{SUBC}^{-m} for m = 1, 2, ..., M that represent the effect of distance on the subtoken history (we use M = 3, yielding a 4-gram-like model on subtokens) and the parameters that we carried over from the log-bilinear context model: (d) the local context embeddings r_t for each token t that appears in the context, (e) the local context weight matrices C_{-k} and C_k for −K ≤ k ≤ K, k ≠ 0, and (f) the feature embeddings r_f for each feature f(c) of the global context. We estimate all of these parameters from the training corpus.

Although this may seem a large number of parameters, this is typical for language models, e.g., consider the V^5 parameters, if V is the number of lexemes required by a 5-gram language model. How can we handle so many parameters? The reason is simple: in the era of vast, publicly available source code repositories like GitHub and Bitbucket, code scarcity is a thing of the past.

Generating Neologisms A final question is “Given the context c, how do we find the lexeme t that maximizes P(t | c)?”. Previous models could answer this question simply by looping over all possible lexemes in the model, but this is impossible for a subtoken model, because there are infinitely many possible neologisms. So we employ beam search (see Russell and Norvig [44] for details) to find the B tokens (i.e., subtoken sequences) with the highest probability.

## 2.4 Source Code Features for Context Models

In this section, we describe the features we use to capture global context. Identifying software measures and features that effectively capture semantic properties like comprehensibility or bug-proneness is a seminal software engineering problem that we do not tackle in this paper. Here, we have selected measures and features heavily used in the literature and industry. For instance, control flow is indisputably important; we selected Cyclomatic complexity, despite its correlation with code size, to measure it. The first column of Table 4 defines the features we used in this work. In the table, “VariableType” tracks whether the type is generic, its type after erasure, and, if the type is an array, its size. “ContainedMethods” and “SiblingMethods” exclude method overloads and recursion.

The features of a target token are its target features; we assign a r_f vector to each of them; this vector is added in the left summation of Equation 4 if a feature’s indicator function f returns 1 for a particular token. Although features are binary, we describe some — like the modifiers of a declaration, the node type of an AST, etc. — as categorical. All categorical features are converted into binary using a 1-of-K encoding. For methods, we include Cyclomatic complexity, clipping it to 10 and treating it as categorical. When features do not make sense for a particular token, like the Cyclomatic complexity of a variable, the feature’s function simply returns zero.

## 3. METHODOLOGY

The core challenge of solving the method naming problem from code is data sparsity. Our guiding intuition is that source code contains rich structure that can alleviate the sparsity problem. We therefore pose the following question: How can we better maximally exploit the structure inherent to source code? This question in turn leads us to the research questions:

- RQ1. Can we identify and extract long and short-range context features of identifiers for naming?
- RQ2. Do identifiers contain exploitable substructure?

Answering both of these questions in the affirmative, we turn our attention to exploiting the resulting naming information; here, we ask if this new information is sufficiently rich to allow us to accurately suggest names. More concretely:

- RQ3. Can we accurately suggest method declaration names, looking only at the context of the declared method?
- RQ4. Can we do the same for class (i.e. type) names?