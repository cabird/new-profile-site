## Process Aspects and Social Dynamics of Contemporary Code Review: Insights from Open Source Development as well as Industrial Practice at Microsoft

Amiangshu Bosu, Member, IEEE; Jeffrey C. Carver, Senior Member, IEEE; Christian Bird, Member, IEEE; Jonathan Orbeck, Member, IEEE; and Christopher Chockley, Member, IEEE

Abstract—Many open source and commercial developers practice contemporary code review, a lightweight, informal, tool-based code review process. To better understand this process and its benefits, we gathered information about code review practices via surveys of open source software developers and developers from Microsoft. The results of our analysis suggest that developers spend approximately 10–15 percent of their time in code reviews, with the amount of effort increasing with experience. Developers consider code review important, stating that in addition to finding defects, code reviews offer other benefits, including knowledge sharing, community building, and maintaining code quality. The quality of the code submitted for review helps reviewers form impressions about their teammates, which can influence future collaborations. We found a large amount of similarity between the Microsoft and OSS respondents. One interesting difference is that while OSS respondents view code review as an important method of impression formation, Microsoft respondents found knowledge dissemination to be more important. Finally, we found little difference between distributed and co-located Microsoft teams. Our findings identify the following key areas that warrant focused research: 1) exploring the non-technical benefits of code reviews, 2) helping developers in articulating review comments, and 3) assisting reviewers’ program comprehension during code reviews.

Index Terms—Code review, open source, OSS, survey, peer impressions, commercial projects

## 1 INTRODUCTION

In recent years, many open source software (OSS) and commercial projects have adopted peer code review [2], a practice where developers subject their code to scrutiny by their peers. While the underlying concepts of contemporary code review [45] are similar to the traditional Fagan inspection [22], there are also marked differences. A Fagan inspection is a heavyweight process requiring synchronous meetings among the participants in multiple phases. Conversely, contemporary code review is defined as being lightweight, more informal, asynchronous, and supported by specialized tools [2]. Despite studies that show Fagan inspections improve software quality [21], their typically high cost and formality have prevented widespread adoption [29], [54]. Conversely, contemporary code review has addressed many shortcomings of Fagan inspection and has shown increasing adoption in industry and OSS contexts [3], [38], [45].

Because many OSS projects, e.g., Apache [47], Chromium,1 Mozilla,2 Qt,3 and Android,4 now require peer-review prior to merging new code into the main project codebase, there are a large number of developers regularly participating in code reviews. From the industrial perspective, Google [56] and Facebook [33] have adopted mandatory code reviews and approximately 50,000 Microsoft developers actively practice code reviews [14]. Our recent survey of OSS developers found that they spend approximately six hours per week in code review [11]. Given the large number of developers who practice code review, the total time devoted to code review is quite significant. Therefore, increasing the effectiveness of contemporary code review can greatly improve software development productivity.

To improve a process or practice, empirical researchers use a three-step approach: (1) understand the current process to identify improvement opportunities; (2) evaluate the current process and new ideas; and (3) improve the process by incorporating suggestions [58]. The high-level goal of this study, which addresses the first step in this empirical framework, is to better understand the contemporary code review process and its benefits. Specifically, the goal of the study is to provide that understanding by gathering information about 1) the code review process, 2) developers’ expectations from code review,

A. Bosu is with the Department of Computer Science, Southern Illinois University, Carbondale, IL 62901. E-mail: abosu@cs.siu.edu.

J. Carver, J. Orbeck, and C. Chockley are with the Department of Computer Science, University of Alabama, Tuscaloosa, AL 35487. E-mail: carver@cs.ua.edu; {jdorbeck, cmchockley}@ua.edu.

C. Bird is with Microsoft Research, Microsoft Corporation, Redmond, WA 98052-6399. E-mail: cbird@microsoft.com.

Manuscript received 24 June 2015; revised 24 May 2016; accepted 24 May 2016. Date of publication 0.0000; date of current version 0.0000. Recommended for acceptance by M. Dwyer.

For information on obtaining reprints of this article, please send e-mail to: reprints@ieee.org, and reference the Digital Object Identifier below.

Digital Object Identifier no. 10.1109/TSE.2016.2576451

1. https://www.chromium.org/developers/contributing-code
2. https://www.mozilla.org/hacking/reviewers.html
3. https://wiki.qt.io/Qt_Contribution_Guidelines
4. https://source.android.com/source/life-of-a-patch.html