# Fair and Balanced? Bias in Bug-Fix Datasets

Christian Bird¹, Adrian Bachmann², Eirik Aune¹, John Duffy¹, Abraham Bernstein², Vladimir Filkov¹, Premkumar Devanbu¹

1 University of California, Davis, USA  
2 University of Zurich, Switzerland

{cabird, emaune, jtduffy, vfilkov, ptdevanbu}@ucdavis.edu  
{bachmann, bernstein}@ifi.uzh.ch

## ABSTRACT

Software engineering researchers have long been interested in where and why bugs occur in code, and in predicting where they might turn up next. Historical bug-occurrence data has been key to this research. Bug tracking systems and code version histories record when, how, and by whom bugs were fixed; from these sources, datasets that relate file changes to bug fixes can be extracted. These historical datasets can be used to test hypotheses concerning processes of bug introduction, and also to build statistical bug-prediction models. Unfortunately, processes and humans are imperfect, and only a fraction of bug fixes are actually labelled in source code version histories, and thus become available for study in the extracted datasets. The question naturally arises: are the bug fixes recorded in these historical datasets a fair representation of the full population of bug fixes? In this paper, we investigate historical data from several software projects, and find strong evidence of systematic bias. We then investigate the potential effects of “unfair, imbalanced” datasets on the performance of prediction techniques. We draw the lesson that bias is a critical problem that threatens both the effectiveness of processes that rely on biased datasets to build prediction models and the generalizability of hypotheses tested on biased data.1

### Categories and Subject Descriptors

D.2.8 [Software Engineering]: Metrics — Product Metrics, Process Metrics

### General Terms

Experimentation, Measurement

1 Bird, Filkov, Aune, Duffy and Devanbu gratefully acknowledge support from NSF SoD-TEAM 0613949. Bachmann acknowledges support from Zürcher Kantonalbank. Partial support provided by Swiss National Science Foundation award number 200021-112330.

## 1. INTRODUCTION

The heavy economic toll taken by poor software quality has sparked much research into two critical areas (among others): first, understanding the causes of poor quality, and second, on building effective bug-prediction systems. Researchers taking the first approach formulate hypotheses of defect introduction (more complex code is more error-prone code, pair-programming reduces defects, etc.) and then use field data concerning defect occurrence to statistically test these theories. Researchers in bug-prediction systems have used historical bug-fixing field data from software projects to build prediction models (based on, e.g., machine learning).

Both areas are of enormous practical importance: the first can lead to better practices, and the second can lead to more effectively targeted inspection and testing efforts. Both approaches, however, strongly depend on good data sets to find the precise location of bug introduction. This data is obtained from records kept by developers.

Typically, developers are expected to record how, when, where, and by whom bugs are fixed in code version histories (e.g., CVS) and bug tracking databases (e.g., Bugzilla). A commit log message might indicate that a specific bug had been fixed in that commit. However, there is no standard or enforced practice to link a particular source code change to the corresponding entry in the bug database. Linkages, sadly, are irregular and inconsistent.

Many bug prediction efforts rely on corpora such as Sliwerski and Zimmermann’s, which link Bugzilla bugs with source code commits in Eclipse [46, 49]. This corpus is created by inferring links between commits in a source code repository and a bug database by scanning commit logs for references to bugs. Given inconsistent linking, this corpus accounts for only some of the bugs in the bug database. Therefore, we have a sample of bug fixes, rather than the population of all actual bug fixes. Still, this corpus contains valuable information concerning the location of bug fixes (and thus bug occurrences). Consequently, this type of data is at the core of much work on bug prediction [36, 43, 25, 37].

However, predictions made from samples can be wrong, if the samples are not representative of the population. The effects of bias in survey data, for instance, are well known [18]. If there is some systematic relationship between the choice or ability of a surveyed individual to respond and the characteristic or process being studied, then the results of the survey may not be accurate. A classic example of this is the predictions made from political surveys conducted via telephone in the 1948 United States presidential election [30]. At that time, telephones were mostly owned by individu-