This paper analyzes a wider variety of Java annotations in order to understand how language features are adopted.

Other research has investigated how annotation-like source code constructs are used. For example, Liebig and colleagues studied the use of C preprocessor directives to understand whether those directives align with the source code they accompany (Liebig et al. 2011). As another example, Storey and colleagues studied how developers tag their code with task markers (such as “TODO”) to understand how developers manage tasks (Storey et al. 2008). In contrast to these studies, the current paper seeks to study the use of annotations as a means to understand language feature adoption.

## 4 Investigation

Our investigation begins with understanding how developers use generics in programs. Are some features of generics widely used and others never touched? Next, we examine claims made about generics and see if the purported benefits of generics are realized in practice. Finally, how does adoption play out—how soon does it occur, what happens to the old code, who buys in?

We start with a data characterization by measuring how widespread generics are among our selected projects and their developers. Then, we examine in detail how that usage varies across the features of generics.

### 4.1 Investigated Claims

One of the claims regarding generics (identified previously) is that they reduce the number of runtime exceptions (Bloch 2008). Ideally, we would like to know how many ClassCastExceptions a program threw before generics were introduced, then compare that to the number thrown after generics were introduced. If the claim is true, the number of thrown ClassCastExceptions should be reduced.

To investigate the feasibility of this type of analysis, we manually searched the bug repositories of three large projects (JDT, the Spring Framework, and OpenSSO) for valid bug reports containing ClassCastExceptions. Overall, we found very few bug reports regarding ClassCastExceptions: in JDT, only about 10 ClassCastException bugs were reported per year; in the Spring Framework, only about 13 per year, and in OpenSSO, only about 5 per year. In smaller projects, the number of reported ClassCastExceptions is likely much smaller.

We hypothesize that the problem is not so much that ClassCastExceptions occur infrequently, but that they are usually introduced and fixed before the software is released. Because of the low number of bug reports about ClassCastExceptions, we reasoned that this was not a feasible approach to perform a temporal, statistical analysis to investigate the claim about generics reducing runtime exceptions. We also rule out dynamic approaches where we would run each version of a program due to the state space explosion problem, which is compounded by the thousands of different versions of many open source projects.

However, Bloch, in his remarks about runtime exception, continues with a related claim that casts would also be reduced by the introduction of generics (Bloch 2008). Researchers consider casts to be a code smell (Van Emden and Moonen 2002),