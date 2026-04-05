between C# and Java. We initially expected that the usage of generics in the two languages would be similar because of the many similarities between C# and Java. We make the following contributions in this paper:

- **Investigation of the claimed benefits of C# generics:** we determine how the claimed benefits of C# generics manifest in real open-source projects. Our results suggest that generics help remove casts, reduce duplication, and improve performance in real programs.

- **Comparison of generics’ use in C# and Java:** we analyze open source Java and C# projects to determine whether differences exist in generics usage. As in Java, C# developers appear not to migrate much existing code to use generics, but unlike Java, C# generics are typically championed by more than one developer in a project.

- **Exploration of the cause of different usage:** we explore some of the causes of the different usage of generics between C# and Java. Our results suggest that implementation choice makes a difference in a language feature’s success, and that developers appear to prefer readability over concision.

- **Investigation of the interaction of generics and implicit typing:** we compare how often developers use generics in conjunction with C#’s var type. Our results suggest that developers typically do not use the two language features together, and instead typically declare generic types explicitly.

The paper is organized as follows: we introduce C# generics in more detail in Section 2 and related work in Section 3; we then formulate six research questions in Section 4; we describe data characterization of 20 open source C# projects in Section 4.4; we investigate how C# generics are used in those projects and compare the results with our previous Java generics results in Section 5; and finally, we discuss why the usage of C# generics is different from that of Java generics in Section 6.

## 2 Background

In this section, we compare C# with Java to explain why we selected C# for this study. We then explain generic terminology. We also describe how generics are used in C#, and explain how C# generics differs from Java generics.

### 2.1 Comparison between C# and Java

In this paper, we selected the C# programming language to compare with Java generics because the two languages have several similarities, but also important differences. C# and Java are similar from a developer’s point of view, so a meaningful comparison between the two is possible. Both C# and Java are class-based, object-oriented languages with garbage-collected runtimes and both have Object at the top of their inheritance and subtyping hierarchies. Both languages base their design of generics around f-bounded polymorphism [CCH+89]. Both languages have very similar syntax; the syntax at the statement and expression level is almost identical, but there are some minor differences in how generic classes and interfaces are declared. Both languages introduced generics around the same time: Java in 2004 as part of J2SE 5.0 and C# in 2005 as part of .NET 2.0.