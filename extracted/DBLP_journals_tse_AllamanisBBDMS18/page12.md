![Table of semantic idioms and sample matching concrete loops](page12_img_1.png)

Fig. 6: Loop idioms automatically mined by our method and ordered using our ranking method. For each idiom we include a sample concrete loop it matches. Some concrete loops were slightly modified to fit the table and reduce their size (removed braces, shortened variable names). Idiom metavariables are highlighted with a colored box and a unique reference number is assigned to them. The same numbers appear within the concrete loops next to each variable, indicating each variable’s binding to a metavariable. Non-terminals (e.g. EXPR) are also denoted within the colored box. Idiom (2) is the one shown in Figure 1. The this unitary variable is implied in some contexts (e.g. in Figure 6.3).

![Graph showing cumulative loop coverage vs number of idioms](page12_img_2.png)

Idioms Included

Fig. 7: Cumulative loop coverage vs. the number of (top) idioms used. Given the diminishing returns, the distribution fits well into a Pareto distribution. The Gini coefficient is G = 0.785 indicating a high coverage inequality among idioms. When using 50 idioms, 50% of the loops can be covered and with 200 idioms 70% of the loops are covered. 22% of the loops in our corpus are non-idiomatic (i.e. are not covered by an idiom).

Rare combinations, like two consecutive if-else statements, are, in isolation, normal or frequent, but rare when enclosed in a loop rather than a method. We speculate these loops look normal to developers because human readers would find the code to be quite unsurprising given the context, but would not necessarily notice that the context per se might be rather unique or unusual. Knowing which loops are non-idiomatic and that they are rare is crucial, since it allows toolmakers to avoid wasting time on them.

### 5.2 Example Loop Idioms

Figure 6 shows example loop idioms, patterns mined after coiling, and concrete loops they match. Showing idioms, and not merely coiled code, allows us to illustrate both simultaneously. Loop idioms are simply a ranked selection of segments of coiled code. Map and reduce operations are quite common in our corpus.

We focus at the most complex idiom in Figure 6.8 (the 8th element in Figure 6) to explain the notation. The idiom contains the < operator, because our expression abstraction, discussed above, preserves the top-level operator in termination expressions. INC denotes the special node for increment expression. It contains a single block that, in turn, contains a single region that references at least (since we merge references with identical sets of nodes) four variables: 0, 1, 2, and 4. The first two are read-only unitary variables (denoted by UR); 2 is a collection with a read-only spine (defined in Section 3, Collections) and elements (denoted by CSR for the spine and CER for the elements); and 4 is a read-write unitary variable (denoted by URW).

The reader may appreciate some of the semantic details that idioms capture. For example, the idiom in Figure 6.7 performs a map operation and modifies the original collection elements. In our data, loops often perform multiple operations, e.g. the idiom matching the concrete loop of Figure 6.6 is a reduce operation in h and a map on d (the code generates the Householder vector for matrix factorization in MathNet.Numerics). As we discuss in Section 5.5, this is a common loop idiom that lacks an efficient functional LINQ replacement.

### 5.3 Prospecting Loop-to-LINQ Refactorings

Loop idioms can help in an important instance of refactoring: identifying loop patterns a refactoring tool could target to replace with functional operators. Since 2007, C# supports LINQ [46, 41], that provides functional-style operations, such as map-reduce, on streams of elements and is widely used in C# code. LINQ is concise and supports lazy operations that are often easy to