The percentage of detectable bugs for Flow and TypeScript falls into [11.5%, 18.5%] with mean 15%. Figure 5 shows that Flow and TypeScript largely detect the same bugs. Section V describes the bugs on which they differ in detail. Together, Flow and TypeScript detect a total of 63 bugs, of which 7 (11%) are field bugs. This proportion of field bugs is approximate: to compute it, we manually counted ts-detectable bugs open across releases. Some projects do not tag releases; we conservatively deemed their bugs non-field. The time spent assessing each of the initially unknown 18 bugs varied, ranging from 8 minutes to more than 1 hour of dedicated time. Surprisingly, 3 bugs took us only around 10 minutes to decide their ts-detectability on a fresh restart, which, we reckon, is due to our increasing expertise.

Our experimental methodology and results extend previous efforts to measure the effectiveness of static typing, which have relied on programming assignments written by students [23] or have performed aggregate statistical analyses comparing two large disjoint sets, one composed of statically typed programs and the other dynamically typed programs [24, 25]. Our study complements these efforts by quantifying the bug-detection effectiveness of static types on bugs in real world projects on the same subject program. We have aimed to study the expressivity and power of type annotations, not the skill of the annotators. This is why we defined Procedure 1, defined and agreed the annotation tactics that III.D details, and compute the inter-rater agreement to measure the degree to which we have succeeded in consistently and uniformly devising and applying annotations. In this way, we have striven to emulate surgery trials, which seek to draw conclusions about surgeries, not the surgeons [8].

This result probably greatly understates the impact of static typing, since we designed our experiment from its inception to under-approximate the impact of static typing:

1. We study only publicly visible bugs. Anecdotally, static type systems eliminate many bugs during development and also obviate certain classes of testing. We do not measure either effect. Public bugs are also mainly due to misunderstanding the specification, which type systems cannot detect.
2. Static type systems have other strengths, such as facilitating program understanding, improving performance, and enabling better code completion and navigation.
3. Our experiment uses only two relatively weak type systems, Flow and TypeScript; stronger type systems could perform better.
4. The authors’ limited expertise in Flow and TypeScript (and JavaScript) means that we may have incorrectly deemed a bug to be undetectable or unknown.

At first glance, 15% may not appear to be a large number. In practice, however, even small changes in the number of checked-in bugs can be quite valuable. When we presented the results to an engineering manager at Microsoft, he responded:

> “That’s shocking. If you could make a change to the way we do development that would reduce the number of bugs being checked in by 10% or more overnight, that’s a no-brainer. Unless it doubles development time or something, we’d do it.”

We have shown that Flow and TypeScript meet and exceed the 10% bar; we discuss the cost in our discussion of the annotation tax in Section V.

## V. CASE STUDY

Based on three criteria, we select bugs for further manual assessment: ones whose Flow- or TypeScript-detectability is not agreed upon, ones whose Flow- and TypeScript-detectability differ, and ones that are TypeScript-detectable under version 2.0 but not under 1.8.

### Disagreements

Of the 80 uniformly-sampled bugs that we used to calculate inter-rater agreement, each rater needed to make 160 decisions in total, 80 for Flow-detectability and 80 for TypeScript-detectability. 138 of these 160 decisions were unanimously labelled. We define a strong disagreement as a disagreement in which one rater deems the bug detectable while another deems it undetectable. Of the 22 disagreements, 12 are strong.

Let U denote unknown, D detectable, and D̄ undetectable. We manually assessed each disagreement without a time bound and found that, in each case, weak disagreements resolved as follows: UUD → D, UUD → D, UDD → D, UDD → D. In other words, the rater who confidently assessed ts-(un)detectability within the time bound was correct every time in our experiment.

Our 12 strong disagreements had three patterns of labels: 2 were DDU, 2 were DDD, and 8 were DDD. After manually resolving all of them, we found that whenever two raters agreed, they were correct. Among the 10 strong disagreements where a rater disagreed with the other two, rater one dissented in 8 cases and rater two in 2 cases. With hindsight, we would have improved our assessment protocol. We should have specified that each rater consider whether or not added logic was manual type checking. We would have agreed on whether or not to consider typos in library names ts-detectable. These changes alone would have eliminated 7 of the 12 strong disagreements.

Please visit our project page for more details.

### Classifying ts-undetectable Bugs

Figure 6 categorizes bugs that are undetectable under both Flow and TypeScript, after the 18 unknowns were resolved. Recall that, while BranchError, PredError, and URIError are logic errors in implementing the specification, SpecError captures all other specification errors. Unsurprisingly, SpecError, with 186 bugs, accounts for 55% of the total bugs and significantly outweighs other categories. Errors implementing specification, as a group, overwhelmingly constitute 78%. This result, yet again, demonstrates the importance of specifications.

Despite the dominance of errors implementing specification and the fact that only public bugs are considered, there still exists a non-specification-related opportunity for type systems: StringError. Ranked second in the histogram, StringError is a broad concept that represents errors caused by the incorrect content of a string, such as a wrong URL. The reason why StringError is so common, we conjecture, is two-fold: first, the string type itself is extremely popular; second, JavaScript is rooted in web applications that extensively use hyperlinks. However, the string type is opaque to most static type systems,