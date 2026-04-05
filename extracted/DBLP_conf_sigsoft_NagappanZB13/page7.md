### How much of the Ohloh universe do the ICSE and FSE conferences cover?

The 207 Ohloh projects analyzed in the two years of the ICSE and FSE conferences covered 9.15% of the Ohloh population. At first glance this score seems low, but one has to keep in mind that it is based on a strict notion of coverage: values in all dimensions have to be similar for a project to be similar to another. Low scores are not bad as we will discuss in Section 4.1.

Our algorithm also measures the coverage for each dimension. Here numbers are very promising (see column “All papers of ICSE and FSE” in Table 2): for all but one dimension the coverage scores exceed 98%, which indicates that research published at ICSE and FSE covers a wide spectrum of software in terms of team size, activity, and project size. The lowest score is for programming language, but still at an impressive 91.42%. The unstudied languages highlight opportunities for future research: Objective-C is used by 245, Vim script by 145, Scala by 119, Erlang by 108, and Haskell by 99 projects.

### What are showcases of research with high coverage?

We identified several outstanding papers in terms of coverage. In Table 2, Columns 3 to 8 show the total coverage score and the dimension scores for the five papers with the highest coverage:

- “A study of the uniqueness of source code” by Gabel and Su [3] analyzed over 6,000 projects of which 30 were named in the paper and analyzed in depth. The score is computed for only the 30 named projects. The bulk of the corpus is from the source distribution of the Fedora Linux distribution (rel. 12). The authors studied multiple programming languages (C, C++, Java).
- “Semistructured merge: rethinking merge in revision control systems” by Apel et al. [13] evaluated a merge algorithm on 24 projects written in the C#, Python, and Java languages.
- “On the congruence of modularity and code coupling” by Beck and Diehl [14] analyzed 16 small to medium sized projects written in Java.
- “Temporal analysis of API usage concepts” by Uddin et al. [15] studied 19 client software projects. They covered a wide spectrum of project size (5.9 to 2991.8 KLOC) but given the nature of their study focused on older projects with larger amounts of history.
- “BugRedux: Reproducing field failures for in-house debugging” by Jin and Orso [16] recreated 17 failures of 15 real world programs. The size of the projects was between 0.5 and 241 KLOC.

Again the total scores seem to be low, which we will discuss in Section 4.1. More importantly, however, the numbers in Table II allow assessing which dimensions papers covered well and which dimensions need improvement. For example, Beck and Diehl [14], Uddin et al. [15], and Jin and Orso [16] focused on a single programming language (Java and C respectively). To further increase the generality, additional languages may be studied. Another example is project age: all three papers focused on older projects, possibly because they needed long project histories that are only available for older projects.

Note that this is not a criticism of this research; these are merely ideas on how to increase the coverage of the Ohloh universe.

Note that the relevant target universe may be different for each paper. For example, research on Java projects may limit itself to a Java universe.

It is noteworthy that several of these papers selected their subjects with respect to a dimension that is not included in our space: the functionality of the software. This dimension could be easily added to our space and accounted for in our score computation, given the availability of data.

### 3.5 Data Availability

All data that has been used for the experiments in this section is available at the following URL. This includes the Ohloh data for universe and space and spreadsheets with the conference data.

http://sailhome.cs.queensu.ca/replication/representativeness/

## 4. DISCUSSION

Having introduced our technique for assessing the coverage of a project sample and demonstrated it on recent software engineering research, we now discuss issues surrounding the use of such a technique in research. The use is not as straightforward as one might think. Here are some considerations.

### 4.1 Understanding (Low) Coverage

One observation that we have made in the course of using our techniques is that many studies have low levels of coverage. At first glance, one might be tempted to conclude that these studies do not contribute much to the body of knowledge in software engineering or that others with higher coverage are better. A low coverage of a study does not devalue the research, but rather gives further insight into the results.

For example, Zhou et al.’s recent result that bug report attributes can be used to automatically identify the likely location of a fix was evaluated on Eclipse JDT, SWT, AspectJ, and ZXing [17]. The coverage score for this paper across the Ohloh universe is 0.0028. The low coverage does not mean that the results are invalid or not useful. Rather, it yields additional insight into the technique. For example, all projects used in this paper were Java and C++ codebases aimed at developers (SWT and ZXing are libraries, Eclipse JDT and AspectJ are tools for Java development) — for a universe of developer-oriented Java libraries and tools, the coverage score would likely be higher. As the paper demonstrated, bugs reported against libraries and Java tools contain relevant information to help identify fix locations. Thus, others building on this work might also evaluate on Java tools and libraries. Other avenues of research include investigating whether the approach also works well for codebases where bug reporters are not as likely to be developers.

> bases where bug reporters are not as likely to be developers.
> Coverage scores do not increase or decrease the importance of research, but rather enhance our ability to reason about it.

### 4.2 The Quest for Generality

The discussion from the previous subsection leads to a related point. Few empirical findings in software engineering are completely general [1]. A finding that is true in the context of large-scale Java development for an enterprise server on a ten-year-old codebase may not hold for a relatively new Android widget. There may be fear when reporting results and trying to achieve generality that unless some hypothesis is confirmed in all cases, it does not contribute to the body of knowledge in software engineering and is not fit for publication. This isn’t so.

Kitchenham’s work on within- and cross-company effort estimation [18] showed that it is indeed possible to estimate effort of one...