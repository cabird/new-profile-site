Like Java, C# is widely used. According to the TIOBE Programming Community Index [TIO00], an indicator of the popularity of programming languages, as of February 2012, Java is about twice as popular as C#. However, TIOBE remarks that C# is arguably the only serious candidate to compete with Java because the popularity of C# is growing whereas the popularity of Java is decreasing.

C# and Java take different approaches to the design of generics. Java generics are designed to allow for backward compatibility, so that Java byte code generated from source code that uses generics can work with older versions of Java that do not have generics support. In contrast, C# generics do not allow for backward compatibility. Another difference is that in C# generics are designed specially to improve performance when value types are used as generic arguments so that these value types do not have to be converted into objects [KS01]. In contrast, Java has no such special case for value types and requires that value types are converted into and from objects when using generics, incurring additional runtime overhead. These design differences may make a substantial difference in how developers use generics.

## 2.2 General Terminology in Generics

C# developers can define and use a generic class as in the following example:

```
1  public class MyStack<T>{
2      T[ ] store;
3      public void Push(T x){ ... }
4      public T Pop(){ ... }
5      public void MyMethod<X>(X x){ ... }
6  }
7  MyStack<int> intStack = new MyStack<int>();
```

Throughout this paper, we use the following terms:

- A generic type: a class or interface declared with one or more type parameters using angle brackets. An example is MyStack<T> on line #1.

- A generic method: a method declared with one or more type parameters using angle brackets. An example is MyMethod<T> on line #5.

- A generic type parameter: a type variable defined in angle brackets. An example is T in MyStack<T> on line #1.

- A generic type argument: a type that substitutes for a generic type parameter. An example is int of MyStack<int> on line #7. The int substitutes for T in MyStack<T> on line #1.

- A parameterized type: an instantiation of a generic type with generic type arguments. MyStack<int> is an example of a parameterized type on line #7.

## 2.3 Generic Uses in C#

In this paper part of our analysis is concerned with both how people declare generic types and how people use generic types. In this section, we describe the various ways generic types can be used.

A common example of where generics are useful is in declaring variables that are collections. Before C# generics, System.Collections was the default namespace