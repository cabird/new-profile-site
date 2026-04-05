## 2 Language Feature Overview

In this section we briefly describe the motivation and use of Java generics and annotations. In an effort to maintain consistent terminology, we present in bold the terms that we use in this paper, drawing from standard terminology where possible. Readers who are familiar with Java generics and annotations may safely skip this section.

### 2.1 Motivation for Generics

In programming languages such as Java, type systems can ensure that certain kinds of runtime errors do not occur. For example, consider the following Java code:

```java
List l = getList();
System.out.println(l.get(10));
```

This code will print the value of the 10th element of the list. The type system ensures that whatever object getList() returns, it will understand the get message, and no runtime type error will occur when invoking that method. In this way, the type system provides safety guarantees at compile time so that bugs do not manifest at run time.

Now suppose we want to take the example a step further; suppose that we know that l contains objects of type File, and we would like to know whether the tenth file in the List is a directory. We might naturally (and incorrectly) write:

```java
List l = getList();
System.out.println(l.get(10).isDirectory());
```

Unfortunately, this leads to a compile-time error, because the return type of the get method is specified at compile-time as Object. The type checker gives an error because it does not know what types of objects are actually in the list.

In early Java, programmers had two ways to solve this problem, the first is casting, and the second we call home-grown data structures. If the programmer implements the casting solution, her code would look like this:

```java
List l = getList();
System.out.println(((File)l.get(10)).isDirectory());
```

The cast is the (File) part, which forces the compiler to recognize that the expression l.get(10) actually evaluates to the File type. While this solves one problem, it causes another; suppose that a programmer at some point later forgets that the list was intended to hold Files, and inadvertently puts a String into the List. Then when this code is executed, a runtime exception will be thrown at the cast. A related problem is that the code is not as clear as it could be, because nowhere does the program explicitly specify what kind of objects the list returned by getList() contains.

If the programmer instead implements the home-grown data structure solution, the code will look like this:

```java
FileList l = getList();
System.out.println(l.get(10).isDirectory());
```