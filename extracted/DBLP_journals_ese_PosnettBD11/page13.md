Table 3 Role and pattern cardinality counts

![Table 3: Role and pattern cardinality counts](page13_img_1.png)

Unification 30 270 21 0 25 230 15 0 188 2578 226 0

> Counts for classes playing 1, 2, N (>2) roles within the specified design pattern. NA indicates that there were no patterns of that type in the project

### 5.5 Methodology

We use these data in multiple regression models to examine the relationships between pattern and metapattern role, size, and change-proneness. This common modeling technique has been used (e.g.,) to study the effect of coordination on bug resolution times (Cataldo et al. 2006) and the effect of distributed development on defects (Bird et al. 2009).

In our context, we use pattern roles played by classes, project release, and the size of classes in lines of code (LOC) as explanatory, or independent, variables and the number of distinct commits to a class as the response, or dependent, variable. We use Understand for Java by SciTools to compute LOC, which is taken to be the

Table 4 Key roles for identification of duplicate pattern motifs across releases

![Table 4: Key roles for identification of duplicate pattern motifs across releases](page13_img_2.png)