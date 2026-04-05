To produce a string from a TSG, we begin with a tree containing only S, and recursively expand the tree top-to-bottom, left-to-right as in CFGs — the only difference is that some rules can increase the height of the tree by more than 1. A probabilistic tree substitution grammar (pTSG) G [13, 53] augments a TSG with probabilities, in an analogous way to a probabilistic CFG (PCFG). A pTSG is G = (Σ, N, S, R, Π), which augments a TSG with Π, a set of distributions P_TSG(T | X) for all X ∈ N, each of which is a distribution over the set of all rules X → T in R that have left-hand side X.

The key reason that we use pTSGs for idiom mining is that each tree fragment T_X can be thought of as describing a set of context-free rules that are typically used in sequence. This is exactly what we are trying to discover in the idiom mining problem. In other words, our goal is to induce a pTSG in which every tree fragment represents a code idiom if the fragment has depth greater than 1 — we call these rules fragment rules. The remaining TSG rules, those whose RHS has depth 1, are less interesting, as they are simply the productions from the original CFG of the programming language. As a simple example, consider the probabilistic CFG:

```
E → E + E    (prob 0.7)    T → F * F    (prob 0.6)
E → T        (prob 0.3)    T → F        (prob 0.4)
F → (E)      (prob 0.1)    F → id       (prob 0.9)
```

where E, T, and F are non-terminals, and E is the start symbol. Note that the probabilities of all productions of each non-terminal symbol sum up to one, i.e., define a probability distribution for expanding the non-terminal. Now, suppose that we are presented with a corpus of strings from this language that include many instances of expressions like id*(id+id) and id*(id+(id+id)). Then, we might choose to add a single pTSG rule to this grammar, like

```
E → F * (T + T)    (prob 0.4)
```

When we add the pTSG rule, we adjust the probabilities of the previous rules so that all of E’s productions sum to 1 as shown. Essentially, this allows us to represent a correlation between the rules E → T + T and T → F * F. Finally, note that every CFG can be written as a TSG where all productions expand to trees of depth 1. Conversely, every TSG can be converted into an equivalent CFG by adding extra non-terminals (one for each TSG rule X → T). So TSGs are, in some sense, fancy notation for CFGs. This notation will prove very useful, however, when we describe the learning problem next.

### 2.3 Inferring Idioms

To solve the idiom mining problem, a natural idea is to search for subtrees that occur often in a corpus. However, this naïve method does not work well, for the simple reason that frequent patterns are often meaningless. This is a well-known problem in data mining [2, Chap. 5]. To return to our previous example, the foreach semantic loop idiom

```
1 foreach(var 0 in EXPR) {
2   $REGION[UR(0, 1); URW(2);]}
```

occurs commonly, but it would be hard to argue that the significantly more common

```
1 foreach(var 0 in EXPR) { BODY }
```

on its own (with no body) is an interesting pattern. Instead, Allamanis and Sutton [4] suggest a different principle: interesting

patterns are those that help to explain the code that programmers write. It is when it comes to quantifying the phrase “help to explain” that the machinery of statistical natural language processing becomes necessary. Essentially the goal is that each returned idiom corresponds to a group of syntactic rules that often co-occur. To formalize this intuition, the idea is to infer a pTSG that is equivalent to the original language grammar in the sense of generating the same set of strings, but provides a better explanation of the data in the statistical sense. We do this by learning a pTSG that best explains a large quantity of existing source code. We consider as idioms the tree fragments that appear in the learned pTSG. We learn the pTSG using a powerful framework called nonparametric Bayesian methods.

Nonparametric Bayesian methods provide a theoretical framework to infer how complex a model should be from data. Adding parameters (which correspond to pTSG fragment rules in our case) to a machine learning model increases the risk of overfitting the training data, simply by memorizing it. But if we allow too few parameters, then the model will be unable to find useful patterns (i.e., underfit). Bayesian statistics [23, 48] provides a simple and powerful method to manage this trade-off. The basic idea is that whenever we want to estimate an unknown parameter θ from a dataset x1, x2, …, xN, we should not only treat the data as random variables — as in classical statistics — but also θ as well. To do this, we must choose a prior distribution P(θ) encoding any prior knowledge about θ, and then a likelihood P(x1 … xN | θ) that describes a model of how the data can be generated given θ. Once we define a prior and a likelihood, we can infer θ via its conditional distribution P(θ | x1 … xN) by Bayes’ rule. This distribution is called the posterior distribution and encapsulates all of the information that we have about θ from the data. We can compute summaries of the posterior to make inferences about θ. For example, if we want to estimate θ by a single vector, we might compute the mean of P(θ | x1 … xN). To summarize, applications of Bayesian statistics have three steps: 1) choose a prior P(θ); 2) choose a likelihood P(x1 … xN | θ); and 3) compute P(θ | x1 … xN) using Bayes’ rule.

As a simple example, suppose the data x1 … xN are real numbers, distributed independently according a Gaussian distribution with variance 1 but unknown mean θ. Then we might choose a prior P(θ) to be Gaussian with mean 0 and a large variance, to represent the fact that we do not know much about θ before we see the data. Our beliefs about the data indicate that p(xi | θ) is Gaussian with mean θ and variance 1. By applying Bayes’ rule, it is easy to show that P(θ | x1 … xN) is also Gaussian, whose mean is approximately equal to N^{-1} ∑_i x_i and whose variance is approximately 1/N. This distribution represents a Bayesian’s belief about the unknown mean θ, after seeing the data.

Nonparametric Bayesian methods handle the more complex case where the number of parameters is unknown as well. They focus on developing prior distributions over infinite-dimensional objects (e.g. the infinite set of possible pTSG rules in our case), which are then used within Bayesian statistical inference. Bayesian nonparametrics have been the subject of intense research in statistics and machine learning [24, 64]. To infer a pTSG G using Bayesian inference, our prior distribution must be a probability distribution over probabilistic grammars, which we call P(G). A sample from P(G) is a pTSG, which is specified by the set of fragments F_X that are rooted at each nonterminal X, and a

3. The exact value depends on precisely what variance we choose in P0(θ), but the formula is simple.