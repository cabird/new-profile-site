another change, e.g., for a bug fix or a feature implementation. For example, there may be team members who own other related features and/or source code modules or who do not work on code directly that have the expertise to provide quality code review feedback. The second is that expertise changes over time and thus both the frequency and recency must be accounted for to find the most appropriate reviewers.

In an effort to demonstrate the effectiveness of our approach, we compare cHRev with REVFINDER [15], xFinder [17], and RevCom. We show that cHRev outperforms all these three approaches. REVFINDER is a recently proposed technique that uses code review history to identify reviewers. REVFINDER assigns an expertise score to reviewers based on their number of past reviews on similar file names and paths. Unlike cHRev, it does not consider the amount of contributions (feedback comments and days) in each past review and their temporal recency. xFinder is a developer recommendation approach for source code, which is used here for reviewer recommendation. To assess the potential orthogonality between the code commits and reviews, we devised a combined approach, namely RevCom, which is based on the factors of cHRev and xFinder.

Our paper makes the following noteworthy contributions in recommending relevant reviewers for a given change:
1) We present cHRev that utilizes code review histories for recommending reviewers for a code change.
2) We perform a comparative study of cHRev, REVFINDER, xFinder, and RevCom.
3) We demonstrate the effectiveness of cHRev through an empirical evaluation on one industrial (MS Office) and three open source (Android Platform, Eclipse Platform, and Mylyn) systems.

The rest of the paper is organized as follows: Section 2 presents background of modern code review and associated terminology. Our approach is discussed in Section 3. The empirical study on Android Platform, Eclipse Platform, Mylyn, and MS Office, and its results are presented in Section 4. Threats to validity are encountered in Section 5. Related work is discussed in Section 6. Finally, our conclusions and future work are stated in Section 7.

## 2 BACKGROUND ON MODERN CODE REVIEW

In this section, we define the key concepts involved in the modern code review, which is driven by supporting infrastructure and tools, e.g., Gerrit and CodeFlow.

Code Change: A code change is a set of modified source code files submitted to fix a bug or add a new feature.

Review: A code review is a record of the interactions between the owner of a change and reviewers of the change including comments on the code and signoffs from reviewers.

Owner: An owner is the developer who makes the change in the source code and submits it for review.

Reviewer: A reviewer on a particular review is a developer who is assigned to and/or contributes to that review.

Review Comment: A review comment is textual feedback written by a reviewer about the code change during the review process. A review comment may be about the change in general or may be explicitly tied to a particular part of the change.

The lifecycle of a review is as follows: Initially a developer (the owner) makes changes to the source code in response to a bug report or feature request. Once complete, they submit the code change for review. The owner may indicate the intended reviewers, who are subsequently notified about the review invitation. It should be noted that the invited reviewers do not necessarily accept the invitation and contribute to the review. Reviewers then inspect the change through the code review tool (a web page in the case of Gerrit or a windows application in the case of CodeFlow) and provide feedback in the form of review comments to the owner. The code change is typically depicted by showing the difference of the code before and after the change. The owner may update the change and submit the update to the review as a result of such feedback. Eventually, a reviewer "signs-off" on the review, once they believe the code change is of sufficient quality to be checked into the code repository. If a change never received sign-offs, it is abandoned. The number of sign-offs required to check in a code change is typically dependent on the team policy. Gerrit is a modern peer-review tool that facilitates a traceable review process for git-based software projects [3]. Developers make local changes in their private git repositories and then submit these changes as a patch for review [4]. Most Microsoft developers practice code review using CodeFlow, an internal tool for reviewing code, which is under active development and regularly used by more than 50,000 developers. CodeFlow is a collaborative code review tool similar to other popular review tools such as Gerrit.

Code review is a quality assurance mechanism and is required for checkin. Therefore, it is critical that it is both effective (actually improves code changes and blocks poor code from being checked into the repository) and timely (does not act as a bottle-neck by slowing down changes). Prior research [12] has found that higher expertise of reviewers leads to both.

## 3 THE PROPOSED cHRev APPROACH

The basic premise of our approach is that the reviewers who reviewed the units of source code in the past are most likely to best assist with reviewing it in the future. Our approach, cHRev, takes a code change submitted for review and mines the archives of reviews, i.e., review history, from the code review system (e.g., Gerrit) to recommend a ranked list of candidates for reviewing the given code change. It utilizes the past code changes and their reviewers to form a quantifiable model of the expertise of each reviewer in each source code file. In a code change, the cardinality of source code files is typically greater than 1. Therefore, the overall expertise of each candidate reviewer for the given code change is derived from a cumulative scoring function for all source code files in it. Finally, a ranked list of top n (a tunable user parameter) reviewers is recommended. To be specific, cHRev consists of the following steps:

Step 1: Extract Source Code Under Review: Given a code change under review for which reviewers are desired, it extracts each source code file.

Step 2: Formulate Reviewer Expertise: For each source code file in Step 1, it forms a reviewer expertise model based