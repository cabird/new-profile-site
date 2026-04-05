reader and is not required to understand our results. Let F denote the set of all files in a project repository and R = {1, 2, ..., n} denote the set of all revisions in the repository. Thus, f_r ∈ F × R represents file f in revision r (or, put another way, immediately after revision r has been checked into the repository). Let M be the set of all method names in the source code in the repository and T_r be the set of all raw types and T_g be the set of all parameterized types in the source code. We now define two functions. Types_r takes a method m, file f, revision r, and raw type t ∈ T_r and returns the number of uses of t in method m within revision r of file f.

Types_r : (M × F × R × T_r) → Z

Similarly, Types_g provides the same functionality for a parameterized type t ∈ T_g.

Types_g : (M × F × R × T_g) → Z

Finally, let Elide: T_g → T_r be a function that maps a parameterized type to its corresponding raw type. For example Elide(List<String>) = List. We record a generification of type t_r ∈ T_r to type t_g ∈ T_g in method m ∈ M in revision r ∈ R of file f ∈ F iff

∃ i > 0 :
Types_r(m, f, r−1, t_r) = Types_r(m, f, r, t_r) + i
∧ Types_g(m, f, r−1, t_g) = Types_g(m, f, r, t_g) − i
∧ Elide(t_g) = t_r

We note that this approach is a heuristic and does not provide conclusive proof that a generification occurred. To assess this threat, we manually examined over 100 generifications identified by our algorithm and in all cases, the change represented a generification of a raw type.

One limitation of this approach is that we will miss “implicit” parameterized types. Consider the following two method signatures:

```java
void printList(List<String> l)
List<String> getList()
```

Our analysis will identify both methods as using generics. However, if these two method calls are nested in a separate method:

```text
a.printList(b.getList())
```

then no parameterized type appears in the AST and we do not count it as a use of generics. Tackling this problem would require a static analysis beyond the bounds of an individual source file, heavily decreasing performance at the scale of our analysis (hundreds of millions LOC). We do not believe this impacts our results, as in our experience, few methods contain implicit parameterized types without type declarations.