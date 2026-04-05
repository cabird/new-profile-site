make inadvertent errors that would show up at runtime. The addition of generics to the type system moves these runtime errors to compile time type errors.

- The type system represents an explicit specification, and generics strengthen this specification. This is better for developers because they can use this strong specification to reason about the program better and are less likely to make mistakes. In addition, the compiler can enforce the specification.
- Prior to generics, programmers that wanted type safe containers would write their own home-grown data structures, increasing the amount of work and likelihood of error, compared to using data structures in libraries. Such structures also “introduce nonstandard and sometimes inconsistent abstractions that require extra effort for programmers to understand.”

In his book on C++ templates, Vandevoorde [19] asserts that when the same operations need to be performed on different types, the programmer can implement the same behavior repeatedly for each type. However, if in doing so she writes and maintains many copies of similar code, she will make mistakes and tend to avoid complicated but better algorithms because they are more error prone. She must also deal with all of the difficulties associated with code clones such as making orchestrated changes to coupled clones [10] and perform maintenance more frequently [15].

Naftalin and Wadler [16] claim that generics work “synergistically” with other features of Java such as for-each for loops and autoboxing. They also claim that there are now fewer details for the programmer to remember. They also claim that generics can make design patterns more flexible by presenting an example of a visitor pattern that works on a tree with generic elements.

In summary, the claims made by previous authors are:
- Generics move runtime errors to compile time errors.
- Programmers no longer have to manually cast elements from pseudo-generic data structures or methods.
- Typed data collections such as FileList create non-standard and sometimes inconsistent abstractions.
- Generics prevent code duplication and errors resulting from maintaining multiple typed data collections.
- Generics enhance readability and specification.
- Generics lower cognitive load by requiring the programmer to remember fewer details.

### 3.2 Empirical Studies

There have been few empirical studies related to the use of generics in Java or parameterized types in object oriented languages in general. Here we discuss the few that exist.

In 2005, Basit et al. [1] performed two case studies examining how well generics in Java and templates in C++ allowed what they termed “clone unification.” They found that 68% of the code in the Java Buffer library is duplicate and tried to reduce these clones through generification. About 40% of the duplicate code could be removed. They observed that type variation triggered many other non-type parametric differences among similar classes, hindering applications of generics. They also observed heavy cloning in the C++ Standard Template Library as well.

Fuhrer et al. [9] implemented refactoring tools that would replace raw references to standard library classes with parameterized types. In evaluating the refactoring tools on several Java programs, they were able to remove 48.6% of the casts and 91.2% of the compiler warnings.

We are not the first to examine how well features intended to aid programmers live up to their claims. Pankratius et al. performed an empirical study aimed at determining if transactional memory actually helped programmers write concurrent code [18]. He found some evidence that transactional memory (TM) did help; students using TM completed their programs much faster. However, they also spent a large amount of time tuning performance since TM performance was hard to predict.

These studies differ from our study in that they investigated generics or another language feature in an artificial or laboratory context, whereas we investigate generics in several natural contexts: open source software. As a result, these studies investigate the ideal impact of generics, while our study investigates their real impact.

## 4. INVESTIGATION

Our investigation begins with understanding how developers use generics in programs. Are some features of generics widely used and others never touched? Next, we examine claims made about generics and see if the purported benefits of generics are realized in practice. Finally, how does adoption play out — how soon does it occur, what happens to the old code, who buys in?

We start with a data characterization by measuring how widespread generics are among our selected projects and their developers. Then, we examine in detail how that usage varies across the features of generics.

### 4.1 Investigated Claims

Many claims have been made by language designers and researchers. One claim was that generics reduce the number of runtime exceptions [3]. Ideally, we would like to know how many runtime exceptions each version of a program could throw, but computing this is infeasible due to the state space explosion problem, compounded by the thousands of different versions of many open source projects. Instead, we restate the problem as how the number of casts in a program changes, reasoning that each cast represents a certain probability that a runtime exception will occur:

> Hypothesis 1 - When generics are introduced into a codebase, the number of type casts in that codebase will be reduced.

We also investigated the claim of code reduction:

> Hypothesis 2 - Introduction of user-defined generic classes reduce code-duplication.

### 4.2 Adoption Research Questions

Although a wealth of prior literature has examined how open source software (OSS) projects make decisions, assign and accomplish tasks, and organize themselves (e.g. [17, 14, 8]), the nature of adoption of new language features such as Java generics is not clear.

Our first research question centers around how project members embrace new language features such as Java generics. Do they do it together, or do some members still hold out? Even though “benevolent dictatorships” exist in OSS, nearly every open source project’s decision-making process