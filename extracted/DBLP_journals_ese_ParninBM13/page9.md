indicating poor code structure and a catalyst for runtime exceptions. We reason that evidence of reducing casts also gives evidence of reducing probability of runtime exceptions by a non-zero amount. Thus, we investigate:

### Hypothesis 1
When generics are introduced into a codebase, the number of type casts in that codebase will be reduced.

We also investigated Donavan’s claim that without a mechanism such as generics, it would be necessary for programmers to introduce code duplication in order to achieve type safety. Donavan argued that developers would be forced to create data structures for every type of data they wanted to store. If we assume that Donavan’s claim is valid, then we can measure the worst-case cost for achieving type safety via the method proposed by Donavan. Specifically, we can estimate the amount of duplication and bugs that would arise from having to maintain the duplicated type-safe version of classes. There are several reasons why this is a worst-case estimate: e.g., developers may find ways to factor out commonalities in non-type-safe code. But, taken more generally, these measures provide a simple way of quantifying the value of generics by observing if types are instantiated with more than one parameter.

### Hypothesis 2
Manually maintaining type-safe code would be costly due to maintaining a high number of clones.

## 4.2 Adoption Research Questions

Although a wealth of prior literature has examined how open source software (OSS) projects make decisions, assign and accomplish tasks, and organize themselves (e.g. Ducheneaut 2005; Mockus et al. 2002; O’Mahony and Ferraro 2007), the nature of adoption of new language features such as Java generics or annotations is not clear.

Our first research question investigates if there will be a concerted effort to convert old code to use the new generic language feature. Are the new features compelling enough to fix old code that may contain problems that would be fixed by generics or at least to maintain consistency? In other words:

### Research Question 1
Will there be large-scale efforts to convert old code using raw types to use generics?

Our second research question centers around how project members embrace new language features such as Java generics and annotations. Do they do it together, or do some members still hold out? Even though “benevolent dictatorships” exist in OSS, nearly every open source project’s decision-making process is governed in at least a semi-democratic fashion.

Since the decision to use a new feature has implications directly on the codebase itself (e.g., it may require using a newer JDK or modify popular method signatures impacting all call sites), we expect that there will be project-wide acceptance of new