![Figure 5: three plots showing percentage of value types over time](page19_img_1.png)

Figure 5 – The percentage of value types used in parameterized types over time.

Implementation of generics improve performance.

## 5.6 RQ6: Do developers prefer implicit generic type declarations?

As explained in Section 4.1, programmers can declare local variables with the var keyword instead of using explicitly typed generics. This may encourage the use of generics because redundancy can be reduced. At the same time, however, using the var keyword may reduce readability. Our research question (RQ6) is whether developers prefer to reduce redundancy by using the var keyword with generics. To answer this research question, we analyzed the projects looking for two different but equivalent programming statements, generic assignments that use var and assignments that do not use var:

```
var list = new List<String>();
List<String> list = new List<String>();
```

For simplicity, we limited our analysis to assignments where the variable is declared on the left-hand side of the expression and the right-hand side of the expression is a call to a constructor with one or more generic type arguments. We then examined how many var types are used over time by each developer in each project.