## Talk and Work: a Preliminary Report

David S Pattison, Christian A Bird, Premkumar T Devanbu  
Dept. of Computer Science, Kemper Hall,  
University of California, Davis,  
Davis, California Republic.  
pattison, bird, devanbu@cs.ucdavis.edu

## ABSTRACT

Developers in Open Source Software (OSS) projects communicate using mailing lists. By convention, the mailing lists are used only for task-related discussions, so they are primarily concerned with the software under development, and software process issues (releases, etc.). We focus on the discussions concerning the software, and study the frequency with which software entities (functions, methods, classes, etc.) are mentioned in the mail. We find a strong, striking, cumulative relationship between this mention count in the email, and the number of times these entities are included in changes to the software. When we study the same phenomena over a series of time-intervals, the relationship is much less strong. This suggests some interesting avenues for future research.

ACM Categories & Subject Descriptors: D.2.8 [Metrics]: Process metrics, K.4.3 [Organizational Impacts]: Computer-supported collaborative work  
General Terms: Human Factors, Measurement  
Keywords: Open Source, Data Mining, Information Retrieval, Social Networks

## 1. INTRODUCTION

Developing large, complex software systems is typically a knowledge-intensive activity, involving sizeable teams of people. A great deal of effort is spent in co-ordinating the activities of large teams. One of the key goals of software design is to moderate the need for co-ordination. The principles, as advocated by Parnas [7] and more recently by Baldwin & Clark [2, 1] center around separation of concerns, division of labor and division of knowledge. Baldwin & Clark argue that by adopting design rules [1] designers can reduce the need for communication and co-ordination in large systems. As a simple example, we should define the interfaces of functions and modules extra clearly (especially the ones that are used most often). If we do this, then the discussion overhead of working with these functions will be lower. In fact, if we modularize the system well, and define the interfaces well, then the communication overhead of functions (regardless of how much they are being worked with) should remain fairly constant. More “popular” functions, if well-documented, should incur no more discussion overhead than less popular ones.

But is this really true? This is our research question:

> Does the amount of discussion about software entities remain relatively independent of the level to which they are used?

In Open Source Software systems (OSS), most development and discussion activity is publicly archived; using data from several projects, we compare the number of times source-code entities (functions, methods, classes, etc.) are mentioned in changes, with the number of times they are mentioned in emails. We find a striking relationship, which essentially suggests that the answer to the question above, surprisingly, is no. Upon closer examination, however, the plot thickens: although strong throughout the entire project life, over intervals, the relationship is substantially weaker. We speculate as to the causes of this odd phenomenon.

In Section 2, we present related work. In Section 3, we describe our approach to mining relevant data to answer the research question. In Section 4, we present our results and briefly summarize threats to validity; finally we conclude with a discussion of future research.

## 2. RELATED WORK

There have been many papers relating to the extraction of data from CVS/SVN repositories (see, e.g., [10, 5]). Trying to compare discussion to software is not a new idea. Mockus et. al. [6] used emails to quantify developer participation. In previous work, [4] we have analyzed social networks of OSS mailing lists. Rigby & Hassan have analyzed OSS mailing list content for emotional content [8]. To our knowledge, ours is the first research to study the use of software entity (function, class etc.) names in emails.

## 3. DATA MINING

We now describe how relevant information from several target OSS projects is collected, cleaned and stored. Figure 1 summarizes the different steps. The approach is summarized only briefly, since details have already been published elsewhere [4].

### 3.1 Source Code Repository Extracting

CVS/SVN and other repositories contain a wealth of information regarding what, when, how, and by whom a change

This work was supported by a grant from the National Science Foundation Grant no. NSF-SoD-0613949 and software donations from SciTools and GrammaTech Corporations. Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee provided that copies are