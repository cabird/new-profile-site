- Average per-reviewer active load: This metric helps evaluate the efficacy of the WhoDo load-balancing algorithm. We define per-reviewer active load as the average number of open reviews that a reviewer has on any given day. We then average this across all reviewers to get the average per-reviewer active load.

## 6.2 Repository Characteristics

Table 1 characterizes the five repositories which we use to evaluate WhoDo. The LargeRepo repository is the largest, with roughly 120 active developers and more than 8 PRs per day on average. MediumRepo has a similar number of active developers, but fewer PRs per day. The other 3 repositories are smaller in size, with roughly 10–20 active developers and about 2 PRs per day. The table also shows the date of deployment of service, and the service remains active to-date on all repositories. Developer coverage for each repository reflects the percentage of total number of files in the repository that a developer has touched on an average. Note that the developer coverage seems higher for the smaller repositories. Cut-off date refers to the date up to which we take the pull-requests for all our analyses.

## 6.3 WhoDo Performance

We now state our findings, using the metrics described in Section 6.1, from WhoDo’s five deployments. Table 2 summarizes our results.

### 6.3.1 PR Completion Time

We find that, for the smaller repositories SmallRepo1, MediumRepo, SmallRepo2, and SmallRepo3, the PR completion time improves significantly, between 13.03% and 21.39%. For the larger LargeRepo repository, without load-balancing, it increases by about 14%.

We had received complaints of overloaded reviewers from the larger repo, so further investigation revealed that a fundamental difference exists between reviewer expertise in smaller versus larger repositories. In smaller repositories, developers have expertise in a larger fraction of the code-base. The developer coverage metric in Table 1 shows this. As a result, the fraction of suitable reviewers for a pull-request is larger for a small repository than it is for a large repository. Contrarily, in larger repositories, most reviewers are experts on only a small set of code-paths within the code-base. However, there do exist some senior, experienced reviewers whose expertise extends to a larger set of code-paths in larger repositories too. This is evident from the coverage numbers in Table 1. Therefore, when we deployed WhoDo without load-balancing on the large repository, these senior reviewers were assigned a disproportionately large set of reviews, causing a backlog and hence affecting overall PR completion time. We addressed this issue by deploying load-balancing into the LargeRepo repository, after which PR completion time showed further improvement. The results are in Section 6.4.

### 6.3.2 Average Number of Reviews

All repositories saw a significant increase in average number of reviews per PR. For LargeRepo though, the increase is significantly more, i.e. 45.66%. We found that though WhoDo was automatically adding suitable reviewers, developers were manually adding additional reviewers who they worked closely with. Consequently, each pull-request was being examined by a larger set of expert reviewers than before. Based on this finding, a future goal of WhoDo is to capture author–reviewer affinity into the model.

### 6.3.3 Hit Rate

Finally, we evaluated the hit rate that WhoDo provided. We explain the hit rate and its implication using MediumRepo as an example. Note, from Table 2, that MediumRepo had the lowest hit rate of 58.16%. This means that, for 41.84% of all 589 PRs, i.e. 246 PRs, none of the reviewers suggested by WhoDo interacted with the PR, and that the owner manually added at least one other reviewer that WhoDo did not suggest. PR owners adding reviewers manually has the effect of reducing the hit-rate on all 5 repositories. To understand why owners add reviewers manually, we performed the user study described in Section 6.5.

## 6.4 Load Balancing

We implemented load-balancing into WhoDo and deployed it on the LargeRepo repository on 20th December, 2018. We have collected data on WhoDo’s performance with load-balancing for 45 days. We have data on WhoDo’s performance without load-balancing for 56 days. Table 3 summarizes the results of this experiment.

Note that after we deployed load-balancing, the PR completion time reduced significantly, from 70.46 hours to 57.92 hours. While WhoDo without load-balancing on the LargeRepo repository did not have a significant effect on PR completion times (shown in Table 2), WhoDo with load-balancing decreased it by 17.79%. The average reviews per PR also increased from 3.86 to 4.05. In addition, we see that the active load on reviewers goes down significantly from 0.663 to 0.359, a decrease by 45.85%. This analysis shows that larger repositories such as LargeRepo benefit significantly from using the load-balancing algorithm. Table 4 shows the upper and lower quantiles, median, mean of pull-request completion times for the LargeRepo repository. We note that the majority of our drop in pull-request completion times arises from the higher end, i.e. pull-requests which take longer. We argue that this is mostly because a majority of pull-requests which comprise of changes to one or two files wouldn’t get affected by the increase in number of reviews. It's only the pull-requests which are major changes and require a thorough review, which will benefit from the more available reviewers.

## 6.5 User Study

As shown in Table 2, WhoDo achieves good hit rates. However, there are still cases in which, in spite of WhoDo’s automatic reviewer additions, several PR owners manually added other reviewers. The objective of this user study was to understand why this was happening.

We conducted a user-study by sending email to 75 PR owners spread across all 5 repos. We sent only one email per developer, to avoid spamming them and selected only those PRs for investigation, where none of our 3 recommendations proved useful. In the email, we asked them their reason for adding the reviewers. We provided them the following options:

1. Were the reviewers WhoDo added not relevant?
2. Were the reviewers WhoDo added from a different team?
3. While WhoDo’s suggestions were valid, did you add reviewers because they were available to review promptly?