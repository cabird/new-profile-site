## 6. WHY ALL THIS IS WRONG

While reading through this paper, you may (and actually should) now have come to the conclusion that all of this is nonsense: Of course, none of us wants to eradicate individual letters from programs. But where does the nonsense actually begin? And is it confined to this paper alone? Unfortunately, it is not. The widespread availability of empirical data in software engineering has brought an explosion of findings – many of them substantial, but some of them banal at best, and misleading at worst.

With this paper, we have tried to replicate a number of blunders that we have found in papers of researchers; some such papers actually are submitted to respected venues. The numbers and correlations reported are all true findings from the Eclipse dataset, and correct to the best of our knowledge. However, it is the interpretation of the results that is plain wrong. Before we start discussing our deliberate blunders, maybe you’d like to go back to the previous sections and search for them yourself.

### 6.1 High-level Issues

Let us start with a number of high-level issues demonstrated in this paper. In contrast to our study, there is a wealth of high quality work coming out of our community. We highlight a few examples of good empirical research along the way.

#### Correlations do not imply causations.

Our paper implies that a high correlation is an important discovery. But any sufficiently large data set will contain lots of correlated data, and it is easy to find them. There are additional requirements, however (see [5], pages 80–81 for details). To show causation, one also needs to show that changing the cause also changes the effect (which of course we did not), and one needs a substantial theory to explain causation (for which our “abstraction” hypothesis in Section 5 is only a ridiculous surrogate). For such a theory, one needs domain knowledge. And such knowledge cannot come from data alone; you must investigate and understand the stories behind the data. (For a detailed discussion on the importance of theories in Software Engineering, see [6]).

We invite the reader to examine an empirical study that goes far beyond mere correlation. In their paper on “Developer Fluency”, Zhou and Mockus [7] carefully constructed a theory of developer knowledge acquisition based on prior literature and refined it by gathering qualitative data from interviews. Based on this theory they developed, validated, and triangulated measures such as time and task difficulty that showed a relationship with productivity. They also showed how differences between projects (yes, they looked at more than one!) accounted for differences in findings.

#### Do not confuse causes and symptoms.

Our paper argues that it may be worth looking at low-level features rather than abstractions. While this may be true for initial exploratory studies, it is crucial to reason whether there would be a common abstraction that would explain the effects observed. In a file, it is pretty much obvious that any occurrence of letters would correlate with its size; and it is not very surprising that given a constant defect density, the larger the file, the more defects it will have. This would be the abstraction to look at and the lowest baseline to compare against.

#### Focusing on individual letters is actually an issue of construct validity.

The construct we chose for modeling programmer actions is plain inadequate. We recommend the book by Shadish et al. on experimental design and causal inference for a detailed discussion [8].

#### Few findings generalize.

Even if you could empirically show that there is a strong correlation in a single data set (a correlation of 0.35 is not strong), it is unlikely that you will find the same correlation in another project, or even another release of the same project. Note that while we pretend to look at multiple releases of the Eclipse project, our “IROP” finding is based on the 3.0 release alone. In Eclipse 2.0, the “IROP” principle becomes the “Namp” principle; in Eclipse 2.1, it becomes the “Nogl” principle.

As an example of research that provides value without generalization, in 2007 Hindle et al. [9] undertook an investigation to understand the rationale behind large commits and determine if anything could be learned from studying them. They studied large commits from nine software projects, and while they identified a number of reasons behind large commits, they found that the reasons varied dramatically across projects. Rather than try to force a generalized conclusion, they reported their findings and project-specific, but still valuable, insights.

#### Beware of cherry-picking.

So, why did we name our “principle” IROP and not “Namp” or “Nogl”? This is hinted at with the words “After a number of preliminary experiments, we focused on the Eclipse 3.0 dataset.” What we actually did was that we looked at all three releases and picked the one that fit us best, conveniently suppressing the differing results. Such suppression is a no-go: All relevant findings must be reported; and if you have findings that contradict your theory, well — there goes your theory.

#### Beware of fraud.

Of course, one can always suppress inconvenient findings without even hinting at them. This is why any choice or influence from the researchers must be carefully justified and questioned — a simple “We selected five bugs to illustrate our approach” will not yield any averages, sums, or generalization; it is a mere proof that the technique can work. But whether this reflects a property of the technique or a property of the example must be carefully evaluated by the authors in the first place. The good news is that the most striking results will eventually be replicated and possibly refuted.

#### Threats should help understanding.

All empirical research should point out threats to validity. No empirical study is perfect and reviewers shouldn’t expect such. These threats highlight possible issues such as contexts that are not represented and in which the results are unlikely to hold and reasons that measurement may have error. They aid the reader by creating a lens through which the results can be viewed and interpreted. Note the tone of Section 5. Somehow we are able to overcome all threats by arguing ways that we did everything perfectly. There is no mention that our study is of only one software project, some characteristics are simply unavoidable, or causation may flow in the opposite direction. It is tempting to use this section as a way to refute any possible criticisms, but such an approach should be used judiciously and not to mask informative limitations.

#### Machine learning works.

The past six years of mining software archives have impressively demonstrated that one can train a machine learner on tuples of features and failures, and use these very learners to successfully predict future failures. The problem for researchers is that the actionable features — that is, features that suggest direct corrective action such as changes, complexity, or test coverage — have all been studied already. The good news is that any feature that characterizes a component may be sufficient for not-too-bad results — even if it is just a distribution of characters in the source code. Again, a comparison with the state of the art (not just a simple straw man) is required to demonstrate improvement.