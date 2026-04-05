As we mentioned in the introduction, Frankel [Fra93] found that generics were not widely used in Ada. Later, the principal designer of Ada suggested that, if he could, he would eliminate parameterized types, because they were “less useful than originally thought” [RSB05]. In this paper, we empirically investigate the usage of generics in a number of dimensions for the C# language.

## 4 Study Approach

In this section, we explain the approach in this study. Section 4.1 introduces our research questions. Section 4.2 introduces the characteristics of 20 projects collected for this study. Section 4.3 introduces the framework and the procedures we used for analyzing those projects.

### 4.1 Research Questions

In this section, we describe 6 research questions, of which four are from the research questions we used in our Java generics study2 and two new research questions are introduced to analyze specific characteristics of C# generics.

As we mentioned in related work, experts claim that generics reduce the need for typecasting, which in turn reduces runtime errors [Blo08, BOSW98, Ske10]. While we would like to determine directly whether runtime errors are really reduced in open source projects, we found very few bug reports where InvalidCastExceptions are reported.3 We suspect that this is because developers find and fix InvalidCastExceptions before releasing their software. Instead of measuring whether runtime errors are actually reduced when generics are used, we measure whether type casts are reduced:

> Research Question 1 (RQ1) - Will the number of type casts in a code-base be reduced when generics are introduced?

In our previous study our empirical results showed that generics reduce casts in Java (RQ1) [PBMH12]. We expect similar results in C# in this study.

Other experts have claimed that generics reduce duplication [Aus99] because generics reduce the need to redefine similar classes. For example, supposed we used our MyStack class from Section 2.2 as follows:

```
MyStack<int> intStack = new MyStack<int>();
MyStack<string> strStack = new MyStack<string>();
```

Without generics, a developer would normally create two stack classes, such as:

```
class IntMyStack{
    public void Push(int x){ ... }
    public int Pop(){ ... }
}
class StringMyStack{
    public void Push(string x){ ... }
    public string Pop(){ ... }
}
```

2 Were formatted two hypotheses in the previous paper [PBMH12] into research questions in the present paper, because several readers found the mix of research questions and hypotheses confusing.  
3 For example, see http://bugzilla.xamarin.com/buglist.cgi?quicksearch=InvalidCastException