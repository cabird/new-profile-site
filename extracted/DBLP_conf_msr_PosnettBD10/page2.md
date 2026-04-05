![UML diagram showing Template and Hook classes](page2_img_1.png)

Figure 1: UML Diagram of a metapattern

## II. METAPATTERNS

Pree defines metapatterns as a “set of design patterns” that “can describe any framework example design pattern on a meta-level.” Many pattern catalogs, and in particular, most of the GoF design patterns introduced by Erich Gamma et al. [2] fall into this category of “framework example design patterns” [1]. In addition to their structural properties, the GoF design patterns embody an intent, defined by the design issue or problem the pattern solves [2]. Metapatterns capture the structural and compositional aspects of design patterns without regard to this intent. Consequently, many design patterns share a common underlying metapattern model. For example, STATE and STRATEGY GoF patterns have a different intent but share a common metapattern structure.

Metapatterns are rooted in two structural roles, TEMPLATE and HOOK. A TEMPLATE is a class with a method t that calls a method h in the HOOK class (or interface). The terms are also used without ambiguity to refer to the TEMPLATE and HOOK methods. The TEMPLATE method must invoke the HOOK method through some variable or argument f in the TEMPLATE class. The cardinality of f defines the cardinality of the instance relationship between the TEMPLATE and HOOK classes. When f is a container the TEMPLATE may invoke any number of HOOK instances and the relationship is 1-N. Alternatively, if f is a simple instance of HOOK then TEMPLATE may invoke methods in only one HOOK instance and the relationship is 1-1. In every case, the HOOK method in the HOOK class can be overridden by methods in one or more HOOK IMPLEMENTATION (hereafter referred to as HIMP) classes derived from the HOOK class. Figure 1 shows a UML description of a metapattern.

The four forms of metapatterns are defined as follows:
1) If the HOOK to TEMPLATE relation is purely associative or aggregative, it is a 1-1 or 1-N CONNECTION metapattern.  
2) If TEMPLATE inherits from HOOK, it is a 1-1 or 1-N RECURSIVE CONNECTION metapattern.  
3) If TEMPLATE and HOOK are the same class, this is a UNIFICATION metapattern.  
4) If TEMPLATE and HOOK are the same class type, but TEMPLATE references or aggregates one or more instances of its own type, it is a 1-1 or 1-N RECURSIVE UNIFICATION metapattern.

In order to detect metapatterns, we must first extract the templates and hooks and so we present THEX, a Template and Hook Extractor.

## III. DESCRIPTION OF THEX

Tourwé [6] defined a formalism for metapatterns that we use as a basis for defining TEMPLATE/HOOK relationships, and also metapatterns. Listing 1 illustrates a standard 1-1 (via Template.h) and 1-N (via Template.hooks) connection metapattern in Java. THEX works specifically on Java bytecode to identify metapatterns.

### A. Finding TEMPLATES and HOOKS

First, we note that all non-final and non-private instance methods in Java are virtual by default, and may be overridden in a subclass. Thus, by Pree’s definition, any class with at least one instance method can be a HOOK and any instance method can be a HOOK method. This is not useful for our purposes. Rather, we use the following constraints to identify a metapattern in Java. We identify the TEMPLATE and HOOK together. Two classes, TEMPLATE and HOOK, form a metapattern if:

1) HOOK has at least one subclass that overrides a method h defined in HOOK.  
2) TEMPLATE contains at least one member field, local variable, or argument f, that is either of type or super-type of HOOK (including Object), an array of type or super-type of HOOK, or a collection of type or super-type of HOOK.  
3) TEMPLATE contains some method m that contains a code path such that the object that is referenced by f has its h method called.

Constraint 1 restricts the HOOK to classes that are actually being subclassed. Constraints 1 and 2 are easily detected in a purely structural manner by reconstructing the class hierarchy in a code base and recording the methods and member fields defined in each class. Constraint 3 is more difficult. We track data flow via symbolic execution [7] in bytecode by extending the ASM library [8] and performing some minor inter-procedural analysis to detect which referenced object has its h method called. We report metapattern reference type as one of FIELD, LOCAL, or ARGUMENT, prioritized as listed, depending on which types are contained in the data trace of

![Java code listing of Hook and Template metapattern](page2_img_2.png)

Listing 1: An example java Hook and Template metapattern