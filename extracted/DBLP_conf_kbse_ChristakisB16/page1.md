# What Developers Want and Need from Program Analysis: An Empirical Study

Maria Christakis  Christian Bird  
Microsoft Research, Redmond, USA  
{mchri, cbird}@microsoft.com

## ABSTRACT

Program analysis has been a rich and fruitful field of research for many decades, and countless high-quality program analysis tools have been produced by academia. Though there are some well-known examples of tools that have found their way into routine use by practitioners, a common challenge faced by researchers is knowing how to achieve broad and lasting adoption of their tools. In an effort to understand what makes a program analyzer most attractive to developers, we mounted a multi-method investigation at Microsoft. Through interviews and surveys of developers as well as analysis of defect data, we provide insight and answers to four high-level research questions that can help researchers design program analyzers meeting the needs of software developers.

First, we explore what barriers hinder the adoption of program analyzers, like poorly expressed warning messages. Second, we shed light on what functionality developers want from analyzers, including the types of code issues that developers care about. Next, we answer what non-functional characteristics an analyzer should have to be widely used, how the analyzer should fit into the development process, and how its results should be reported. Finally, we investigate defects in one of Microsoft’s flagship software services, to understand what types of code issues are most important to minimize, potentially through program analysis.

So far, much research and many studies on program analysis tools have focused on the completeness of these tools (do they report spurious warnings?), their soundness (do they miss bugs?), automation, performance, annotation overhead, and modularity. However, as companies integrate program analyzers as part of their development process, more investigation is needed into how these tools are used in practice and if practitioners’ needs are being met. We posit that for research in this area to be impactful, our community must understand the practices and needs of software developers with regard to program analysis.

In an effort to improve this understanding, our paper contains an empirical investigation at Microsoft to answer the following high-level research questions.

1. What barriers hinder the adoption of program analyzers by practitioners?  
2. What functionality do practitioners want from program analyzers?  
3. What non-functional characteristics should a program analyzer have to be widely used?  
4. What code issues occur most in practice that program analyzers should try to detect?

For our purposes, we define program analysis as the process

## CCS Concepts

- General and reference → Empirical studies;  
- Software and its engineering → Software defect analysis;

### Keywords

program analysis, code defects

## 1. INTRODUCTION

Large software companies have recently started building program analysis ecosystems, like Google’s Tricorder [49] or Microsoft’s CloudBuild [31]. These ecosystems allow for distributively running several analyzers, each with its own attributes, like speed of the analysis, type of detected code issues, or number of true or false positives. Designers of such ecosystems need to decide which analyzers should run and when, e.g., in the editor, as part of the build, or during code review. But how should the decisions be made? Which kinds of program analyzers are valuable to software engineers, rather than a waste of time? How do they fit in the development process? How should their results be reported?

For our purposes, we define program analysis as the process of automatically analyzing the behavior of a program without running it, that is, we are only considering static program analysis. Program analysis detects potential issues in the code and gives feedback. Feedback is in the form of warnings that are either true or false positives. True positives flag real issues in the code, whereas false positives warn about code issues that do not occur in practice. We do not consider the compiler to be a program analyzer to only focus on tools whose primary functionality is program analysis and that are not by default part of the software development process.

Our study comprises a number of investigative techniques. We interviewed and surveyed developers from a diverse group of products to understand their needs and how program