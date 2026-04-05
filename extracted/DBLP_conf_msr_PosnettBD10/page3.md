![Table of metapatterns](page3_img_1.png)

Table I: Metapatterns in the Huston Design Patterns.

the object referenced by f. We say “the object referenced by f” because often the method call to h is not made directly through f itself. Consider a method that has a local variable l, of type HOOK. If the method only makes the call l.h(), then the class interaction is considered a metapattern with respect to l, i.e. it’s a LOCAL metapattern. However, if f is assigned to l and then the call l.h() is made, then l references the same object that f references and the class interaction is a metapattern with respect to f and the metapattern is of type FIELD. We report all three types for completeness and the researcher may filter the output depending on their particular interests.

THEX detects metapatterns even if f is not of type HOOK. In many cases, we observed metapatterns in which f was cast from a super-type to type HOOK prior to making the call to h, especially when collections were used prior to Java 1.5, where all collections hold instances of type java.lang.Object. We also found instances where the field f of the TEMPLATE class was accessed via a “getter” method, e.g. one might see a statement of the form:

```java
Hook getf() { return f; }
void templateMethod() {
    Hook v = getf();
    v.h();
}
```

We detect getter methods by identifying methods that return the object that f references along all possible code paths (in a conservative manner), and use knowledge of such getter methods when detecting a call to a hook method via the object referenced by f.

We note that constraint 2 limits 1-N patterns to cases where f is either an array of type or super-type HOOK or a java.util.Collection of type or super-type HOOK. This is because if f is an arbitrary object with a method that returns an object of type HOOK, it is difficult to determine if f represents a container for instances of HOOK or if f is some other type of object not tightly associated with HOOK. In practice, we observed that the majority of Java-based software uses arrays and collection classes (generic or otherwise) to hold instances of type (or super-type of) HOOK. THEX will not detect a metapattern if f is an idiosyncratic or custom container class for HOOK.

THEX first identifies all possible HOOK classes (i.e. classes that fulfill constraint 1). Next THEX considers every class in turn to be a TEMPLATE class and then examines all member fields and methods. Each member field is a candidate HOOK and all methods of TEMPLATE are examined to see whether constraint 3 is met (in practice, each method is examined only once and all member fields, arguments, and local variables are tracked at once during the symbolic execution). If THEX identifies a matching TEMPLATE/HOOK pair that meets all three constraints, it outputs the classes along with the HIMP class, the trace of f (including reference type), and the TEMPLATE and HOOK methods (often, there is more than one HOOK method).

### B. Metapatterns Classification

After all TEMPLATE/HOOK metapattern pairs have been identified, THEX uses inheritance and equality relationships to classify the metapatterns. Each TEMPLATE/HOOK metapattern is identified as one of UNIFICATION, CONNECTION, or RECURSIVE CONNECTION metapatterns. If the TEMPLATE class and the HOOK class are the same class then the pattern is a UNIFICATION metapattern; if the template inherits from the hook and is distinct from the hook then we identify a RECURSIVE CONNECTION metapattern and the remaining metapatterns are classified as CONNECTION metapatterns. At any given time, THEX is only examining one method in a candidate TEMPLATE class, and each method only needs to be examined once. This means that THEX runs in time linear to the total number of methods in the system and that memory usage is linear in the number of classes and fields and constant in the size of the largest method in the system. The benefit of this is that THEX scales nicely. We were able to identify metapatterns in the entire Eclipse code base in under 30 minutes. Further, THEX exists as a completely self contained jar file and only needs access to the bytecode in order to run. This allows a user to run THEX on any software that compiles to bytecode (code written in Scala or Jython, for instance) and an application can be examined in toto with required libraries, which may be cumbersome when source code is required.

## IV. EVALUATION AND USES

Our tool is designed to extract metapatterns based on our specification; hence there exists no oracle that we can use to evaluate recall and precision directly. Instead we use software with known examples of design patterns and evaluate the ability of our tool to locate metapatterns within the design patterns. To compare results, we relate metapattern roles to