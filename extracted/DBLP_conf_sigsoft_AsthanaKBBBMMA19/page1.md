## WhoDo: Automating reviewer suggestions at scale

Sumit Asthana — Microsoft Research India — t-suasth@microsoft.com  
B. Ashok — Microsoft Research India — bash@microsoft.com  
Chetan Bansal — Microsoft Research India — chetanb@microsoft.com  
Ranjita Bhagwan — Microsoft Research India — bhagwan@microsoft.com  
Christian Bird — Microsoft Research Redmond — cbird@microsoft.com  
Rahul Kumar — Microsoft Research India — rahulku@microsoft.com  
Chandra Maddila — Microsoft Research India — chmaddil@microsoft.com  
Sonu Mehta — Microsoft Research India — someh@microsoft.com

### ABSTRACT

Today’s software development is distributed and involves continuous changes for new features and yet, their development cycle has to be fast and agile. An important component of enabling this agility is selecting the right reviewers for every code change — the smallest unit of the development cycle. Modern tool-based code review is proven to be an effective way to achieve appropriate code review of software changes. However, the selection of reviewers in these code review systems is at best manual. As software and teams scale, this poses the challenge of selecting the right reviewers, which in turn determines software quality over time. While previous work has suggested automatic approaches to code reviewer recommendations, it has been limited to retrospective analysis. We not only deploy a reviewer suggestions algorithm — WhoDo — and evaluate its effect but also incorporate load balancing as part of it to address one of its major shortcomings: recommending experienced developers very frequently. We evaluate the effect of this hybrid recommendation + load balancing system on five repositories within Microsoft. Our results are based around various aspects of a commit and how code review affects that. We attempt to quantitatively answer questions which are supposed to play a vital role in effective code review through our data and substantiate it through qualitative feedback of partner repositories.

> ACM Reference Format:  
> Sumit Asthana, B. Ashok, Chetan Bansal, Ranjita Bhagwan, Christian Bird, Rahul Kumar, Chandra Maddila, and Sonu Mehta. 2019. WhoDo: Automating reviewer suggestions at scale. In Proceedings of The 27th ACM Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering (ESEC/FSE 2019). ACM, New York, NY, USA, 9 pages. https://doi.org/10.1145/nnnnnnn.nnnnnnn

## 1 INTRODUCTION

Large software projects have continuously evolving code-bases and an ever-changing set of developers. Making the development process smooth and fast, while maintaining code quality is vital to any software development effort. As one approach for meeting this challenge, code review [1, 2] is widely accepted as an effective tool for subjecting code to scrutiny by peers and maintaining quality. Modern code review [3], characterized by lightweight tool-based reviews of source code changes, is in use broadly across both commercial and open source software projects [17]. This form of code review provides developers with an effective workflow to review code changes and improve code, and this process has been studied in depth in the research community [5, 6, 11, 13, 17–20, 23].

One topic that has received much attention over the past five years is the challenge of recommending the most appropriate reviewers for a software change. Bacchelli and Bird [3] found that when the reviewing developer had a deep understanding of the code being reviewed, the feedback was "more likely to find subtle defects ... more conceptual (better ideas, approaches) instead of superficial (naming, mechanical style, etc.)." Kononenko et al. [12] found that selecting the right reviewers impacts quality. Thus, many have proposed and evaluated approaches for identifying the best reviewer for a code review [4, 8, 14, 15, 22, 24, 26] (see section 2 for a more in-depth description of related work). At Microsoft, many development teams have voiced a desire for help in identifying those developers that have the understanding and expertise needed to review a given software change.

The large and growing size of the software repositories at many software companies (including Microsoft, the company involved in the evaluation of our approach) has created the need for an automated way to suggest reviewers [3]. One common approach that several projects have used is a manually defined set of groups that identify experts in an area of code collectively. These groups are used in conjunction with rules which trigger the addition of groups

CCS CONCEPTS

- Human-centered computing → Empirical studies in collaborative and social computing;
- Software and its engineering → Software configuration management and version control systems; Software maintenance tools; Programming teams.

KEYWORDS

software-engineering, recommendation, code-review

> Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page. Copyrights for components of this work owned by others than ACM must be honored. Abstracting with credit is permitted. To copy otherwise, or republish, to post on servers or to redistribute to lists, requires prior specific permission and/or a fee. Request permissions from permissions@acm.org.  
>  
> ESEC/FSE 2019, 26–30 August, 2019, Tallinn, Estonia  
> © 2019 Association for Computing Machinery.  
> ACM ISBN 978-x-xxxx-xxxx-x/YY/MM...$15.00  
> https://doi.org/10.1145/nnnnnnn.nnnnnnn