BinSkim [1] is a binary scanner that validates compiler and linker settings. Specifically, it validates that code has been built using the compiler and linker protections that are required by the Microsoft Security Development Lifecycle (SDL) [17], e.g., that a binary has opted into the Address Space Layout Randomization (ASLR) or the hardware Data Execution Prevention (DEP) features.

FxCop [11] analyzes managed assemblies using a set of pre-defined or custom rules and reports possible design, localization, performance, and security improvements. Many of the detected code issues concern best practices violations.

PoliCheck is an internal tool by Microsoft’s Geopolitical Product Strategy team that scans text (code, code comments, and content, including Web pages) for anything that might be politically or geopolitically incorrect. For example, a person’s name should not be written in red letters as in some context or culture it may signify that the person is dead.

PREfast [14] performs intraprocedural analysis to identify defects in C and C++ source code. There are multiple PREfast plug-ins for detecting different kinds of code issues, like BadValues for security errors, CppCoreCheck for reliability, security, and compliance errors, DriversDLL for errors in kernel-mode drivers, etc.

PREfix [24] is one of the few analyzers in industry that performs cross-binary dataflow analysis. PREfix detects security, reliability, performance, and memory consumption issues, but without the user providing extensive annotations, it is almost impossible to find any memory or resource leaks.

StyleCop [19] was selected by 50.5% of the respondents and is, by far, the most popular first party tool. It analyzes C# code to enforce a set of style and consistency rules, which is configurable and may be augmented with custom rules.

### Third party program analyzers at Microsoft.

Here, we present the six most popular third party analyzers that are being or have been used at Microsoft.

ReSharper [16] was selected by 51.2% of the respondents and is the tool that has been run the most out of all first and third party analyzers. ReSharper is a productivity tool with a code analysis component, which finds compiler errors, runtime errors, redundancies, code smells, and possible improvements right while the user is typing. Note that 81.8% of our respondents have heard of ReSharper, out of those, 47.5% are currently using ReSharper, and out of those, 50% rank its code analysis as one of their top three favorite features (29% said it was the most important feature).

Just like ReSharper, CodeRush [5] is a productivity tool, which supports easy code investigation, automation of common code creation tasks, easy search and navigation to a required code location, etc. Among its features, CodeRush also provides a code analysis tool that suggests slight code improvements and detects dead or duplicate code, useless code (e.g., containing an unimplemented class member), invalid code (e.g., containing a call to an undeclared method) as well as unreadable code.

Fortify [10] is a tool for identifying security vulnerabilities in source code, with support for 20 programming languages. Its analysis is based on a set of security coding rules, and its detected vulnerabilities are categorized and prioritized based on how much risk they involve and whether they provide an accurate action plan. The Microsoft investigation into Fortify, performed on two very large codebases, revealed that its rules are thorough at the expense of being very noisy.

Checkmarx [2] analyzes source code, also written in a very wide breadth of programming languages, by virtually compiling it and performing queries against it for a set of pre-defined and custom security rules. During an evaluation of the tool at Microsoft, Checkmarx was found to be as accurate as Fortify but easier to configure. Fortify, however, was found to achieve deeper coverage.

Coverity [6, 23] is considered one of the best commercial static analyzers for detecting security and reliability errors in C, C++, C#, and Java. In general, the code issues it reports have a very high fix rate and a very low false positive rate. Coverity performs whole-program analysis and is known to have detected serious bugs involving multiple functions or methods. It is primarily offered as a cloud-based service.

Cppcheck [7] is a rule-based analyzer for C and C++. It mainly detects reliability errors, like null pointer dereferences, use of uninitialized variables or unsafe functions, etc. The goal of Cppcheck is to report no false positives; therefore, it is rarely wrong, but as a consequence, it misses many bugs.

### Program analyzers at Google.

So far, Google has made several attempts to integrate program analyzers into the development process of software engineers. The most prominent example of such an analyzer is FindBugs [9, 21], which cheaply detects defects in Java code, including bad practices, performance, and correctness problems. FindBugs aims at identifying the low-hanging fruit of code issues, instead of finding all possible errors in a particular category. Other analysis tools that have at times been used by Google include Coverity [6], Klocwork [13], and fault prediction [42]. However, all of these analyzers have gradually been abandoned due to their false positive rates, scalability issues, and workflow integration problems [49].

Google built Tricorder [20, 49], a program analysis ecosystem for detecting a variety of code issues in a wide breadth of programming languages. Tricorder smoothly integrates into the development workflow, scales, and allows even non-analysis experts to write custom analyzers. Moreover, any integrated analyzer that is annoying to developers, degrades the performance of Tricorder, or whose reported code issues are never fixed by developers is banned from the ecosystem.

The overview of Tricorder [49] describes some of the tools that have been integrated in the Google analysis ecosystem. These include analysis frameworks, like ErrorProne [8] and ClangTidy [4], which find bug patterns based on AST matching in Java and C++, respectively, and the Linter analyzer, which detects style issues and contains more than 35 individual linters, such as configured versions of the Checkstyle Java linter [3] and the Pylint Python linter [15]. Lastly, there are various domain-specific analyzers, like AndroidLint for detecting issues in Android applications, and tools that analyze metadata associated with a changelist, like how much code is transitively affected by a particular changelist.

### Program analyzers at Facebook.

Infer [26, 25, 12] is Facebook’s most well-known analyzer in the current literature: it is based on academic research in program analysis, and there are many publications on its internals and its large-scale deployment. Facebook uses Infer to find resource leaks and null-pointer exceptions in Android and iOS applications. The tool may report both false positives and false negatives. Infer’s analysis is incremental, which means that, when analyzing a changelist, it uses a cache of verification results so that only functions affected by the changelist are analyzed.

### Discussion.

In this section, we observe that, although there are a few exceptions to this rule, advanced program