> Although we focus on these three projects throughout this paper, we also relate these results to the other 37 projects. To distinguish our two sets of projects, we refer to the first set of projects as the established projects and the second set of projects as the recent projects.

## 4.4 Methodology

To analyze the 40 projects in terms of our hypotheses, we chose an automated approach. Our approach involves several linked tools to perform the analysis on each project.

The first step in our analysis was to copy each project from a remote repository to a local machine. We did this to conserve network bandwidth and speed up the second step. We used rsync to copy projects stored in CVS and SVN, and git-clone for Git repositories.

The second step of our analysis was to check out every version of every file from the project’s repository. Using a python script, we stored the different file revisions in an intermediate format.

Our third step comprised analyzing the generics usage in each revision. We performed this analysis using Eclipse’s JDT to create an abstract syntax tree of each revision. From the abstract syntax tree, we extracted information relevant to generics, such as what kind of generic was used (type or method declaration, and parameterized type). We then populated a MySQL database with this information.

Finally, we analyzed the data in the database in a number of different ways, depending on what information we were trying to extract. We primarily used the R statistical package for analyzing and plotting data. Our data and tools are available in the PROMISE repositories2 (http://promisedata.org).

### 4.4.1 Identifying Generification

As part of our analysis, we identified instances in source code evolution where raw types were replaced by their generic counterparts (e.g. List to List<String>, hereafter referred to as corresponding types). We describe our approach in detail here and describe the results of using such analysis in Section 7.1.

To identify changes in use of generics within a project, we use an approach similar to APFEL, by Zimmermann (2006). For each file in a project repository, we examined each pair of subsequent revisions of the file. For each method in each file (identified by name) we identify the number of uses of each raw and parameterized type in the method. If the count for a particular raw type decreases from one revision to the next and the count for the corresponding parameterized type increases by the same amount, we mark this as a generification.

In an effort to present a precise description of our data collection, we present a formal definition. This description can be safely passed over by the uninterested