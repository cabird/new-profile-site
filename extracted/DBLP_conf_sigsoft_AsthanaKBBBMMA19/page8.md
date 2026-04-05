- Reviewers, while not irrelevant, were not really required to review the specific changes - touching a config file which is used by a lot of components led our model to suggest people who touched that file most often, even though they were from a different team.
- WhoDo keeps adding people from different teams and they didn’t help review at all - This is a drawback of our scoring system and of all the solutions before this since they are inherently similar. We intend to incorporate team information to fix this problem in our next iteration.

From this user-study, we learn that to improve WhoDo’s hit-rate we have to include two factors. First, the model should include the affinity between authors and reviewers, such as team information, so that we can suggest reviewers who are already familiar with the author. Second, we should include information on the availability of the reviewer, for instance, by observing their schedule or calendar.

### 6.6 Retrospective Analysis

We also performed a retrospective analysis of WhoDo on all five repositories. The goal of this analysis is to see how well WhoDo’s suggestions match reviewers who the developers chose manually. This analysis is akin to that performed in previous work [26], which is similar to our work in that they measure prior activity of developers. Their approach differs in that they look solely at comments and they count them whereas we look also at sign-offs, as we noted that, especially for small changes, sometimes a reviewer signs-off on a change without making any comments.

We note that this retrospective analysis is an important part of our study because before deploying the scoring model or any changes to it thereof, it helps establish a baseline level of accuracy for the system and acts as a sanity check.

Table 5 describes this results of this analysis. Similar to the previous work [26], we use the following metrics in this analysis, so that we place it well for comparison against past work:

```
precision@m = |RR(p) ∩ AR(p)| / |RR(p)|

recall@m = |RR(p) ∩ AR(p)| / |AR(p)|

F-score@m = 2 * precision@m * recall@m / (precision@m + recall@m)
```

where RR(p) and AR(p) are the recommended reviewers and the actual reviewers who contributed in the review process of the code change p respectively. m is the size of the recommendation list. In our case, we recommend 3 developer on pull-requests so we only report @3 numbers for comparison with previous work.

Additionally we define PR Hits (P@n), as the fraction of all pull-requests where we were able to make at least one positive suggestion as an indication of the usefulness of the recommendation. WhoDo obtains very high values for PR Hits for all repositories, the lowest value being 68.85% and the highest being 96.57%. This means that in 96.57% of all PRs in the SmallRepo3 repository, one of the reviewers that WhoDo suggested did in fact complete the review.

Overall, while the precision and recall numbers do not seem high, they are comparable to previous systems. For instance, cHRev [26] reported numbers for four repositories with average precision 0.39, average recall of 0.69, and average F1-score of 0.5. WhoDo obtains an average precision of 0.44, an average recall of 0.47, for an average F1-score of 0.44. These numbers provide a ballpark for their performance, but aren’t an exact comparison because they were evaluated on different software projects with different characteristics (e.g., different numbers and distributions of developers and their activity). The reason why these numbers are not higher could be explained by our user-study as well. Our user-study found that often there are multiple reviewers who are qualified to review the PR, but the owner of the change chose the developer who was most readily available. We are investigating ways to infer developer availability and use it to augment the recommended reviewer ranking.

## 7 CONCLUSION

In this paper we reported our experiences and results from implementing and deploying a code review recommendation system. Our system, which identifies potential code reviewers based on their prior experience working with the files and directories involved in a code review, has been deployed in five software projects at Microsoft and performs well in helping the right developers to review the right changes. Of note, we discovered that reviewer recommendation systems may suffer from reviewer load imbalance and we have mitigated this issue through a load balancing mechanism. Use of load balancing leads to a less skewed review assignment and a decrease in review latency. As far as we know, this is the first study to report on a deployed code reviewer recommendation system at scale. We also presented a comprehensive evaluation that included a set of goal driven metrics, a user study of developers that used the system, and finally retrospective analysis similar through that used in other reviewer recommendation studies. We have also identified the additional factors of author-developer affinity and reviewer availability when recommending reviewers and we plan to investigate this in the future. We believe that others implementing reviewer recommendation in their own software organizations can benefit from the ideas and findings in this paper.

## REFERENCES

[1] A. Frank Ackerman, Lynne S. Buchwald, and Frank H. Lewski. 1989. Software Inspections: An Effective Verification Process. IEEE Softw. 6, 3 (May 1989), 31–36. https://doi.org/10.1109/52.28121

[2] A. Frank Ackerman, Priscilla J. Fowler, and Robert G. Ebenau. 1984. Software Inspections and the Industrial Production of Software. In Proc. Of a Symposium on Software Validation: Inspection-testing-verification-alternatives. Elsevier North-Holland, Inc., New York, NY, USA, 13–40. http://dl.acm.org/citation.cfm?id=3541.3543

[3] Alberto Bacchelli and Christian Bird. 2013. Expectations, outcomes, and challenges of modern code review. In 35th International Conference on Software Engineering, ICSE ’13, San Francisco, CA, USA, May 18-26, 2013, David Notkin, Betty H. C. Cheng, and Klaus Pohl (Eds.). IEEE Computer Society, 712–721. https://doi.org/10.1109/ICSE.2013.6606617

[4] Vipin Balachandran. 2013. Reducing human effort and improving quality in peer code reviews using automatic static analysis and reviewer recommendation. In Proceedings of the 2013 International Conference on Software Engineering. IEEE Press, 931–940.

[5] Olga Baysal, Oleksii Kononenko, Reid Holmes, and Michael W. Godfrey. 2012. The Secret Life of Patches: A Firefox Case Study. In 19th Working Conference on Reverse Engineering, WCRE 2012, Kingston, ON, Canada, October 15-18, 2012. IEEE Computer Society, 447–455. https://doi.org/10.1109/WCRE.2012.54