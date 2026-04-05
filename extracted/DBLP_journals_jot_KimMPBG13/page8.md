```csharp
Dictionary<string,int> data
    = new Dictionary<string,int>();
List<List<int>> list
    = new List<List<int>>();
```

The var keyword can reduce the repetitive typing in these examples like so:

```csharp
var data = new Dictionary<string,int>();
var list = new List<List<int>>();
```

There is no performance difference between explicit generic type declarations and implicit ones because the var keyword instructs the compiler to infer the exact type from the right side of the initialization statement at compile-time. Moreover, the IntelliSense feature, also known as auto-complete, in Visual Studio is aware of the exact type of a var-typed local variable, and can assist the developer equally well in both implicitly and explicitly typed versions of the code. This leads to our final research question:

### Research Question 6 (RQ6) - Do C# developers choose implicit generic type declarations more often than explicit ones?

However, it is not clear whether the benefits of the var keyword are outweighed by the readability drawbacks [var10]. Specifically, one might argue that readability is decreased because the type represents a compiler-checkable specification that documents the developer’s intent; with the var keyword, that intent becomes obscured. Indeed, this research question is a specific form of the more general question, “are developers willing to write specifications?” Our initial suspicion was that developers will generally prefer to use the succinct syntax of the var keyword.

## 4.2 Projects Studied

We analyzed 20 open source projects to examine the research questions we introduced in the previous section. We selected C# projects in the same way we selected projects for our previous study in Java [PBMH12], that is, we used Ohloh.net’s listing of the “most used” open-source projects, then chose projects based on several criteria:

1. Each project should have more than 10,000 lines of C# code.
2. Each project should begin before C# 2.0 was released in November 2005 so that we can observe how existing C# projects incorporate the new language feature.
3. Each project should have a complete version history because we want to trace the history of the project from its start.

Table 1 displays the name of each project, whether the project is an application, primarily intended for an end-user, or a library, primarily intended for a developer, and how many lines of code and the number of lines of C# code in the project as measured by ohloh.net on the date we copied the project for analysis. A table providing more details about each project is provided in the Appendix4 of this paper. Overall, regarding the 20 projects, we observe that: 4

4 http://www4.ncsu.edu/~dkim2/research/csharp_generics_appendix.pdf