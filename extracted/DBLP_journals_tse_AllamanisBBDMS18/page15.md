mined elements. Although syntactic idioms are more likely to be useful than frequent patterns, data sparsity, exacerbated by the commendable practice of code reuse (e.g. sorting algorithms), means that many syntactic idioms often fall short of being meaningful, as you can see in this example, from Allamanis and Sutton [4]:

```
FileSystem name = FileSystem.get($Path.toUri(), conf);
```

where `name` and `$Path` are meta-variables. Specifically, few syntactic idioms meaningfully contained loops at all, let alone a loop that performs a reduce operation.

Code clones [7, 32, 33] are related to idiom mining. Clone detection using ASTs has been studied extensively [8, 29, 37]. For a survey of clone detection methods, see Roy and Cordy [57], Roy et al. [56]. In contrast, code idiom mining searches for surprisingly frequent, rather than maximally identical subtrees [4] (Section 2.1). Additionally, code clones do not abstract over the semantic properties of code as we do in this work. Qiu et al. [54] instrumented the Java parser to count the usage of production rules across various releases of Java, but do not automatically find meaningful patterns. Another related area is API mining [1, 50, 68, 66]. API protocols are a type of semantic idiom; thus idiom mining is a general technique for pattern matching that we could specialize to API mining, by devising an appropriate coiling. In this work, we specialized coiling to loop idioms, so the coiling presented here abstracts away method calls (removing information about method names, instantiation of arguments etc.), which API mining needs, and tracks semantic information: e.g. variable mutability, purity, data, and control-flow information, which API mining does not.

Semantic idiom mining is directly applicable to rewritings, such as refactoring [19]. The most prominent area of research on refactoring focuses on developing tools to automatically identify locations to refactor and/or perform refactorings [11, 47, 16, 10, 34] with tremendous impact: nearly all popular IDEs (e.g. Eclipse, Visual Studio, NetBeans) include refactoring support of some kind. However, existing refactoring tools are underutilized [49]. One reason may be the fact that many refactoring tools cannot handle many of the constructs (such as loops) that developers actually write. This is the problem we tackle in this work, by giving tool developers the tools they need to make data-driven decisions. Tsantalis and Chatzigeorgiou [65] use machine-learning–like methods to find opportunities to apply existing refactoring operators. In contrast to this work, we mine, rank, and present loop idioms to refactoring tool developers as candidates for the left-hand sides (the pattern to replace) of new refactoring operators.

Multiple tools focus on loop rewritings. Relooper [17] automatically refactors loops on lists and arrays into parallelized loops. Resharper [28] provides refactorings to convert loops into LINQ expressions. Gyori et al. [27] refactor Java loops to Java 8 streams, which are similar to LINQ in C#. All these works use the classic approach that rests on the tool developer’s intuition — not data — to decide which rewritings to implement. For example, the tool of Gyori et al. [27] only handles four loop types, comprising 46% of the loops that they encountered, underscoring the challenges of refactoring loops and the importance and utility of functionalizing them. Since all these tools contain hard-coded refactorings, they may miss refactoring opportunities that are project-specific. Similarly, a study of vectorizing compilers, which rewrite sequential loops to use vector instructions, found that, while collectively the compilers successfully rewrote 83% of the benchmark loops, their individual performance ranged from 45–71% [40]. Our work complements such work; it helps tool developers and language designers to identify useful patterns by identifying and ranking idioms, including domain-, even project-, specific idioms.

## 7 CONCLUSION

Humans aggregate concepts and data into mental chunks [26]. Consider a compiler developer who has written a loop to algebraically simplify an instruction sequence. When talking to another developer, the developer might describe the loop as “algebraically simplifying arithmetic instructions”. We have defined semantic idioms to capture these mental chunks and presented a method for their unsupervised mining from a code corpus. We specialized our framework to loop idioms; semantic idioms root at loops by abstracting the AST and augmenting it with semantic facts, like variable mutability and function purity. We used loop idioms to show that idiom mining can cope with syntactic diversity to find and prioritize patterns whose replacement might improve a refactoring tool’s coverage and help language and API designers. Semantic idioms can also benefit other areas of program analysis and transformation, guiding the selection of heuristics and choice of corner cases with hard data, as in auto-vectorization [6].

## ACKNOWLEDGMENTS

M. Allamanis was supported by Microsoft Research through its PhD Scholarship Programme. E. Barr and P. Devanbu were supported by Microsoft Research through its Visiting Scholar Programme. C. Sutton was supported by the Engineering and Physical Sciences Research Council [grant number EP/K024043/1]. P. Devanbu was supported by the National Science Foundation award number 1414172.

## REFERENCES

[1] M. Acharya, T. Xie, J. Pei, and J. Xu, “Mining API patterns as partial orders from source code: from usage scenarios to specifications,” in ESEC/FSE, 2007.

[2] C. C. Aggarwal and J. Han, Frequent pattern mining. Springer, 2014.

[3] M. Allamanis and C. Sutton, “Mining source code repositories at massive scale using language modeling,” in Proceedings of the Tenth International Workshop on Mining Software Repositories. IEEE Press, 2013, pp. 207–216.

[4] ——, “Mining Idioms from Source Code,” in Symposium on the Foundations of Software Engineering (FSE), 2014.

[5] E. T. Barr, C. Bird, and M. Marron, “Collecting a heap of shapes,” in ISSTA, 2013.

[6] G. Barthe, J. M. Crespo, S. Gulwani, C. Kunz, and M. Marron, “From relational verification to SIMD loop synthesis,” in PPoPP, 2013.

[7] H. A. Basit and S. Jarzabek, “A data mining approach for detecting higher-level clones in software,” IEEE Transactions on Software Engineering, 2009.

[8] I. D. Baxter, A. Yahin, L. Moura, M. Sant’Anna, and L. Bier, “Clone detection using abstract syntax trees,” in International Conference on Software Maintenance, 1998.

[9] M. Beller, G. Gousios, and A. Zaidman, “Oops, my tests broke the build: An analysis of travis ci builds with github,” PeerJ Preprints, Tech. Rep., 2016.