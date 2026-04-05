and program analysis [2, 9, 23, 33]. Despite a number of valuable studies [16, 19, 21, 23, 27, 30], the question of what sharing is actually present in real-world programs and why this sharing occurs is still an open question. In programming language design, there is substantial interest in developing type or annotation systems that can express rich sharing, encapsulation, and exposure properties relevant to real-world programs. Sharing (non-sharing) information can also improve both the layout and eventual collection of object structures.

In this study, we hypothesize that ownership in object-oriented programs is important but that a non-trivial amount of sharing also occurs. Thus, we first want to understand how common local ownership is.

> Research Question 2: What proportion of objects are locally owned?

### Sharing

Sharing. Sharing occurs when objects in different components contain pointers to the same object or when multiple objects in the same component contain pointers to the same object. In the first case, the sharing likely involves objects of multiple types or at least objects that play different roles in the program; in the second case, the sharing likely involves objects of a single type that all play the same roles.

> Research Question 3: What proportion of sharing occurs between objects in the same conceptual component vs. across conceptual components?

In Figure 1(b), several expression objects point to the same Var object; this aliasing (non-injectivity) is depicted using wide, orange edges, if color is available. Multiple incoming edges to a node are cross edges. The node $2, which abstracts the Var objects, exhibits both types of sharing and therefore has cross edges: multiple objects within the tree component expr alias Var objects with $2 and the environment array env also points to Var objects within $2.

To understand why sharing occurs, we examine the non-injective and cross edges through the lens of common programming idioms. Our first idiom is based on the notion that a key role of many classes is to aggregate and provide appropriate views of the contained data. This often requires the resulting objects to store data in multiple ways. For example a class may store the same objects in both a List and a HashSet. Objects in such a class are shared but a single class closely manages their sharing. We consider sharing to be localized if, in all cases, a unique dominator recaptures the shared objects within no more than two pointer dereferences; we call such recaptured objects contained objects. Another common idiom is the use of objects, like singletons (unique) or intern tables (global), which map objects, typically strings, to references which are then used in place of the object for efficient storage or equality testing. The final idiom we look at is the sharing of immutable objects such as strings in C# and Java. When the objects are known to be immutable, developers are much less concerned about sharing them and often do so intentionally for performance reasons. First, we classify sharing in terms of these idioms:

> Research Question 4: What proportion of sharing involves 1) contained, 2) global, 3) unique, or 3) immutable objects?

We hypothesize that, in practice, these types of sharing dominate the sharing in real-world programs, and ask:

> Research Question 5: What proportion of sharing relationships remain unclassified?

The answer to this question has direct implications for the design of both annotation (or type) systems and static heap analysis tools. If much of the heap remains unclassified, then more expressive (and unappealing to practitioners) annotations will be needed and static heap analysis tools must be both deep and broad. If, on the other hand, our classification scheme captures most of the sharing in the heap, we will have shown that it is possible to relate idiomatic code designs to the heap structures they produce and that, in practice, programmers form and combine the components in a small number of simple and often idiomatic ways. This means that an annotation system or analysis tool that captures these idioms will be able to precisely and compactly annotate (analyze) the features that dominate real-world heaps. Further, since these systems would be built on a small number of concepts and designed to reflect programmer intent, they should be simple and intuitive for programmers to use and relatively easy to implement in a static (or dynamic) heap analysis tool.

### Abstraction Hypothesis

This work empirically explores how developers translate informal design specifications into class definitions. The following hypothesis underpins our analysis: Conceptual components, defined using our indistinguishability principles, accurately2 partition the heap. If this hypothesis does not hold then we would expect the partitions to contain unrelated objects and the resulting measurements of their properties to produce low information, indeterminate values. However, the results in Section 4 show very strong biases towards high accuracy properties. Thus, we have confidence that the conceptual component partitioning correctly identifies and abstracts the relevant parts of the heap.

## 3. METHODOLOGY

This work explores what structures real world programs build; in particular, we are interested in features that express developer intent, e.g. class invariants. This is why we based this study on HeapDbg, a Daikon-style dynamic invariant discovery tool tailored for the program heap [17, 26]. As HeapDbg operates on .Net bytecode, we must first translate Java programs into .Net bytecode using the ikvm compiler [20] before applying it.

HeapDbg extracts heap information, at program points and from those parts of the heap that are involved in these invariants. These points are typically the entry/exit of public methods and, in the heap, all objects reachable from method parameters and in-scope static fields. A heap snapshot is the set of locations reachable from static roots and the parameters of the current method call. At the entry of every public method, HeapDbg injects sampling code whose firing computes, abstracts, and aggregates a heap snapshot. Since extracting heap snapshots at each method call is impractical, HeapDbg uses a per-method randomized approach with an exponential backoff. When the current heap snapshot and

2 Here, we use the definition of accuracy from measurement theory, i.e. closeness of a measurement to the actual value.