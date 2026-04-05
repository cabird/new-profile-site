shortcomings of the system and understand the problem at a deeper level.

## 5 DEPLOYMENT

![Pipeline diagram showing WhoDo scoring model, SQL database, and reviewer scores](page5_img_1.png)

Figure 3: Pipeline for the WhoDo recommendation service

Figure 3 provides an overview of the deployment of the WhoDo reviewer recommendation service. The first stage is aggregating the past history of developers that the scoring model defined above can use. We maintain a comprehensive set of repository data like files changed, review information, changes, etc., which is updated incrementally every four hours. As part of this data, we also record the number of changes and reviews by each developer to every file path they work on in the repository and the last time of such activity. Recording such information makes it very easy for the scoring model to query this information directly and aggregate it across all candidate reviewers.

The standard tool for code review inside Microsoft is Azure DevOps which provides an interface similar to open source tools like Gerrit, GitHub with a page for each pull-request. The page contains all the information that code reviewers might need for the pull-request and functionality for adding comments, adding/removing reviewers, etc. Our service is hooked to the Azure DevOps service and gets triggered to show a reviewer recommendation whenever a new pull-request is created or an existing one modified.

### 5.1 Showing recommendations

We had three choices on how to show the recommendations to the developers:
- Suggest reviewers as a comment on the pull request.
- Add optional reviewers to the pull request.
- Add required reviewers to the pull request.

The first case, of commenting, is non-invasive, where it's the pull request author's choice to add a suggested developer as a reviewer. In the last two cases, suggested developers get a notification of addition to the pull request. Optional reviewers are not required to sign-off on the pull request for it to be deemed complete, whereas required reviewers need to sign-off on the pull request for it to be considered complete. We did not consider the first option, as it requires vigilance on the part of code authors to actively act on our suggestions, whereas the last option would have meant an incorrect reviewer needing to sign-off on the pull request. Therefore, we considered adding our suggestions as optional reviewers as a healthy trade-off between passive and active addition.

## 6 EVALUATION

We have deployed WhoDo on 123 repositories within Microsoft. Our evaluation focuses on five of these repositories. We now provide a summary of the different experiments we used to evaluate WhoDo.

In Section 6.2, we provide statistics that characterize these repositories. Next, we describe WhoDo's performance on these repositories in Section 6.3, without load-balancing. Eventually, we deployed the WhoDo load-balancing algorithm on the LargeRepo repository. We describe WhoDo's load-balancing performance in Section 6.4.

To understand how to improve WhoDo, we performed a user-study, the results of which we summarize in Section 6.5. Finally, to see if our results compared well with previous work, we performed a retrospective analysis of WhoDo on the same five repositories, asking questions of how WhoDo's reviewer suggestions, if it had been deployed earlier, would have compared to the current manual process of adding reviewers. We describe this in Section 6.6.

We first describe the metrics used for both parts of our evaluation. Next we describe the results.

### 6.1 Metrics

As noted earlier, the ultimate goals of WhoDo are to improve code quality and increase deployment agility. Hence, we use the following metrics to evaluate it.

- Hit rate: WhoDo's goal is to choose the right set of reviewers so that the pull-request owner does not have to add any reviewers manually. The WhoDo hit-rate is the fraction of PRs in a repository for which at least one of the reviewers suggested by WhoDo reviewed the PR. In other words, WhoDo is successful in choosing the right reviewer(s) who review and complete the PR. A better hit-rate signifies the service was able to successfully identify a reviewer, and therefore offload that task from the author.

- Average number of reviews per PR: We evaluate if, post-deployment, WhoDo achieves a larger number of completed reviews per PR on average than before it was deployed. Having this larger number through an automated service will hopefully improve the code quality as more expert reviewers are examining the code.

- Average PR completion time: We evaluate if, post-deployment, WhoDo reduced the average PR completion time for a repository. A reduced PR completion time also reduces the time to deploy a code-change into production, thereby improving deployment agility. WhoDo achieves this by choosing the right set of reviewers as soon as the PR owner creates the PR, rather than waiting for the owner to manually determine the right set of reviewers.