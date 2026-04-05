the JS code on the left-hand side of Figure 1: the type for p may be inferred from the call to createElement, which returns an HTMLElement. 2 On the other hand, the type of cssText is almost certainly string, but this cannot soundly be inferred from its usage here. 3 For such identifiers, developers would need to add type annotations, as shown in the TS code on the right.

### 2.2 Type Suggestion

To the developer wishing to transition from the code on the left to that on the right in Figure 1, a tool that can recommend accurate type annotations, especially where traditional type inference fails, would be helpful. This type suggestion task of easing the transition from a partially to a fully typed code-base is the goal of our work. We distinguish two objectives for type suggestion:

(1) Closed-world type suggestion recommends annotations to the developer from some finite vocabulary of types, e.g. to add to declarations of functions or variables.

(2) Open-world type suggestion aims to suggest novel types to construct that reflect computations in the developer’s code.

As a first step to assisting developers in annotating their code, we restrict ourselves to the first task and leave the second to future work. Specifically, our goal is to learn to recommend the (ca. 11,000) most common types from a large corpus of code, including those shown in Figure 1. To achieve this, we view the type inference problem as a translation problem between un-annotated JS/TS and annotated TS. We chose to base our work on TS because, as a superset of JS, it is designed to displace JS in developers’ IDEs. Thus, a growing body of projects have already adopted it (including well known projects such as Angular and Reactive Extensions) and we can leverage their code to train DeepTyper. We can use TS’ compiler to automatically generate training data consisting of pairs of TS without type annotations and the corresponding types for DeepTyper’s training.

Here, the fact that we are translating between two such closely related languages is a strength of our approach, easing the alignment problem [9, 16] and vastly reducing the search space our models must traverse. 4 We train our translator, DeepTyper, on TS inputs (Figure 1, right), then test it on JS (left) or partially annotated TS files. DeepTyper suggests variable and function annotations, consisting of return, local variable, and parameter types.

## 3 METHOD

To approach type inference with machine learning, we are inspired by existing natural language processing (NLP) tasks, such as part-of-speech (POS) tagging and named entity recognition (NER) [12, 20]. In those tasks, a machine learning model needs to infer the role of a given word from its context. For example, the word “mail” can be either a verb or a noun when viewed in isolation, but when given context in the sentence “I will mail the letter tomorrow”, the part of speech becomes apparent. To solve this ambiguity, NLP research has focused on probabilistic methods that learn from data.

2 Provided the type of ownerDocument is Document, which may itself require an annotation.

3 Grammatically, it could e.g. be number.

4 Vasilescu et al.’s work on deobfuscating JS also successfully leverages machine translation between two closely related languages [33].

Tasks like these are amenable to sequence-to-sequence models, in which a sequence of tokens is transformed into a sequence of types (in our case) [32]. Specifically, our task is a sequence of annotation tasks, in which all elements s_i in an input sequence s1...sN need to be annotated. Therefore, when approaching this problem with probabilistic machine learning, the modeled probability distribution is P(τ0...τN | s0...sN), where τi represents the type annotation of si. In our case, the annotations are the types for the tokens in the input, where we align tokens that have no type (e.g. punctuation, keywords) with a special no-type symbol.

Although deriving type annotations has many similarities to POS tagging and NER, it also presents some unique characteristics. First, our tasks has a much larger set of possible type annotations. The widely used Penn Treebank Project uses only 36 distinct parts-of-speech tags for all English words, while we aim to predict more than 11,000 types (Section 4.2). Furthermore, NLP tasks annotate a single instance of a word, whereas we are interested in annotating a variable that may be used multiple times, and the annotations ought to be consistent across occurrences.

### 3.1 A Neural Architecture for Type Inference

Similar to recent models in NLP, we turn to deep neural networks for our type inference task. Recurrent Neural Networks (RNN) [9, 15, 19] have been widely successful at many natural language annotation tasks such as named entity recognition [12] and machine translation [9]. RNNs are neural networks that work on sequences of elements, such as words, making them naturally fit for our task. The general family of RNNs is defined over a sequence of elements s1...sN as h_t = RNN(x_{s_t}, h_{t-1}) where x_{s_t} is a learned representation (embedding) of the input element s_t and h_{t-1} is the previous output state of the RNN. The initial state h0 is usually set to a null vector (0). Both x and h are high dimensional vectors, whose dimensionality is tunable: higher dimensions allow the model to capture more information, but also increase the cost of training and may lead to overfitting.

As we feed input tokens to the network in order, the vector x for each token is its representation, while h is the output state of the RNN based on both this current input and its previous state. Thus, RNNs can be seen as networks that learn to “summarize” the input sequence s1...st with ht. There are many different implementations of RNNs; in this work, we use GRUs (Gated Recurrent Unit) [9]. For a more extensive discussion of RNNs, we refer the reader to Goodfellow et al. [15].

In general translation tasks (e.g. English to French), the length and ordering of words in the input and output sequence may be different. RNN-based translation models account for these changes by first completely digesting the input sequence, then using their final state (typically plus some attention mechanism [26]) to construct the output sequence, token by token. In our case, however, the token and type sequence are perfectly aligned, allowing us to treat our suggestion task as a sequence annotation task, also used for POS tagging and NER. In this setting, for every input token that we provide to the RNN, we also expect an output type judgement. Since the RNN does not have to digest the full input before making type judgements, using this precise alignment can yield better performance.