We also investigated which type arguments were used most frequently. Again, there was a very clear dominant usage pattern. Strings were by far the most common arguments. Table 1 shows the number of parameterized types of each kind of type argument in Squirrel-SQL for the most commonly used types. In fact, it appears that Lists and Maps of Strings account for approximately one quarter of parameterized types. We observed similar patterns in all projects with generics, with Lists of Strings always topping the list at almost twice the usage of the next commonly used parameterized type.

### 5.3.3 Generic Types versus Methods

We compared the number of user-defined generic types and methods. In total, 411 generic methods and 1,127 generic types existed across all projects during the time of study. Out of the 15 projects that used generics, 6 had fewer than 10 generic types, and 3 projects had more than 100. This trend was not necessarily a function of size; for example, FindBugs made extensive use of generic types (88) in comparison to JEdit (33) even though FindBugs is vastly smaller.

In every project there were more generic classes than generic methods, an average of about a 3-to-1 ratio. We were surprised by this; a large selling point of generics was the ability to create generic operations over data. Rather it seems generics were used as placeholders and not as abstractions.

The number of generic declarations lagged the number of parameterizations, a tendency followed by most of the projects that we studied. Exceptions include FindBugs, which began using declarations and parameterizations at about the same time, and Ant and Subclipse, which never used any declarations. This lag suggests that adoption grows in stages as developers become more comfortable with the new feature. We examine adoption lag in section 7.3.

### 5.3.4 Unique parameterizations

For generics to be advantageous, each type declaration must be parameterized by multiple types, otherwise a simple non-generic solution would suffice. But, for example, a generic type may be parameterized many times throughout the code but only have one unique parameter (e.g., String). In practice, how many unique parameterizations are made of type declarations? Is the number small or are generics preventing thousands of clones from being created?

From our data, we counted user-defined type declarations and their parameterizations. In total, 334 user-defined generic type declarations were instantiated. Of those, 33% had a single parameterization. The remaining 67% ranged from 2 to 39 parameterizations (mean = 4.5). Overall, the distribution was very positively skewed such that 80% of generic classes had fewer than 5 parameterizations. Does this support the cost savings envisioned by the language designers? We investigate further in Section 6.2.

### 5.3.5 Advanced Parameterizations

We examined several advanced uses of parameterization, including wildcard types, such as List<?>, where the type argument matches any type; bounded types, such as List<? extends Integer>, where the argument matches a certain set of types; nesting, such as List<List<String>>; and multiple type arguments such as Map<String, Double>. As a percentage of all parameterized types, each advanced use made up the following percentages: nesting (<1%), bounded types (3%), wildcards (10%), multiple type arguments (20%).

## 6. INVESTIGATING CLAIMS

### 6.1 Generics reduce casts

One primary argument for introducing generics is that they reduce the number of runtime exceptions because they reduce the need to cast (Hypothesis 1). Thus, it is reasonable to expect that the addition of generics will reduce casts.

To test Hypothesis 1, we examined our data to determine if an increase in generics leads to a decrease in casts. Figure 2 plots the number of casts against the number of parameterized types for three projects. The x-axis represents time and the y-axis is the ratio of program elements (parameterized types or casts) to Halstead’s program length; this essentially normalizes the number of program elements for program size. Red (top) lines represent the normalized number of casts over time. Blue (bottom) lines represent the normalized number of parameterized types (this ratio is multiplied by a factor of 10, because the number of parameterized types is small relative to the number of casts).

Overall, the graphs do not suggest a strong relationship between the use of casts and the use of parameterized types, for several reasons:

- The number of casts fluctuates significantly in the initial phase of all three projects (a trait shared by most of the 20 projects that we investigated), even before the introduction of generics. It would appear that some software development practice has a larger effect on casts than parameterized types.
- After the initial turmoil, all three projects show a gradual decline in the number of casts (a trait shared by about half of the projects that we investigated), even before developers start to introduce generics. This suggests that some other software development practice reduces the number of casts in a project over time.

However, the figures do suggest that the introduction of generics may, in some circumstances, reduce the number of casts. Specifically, notice that Eclipse-cs and Squirrel-SQL both exhibit sharp increases in the number of generics. Eclipse-cs, and to a lesser extent Squirrel-SQL, simultaneously decrease the number of casts in the program. This suggests that some projects will see a decrease in the number of casts when generics are introduced. However, this effect seems to be limited; a total of 6 out of 15 projects that used generics ever exhibit this sharp inverse relationship.

In addition to a visual inspection, we used a Spearman rank correlation to examine the relationship between generics use and use of casts. We also employed Benjamini-Hochberg p-value correction to mitigate false discovery [2]. Of the statistically significant results (p < 0.05), we found that six of the projects showed a moderate inverse correlation (between -0.4 and -0.7) and only one project, Squirrel-SQL, showed a strong relationship (-0.84). Surprisingly, the Spring Framework actually showed a positive correlation (0.49), indicating that increased generics use coincided with more casts.

Overall, the data that we collected does not support Hypothesis 1.

The main limitation to this analysis is that we considered trends across all contributors. While this illustrates a more