Additionally, the programmer would need to create a FileList class. This solution also introduces new problems. Perhaps the most significant is the code explosion problem; for each and every list that contains a different type, the programmer will want to create a different special list class, such as StringList, IntegerList, and NodeList. These classes will inevitably contain significant duplication, because they all perform the same functions, differing only by data type.

## 2.2 Programming with Generics

These problems were solved with the introduction of generics to Java in 2004. Generics allow programmers to create their own generic type declarations (Bracha 2012) (we call these generic types, for short). For example, a programmer can create a user-defined generic declaration for a list like so:

```java
class MyList<T>{
    List internal;
    public T get(int index){
        return (T) internal.get(index);
    } ...
}
```

In this code, the T is called the formal type parameter. The programmer can use her MyList class by instantiating the formal type parameter by using a type argument (Bracha 2012), such as Integer or File in the following examples:

```java
MyList<Integer> intList = new MyList<Integer>();
MyList<File> fileList = new MyList<File>();
```

Each place where a generic type declaration is invoked (in this example, there are four) is known as a parameterized type (Bracha 2005). On the first line, the programmer has declared the type of the intList object so that the compiler knows that it contains objects of type Integer, and thus that the expression intList.get(10) will be of type Integer. The result is that the client code is both type safe and clearly expresses the programmer’s intent. The programmer can also use generic type declarations without taking advantage of generics by using them as raw types, such as MyList objectList, in which case the expression objectList.get(10) will be of type Object.

In addition to creating their own generic type declarations, programmers can use generic type declarations from libraries. For example, software developers at Sun generified (Bracha 2005), or migrated to use generics, the Java collections classes. For instance, the List class was parameterized, so that the previous problem could also be solved like so:

```java
List<File> l = getList();
System.out.println(l.get(10).isDirectory());
```

In addition to using generics in type declarations, generics can also be applied to individual methods to create generic methods, like so:

```java
<A> A head(List<A> l){
    return l.get(0);
}
```

In this code, the programmer can pass to the head method a generic list containing any type.