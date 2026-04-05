## Helping Developers Help Themselves: Automatic Decomposition of Code Review Changesets

Mike Barnett  
Microsoft Research, Redmond, WA, USA  
mbarnett@microsoft.com

Christian Bird  
Microsoft Research, Redmond, WA, USA  
cbird@microsoft.com

João Brunet  
Federal University of Campina Grande, Campina Grande, Paraíba, Brazil  
joao.arthur@computacao.ufcg.edu.br

Shuvendu K. Lahiri  
Microsoft Research, Redmond, WA, USA  
shuvendu@microsoft.com

> Abstract—Code Reviews, an important and popular mechanism for quality assurance, are often performed on a changeset, a set of modified files that are meant to be committed to a source repository as an atomic action. Understanding a code review is more difficult when the changeset consists of multiple, independent, code differences. We introduce CLUSTERCHANGES, an automatic technique for decomposing changesets and evaluate its effectiveness through both a quantitative analysis and a qualitative user study.

### I. INTRODUCTION

Code review is an important mechanism for quality assurance in software development: it provides feedback and avoids introducing bugs. However, code review is effective only to the degree that reviewers are able to understand the changes being made. Prior work has shown that the easier it is for a reviewer to understand a change, the more likely they are to provide feedback that improves quality [1]. We and others have observed that when changes are small and/or cohesive, reviewers are most able to understand them [2], [3].

Unfortunately, developers often make changes that incorporate multiple bug fixes, feature additions, refactorings, etc. [4], [5], [6]. These result in changes that are both large and only loosely related, if at all, leading to difficulty in understanding. Developers have indicated that they are able to understand these changes better if authors annotate them with comments in the review tool, but this is a cumbersome task and occurs less than 5% of the time in practice. Developers have also provided feedback that decomposing such composite changes would help them to understand changes during review, but to date no such tools exist or are being used [2].

To address this, we developed CLUSTERCHANGES, a lightweight static analysis technique for decomposing changesets. The insight underlying CLUSTERCHANGES is that we can relate separate regions of change within a changeset by using static analysis to uncover relationships such as definitions and their uses present in these regions. For example, if a method definition is changed in one region and its call sites are changed in two other regions, these three regions are likely to be related and should be reviewed together. Connected subgraphs of related code entities form partitions that can be explored and understood independently; a formal description of our algorithm is presented in Section III.

In an effort to validate the results of CLUSTERCHANGES, understand differences between different types of partitions, and gauge its potential usefulness, we built a prototype graphical tool and used it to investigate changesets submitted for review in Bing and Office at Microsoft. Our quantitative evaluation shows that over 40% of changes submitted for review at Microsoft can be potentially decomposed into multiple partitions, indicating a high potential for use. We also characterized and quantified the nature of suggested partitions across 1000 changesets and have performed a careful manual investigation of over 100 reviews with an eye towards (i) spurious relationships for changesets with fewer than 2 non-trivial partitions (Section III-B3), and (ii) missing relationships for changesets with 10 or more trivial partitions. We then conducted a qualitative user study with twenty developers, where we found that most developers agree with our automatic partitioning and believe the decomposition is useful for reviewers to understand their changes better (some even asked for the prototype to use on their own reviews going forward).

Finally, we discuss limitations of our algorithm and our implementation and describe how CLUSTERCHANGES can be integrated into the code review process.

### II. THE PROBLEM

Developers submit code to be reviewed on a daily basis. Although good development practices prescribe that developers perform small and cohesive commits, they often contain large and independent changes. Code review is dependent on understanding the change being made. While large commits make review difficult (there is more to read and try to understand), the presence of multiple independent changes makes matters worse. Developers are forced to read and make sense of more code than they would need to if the independent changes were examined separately. In this section we triangulate different sources of information to show the existence of this problem and to motivate our work.

a) Concrete example: Here is an arbitrarily chosen commit made to the Roslyn project [7] on 18 August 2014 [8]. It contains edits to eight files and the addition of one file. The commit message says:

> Fix #244 by adding in-method binders in between properties and indexers. Also refactors expression-