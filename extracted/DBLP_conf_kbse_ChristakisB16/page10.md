analysis techniques are generally underdeveloped in industry. Most of the program analyzers that we have presented are productivity tools, linters, or rule-based scanners. We are definitely not claiming that simplistic program analyzers lack value — we are however wondering why many innovative and bright research ideas do not seem to have substantial practical impact. This trend has been observed before [39, 26, 49] in an effort to provide a few reasons for this gap between scientific literature and industry.

Here, we would like to support these suggestions from the literature with data-driven results from our survey. For instance, Calcagno et al. [26, 25, 29] suggest that part of the problem is that research has focused too much on whole-program or specify-first analyses. Indeed, the importance of compositional and incremental analyses is stressed by the fact that 56% of the survey respondents do not currently have the functionality of analyzing only a changelist, instead of an entire codebase, but this functionality would be important to them. Furthermore, 46% find the granularity of functions or methods more suitable for directing an analyzer toward the more critical parts of their code. Concerning program annotations, 21% of the respondents are not willing to write any specifications or do not know what specifications are. Calcagno et al. also define the “social challenge”, which has been described in other related work too [39, 49]. Engineers accumulate trust in an analyzer and start reacting to the bugs it reports when certain features are there: full automation and integration into the development workflow, scalability, precision, and fast reporting.

In fact, the top six pain points, obstacles, or annoyances that our survey respondents encountered when using program analyzers are (from most to least annoying):
1. Irrelevant checks are turned on by default
2. Bad phrasing of warnings
3. Too many false positives
4. Too slow
5. No suggested fixes
6. Difficult to integrate in the workflow (see Figure 1)

Moreover, the top six minimum requirements that an analyzer must satisfy for our respondents to start using it are (from most to least minimal):
1. Detect issues that are important to me
2. Easy to integrate in the workflow
3. Fast
4. Few false positives
5. With suppression of warnings
6. Good phrasing of warnings

Lastly, in terms of fast reporting, 21% of the respondents are only willing to wait seconds for a program analyzer to check a changelist, and 53% are willing to wait minutes.

## 6. OTHER RELATED WORK

### Empirical studies.
There are relatively few empirical studies that analyze the usage and adoption of program analysis tools in industry, especially from the point of view of software engineers. So far, many studies have analyzed the functionality of program analyzers, mostly from the point of view of tool designers [27, 21, 23].

The work most closely related to ours investigates why software engineers do not use static analysis tools to find bugs [39]. The results are collected from interviews with 20 engineers, and focus on the interviewees’ perception of tools, including interacting with their interfaces, and on what could have caused these perceptions. Although their interviewees felt that using static analysis is beneficial, there are certain barriers in their use, like false positives, poorly presented warnings, lack of or weak support from the team, inability to suppress warnings, poor environment integration, long running times of the tools, etc. In Section 2, we discuss that our survey respondents have also identified the same pain points. In terms of support from the team, many of our respondents that have stopped running program analyzers said it was because of a change in the team policy.

Ayewah and Pugh [22] also conducted a survey and a controlled study on how software engineers use the FindBugs tool [9, 21]. Although related, our work is not concerned about a particular program analyzer; we are rather focusing on what the general characteristics of any program analysis should be such that it is industrially relevant.

Lastly, our work is analogous to a recent empirical analysis of programming language adoption [46]: instead of programming languages, it focuses on the adoption of program analyzers in a large software organization.

### Unsoundness in program analysis.
Around the year 2000, unsoundness in program analysis was controversial in the academic community [23]. By now, researchers have realized that soundness is commonly eschewed in practice [44]. In fact, there have even emerged approaches for measuring the unsoundness in a static analysis and evaluating its practical impact [28]. In industry, as it also becomes evident in Section 5, it is a well-established design decision to build program analyzers to be unsound in order to increase automation, improve performance, achieve modularity, and reduce the number of false positives or the annotation overhead. The full range of program analysis techniques in industry, from heuristics to more advanced methodologies, like in Coverity, PREfix, and Infer, becomes more precise and efficient in detecting software bugs at the cost of ignoring or making unsound assumptions about certain program properties.

In our survey, we presented engineers with common sources of unsoundness in program analyzers, and asked them which of these should not be overlooked by tool designers (see Section 2). We hope that our findings will help designers in finding good trade-offs when building practical analyses.

### Other companies.
Ebay has suggested techniques for objectively evaluating the cost-effectiveness of different program analyzers and comparing them against each other [38]. IBM has experimented with an online portal that addresses common barriers to the wide usage of static analysis tools and promotes their adoption [47].

### Other evaluations.
Other evaluations of usage of static analyzers include understanding how to improve their user interfaces [40], and how to use suitable benchmarks for systematically evaluating and comparing these tools [37].

## 7. CONCLUSION
We have presented a multi-method empirical investigation that we deployed at Microsoft. Our findings shed light on what practitioners want from program analyzers, how program analysis researchers can achieve broad and lasting adoption of their tools, which types of defects are most important to minimize through program analysis, and which tools are currently being used at three large software companies. We believe that our data-driven answers to these questions are the first step toward narrowing the gap between scientific literature and industry with regard to program analysis.

## 8. ACKNOWLEDGMENTS
We thank Marc Brockschmidt, Jacek Czerwonka, Laura MacLeod, Wolfram Schulte, Valentin Wüstholz, and Tom Zimmermann for their valuable help. We are also grateful to the developers who participated in our study and the reviewers for their constructive feedback.