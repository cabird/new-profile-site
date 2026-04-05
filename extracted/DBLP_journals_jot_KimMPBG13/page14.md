![Table 3: Spearman's rank correlation values for each project](page14_img_1.png)

Table 3 – The Spearman’s rank correlation coefficient (at right) for each project.

Table 3 shows Spearman’s rank correlation coefficient for each project. We note that 6 of the projects show a strong inverse relationship and 5 projects show a mild inverse relationship. On the other hand, 2 projects show a strong direct relationship and 3 projects show a mild direct relationship. In short, 12 (63.1%) out of 19 projects indicate an inverse relationship between the use of casts and the use of generics. Seven out of the 8 projects that showed the sharp inverse relationship by our visual inspection also show an inverse Spearman correlation. Of those 7 projects, the relationship was strong for both nhibernate and cuyahoga.

Overall, our results suggest that generics reduce casts in C#. This conclusion about C# generics is the same as our findings for Java [PBMH12]. Similar to Java, data from a small number of projects suggests that more generics sometimes coincides with more casts; further research is necessary to reconcile our research question with these outliers.

## 5.2 RQ2: Do generics prevent code duplication?

To determine whether generics prevent code duplication (RQ2), we analyzed the 20 projects in two different ways. First, we determined how many unique type arguments are used for each generic type. Second, we estimated how many lines of code were saved by using generics.

We first measure how many unique type arguments are used for each generic type defined in a project. There are 283 different generic types defined by developers at the latest point of development in all projects combined. The type that facilitated the most reuse was IEquatable in mono, which was parameterized with 30 different type arguments. However, most generic types were instantiated only once; 155 generic types (54.7%) are parameterized with only one type argument. This number is much higher than in Java, where the percentage of generic types parameterized with only one type argument was 38% [PBMH12].

We next estimated how many lines of code were saved by using generics. To answer RQ2, we count how many different type arguments of each generic type is instantiated by a developer. We then take the number of unique parameterizations (P) of each developer-defined generic type and count the lines of code (LOC) of each generic type at latest point of development. We use the same formula that we used