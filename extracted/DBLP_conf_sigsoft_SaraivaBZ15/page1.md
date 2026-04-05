## Products, Developers, and Milestones: How Should I Build My N-Gram Language Model

Juliana Saraiva — Federal University of Pernambuco, Recife, Brazil — jags2@cinf.ufpe.br  
Christian Bird — Microsoft Research, Redmond, WA, USA — cbird@microsoft.com  
Thomas Zimmermann — Microsoft Research, Redmond, WA, USA — tzimmer@microsoft.com

### ABSTRACT
Recent work has shown that although programming languages enable source code to be rich and complex, most code tends to be repetitive and predictable. The use of natural language processing (NLP) techniques applied to source code such as n-gram language models show great promise in areas such as code completion, aiding impaired developers, and code search. In this paper, we address three questions related to different methods of constructing language models in an industrial context. Specifically, we ask: (1) Do application-specific, but smaller language models perform better than language models across applications? (2) Are developer-specific language models effective and do they differ depending on what parts of the codebase a developer is working in? (3) Finally, do language models change over time, i.e., does a language model from early development change later on in development? The answers to these questions enable techniques that make use of programming language models in development to choose the model training corpus more effectively.

We evaluate these questions by building 28 language models across developers, time periods, and applications within Microsoft Office and present the results in this paper. We find that developer and application-specific language models perform better than models from the entire codebase, but that temporality has little to no effect on language model performance.

### Categories and Subject Descriptors
D.2.3 [Software Engineering]: Coding Tools and Techniques

### General Terms
Measurement, Experimentation

### Keywords
N-gram Models, Natural Language Processing

### 1. INTRODUCTION
In their work on the naturalness of software, Hindle et al. showed that n-gram based language models perform quite well when used in the software engineering domain on source code [1]. A language model assigns a probability to a sequence of words (n-grams); the probability is typically learned from a training corpus. In recent years, these language models trained on source code corpora have been leveraged to aid in a wealth of tasks in software engineering including code completion [1] [2], detecting and enforcing team coding conventions [3], generating comments [4], suggesting accurate names of program entities [5], improving error messages [6] and migrating code between languages [7].

A language model assigns probabilities to sequences of token (also called n-grams) based on frequencies of the sequences in the training corpus. These probabilities can then be used to help developers in common programming tasks. A simple example is code completion, e.g., after encountering the sequence "for (int i=0; i<n;", a tool would automatically suggest the suffix "i++)" because it is the most frequent suffix for such code.

When training language models on source code, one faces two competing forces:

- **Specificity.** Language models can only provide help in source code that is similar to source code that it has seen before. Thus, the data sparsity problem, i.e., the need to see instances of many code contexts, drives the use of larger and larger corpora to train the model.

- **Generality.** On the other hand, the more disparate code bases are used, the less specific the model is and the less nuanced the help that it can provide. Put concretely, training a model on Apache Lucene will lead to a model that has Lucene-specific knowledge, but the model may not have suggestions or help for code contexts outside of the text search domain. In contrast, training a model on all of the code on GitHub will lead to models that contain general "knowledge" of programming for virtually every API, code construct, or pattern, but will not be specific to any particular application.

Given these tradeoffs, practitioners hoping to use language models in their own work are faced with the question, "How should I train my language model?" In this paper, we shed light on this question by sharing our experience on building language models on several different "slices" of the same codebase and comparing the results.

Specifically, we examine the code of Microsoft Office (hereafter referred to as Office). Office is a prime subject for such a study because the code is large, i.e., tens of millions of lines of code, and can be partitioned along a number of dimensions.

- Office is a suite of office productivity software applications including a word processor (Word), a spreadsheet application (Excel), and a presentation creator (PowerPoint). Thus we can naturally divide the code by application and train application-specific language models.

- Office is developed by thousands of full time developers, which allows us to partition the changes by the individuals and train developer-specific models.

- Finally, Office is developed in development milestones allowing us to train language models on the changes that are made in certain periods, i.e., time-specific models.