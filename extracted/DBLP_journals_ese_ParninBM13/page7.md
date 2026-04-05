- Typed data collections such as FileList create non-standard and sometimes inconsistent abstractions.
- Generics prevent code duplication and errors resulting from maintaining multiple typed data collections.
- Generics enhance readability and specification.
- Generics lower cognitive load by requiring the programmer to remember fewer details.

### 3.2 Empirical Studies of Generics

There have been few empirical studies related to the use of generics in Java or parameterized types in object-oriented languages in general. Here we discuss the few that exist.

In 2005, Basit et al. (2005) performed two case studies examining how well generics in Java and templates in C++ allowed what they termed "clone unification." They found that 68% of the code in the Java Buffer library is duplicate and tried to reduce these clones through generification. About 40% of the duplicate code could be removed. They observed that type variation triggered many other non-type parametric differences among similar classes, hindering applications of generics. They also observed heavy cloning in the C++ Standard Template Library as well.

Fuhrer et al. (2005) implemented refactoring tools that would replace raw references to standard library classes with parameterized types. In evaluating the refactoring tools on several Java programs, they were able to remove 48.6% of the casts and 91.2% of the compiler warnings.

We are not the first to examine how well features intended to aid programmers live up to their claims. Pankratius et al. performed an empirical study aimed at determining if transactional memory actually helped programmers write concurrent code (Pankratius et al. 2009). They found some evidence that transactional memory (TM) did help; students using TM completed their programs much faster. However, they also spent a large amount of time tuning performance since TM performance was hard to predict.

These studies differ from our study in that they investigated generics or another language feature in an artificial or laboratory context, whereas we investigate generics in several natural contexts: open source software. As a result, these studies investigate the ideal impact of generics, while our study investigates their real impact.

### 3.3 Empirical Studies of Annotations

In this paper we contrast the adoption of Java generics with adoption of Java annotations. While many researchers have introduced new types of annotations, such as for extended type checking (Flanagan et al. 2002) and pluggable types (Papi et al. 2008), little work has studied the use of annotations in existing programs. The most relevant empirical research that we know of is Shi and colleagues’ study of how API documentation changes over time (Shi et al. 2011). Specifically, the authors looked at how Java API annotations are changed in five real-world libraries in order to understand how API documentation evolves. In contrast, the study presented in