Thus, each developer-defined generic class can prevent the code duplication, but only if it is parameterized with more than one argument. We formulate this research question as:

### Research Question 2 (RQ2) - Does the introduction of developer-defined generic types reduce code duplication?

Our previous study with Java shows that generics can prevent code duplication (RQ2) [PBMH12], and we expect similar results with C# in this study.

Once a team decides to use a compiler that supports generics, the team may make a collective decision to use generics, or individuals may take the initiative on their own. Thus:

### Research Question 3 (RQ3) - Will project members broadly use generics after introduction into the project?

Previously we observed that Java generics are usually introduced by one or two contributors who champion their use and that broad adoption by the project community is uncommon [PBMH12].

Not only can software developers use generics in new code, but they can also migrate old code that was developed before generics. Thus:

### Research Question 4 (RQ4) - Will there be large-scale efforts to convert old code using raw types to use generics?

Previously we found that most Java projects did not show a large scale conversion of raw to parameterized types [PBMH12]. In C#, we expect that the rate of migration is lower than in Java because some non-generic collections in the old namespace do not have generic counterparts in the new namespace.

Another claimed benefit of C# generics is a performance improvement [Juv11]. Without generics, if a value type is placed into a collection of objects, that value type must be converted to an object (boxing) and converted from an object when removed from the collection (unboxing). Such collections thus incur processing overhead when boxing and unboxing. However, C# generics do not require boxing and unboxing for value types because the actual values, not objects, are held in generic types that are parameterized with a value type. Thus:

### Research Question 5 (RQ5) - Does the use of C# generics improve performance in a program?

Previous work suggests that C# generics do improve performance, at least in benchmarks [KS01]. However, it is currently unknown whether performance is improved in the wild because previous work has not explored how often developers use value types with generic collections in real C# programs. We initially expected that such use is common.

A language feature that was introduced after generics, yet may work synergistically with them, is the var keyword, which supports implicit typing of local variables. Introduced in C# 3.0 in November 2007, the var keyword offers succinct syntax to declare generic types compared with explicitly typed generics. For example, using explicit typing, we would declare the following local variables like so: