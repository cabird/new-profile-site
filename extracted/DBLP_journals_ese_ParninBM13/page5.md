## 2.3 Motivation for Annotations

Programmers sometimes want their software to give information to the tools that run over that software. For example, a program might want to tell a compiler that a certain method is deprecated and should no longer be called (Java Language Guide 2012) or a class might want to tell its environment that it represents a web service (The Advantages of the Java EE 5 Platform 2012). Prior to Java 5, such mechanisms to communicate with tools were ad hoc. For example, before Java 5, the Deprecated tag in a JavaDoc comment indicates whether a method is deprecated, while an external descriptor file indicates that a class is a web service.

## 2.4 Programming with Annotations

With Java 5, the annotation language feature was introduced as a unified syntax for programs to issue directives to tools. To use an annotation, the programmer puts an @ symbol followed by an annotation name just before a program element (such as a class or method), and, if the annotation has values, sets those values in curly brackets. For instance, to tell the compiler that the head method is deprecated, the programmer can write the following:

```
@Deprecated
<A> A head(List<A> l){
```

When a program is compiled, the compiler warns the programmer about any code that references this method. If the programmer wants to mark a class as a web service, she can write the following:

```
@WebService
public class MyWebService{
```

The @Deprecated annotation is an example of an annotation recognized by the Java 5 compiler. Two other annotations are recognized by default by the compiler: the @Override annotation, used for indicating that a method overrides a method in a superclass, and the @SuppressWarnings annotation, used for telling the compiler not to generate certain warnings when compiling (The Java Tutorials 2012). The @WebService annotation is an example of an annotation defined in a specific API. Often these types of annotations are discovered and inspected via reflection and used for purposes such as automatically generating wrapper code or configuring framework properties. Users can define their own custom annotations as well, although a discussion of how this is done is beyond the scope of this paper.

## 3 Related Work

In this section, we discuss previous claims about and studies of generics.

### 3.1 Claims Regarding Generics

When Sun introduced generics, they claimed that the language feature was “a long-awaited enhancement to the type system” that “eliminates the drudgery of casting.”