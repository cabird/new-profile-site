## Failure is a Four-Letter Word
– A Parody in Empirical Research –

Andreas Zeller*  Thomas Zimmermann  Christian Bird  
Saarland University  Microsoft Research  Microsoft Research  
Saarbrücken, Germany  Washington, USA  Washington, USA  
zeller@cs.uni-saarland.de  tzimmer@microsoft.com  cbird@microsoft.com

### ABSTRACT
Background: The past years have seen a surge of techniques predicting failure-prone locations based on more or less complex metrics. Few of these metrics are actionable, though.

Aims: This paper explores a simple, easy-to-implement method to predict and avoid failures in software systems. The IROP method links elementary source code features to known software failures in a lightweight, easy-to-implement fashion.

Method: We sampled the Eclipse data set mapping defects to files in three Eclipse releases. We used logistic regression to associate programmer actions with defects, tested the predictive power of the resulting classifier in terms of precision and recall, and isolated the most defect-prone actions. We also collected initial feedback on possible remedies.

Results: In our sample set, IROP correctly predicted up to 74% of the failure-prone modules, which is on par with the most elaborate predictors available. We isolated a set of four easy-to-remember recommendations, telling programmers precisely what to do to avoid errors. Initial feedback from developers suggests that these recommendations are straightforward to follow in practice.

Conclusions: With the abundance of software development data, even the simplest methods can produce “actionable” results.

### Categories and Subject Descriptors
D.2.8 [Software Engineering]: Metrics – process metrics, product metrics; K.3.2 [Computers and Education]: Computer and Information Science Education – computer science education; K.7.4 [The Computing Profession]: Professional Ethics – codes of good practice;

### General Terms
Measurement, Experimentation

### Keywords
Empirical Research, Parody

## 1. INTRODUCTION
In empirical software engineering, it is a long-standing observation that failures follow a Pareto distribution: The largest part of software defects occurs in a small fraction of software components. Therefore, research has concentrated on identifying features that correlate with the presence of software defects – features such as the number of changes, code complexity, or the number of developers associated with a file. As elaborate as these approaches may be, they all share the same problem which we call the cost of consequence: If I know that a module is failure-prone because it frequently changes, should I stop changing it? If I know failures are related to complexity, should I rewrite it from scratch? Any of these measures induces a new risk – a risk which may be greater than the one originally addressed.

In this paper, we take a different approach. We predict failures from the most basic actions programmers undertake, focusing on the actions that introduce defects as they are being made – literally at the moment the source code is typed in. Our recommendations are immediately actionable: A simple visual representation associates actions with the likelihood of introducing defects – warning programmers before they might hit the wrong key. Our approach is both effective and efficient: In a case study on the Eclipse failure set, it correctly identified up to 74% of the failure-prone modules, which is on par with the most elaborate predictors available. Specifically, our contributions include:

1) A novel mechanism to associate programmer actions with software defects;  
2) A predictor that is purely text-oriented, thus lightweight, real-time, easy to implement, and language-agnostic;  
3) A set of easy-to-remember recommendations, validated on the well-known Eclipse dataset.

The remainder of this paper is organized as follows: We start with motivating our approach (Section 2), linking basic program features to failures. Section 3 evaluates our approach on the Eclipse bug data set, reaching new heights in accuracy. Section 4 discusses threats to validity, followed by an outline of future work in this area in Section 5. *

## 2. THE IROP APPROACH
Empirical research has long focused on finding abstractions that would correlate with failures – in the hope that addressing these abstractions would also get rid of the failures. In the end, though, all these abstractions (just like software as a whole) are nothing but the product of elementary programmer actions such as opening files, writing tests, or running programs. To change programmer behavior for the good, we must act at an abstraction level where such change is actually feasible. (Clearly, we cannot prohibit programmers from opening files!)

Interestingly enough, it is the lowest abstraction layers where change becomes actionable. In the end, we can express programmer actions as a series of low-level human-computer interactions, such as moving the mouse, or typing on the keyboard. The latter

* Andreas Zeller was a visiting researcher with Microsoft Research, Washington, USA while the research leading to this paper was conducted.