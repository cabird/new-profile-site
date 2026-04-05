## Assessing the Value of Branches with What-if Analysis

Christian Bird  
Microsoft Research  
Redmond, WA, USA  
cbird@microsoft.com

Thomas Zimmermann  
Microsoft Research  
Redmond, WA, USA  
tzimmer@microsoft.com

cbird@microsoft.com

## ABSTRACT
Branches within source code management systems (SCMs) allow a software project to divide work among its teams for concurrent development by isolating changes. However, this benefit comes with several costs: increased time required for changes to move through the system and pain and error potential when integrating changes across branches. In this paper, we present the results of a survey to characterize how developers use branches in a large industrial project and common problems that they face. One of the major problems mentioned was the long delay that it takes changes to move from one team to another, which is often caused by having too many branches (branchmania). To monitor branch health, we introduce a novel what-if analysis to assess alternative branch structures with respect to two properties, isolation and liveness. We demonstrate with several scenarios how our what-if analysis can support branch decisions. By removing high-cost, low-benefit branches in Windows based on our what-if analysis, changes would each have saved 8.9 days of delay and only introduced 0.04 additional conflicts on average.

### Categories and Subject Descriptors
D.2.7 [Software Engineering]: Distribution, Maintenance, and Enhancement—Version Control; D.2.9 [Software Engineering]: Management—Software Configuration Management.

General Terms: Measurement, Management, Human Factors

Keywords: Concurrent Development, Branches, Teams, What-if Analysis, Branch Refactoring, Coordination

## 1. INTRODUCTION
As software projects grow ever larger, both in terms of development teams and code size, coordinating work and changes to the system without causing undue harm or hindering others unnecessarily becomes a challenge. Thousands of developers making substantial changes to the contents and interfaces of hundreds of subsystems can quickly lead to disaster. One common solution to this problem is to use branches within the source code management system (SCM) [1]. Branches provide developers a facility for working individually or in teams on the source code of a software project independent of the changes being made by others. The branch provides a workspace where changes can be made, designs explored, and code tested in parallel with other teams working in other branches. Once a work task has been completed and the software is judged to be of sufficient quality (via testing or some other method), these changes can be integrated (also known as merged) into other branches (and their corresponding features) as they move towards a common branch (sometimes called “trunk”, “master”, or “root” in different SCMs) from which the product is released.

The practice of using branches to divide teams and tasks is used extensively at Microsoft for projects with large codebases, multiple concurrent releases undergoing development, and large teams. In recent years, with the advent of SCMs that facilitate easy branching and merging such as Git, Mercurial, Darcs, and Bazaar, many open source projects have begun using branching increasingly in their development practices. Prominent examples include the Linux kernel, Python, Perl, Ruby on Rails, X.org, and GNOME. Of the projects reporting their SCM in Debian, 61% indicated that they used next generation SCMs that facilitate branching [2]. Branching is a practice that is only becoming more prominent.

Branches do not come without a price, however. Since a change is initially only visible to the team working within its branch, it must be integrated into other branches before it can be seen by the rest of the project. The process of integrating changes from multiple branches can be difficult and error-prone, especially if changes on different branches conflict, either syntactically or semantically. In addition, this process takes time, which can slow teams on different branches that are dependent on each other or features which are related. Thus, branches incur an overhead in both developer effort and time, which, if not monitored and managed, can have severe impact on the project in the form of missed deadlines and increased failures.

In an effort to identify the extent of the cost of branching we surveyed developers at Microsoft to determine the difficulty and time associated with integrating changes from multiple branches as well as tools and practices used to verify such work. We also included questions to determine how often common problems with branches (also called “anti-patterns”, initially identified by Appleton et al [3]) are encountered and what their severity is. Based on the survey and follow-up discussions with developers, we found that branch awareness and decisions surrounding branches are important pain points for many software projects, especially for SCMs that contain many branches, leading to many large integrations and long delays in moving changes across teams (anti-patterns known as “Branchmania” and “Big Bang Merge”).

To address scenarios involving monitoring and making decisions about branches, we present a what-if analysis which serves to characterize individual branches in terms of isolation—how many conflicts they prevent—and liveness—how quickly changes made on the branches are conveyed to other teams. Our approach separates branches which exhibit the expected benefits (which we term