## 5.4 Prospecting for New Language Features

Loop idioms can provide data-driven evidence for the introduction of new language features, providing data-driven evidence for the evolution of programming languages. For example, some of the top idioms suggest novel language features. For example, five top loop idioms with total coverage 12% have the form:

```c
for (int i = 0; i < collection.Length; i++)
    foo(i, collection[i])
```

where they are iterating over a collection but also require the index of the current element.

A potential new feature is the introduction of an Enumerate operation that jointly returns the index and the element of a collection. This resembles the `enumerate` function that Python already has and Ruby’s `each_with_index`. Interestingly, loop idioms identify a common problem faced by C# developers: in StackOverflow there is a related question for C# [61] with about 542k views and a highly voted answer (873 votes) that suggests a helper method for bypassing the lack of such a function.

## 5.5 Prospecting for New LINQ Operators

Mined loop idioms can inform the evolution of LINQ by informing the design of new LINQ operators. For example, while mapping loop idioms to LINQ, we found 5 idioms (total coverage of 5.4%) that could map to the rather cumbersome LINQ statement:

```csharp
Range(0, M).SelectMany(i => Range(0, N)
    .Select(j => foo(i, j)))
```

These idioms essentially are doubly nested `for` loops that perform some operation for each `i` and `j`. This suggests that a 2-d Range LINQ operator would be useful and would cover about 5.4% of the loops. In contrast, our data suggests that an n-d (n > 2) Range operator would be used very rarely and therefore no such operator needs to be added. We note that we have found two StackOverflow questions [59, 60] with 29k views that are looking for this functionality. Another example is a set of idioms (coverage 6.6%) that map to:

```csharp
Range(M, N).Select(i => foo(collection[i]))
```

essentially requiring a slice of an ordered collection. The common appearance of this idiom in 6.6% of the loops provides strong data-driven evidence that a new feature would be highly profitable to introduce. For example, to remove these loops or their cumbersome LINQ equivalent, we could introduce a new `Slice` feature that allows the more idiomatic `list.Slice(M, N).Select(foo)`. Indeed, the data has helped us identify a frequently requested functionality: this operation seems to be common enough that .NET 3.0 introduced the `slice` method, but only for arrays. Additionally, the need of such a feature — that we automatically identified through data — can be verified by the existence of a highly voted StackOverflow question [62] with 166k views and 15 answers (with 503 votes in total) asking about slicing, with some of the answers suggesting a `Slice` LINQ extension function.

Finally, we observe that some loops mutate multiple variables at a time (e.g. adding elements to two collections), while efficiently reusing intermediate results. To refactor this with LINQ statements an intermediate LINQ expression needs to be converted to an object (e.g. by using `ToList()`) to be consequently used in two or more other LINQ expressions, because of the laziness of LINQ operators.

8. This could also be mapped to the equally ugly `collection.Skip(M).Take(N-M).Select(foo)`.

This is not memory efficient and may create an unneeded bottleneck when performing parallel LINQ operations. A memoization LINQ operator (like `tee` in Python) that can distribute the intermediate value into two or more LINQ streams could remove such hurdles from refactoring loops into LINQ.

In our dataset, LINQ slicing seems to be a common idiom required across many projects, suggesting that an addition to core LINQ API could be reasonable. In contrast, the 2d Range is specific to mathnet-numerics, suggesting that a domain-specific helper/extension LINQ operator could be introduced in that project, as we discussed earlier.

## 5.6 Prospecting for New APIs

The top mined loop idioms are interesting semantic patterns of the usage of code. However, some of the common patterns may be hard to read and cumbersome to write. Since semantic idioms represent common operations, they implicitly suggest new APIs that can simplify how developers invoke some operation. Thus, the data-driven knowledge that can be extracted from semantic idiom mining can be used to drive changes in libraries, by introducing new API features that simplify common usage scenarios. Due to space limitation, we present only two examples in this section.

One common set of loop idioms (covering 13.7% of the loops) have the form:

```csharp
foreach (var element in collection)
    obj.DoAction(foo(element))
```

where each element in the `collection` is mapped using `foo` and then `obj` is written. The frequent usage of this loop idiom for an API provides strong indication that a new API feature should be added. For example, in lucenenet the following (slightly abstracted) loop appears:

```c
for (int i = 0; i < numDocs; i++) {
    Document doc = foo(i);
    writer.AddDocument(doc);
}
```

In this example, `AddDocument` does not support any operation that adds more than one object at a time. This forces the developers of the project to consistently write loops that perform this operation. Adding an API method `AddDocuments`, that accepts enumerables would lead to simpler, more readable and more concise code:

```csharp
writer.AddDocuments(collection.Select(foo))
```

We find similar issues in other libraries, such as in mathnet-numerics where the same operation (e.g. a test for a specific condition) is applied in all entries of a matrix using multiple loops. For example, in the testing code of mathnet-numerics there are 717 doubly nested `for` loops that test a simple property of each element in a 2d-array. Adding a new API that accepts a lambda for each location `i, j` would greatly simplify this code, replacing doubly nested loops with:

```csharp
matrix.AssertAll((i, j, elem) => ...)
```

which is more concise.

## 6 RELATED WORK

The semantic idiom mining method we use in this paper builds on the work of Allamanis and Sutton [4]. Allamanis and Sutton [4] sought to find meaningful patterns in big code by mining syntactic idioms, code patterns that do capture usage dependencies among