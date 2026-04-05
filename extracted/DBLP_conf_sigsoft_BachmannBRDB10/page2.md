improve the tool, and yielded a trove of data to examine three research questions.

Traditionally, researchers have made several assumptions about the bug fixing, reporting, and linking phenomena. The first two research questions reflect general internal validity concerns that arise when using linked bug data for software engineering research.

*RQ 1: Do the bug reporting and fixing practices of developers correspond to the assumptions commonly made by researchers?*

Second, researchers have tended to gloss over the issue of whether automated tools that find links between commits and bug reports have false-positives or false-negatives.

*RQ 2: How well does the automated approach of finding links between commits and bug reports work?*

Finally, the linked set of bug-fixing commits are a sample of the full set of bug-fix commits. We can check and see if this sample is biased in any detectible way.

*RQ 3: Is there any evidence of systematic bias in the linking of bug-fix commits to bug reports [10]?*

To our knowledge, the only published study on this question is by Aranda and Venolia [1]: they analyzed the completeness and degree of truth in software engineering datasets and provided a partial answer to RQ 1 (see Sub-Section 2.2). Most studies do not even address data quality issues [23].

In addition, we were able to qualitatively explore how the Apache project actually uses software engineering tools such as bug tracker and version control systems, yielding some rather surprising observations.

We begin with a discussion of related work (Section 2), followed by an overview of the tools and processes (Section 3) used in the Apache HTTP web server project. We then present (Section 4) a description of Linkster, and details of the case study procedure involving an Apache core developer (Section 5). In Sections 6 and 7 we present our findings, which we summarize briefly below:

**Finding 1:** A so-called “bug” is not always a bug; neither is a “commit” always a commit. In other words: in Apache, the most important bugs are not handled in the bug tracker but mentioned in the mailing list system; and only a fraction of commits actually pertain to program changes (RQ 1).

**Finding 2:** We compared the manual annotations with data produced by automated linking (viz., for false-positives or false-negatives); the automated approach finds virtually all the commit log messages which contain a link to the bug tracking database (RQ 2). Sadly, however, many defect-fix commits are un-identified in the commit logs, and thus are invisible to automated approaches.

**Finding 3:** In the manually annotated sample, we find strong statistical evidence that different bug-fixers vary in their linking behavior. Investigating further, we find anecdotal evidence suggesting that factors such as experience, ownership and the size (number of files) of the commit affect linking behaviour. We also find that reporting bias affects the performance of a bug prediction algorithm (BugCache). Given the small size of the manually annotated sample, the evidence here is mostly suggestive rather than statistically significant; however, it points out the strong need for further studies—for if this type of reporting bias is confirmed as a widespread problem, this is of serious, fundamental concern to all empirical research that uses this type of linked bug-fix data.

## 2. RELATED WORK

Areas closely related to this research include data extraction and integration, data quality in software engineering, data verification in software repositories, and our own previous work on data quality effects on empirical software engineering.

### 2.1 Data Extraction and Integration

Software engineering process data such as bug reports and version control log files are widely used in empirical software engineering. Therefore, the extraction and integration of this data is critical.

Fischer et al. [14] presented a Release History Database (RHDB) which contains the version control log and the bug report information. To link the change log and the bug tracking database, Fischer et al. searched for change log messages which match a given regular expression. Later, they improved the linking algorithm and built in a file-module verification [13]. A similar approach to link the change log with the bug tracking database was chosen by other researchers. All of them used regular expressions to find bug report link candidates in the change log file (e.g., [32, 31, 30, 33, 34, 30]).

In [3], we presented a step-by-step approach to retrieve, parse, convert and link the data sources. We improved the well-established prior art, enhancing both the quality and quantity of links extracted.

### 2.2 Data Quality in Software Engineering

As discussed in [10], empirical software engineering researchers have considered data quality issues. Space limitations inhibit a full survey; we present a few representative papers.

Koru and Tian [21] surveyed members of 52 different medium to large size Open Source projects with regards to defect handling practices. They found that defect-handling processes varied among projects. Some projects are disciplined and require recording of all bugs found; others are more lax. Some projects explicitly mark whether a bug is pre-release or post-release. Some record defects only in source code; others also record defects in documents. This variation in bug datasets requires a cautious approach to their use in empirical work. Liebchen et al. [22] examined noise, a distinct, equally important issue.

Liebchen and Shepperd [23] surveyed hundreds of empirical software engineering papers to assess how studies manage data quality issues. They found only 23 that explicitly referenced data quality. Four of the 23 suggested that data quality might impact analysis, but made no suggestion of how to deal with it. They conclude that there is very little work to assess the quality of data sets and point to the extreme challenge of knowing the “true” values and populations. They suggest that simulation-based approaches might help.

Bettenburg et al. [7, 8, 9] provided first analysis of bug report quality. They investigated the attributes of a good bug report surveying developers and used it to develop a computational model of a bug report quality. The resulting model allowed to display the current quality of a defect report whilst typing. Hooimeijer et al. [16] also analyzed the