how individual objects are connected and shared [16, 19, 21, 23]. We hypothesize that developers actually think primarily in terms of the roles that objects play and the relations between these roles rather than thinking in terms of individual objects. Further, we hypothesize that these relations are encoded in where pointers to the objects that play each role are stored, i.e. objects that play the same roles are stored together while objects that play different roles are segregated. This study is built on an abstraction that allows us to study heap structures, and their relations, in terms of roles.

The results in this paper show, with a high degree of statistical confidence, that for object-oriented programs: local ownership (a variant of ownership [7, 23]) is an important but not dominant organization concept (mean of 51% ± 12% of types), that aggregation is the dominant form of composition (mean of 85% ± 12% of types), and that a small set of developer-centric concepts organize all type sharing (mean of 88% ± 4% of types can be precisely categorized). In particular, we show that the majority of sharing that actually occurs can be categorized using a small number of programming idioms, viz. contained (i.e. locally shared), global, unique, and immutable objects.

This paper makes the following contributions:
- We use runtime sampling to measure and statistically analyze the heaps produced by the DaCapo benchmarks [3] and a selection of C# programs;
- We provide evidence that components, as described in [26], usefully and closely correspond to the roles that developers assign to objects; and
- We identify a small number of sharing patterns, which are related to common programming idioms, such as the sharing of unique and immutable objects, that describe the majority of sharing that occurs in practice.

Our results confirm some commonly held beliefs about the heap — programmers avoid sharing and built-in containers are preferred to custom implementations — and provide actionable information — strict ownership is not the dominant form of organization and sharing generally occurs in a small number of idiomatic ways — for rethinking the design of annotation systems, the allocation/collection of memory, and the design of program analyses.

## 2. THEORY

Object-oriented programming provides two ways for a programmer to transform abstract concepts into classes: is-a and has-a relations. In this work, we focus on the question of how programmers use the has-a relation, i.e. encapsulation and aggregation, to organize objects in object-oriented programs. Simply stated, we ask "How do programmers organize the heaps of real world object-oriented programs?"

We hypothesize that developers often think of objects in terms of the roles they play in programs. These roles implicitly aggregate objects into conceptually related sets, as when a developer thinks of objects as a class or a collection of value and expression nodes simply as an "abstract syntax tree". Thus, we utilize a role-based heap abstraction, which mirrors the roles a programmer assigns to objects, based on the has-a relation plus the standard notions of recursive data-structure identification [8, 21, 27, 32], predecessors [2, 5, 8, 25, 33], and grouping container contents [5, 9, 25].

### Conceptual Components.

In our formulation, objects are structurally indistinguishable if they 1) are members of the same spine [32] of a recursive structure or 2) have the same type and are stored together. Informally, objects are stored together when they are stored in the same container or when they have the same type and share a predecessor.

These structural indistinguishability principles were first formalized and realized in HeapDbg, the heap analysis tool on which this empirical study is based [26]. Formally, the HeapDbg abstraction models the state of a program heap with an environment, mapping variables to addresses, and a store, mapping addresses to objects. An instance of an environment paired with a store is a heap. Given ProgramTypes, the types a program uses, HeapDbg defines the set of concrete labels in the program, StorageLabels, as the set of all member fields and array indices in the program. HeapDbg then constructs a heap as the tuple (Env, σ, Ob) where

Env ∈ Environment = Vars → Addresses  
σ ∈ Store = Addresses → Objects ∪ {null}  
Objects = ProgramTypes × (StorageLabels → Addresses)  
Ob ∈ 2^Objects.

Each object o ∈ Ob pairs the type of the object with a map from the object's field labels to addresses. HeapDbg assumes that the objects in Ob and the variables in the environment Env, as well as the values stored in them, are well-typed. The usual notation o.l refers to the value of the field (or array index) l in the object o.

A conceptual component C ⊆ Ob is a partition of the heap objects, built by applying congruence closure to a formalization of the structural indistinguishability principles. Using conceptual components as nodes, we then build a storage-shape [5] (or points-to) graph whose edges are sets of pointers between objects in conceptual components. HeapDbg extends this basic model with injectivity (non-aliasing) annotations on the edges and shape annotations on the nodes [26].

### Pointer Injectivity.

We can view a set of pointers as a function that maps one set of objects to another. A function is injective, or one-to-one, when it maps each distinct element in its domain to a distinct element in its range. The edges in the conceptual component graph abstract just such sets of pointers. When the pointers an edge abstracts are all pairwise unaliased, that edge is injective; otherwise, it contains aliasing pointers and is non-injective.

In the heap (Env, σ, Ob), the set of non-null pointers from C1 to C2 is
P(C1, C2, σ) ⇔ { (o, l, σ(o.l)) | o ∈ C1 ∧ σ(o.l) ∈ C2 }.
Since C2 is a partition of the concrete heap, it is nonempty and does not contain null by definition, so σ(o.l) ≠ null. Given two distinct conceptual components C1 and C2 in the heap (Env, σ, Ob), the non-null pointers with the label l from C1 to C2 are injective:

inj(C1, C2, l, σ) ⇔ ∀ (o_s, l, o_t), (o_s', l, o_t') ∈ P(C1, C2, σ):  
(o_t = o_t') ⇒ (o_s = o_s').

This definition of the injectivity of the pointer sets that form edges in the graph of conceptual components elegantly generalizes to arrays. The key to this generalization is to replace labels with indices, then require distinct indices to point to distinct objects.

The notion of injectivity is very strong. It asserts an absence of aliasing among a set of pointers, and perhaps counter-intuitively, it holds for the vast majority of the non-