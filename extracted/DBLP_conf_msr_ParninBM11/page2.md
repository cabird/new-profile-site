## 2.1 Motivation for Generics

In programming languages such as Java, type systems can ensure that certain kinds of runtime errors do not occur. For example, consider the following Java code:

```java
List l = getList();
System.out.println(l.get(10));
```

This code will print the value of the 10th element of the list. The type system ensures that whatever object `getList()` returns, it will understand the `get` message, and no runtime type error will occur when invoking that method. In this way, the type system provides safety guarantees at compile time so that bugs do not manifest at run time.

Now suppose we want to take the example a step further; suppose that we know that `l` contains objects of type `File`, and we would like to know whether the tenth file in the `List` is a directory. We might naturally (and incorrectly) write:

```java
List l = getList();
System.out.println(l.get(10).isDirectory());
```

Unfortunately, this leads to a compile-time error, because the return type of the `get` method is specified at compile-time as `Object`. The type checker gives an error because it does not know what types of objects are actually in the list.

In early Java, programmers had two ways to solve this problem, the first is casting, and the second we call home-grown data structures. If the programmer implements the casting solution, her code would look like this:

```java
List l = getList();
System.out.println(((File) l.get(10)).isDirectory());
```

The cast is the `(File)` part, which forces the compiler to recognize that the expression `l.get(10)` actually evaluates to the `File` type. While this solves one problem, it causes another; suppose that a programmer at some point later forgets that the list was intended to hold `File`s, and inadvertently puts a `String` into the `List`. Then when this code is executed, a runtime exception will be thrown at the cast. A related problem is that the code is not as clear as it could be, because nowhere does the program explicitly specify what kind of objects the list returned by `getList()` contains.

If the programmer instead implements the home-grown data structure solution, the code will look like this:

```java
FileList l = getList();
System.out.println(l.get(10).isDirectory());
```

Additionally, the programmer would need to create a `FileList` class. This solution also introduces new problems. Perhaps the most significant is the code explosion problem; for each and every list that contains a different type, the programmer will want to create a different special list class, such as `StringList`, `IntegerList`, and `NodeList`. These classes will inevitably contain significant duplication, because they all perform the same functions, differing only by data type.

## 2.2 Programming with Generics

These problems were solved with the introduction of generics to Java in 2004. Generics allow programmers to create their own generic type declarations [4] (we call these generic types, for short). For example, a programmer can create a user-defined generic declaration for a list like so:

```java
class MyList<T> {
    List internal;
```

```java
public T get(int index) {
    return (T) internal.get(index);
}
...
```

In this code, the `T` is called the formal type parameter. The programmer can use her `MyList` class by instantiating the formal type parameter by using a type argument [4], such as `Integer` or `File` in the following examples:

```java
MyList<Integer> intList = new MyList<Integer>();
MyList<File> fileList = new MyList<File>();
```

Each place where a generic type declaration is invoked (in this example, there are four) is known as a parameterized type [5]. On the first line, the programmer has declared the type of the `intList` object so that the compiler knows that it contains objects of type `Integer`, and thus that the expression `intList.get(10)` will be of type `Integer`. The result is that the client code is both type safe and clearly expresses the programmer’s intent. The programmer can also use generic type declarations without taking advantage of generics by using them as raw types, such as `MyList objectList`, in which case the expression `objectList.get(10)` will be of type `Object`.

In addition to creating their own generic type declarations, programmers can use generic type declarations from libraries. For example, software developers at Sun generified [5], or migrated to use generics, the Java collections classes. For instance, the `List` class was parameterized, so that the previous problem could also be solved like so:

```java
List<File> l = getList();
System.out.println(l.get(10).isDirectory());
```

In addition to using generics in type declarations, generics can also be applied to individual methods to create generic methods, like so:

```java
<A> A bigHead(List<A> as1, List<A> as2) {
    return as1.get(0) > as2.get(0) ? as1.get(0) : as2.get(0);
}
```

In this code, the programmer can pass to the `bigHead` method two generic lists containing any type, and the type checker will assure that those two types are the same.

## 3. RELATED WORK

In this section, we discuss previous claims about and studies of generics.

### 3.1 Claims Regarding Generics

There have been a number of papers and books that have extolled the benefits of using generics in several contexts. We list here a sample of such claims.

In Effective Java, Bloch [3] asserts that when a programmer uses non-generic collections, she will not discover errors until run time. Even worse, the error is manifest as a `ClassCastException` when taking an item out of a collection, yet to correct the error, she must time-consumingly identify which object was wrongly inserted into the collection. By using generics, the type system shows the developer exactly where she inserted the incorrect object, reducing the time to fix the problem.

In their paper on automatically converting Java programs to use generic libraries, Donavan et al. [6] assert:
- In pre-generic Java, programmers thought of some classes in pseudo-generic terms and tried to use them in such a way. However, without a generic type system, they would