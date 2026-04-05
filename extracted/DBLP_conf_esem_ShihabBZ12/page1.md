# The Effect of Branching Strategies on Software Quality

Emad Shihab · Christian Bird · Thomas Zimmermann  
Software Analysis and Intelligence Lab (SAIL), Queen's University, Canada · Microsoft Research, Redmond, WA, USA  
emads@cs.queensu.ca · {cbird, tzimmer}@microsoft.com

## ABSTRACT

Branching plays a major role in the development process of software. Branches provide isolation so that multiple pieces of a software system can be modified in parallel without affecting others during times of instability. However, branching has its issues. The need to move code across branches introduces additional overhead and branch use can lead to integration failures due to conflicts or unseen dependencies. Although branches are used extensively in commercial and open source development projects, the effects that different branch strategies have on software quality are not yet well understood. In this paper, we present the first empirical study that evaluates and quantifies the relationship between software quality and various aspects of the branch structure used in a software project. We examine Windows Vista and Windows 7 and compare components that have different branch characteristics to quantify differences in quality. We also examine the effectiveness of two branching strategies — branching according to the software architecture versus branching according to organizational structure. We find that, indeed, branching does have an effect on software quality and that misalignment of branching structure and organizational structure is associated with higher post-release failure rates.

One challenge is that finding the change that causes a test to fail can almost be impossible, especially for long-running test suites. While some of these effects are present in smaller projects too, the impact is intensified in large projects; a build break that affects a team of five developers is not as serious as a break that affects thousands of developers.

One of the key features of modern SCMs that helps to mitigate these problems associated with the complexity of software projects is the support of parallel lines of development known as branches [1]. A branch is a virtual workspace created from a particular state of the source code that a developer or team of developers can make changes to without affecting others working outside the branch. Branches provide isolation from other changes; for example, a build break on a branch affects only the teams working on that branch and not the entire development team. The use of branches within a project has a profound effect on the processes used during development, from the build processes to release management [1].

However, like any development tool, branching needs to be leveraged correctly in order to be most effective [2]. Teams may choose to work in branches to avoid dealing with the work of other teams, but some coordination is required. Branches may introduce a false sense of safety, as changes made in different branches will eventually be merged together (either manually or automatically), and bugs may arise if these changes are syntactically or semantically incompatible. The process of moving code between branches represents additional error-prone work for developers. A complex branching structure may hinder the development process, making it hard to track code changes, causing build failures (due to unexpected dependencies), increasing the chances of introducing regression failures and making it difficult to maintain the code base [3]. In fact, some claim that branching is the most problematic area of SCM [4]. Therefore, it is important to understand how branching structures affect software systems and impact their quality. We note that these outcomes are not caused by the branches themselves, but rather by the processes and coordination required when employing the use of branches.

However, the relationship between branching structure and quality remains an important open question. With more projects in open source [5] and commercial contexts [6] employing branches in their development, understanding the impact of branching is increasingly relevant. To address this, we perform an empirical study to examine the effect of branch structure on software quality in Windows. We find that many aspects of branch use do indeed affect software quality.

As a prescriptive step, we also examine how to best align branching structures with other aspects of a software project. Specifically, we compare the branch structure with the organization of the teams within the project and also with the architecture of the software itself to determine which is the better branching strategy.

### Categories and Subject Descriptors

D.2.8 [Software Engineering]: Metrics — Process Metrics

### Keywords

Branching, Quality

## 1. INTRODUCTION

Coordination is key as software development becomes a more and more complex enterprise. Software projects today range in size up to tens of millions of lines of code, are developed by teams of thousands of developers, and may support multiple releases at different stages of development. Managing all of the changes being made to a codebase is an increasingly difficult task. Software Configuration Management Systems (SCMs, also known as version control systems) are important tools, as they are the primary mechanism used to coordinate the sharing of actual code artifacts, the key output in software products. In large-scale software projects where all changes are immediately seen by all developers (i.e. one “line” of development), changes can lead to a number of significant problems: single changes can cause build breaks and halt the progress of the entire project; piecemeal changes to interoperating components can lead to incompatibility,