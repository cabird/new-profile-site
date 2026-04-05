## 3 Phylogeny: Metapatterns and Patterns

Metapatterns are rooted in two structural roles, template and hook. A template is a class with a method t that calls a method h in the hook class (or interface). The template provides a “template” to accomplish a goal and the hook provides a way in, or a “hook,” into a flexible class hierarchy including the hook and its descendants. We use the same terms, without ambiguity, to refer to the template and hook methods, i.e. hook may refer to either a method or a class, depending on context. To make use of the hook class hierarchy, the template method must invoke the hook method through some variable or parameter f in the template class. This variable provides the link between the algorithm and the collection of classes available in the hook class hierarchy. The cardinality of f defines the cardinality of the instance relationship between the template and hook classes. When f is a container the template may invoke any number of hook instances and the relationship is 1:N. Alternatively, if f is a simple scalar instance of hook then template may invoke methods in only one hook instance and the relationship is 1:1. A subject may have to update many observers so this would indicate a 1:N relationship. On the other hand, a document formatting strategy may hold only a single document formatter reference even though it might choose one of several concrete formatters; this single object reference defines a 1:1 relationship.

In every case, the hook method in the hook class can be overridden by methods in one or more hook implementation (hereafter referred to as implementation) classes derived from the hook class. In the example above, the concrete strategies that implemented different document formatters would play the implementation roles.

The patterns are shown in Fig. 2 and are defined as follows:

1. If the hook to template relation is purely associative or aggregative, it is a 1:1 or 1:N Connection metapattern.  
2. If template inherits from hook, it is a 1:1 or 1:N Recursive Connection metapattern.  
3. If template and hook are the same class, this is a unification metapattern.  
4. If template and hook are the same class type, but template references or aggregates one or more instances of its own type, it is a 1:1 or 1:N Recursive Unification metapattern.

### 3.1 Connection Metapatterns

In the connection metapattern, the template method delegates a specific task to the hook method. The hook method is an “articulation point” allowing the implementation and template classes to change independently.

The first row of Table 1 lists the traditional design patterns that instantiate the 1-1-Connection metapattern. Because the hook serves as the base class for one or more implementations, we can expect that the hook role is relatively less change prone than the implementation or the template roles. This mirrors the intuition reported by Di Penta et al. across many design pattern roles such as those of the adapter, command, state, strategy, and observer patterns.

In general, given a pattern role, the corresponding meta-role is evident. For example, the builder pattern, a 1-1-Connection metapattern: the builder pattern role maps to a hook role, the director to the template role, and the concrete builder to the implementation role. We list the typical meta-roles for the canonical GOF structures in Table 2.