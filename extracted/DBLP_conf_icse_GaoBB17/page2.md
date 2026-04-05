## II. PROBLEM DEFINITION

The core contribution of this work is to quantify the public bugs that static type systems detect and could have prevented: 15% for both Flow 0.30 and TypeScript 2.0, on average. Our experimentation artefacts are available at http://ttendency.cs.ucl.ac.uk/projects/type_study/index.html.

Here, we define the bugs that the use of a type system might have prevented by drawing a developer’s attention to certain terms, discuss how we leverage information in bug fixes to make our experiment feasible, discuss which errors we aim to detect, and then close with an example.

Definition 2.1 (ts-detectable): Given a static type system ts, a bug is ts-detectable when adding or changing type annotations causes the buggy program to fail to type check and the new annotations are consistent with the fully annotated, correct version of the program.

The added or changed type annotations may affect several terms, or only one. These annotations are consistent if the annotated program type checks and, for every term, the type of that term in the annotated program is a supertype of the term’s type in the ideal, correct, fully annotated program. In this experiment, we can only strive to achieve consistency, because we do not have the correct, fully annotated program. One can download our experimental data to verify how well we have reached this goal. Consistency implies that we do not intentionally add ill-formed type annotations. For example, when b and c have type number, changing

var a = b + c

to

var a:boolean = b + c

incorrectly annotates a as boolean, triggering a type error. If such ill-formed annotations are not ruled out, one use them to “detect” any bug, even type-independent failures to meet the specification.

Let L be a programming language, like JavaScript, and L_a be a language based on L with syntactical support for type annotations, like Flow or TypeScript. Let B = {b1, b2, ···, bm} denote a set of buggy programs. Let a be an annotation function that transforms a program p ∈ L to p_a ∈ L_a. Finally, let tc be a type-checking function that returns true if an annotated program p_a type checks and false otherwise.

We annotate each buggy program b_i that is in B and written in L, and observe whether it would type check. We calculate the percentage of bugs that a static type system detects over all collected ones. Our measure of a static type system’s effectiveness at detecting bugs follows:

(1) |{b_i ∈ B | ¬tc(a(b_i))}| / |B|

Equation 1 reports the portion of bugs that could have been prevented had a type system, like Flow or TypeScript, reported type errors that caused a developer to notice and fix them. Depending on the error model of a static type system, a might be the identity function, i.e. add no annotations. For instance, both Flow and TypeScript are able to detect errors in reading an undefined variable without any annotation.

### A. Leveraging Fixes

Bug localization often requires running the software and finding a bug-triggering input. Code bit rot quickly; frequently, it is very difficult to build and run an old version of a project, let alone find a bug-triggering input. Worse, many of our subjects are large, some having as many as 1,144,440 LOC (Table I). To side-step these problems, we leverage fixes to localize bugs.

For p ∈ L, we assume we have a commit history as a sequence of commits C = {c1, c2, ···, cn}. When ci ∈ C denotes a commit that attempts to fix a bug, the code base materialized from at least one of its parents c_{i−1} is buggy. A fix’s changes help us localize the bug: we minimally add type annotations only to the lexical scopes changed by a fix. We add annotations until the type checker errors or we decide neither Flow nor TypeScript would error on the bug. This partial annotation procedure is grounded on gradual typing, which both Flow and TypeScript employ. These two type systems are permissive. When they cannot infer the type of a term, they assign the wildcard any, similar to Abadi et al.’s Dynamic type [9], to it.

This procedure allows us to answer: “How many public bugs could Flow and TypeScript have prevented if they had been in use when the bug committed?”, under the assumption that one knows the buggy lines. By “in use”, we mean that developers comprehensively annotated their code base and vigilantly fixed type errors. The assumption that developers knew the buggy lines is not as strong as it seems because, under the counterfactual that developers were comprehensively and vigilantly using one of the studied type systems, the bug-introducing commit is likely to be small (median of 10 lines in our corpus) and to localize some of the error-triggering annotations, while the rest of the annotations would already exist in the code base.

Limitations: Four limitations of our approach are 1) a “fix” may fail to resolve and therefore localize the targeted bug, 2) a minimal, consistent bug-triggering annotation may exist outside the region touched by the fix, 3) we may not succeed in adding consistent annotations (Definition 2.1), and 4) the annotation we add may cause the type checker to error on a bug unrelated to the bug targeted by the fix. Further, considering only fixed, public bugs introduces bias. We restrict our attention to these bugs for the simple reason that they are observable. We have no reason to believe this bias is correlated with ts-detectability. Section VI discusses other threats to this work.

### B. Error Model

The subjects of this experiment are identified and fixed public bugs. As Figure 1 shows, we aim to classify these bugs into those that are ts-detectable (the solid partition of fixed public bugs) and not (the hashed partition of fixed public bugs).

Type systems cannot detect all kinds of fixed public bugs. What sorts of bugs do our type systems detect and may prevent? Type systems eliminate a set of bad behaviours [6]. More specifically, Flow or TypeScript detects and may prevent type mismatches, including those normally hidden by JavaScript’s coercions, and undefined property and method