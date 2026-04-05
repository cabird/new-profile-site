# Using Large-scale Heterogeneous Graph Representation Learning for Code Review Recommendations at Microsoft

Jiyang Zhang*  
_The University of Texas at Austin_  
jiyang.zhang@utexas.edu

Chandra Maddila*  
_Microsoft Research_  
maddilac@acm.org

Ram Bairi  
_Microsoft Research_  
rbairi@microsoft.com

Christian Bird  
_Microsoft Research_  
cbird@microsoft.com

Ujjwal Raizada  
_Microsoft Research_  
ujjwalraizada@gmail.com

Apoorva Agrawal  
_Microsoft Research_  
t-aagraw@microsoft.com

Yamini Jhawar  
_Microsoft Research_  
t-yajhawar@microsoft.com

Kim Herzig  
_Microsoft_  
kimh@microsoft.com

Arie van Deursen  
_Delft University of Technology_  
Arie.vanDeursen@tudelft.nl

### Abstract
Code review is an integral part of any mature software development process, and identifying the best reviewer for a code change is a well-accepted problem within the software engineering community. Selecting a reviewer who lacks expertise and understanding can slow development or result in more defects. To date, most reviewer recommendation systems rely primarily on historical file change and review information; those who changed or reviewed a file in the past are the best positioned to review in the future.

We posit that while these approaches are able to identify and suggest qualified reviewers, they may be blind to reviewers who have the needed expertise and have simply never interacted with the changed files before. Fortunately, at Microsoft, we have a wealth of work artifacts across many repositories that can yield valuable information about our developers. To address the aforementioned problem, we present CORAL, a novel approach to reviewer recommendation that leverages a socio-technical graph built from the rich set of entities (developers, repositories, files, pull requests (PRs), work items, etc.) and their relationships in modern source code management systems. We employ a graph convolutional neural network on this graph and train it on two and a half years of history on 332 repositories within Microsoft.

We show that CORAL is able to model the manual history of reviewer selection remarkably well. Further, based on an extensive user study, we demonstrate that this approach identifies relevant and qualified reviewers who traditional reviewer recommenders miss, and that these developers desire to be included in the review process. Finally, we find that "classical" reviewer recommendation systems perform better on smaller (in terms of developers) software projects while CORAL excels on larger projects, suggesting that there is "no one model to rule them all."

Industrial and open source development [1], [2], [3] and all code hosting systems support it. Code reviews facilitate knowledge transfer, help to identify potential issues in code, and promote discussion of alternative solutions [4]. Modern code review is characterized by asynchronous review of changes to the software system, facilitated by automated tools and infrastructure [4].

As code review inherently requires expertise and prior knowledge, many studies have noted the importance of identifying the "right" reviewers, which can lead to faster turnaround, more useful feedback, and ultimately higher code quality [5], [6]. Selecting the wrong reviewer slows down development at best and can lead to post-deployment issues. In response to this finding, a vibrant line of code reviewer recommendation research has emerged, to great success [7], [8], [9], [10], [11], [12], [13], [14]. Some of these have, in fact, even been put into practice in industry [15].

All reviewer recommender approaches that we are aware of rely on historical information of changes and reviews. The principle underlying these is that best reviewers of a change are those who have previously authored or reviewed the files involved in the review. While recommenders that leverage this idea have proven to be valid and successful, we posit that they may be blind to qualified reviewers who may have never interacted with these files in the past, especially as the number of developers in a project grows.

We note that there is a wealth of additional recorded information in software repositories that can be leveraged to improve reviewer recommendation and address this weakness. Specifically, we assert that incorporating information around interactions between code contributors as well as the semantics of code changes and their descriptions can help identify

## I. INTRODUCTION
Code review (also known as pull request review) has become an integral process in software development, both in

*Work performed while at Microsoft Research; Equal contribution*