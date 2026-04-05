is governed in at least a semi-democratic fashion. Since the decision to use generics has implications directly on the code-base itself (e.g., it may require using a newer JDK or modify popular method signatures impacting all call sites), we expect that there will be project-wide acceptance of generics rather than acceptance by individual members:

Research Question 1 - Will project members broadly use generics after introduction into the project?

In addition to a broad consensus for use of generics, a second research question investigates if there will be a concerted effort to replace old code to use the new features. Are the new features compelling enough to fix old code that may contain problems that would be fixed by generics or at least to maintain consistency?

Research Question 2 - Will there be large-scale efforts to convert old code using raw types to use generics?

Finally, Java integrated development environments (IDEs) such as Eclipse, NetBeans, and IntelliJ IDEA all support features such as syntax highlighting and semantic analysis to provide auto completion and identify type errors interactively. These tools enable developers to be more productive, but not all IDEs supported generics when they were first introduced. We expect that the choice to use new language features such as generics will in part depend on the tool support available for those features.

Research Question 3 - Does generics support in the IDE influence adoption?

## 4.3 Projects Studied

To test the hypotheses regarding generics, we automatically analyzed 20 open source software projects. We analyzed the top “most used” projects according to ohloh.net, including only projects with significant amounts of Java code. We chose to select projects from ohloh.net because the site contains the most comprehensive list of open source projects of which we are aware. The 20 selected projects were Ant, Azureus, CheckStyle, Commons Collections, FreeMind, FindBugs, Jetty, JEdit, JDT, JUnit, Eclipse-cs, Hibernate, Log4j, Lucene, Maven, the Spring Framework, Squirrel-SQL, Subclipse, Weka, and Xerces. In mining the full version histories of these 20 projects, we analyzed the full content of each version of each Java source file, a total of 548,982,841 lines.

Throughout this paper, we will focus our discussion on three of the 20 projects: JEdit, Eclipse-cs, and Squirrel-SQL. We chose these specific projects because they are a fairly representative cross section of the 20 projects. JEdit, a text editor for programming, began development in 2000 and is the largest and most mature project of the three. Eclipse-cs, which integrates the Checkstyle static analysis tool into the Eclipse Integrated Development Environment, began development in 2003 and is the smallest program of the three. Squirrel-SQL, a graphical user interface for exploring databases, began development in 2001.

Although we focus on these three projects throughout this paper, we also relate these results to the other 17 projects.

## 4.4 Methodology

To analyze the 20 projects in terms of our hypotheses, we chose an automated approach. Our approach involves several linked tools to perform the analysis on each project.

The first step in our analysis was to copy each project from a remote repository to a local machine. We did this to conserve network bandwidth and speed up the second step. We used rsync to copy projects stored in CVS and SVN, and git-clone for Git repositories.

The second step of our analysis was to check out every version of every file from the project’s repository. Using a python script, we stored the different file revisions in an intermediate format.

Our third step comprised analyzing the generics usage in each revision. We performed this analysis using Eclipse’s JDT to create an abstract syntax tree of each revision. From the abstract syntax tree, we extracted information relevant to generics, such as what kind of generic was used (type or method declaration, and parameterized type). We then populated a MySQL database with this information.

Finally, we analyzed the data in the database in a number of different ways, depending on what information we were trying to extract. We primarily used the R statistical package for analyzing and plotting data. Our data and tools are available in the PROMISE repositories (http://promisedata.org).

### 4.4.1 Identifying Generification

As part of our analysis, we identified instances in source code evolution where raw types were replaced by their generic counterparts (e.g., List to List<String>, hereafter referred to as corresponding types). We describe our approach in detail here and describe the results of using such analysis in subsection 7.1.

To identify changes in use of generics within a project, we use an approach similar to APFEL, by Zimmermann [20]. For each file in a project repository, we examined each pair of subsequent revisions of the file. For each method in each file (identified by name) we identify the number of uses of each raw and parameterized type in the method. If the count for a particular raw type decreases from one revision to the next and the count for the corresponding parameterized type increases by the same amount, we mark this as a generification.

More formally, let F denote the set of all files in a project repository and R = {1, 2, ..., n} denote the set of all revisions in the repository. Thus, f ∈ F × R represents file f in revision r (or, put another way, immediately after revision r has been checked into the repository). Let M be the set of all method names in the source code in the repository and Tr be the set of all raw types and Tg be the set of all parameterized types in the source code. We now define two functions. Types_r takes a method m, file f, revision r, and raw type t ∈ Tr and returns the number of uses of t in method m within revision r of file f.

Types_r : (M × F × R × Tr) → Z

Similarly, Types_g provides the same functionality for a parameterized type t ∈ Tg.

Types_g : (M × F × R × Tg) → Z

Finally, let Elide : Tg → Tr be a function that maps a parameterized type to its corresponding raw type. For example Elide(List<String>) = List. We record a generification of type t_r ∈ Tr to type t_g ∈ Tg in method m ∈ M in revision r.