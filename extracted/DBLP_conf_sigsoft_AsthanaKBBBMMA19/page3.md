Tie, an approach introduced by Xia et al. [24] builds on RevFinder by using file path similarity metrics and incorporating a text mining component that examines the code review request and compares it to the text in previously completed code review requests.

cHRev, developed by Zanjani et al. [26], uses historical information including how frequently and recently a developer provided code review comments about a file, in addition to the total number of review comments made for a file, to rank the best developers to review a change to that file in the future. Our model is based on participation in past reviews for a file, but also incorporates the history of developers that made changes to the file, as we found that in some cases, the primary author of a file never actually provided code review comments about it. In these cases, the primary author should still be recommended to review changes.

Jeong et al. [10] developed a method for recommending reviewers for source code changes based on a variety of features including size of the change (both in lines of code and files affected), the identity of the author of the change, the names of the files changed, source code features such as counts of various keywords and braces, and even bug report information such as bug severity and priority if the change was intended to correct a related bug.

Ouni et al. [14] even incorporated socio-technical collaboration graphs of developers into reviewer recommendation based on the notion that “the socio-technical factor related to the relationship between reviewer contributors is a crucial aspect that affects the review quality”. Their work was inspired by Yang et al.’s findings that developers’ communication social networks is a strong predictor of their activity and collaboration with regard to code review (which they term “peer review”) [25].

Rahman et al. [15, 16] actually determined developers’ expertise by looking across multiple projects. Their approach attempts to determine if developers had used particular libraries or technologies in other projects that would make them appropriate reviewers for a change in a particular project. They gathered data from GitHub to determine the history of changes that developers had made and what technologies/libraries they had used in the past.

Our report differs from this body of work in three primary ways. First, as our goal is to recommend reviewers quickly for repositories that may be very large, we use a simplified approach that uses only one data source, the history of PRs in a project. We do not rely on bug databases, an ecosystem of software projects, a history of developer communication, or features of source code that would require some level of code analysis. These add complexity, require additional data sources (that may or may not exist), and take additional time. Second, while the existing systems mentioned used a retrospective, historical approach to evaluate the performance of their approaches, we deploy our reviewer recommendation system and evaluate it based on the results of it being used in practice. Third, our experience is that reviewer recommendation systems often suggest a small set of developers to participate in most reviews, leading to a very skewed assignment of reviews. As a result, we are the first to both identify the problem and address it by incorporating reviewer load balancing into our reviewer recommendation system.

http://www.github.com

## 3 SYSTEM DESIGN

In this section, we first describe the WhoDo reviewer recommendation algorithm in detail with specific emphasis on the scoring function used to prioritize reviewers. Next, we describe how we augment the algorithm to balance load across all reviewers.

### 3.1 Scoring Function

WhoDo’s scoring function creates a ranked order of developers as potential reviewers for a pull-request using commit and review histories. Developers who have in the past either committed changes to the files in the pull-request, or have reviewed files in the pull-request, are more likely to be added as reviewers. We say that a developer has reviewed a pull-request if and only if they have either signed off on the pull-request, or left at least one comment.

Given a pull-request, the score for each reviewer r is:

Score(r) = C1 * sum_{f in F} ( n_change(r, f) * (1 / t_change(r, f)) )
         + C2 * sum_{d in D} ( n_change(r, d) * (1 / t_change(r, d)) )
         + C3 * sum_{f in F} ( n_review(r, f) * (1 / t_review(r, f)) )
         + C4 * sum_{d in D} ( n_review(r, d) * (1 / t_review(r, d)) )

where r is the reviewer, F is the set of all files in the pull-request, and D is the set of all last-level parent directories that are changed in the pull-request. n_change(r, f) is the number of times reviewer r has committed changes to file f in the past. n_review(r, f) is the number of times reviewer r has reviewed file f. Similarly, n_change(r, d) is the number of times reviewer r has committed changes within directory d and n_review(r, d) is the number of times reviewer r has reviewed files in directory d. Hence, the larger the number of times a reviewer has interacted with the file (or last-level directory in which the file sits), the higher the reviewer’s score.

t_change(r, f) is the number of days since reviewer r changed file f, and t_review(r, f) is the number of days since the reviewer reviewed file f. Similarly, t_change(r, d) is the number of days since reviewer r changed directory d, and t_review(r, d) is the number of days since the reviewer reviewed files in directory d. These terms are in the denominator. Hence, reviewers with more recent interactions with the files and directories of the pull-request will have lower values for these, and WhoDo will rank them higher.

C1, C2, C3 and C4 are constant coefficients. An administrator deploying WhoDo can manipulate these four coefficients to weigh authorship over reviewership, or vice-versa. Giving more weight to code authorship loops in more junior developers in the recommendation system, since junior developers tend to write code more than review code. In our deployments of WhoDo, we wanted to give equal weightage to both authorship and reviewership and therefore set all coefficients to 1.0.

Finally, WhoDo picks the reviewers with the top k scores and adds them as reviewers to the pull-request.