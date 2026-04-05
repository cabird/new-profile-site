> Sun recommended that programmers “should use generics everywhere [they] can. The extra efforts in generifying code is well worth the gains in clarity and type safety.”1 There have been a number of papers and books that have extolled the benefits of using generics in several contexts. We list here a sample of such claims.
> 
> In Effective Java, Bloch (2008) asserts that when a programmer uses non-generic collections, she will not discover errors until run time. Even worse, the error is manifest as a ClassCastException when taking an item out of a collection; yet to correct the error, she must time-consumingly identify which object was wrongly inserted into the collection. By using generics, the type system shows the developer exactly where she inserted the incorrect object, reducing the time to fix the problem.
> 
> In their paper on automatically converting Java programs to use generic libraries, Donovan et al. (2004) assert:
> 
> - In pre-generic Java, programmers thought of some classes in pseudo-generic terms and tried to use them in such a way. However, without a generic type system, they would make inadvertent errors that would show up at runtime. The addition of generics to the type system moves these runtime errors to compile-time type errors.
> - The type system represents an explicit specification, and generics strengthen this specification. This is better for developers because they can use this strong specification to reason about the program better and are less likely to make mistakes. In addition, the compiler can enforce the specification.
> - Prior to generics, programmers that wanted type-safe containers would write their own home-grown data structures, increasing the amount of work and likelihood of error, compared to using data structures in libraries. Such structures also “introduce nonstandard and sometimes inconsistent abstractions that require extra effort for programmers to understand.”
> 
> In his book on C++ templates, Vandevoorde and Josuttis (2003) asserts that when the same operations need to be performed on different types, the programmer can implement the same behavior repeatedly for each type. However, if in doing so she writes and maintains many copies of similar code, she will make mistakes and tend to avoid complicated but better algorithms because they are more error prone. She must also deal with all of the difficulties associated with code clones such as making orchestrated changes to coupled clones (Geiger et al. 2006) and perform maintenance more frequently (Monden et al. 2002).
> 
> Naftalin and Wadler (2006) claim that generics work “synergistically” with other features of Java such as for-each for loops and autoboxing. They also claim that there are now fewer details for the programmer to remember. They also claim that generics can make design patterns more flexible by presenting an example of a visitor pattern that works on a tree with generic elements.
> 
> In summary, the claims made by previous authors are:
> 
> - Generics move runtime errors to compile-time errors.
> - Programmers no longer have to manually cast elements from pseudo-generic data structures or methods.