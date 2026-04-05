## The Missing Links: Bugs and Bug-fix Commits

Adrian Bachmann1, Christian Bird2, Foyzur Rahman2,  
Premkumar Devanbu2 and Abraham Bernstein1

1 Department of Informatics, University of Zurich, Switzerland  
2 Computer Science Department, University of California, Davis, USA

{bachmann,bernstein}@ifi.uzh.ch  
{cabird,mfrahman,ptdevanbu}@ucdavis.edu

### ABSTRACT
Empirical studies of software defects rely on links between bug databases and program code repositories. This linkage is typically based on bug-fixes identified in developer-entered commit logs. Unfortunately, developers do not always report which commits perform bug-fixes. Prior work suggests that such links can be a biased sample of the entire population of fixed bugs. The validity of statistical hypotheses-testing based on linked data could well be affected by bias. Given the wide use of linked defect data, it is vital to gauge the nature and extent of the bias, and try to develop testable theories and models of the bias. To do this, we must establish ground truth: manually analyze a complete version history corpus, and nail down those commits that fix defects, and those that do not.

This is a difficult task, requiring an expert to compare versions, analyze changes, find related bugs in the bug database, reverse-engineer missing links, and finally record their work for use later. This effort must be repeated for hundreds of commits to obtain a useful sample of reported and unreported bug-fix commits. We make several contributions. First, we present Linkster, a tool to facilitate link reverse-engineering. Second, we evaluate this tool, engaging a core developer of the Apache HTTP Web Server project to exhaustively annotate 493 commits that occurred during a six week period. Finally, we analyze this comprehensive data set, showing that there are serious and consequential problems in the data.

### Categories and Subject Descriptors
D.2.8 [Software Engineering]: Metrics—Product Metrics, Process Metrics

### General Terms
Experimentation; Measurement; Verification

### Keywords
case study; apache; bias; tool; manual annotation

### 1. INTRODUCTION
Software process data, especially bug reports and commit logs, are widely used in software engineering research. The integration of these two provides valuable information on the history and evolution of a software project. It is used, e.g., to predict the number and locale of bugs in future software releases (e.g., [27, 31, 17, 6]). The two data sources are normally integrated by scanning through the version control log messages for potential bug report numbers; conscientious developers enter this information when they check in bug fixes (e.g., see [14]). We used similar techniques in our previous work, and, in fact, improved current practice by adding heuristics to check the results [3, 4]. Even so, the links (between program code commits and bug reports) thus extracted cannot be guaranteed to be correct, as they are reliant on voluntary developer annotations in commit logs.

In prior work, we have shown that such data sets are plagued by quality issues [4]; furthermore, these issues (e.g., incompleteness, bias, etc.) adversely affect applications and algorithms which rely on such data [10]. We defined two types of bias: bug-feature bias, where only the fixes of certain types of defects are linked, and commit-feature bias, where only certain kinds of fixes, or fixes to certain kinds of files, are linked. In addition to these data quality issues, many researchers make questionable process assumptions: for instance they assume that all the relevant bugs of a software product are actually reported in the bug tracking database of the project. To truly understand defect-reporting bias and verify such assumptions, we must uncover the ground truth: we must analyze completely (at least a time-window of) the commit version history of a project, and precisely identify all the commits that are defect fixes, and those that are not.

To get at ground truth requires skill, knowledge and effort: one must compare successive versions, understand the changes, identify any relevant reported bugs in the repo, and establish a link when possible. This process must be repeated until we have a large enough sample for statistical analysis. This is costly, difficult, and time-consuming.

Linkster is a convenient, interactive tool, integrating multiple queryable, browseable, time-series views of version control history and bug report history. Linkster enables an expert to quickly find and examine relevant changes, and annotate them as desired; specifically, Linkster makes it easy to find defect-fix commits. We engaged an expert Apache core developer, Dr. Justin Erenkrantz, to use Linkster to manually annotate 6 full weeks (including 493 commit messages) of the Apache history. This case study helped us to