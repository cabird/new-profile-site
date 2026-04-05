![Table of 20 C# projects](page9_img_table_1.png)

Table 1 – The 20 C# projects under investigation.

- The total number of lines of code in 20 C# projects (6,022,724 lines) was much smaller than that of 20 established Java projects (548,982,841 lines) that we analyzed previously [PBMH12]. We speculate that our C# projects were smaller than our Java projects both because the Java projects tended to be older and more mature.

- The first parameterized type in most of the projects appeared within one or two years of the official release of generics. The mono project was the first, introducing its first parameterized type in April 2004, while the lucene.net project was the last, introducing its first parameterized type in June 2008.

- The log4net project never used parameterized types, because although log4net was built on several frameworks, including .NET Framework 2.0, it appears that log4net does not use many features, such as generics, which are not supported in .NET 1.0 for backward compatibility [log07].

- That there did not appear to be a significant relationship between type of project and number of generics, by a two-tailed t-test. That is, libraries did not appear to use generics more or less than applications.

Although we analyzed all of these projects, throughout this paper, for the sake of brevity we focus our discussion on the top three projects based on the total number of parameterized types and raw types. We discuss the other 17 projects when these three projects are not adequately representative. The top three C# projects are as follows:

- mono - An implementation of the C# platform and .NET designed to allow developers to easily create cross-platform applications. This is the largest project, the oldest, and has the largest number of developers among the 20 projects.